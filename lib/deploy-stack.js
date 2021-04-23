const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const elasticache = require ('@aws-cdk/aws-elasticache');
const cloudwatch = require('@aws-cdk/aws-cloudwatch');
const ec2 = require("@aws-cdk/aws-ec2");
const ecs = require("@aws-cdk/aws-ecs");
const ecs_patterns = require("@aws-cdk/aws-ecs-patterns");

class EkkoStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    new s3.Bucket(this, 'EkkoBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });
  }
}

module.exports = { EkkoStack }