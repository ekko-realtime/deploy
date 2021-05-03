const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const ec2 = require("@aws-cdk/aws-ec2");
const ecs = require("@aws-cdk/aws-ecs");
const ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
const iam = require('@aws-cdk/aws-iam');

const { RedisCluster } = require("./redis");
const { AutoScalingGroup } = require('@aws-cdk/aws-autoscaling');
const { Duration } = require('@aws-cdk/core');
const { ManagedPolicy } = require('@aws-cdk/aws-iam');

const { randomBytes } = require("crypto");

class SharedResources extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // create an S3 bucket for storing our association files and other static assets
    this.s3 = new s3.Bucket(this, 'EkkoBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    // create a VPC that will provide security and access policies for our system
    this.vpc = new ec2.Vpc(this, "EkkoSharedVpc", {
      maxAzs: 2, // Default is all AZs in region
      natGateways: 1
    });

    // create an ECS cluster within our VPC
    this.cluster = new ecs.Cluster(this, "EkkoSharedCluster", {
      vpc: this.vpc
    });

    // create a redis cluster instance that we can use in our ECS stack
    this.redis = new RedisCluster(this, "redis", { vpc: this.vpc });
  }
}

class EkkoStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    this.id = randomBytes(32).toString("hex");

    const ekkoServerContainer = ecs.ContainerImage.fromRegistry("public.ecr.aws/s8v4g8o5/ekko_server:latest");

    const ekkoServiceTaskDefinition = new ecs.FargateTaskDefinition(this, 'ekkoServiceTaskDefinition', {
      memoryLimitMiB: 2048,
      cpu: 1024
    });

    const ekko_server_container = ekkoServiceTaskDefinition.addContainer('ekkoServiceContainer', {
      image: ekkoServerContainer,
      environment: {
        SECRET_KEY: `${this.id}`,
        REDIS_ENDPOINT: props.redis.cluster.attrRedisEndpointAddress,
        REDIS_PORT: props.redis.cluster.attrRedisEndpointPort,
        S3_BUCKET: props.s3.bucketName,
        PORT: "80",
      },
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'ekko-server' }),
    });

    // // Add port to container definition
    ekko_server_container.addPortMappings(
      {
        containerPort: 80,
        hostPort: 80,
        protocol: 'tcp',
      }
    );

    // Increase Number of open file ulimits
    ekko_server_container.addUlimits({
      name: ecs.UlimitName.NOFILE,
      softLimit: 50000,
      hardLimit: 65500,
    });

    const ekkoService = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "ekko-server",
      {
        taskDefinition: ekkoServiceTaskDefinition,
        cluster: props.cluster,
        cpu: 1024,
        desiredCount: 1,
        memoryLimitMiB: 2048,
        publicLoadBalancer: true,
        serviceName: "ekkoServer",
      }
    );

    // allow cluster to communicate with the redis/elasticache cluster
    ekkoService.service.connections.allowToDefaultPort(props.redis);

    // special attributes needing to be set because we are using websockets
    ekkoService.targetGroup.enableCookieStickiness(Duration.days(3));
    ekkoService.loadBalancer.setAttribute("idle_timeout.timeout_seconds", "75");

    // // add TLS listener for our fargate service
    // ekkoService.loadBalancer.addListener("https-ekko-listener", {
    //   port: 443,
    //   defaultTargetGroups: [ekkoService.targetGroup],
    //   certificateArns: ["arn:aws:acm:me-south-1:746690549776:certificate/fa5fa874-dbff-4a01-a202-96173ea9d789"],
    // });

    // add auto-scaling to our fargate service
    const autoScalingGroup = ekkoService.service.autoScaleTaskCount({
      minCapacity: 1, // this is the default, but I left it in to be explicit
      maxCapacity: 15
    });

    // add managed policies for lambda execution and S3 bucket access
    ekkoService.taskDefinition.taskRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess'));
    ekkoService.taskDefinition.taskRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));

    // create a new role for the CLI to use when deploying lambdas
    const lambdaRole = new iam.Role(this, 'lambda_basic_execution', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });
    lambdaRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess'));

    // add custom ulimits to our ECS cluster's task definition
    ekkoService.taskDefinition

    new cdk.CfnOutput(this, "secret", {
      value: this.id,
    });

    new cdk.CfnOutput(this, "s3BucketName", {
      value: props.s3.bucketName,
    });

    new cdk.CfnOutput(this, "redisEndpoint", {
      value: props.redis.cluster.attrRedisEndpointAddress,
    });

    new cdk.CfnOutput(this, "redisPort", {
      value: props.redis.cluster.attrRedisEndpointPort,
    });

    new cdk.CfnOutput(this, "serviceURL", {
      value: ekkoService.loadBalancer.loadBalancerDnsName,
    });

    new cdk.CfnOutput(this, "loadBalancerName", {
      value: ekkoService.loadBalancer.loadBalancerName,
    });

    new cdk.CfnOutput(this, "loadBalancerFullName", {
      value: ekkoService.loadBalancer.loadBalancerFullName,
    });

    new cdk.CfnOutput(this, "lambdaRoleArn", {
      value: lambdaRole.roleArn,
    });

    new cdk.CfnOutput(this, "lambdaRoleName", {
      value: lambdaRole.roleName,
    });
  }
}

module.exports = { EkkoStack, SharedResources }
