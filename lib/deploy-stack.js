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

    new cdk.CfnOutput(this, "secret", {
      value: "3lrs908rstlrstyulrstuurst",
    });
  }
}

module.exports = { SharedResources }
