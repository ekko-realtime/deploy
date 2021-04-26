const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const ec2 = require("@aws-cdk/aws-ec2");
const ecs = require("@aws-cdk/aws-ecs");
const ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
const { RedisCluster } = require("./redis");
const { randomBytes } = require("crypto");

const elbv2 = require('@aws-cdk/aws-elasticloadbalancingv2');
const { AutoScalingGroup } = require('@aws-cdk/aws-autoscaling');
const { Duration } = require('@aws-cdk/core');

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

    const ekkoService = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "ekko-server",
      {
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry("public.ecr.aws/o9y9t4j0/alex-test:latest"),
          environment: {
            APP_ID: `${this.id}`,
            REDIS_ENDPOINT: props.redis.cluster.attrRedisEndpointAddress,
            REDIS_PORT: props.redis.cluster.attrRedisEndpointPort,
            PORT: "80",
          },
          enableLogging: true,
        },
        cluster: props.cluster,
        cpu: 1024,
        desiredCount: 2,
        memoryLimitMiB: 2048,
        publicLoadBalancer: true,
      }
    );

    ekkoService.service.connections.allowToDefaultPort(props.redis);

    // const ekkoServiceListener = ekkoService.loadBalancer.addListener('Listener', {
    //   port: 80,
    // });

    // ekkoService.listener.addTargets('Target', {
    //   port: 80,
    //   targets: [ekkoService.service],
    //   stickinessCookieDuration: Duration.days(3)
    // });

    // ekkoServiceListener.connections.allowDefaultPortFromAnyIpv4('Open to the world');

    new cdk.CfnOutput(this, "secret", {
      value: this.id,
    });

  }
}

module.exports = { EkkoStack, SharedResources }
