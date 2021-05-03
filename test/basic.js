const assert = require('@aws-cdk/assert');
const expectCDK = assert.expect;
const haveResource = assert.haveResource;

const cdk = require('@aws-cdk/core');
const Deploy = require('../lib/deploy-stack');
const tap = require('tap');

tap.test('Test resource presence', async subTest => {
  const app = new cdk.App();
  // WHEN
  const stack = await new Deploy.SharedResources(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::S3::Bucket",{}));
  expectCDK(stack).to(haveResource("AWS::EC2::VPC",{}));
  expectCDK(stack).to(haveResource("AWS::ECS::Cluster",{}));
});
