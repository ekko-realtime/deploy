const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const ec2 = require("@aws-cdk/aws-ec2");
const ecs = require("@aws-cdk/aws-ecs");
const ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
const { RedisCluster } = require("./redis");
const { randomBytes } = require("crypto");

class SharedResources extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    this.s3 = new s3.Bucket(this, 'EkkoBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    this.vpc = new ec2.Vpc(this, "EkkoVpc", {
      maxAzs: 2 // Default is all AZs in region
    });

    this.cluster = new ecs.Cluster(this, "EkkoCluster", {
      vpc: this.vpc
    });

    this.redis = new RedisCluster(this, "redis", { vpc: this.vpc });
  }
}

class EkkoStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    this.id = randomBytes(32).toString("hex"); //?

    const ekkoService = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "ekko-server",
      {
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry("public.ecr.aws/o9y9t4j0/alex-test:latest"),
          environment: {
            APP_ID: `${this.id}`,
            REDIS_HOST: props.redis.cluster.attrRedisEndpointAddress,
            REDIS_PORT: props.redis.cluster.attrRedisEndpointPort,
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

    // Generate custom outputs after the resource has been deployed
    // new cdk.CfnOutput(this, "loadBalancerUrl", {
    //   value: ekkoService.loadBalancer.loadBalancerDnsName,
    // });

    // new cdk.CfnOutput(this, "secret", {
    //   value: this.id,
    // });

    // new cdk.CfnOutput(this, "apiUrl", {
    //   value: cdk.Fn.importValue("api-url"),
    // });

    // new cdk.CfnOutput(this, "apiKey", {
    //   value: cdk.Fn.importValue("api-key"),
    // });
  }
}



module.exports = { EkkoStack, SharedResources }
