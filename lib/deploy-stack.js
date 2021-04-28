const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const ec2 = require("@aws-cdk/aws-ec2");

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
  }
}

module.exports = { SharedResources }
