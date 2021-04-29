const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const ec2 = require("@aws-cdk/aws-ec2");
const ecs = require("@aws-cdk/aws-ecs");
const ecs_patterns = require("@aws-cdk/aws-ecs-patterns");

const { RedisCluster } = require("./redis");
const { AutoScalingGroup } = require('@aws-cdk/aws-autoscaling');
const { Duration } = require('@aws-cdk/core');

const { randomBytes } = require("crypto");

class SharedResources extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // create an S3 bucket for storing our association files and other static assets
    this.s3 = new s3.Bucket(this, 'EkkoBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // take this out after testing
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

    const ekkoServerContainer = ecs.ContainerImage.fromRegistry("public.ecr.aws/o9y9t4j0/alex-test:latest");

    const ekkoService = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "ekko-server",
      {
        taskImageOptions: {
          image: ekkoServerContainer,
          environment: {
            SECRET_KEY: `${this.id}`,
            REDIS_ENDPOINT: props.redis.cluster.attrRedisEndpointAddress,
            REDIS_PORT: props.redis.cluster.attrRedisEndpointPort,
            S3_BUCKET: props.s3.bucketName,
            PORT: "80",
          },
          enableLogging: true,
        },
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


    // add auto-scaling to our fargate service
    const autoScalingGroup = ekkoService.service.autoScaleTaskCount({
      minCapacity: 1, // this is the default, but I left it in to be explicit
      maxCapacity: 15
    });

    new cdk.CfnOutput(this, "secret", {
      value: this.id,
    });

    new cdk.CfnOutput(this, "s3BucketName", {
      value: props.s3.bucketName,
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
  }
}

module.exports = { EkkoStack, SharedResources }
