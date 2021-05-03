const assert = require('@aws-cdk/assert');
const expectCDK = assert.expect;
const haveResource = assert.haveResource;

const cdk = require('@aws-cdk/core');
const Deploy = require('../lib/deploy-stack');
const Redis = require('../lib/redis');
const tap = require('tap');
const fullStack = require('../bin/deploy');

tap.test('Test resource presence', async subTest => {
  const app = new cdk.App();
  // WHEN
  const stack = await new Deploy.SharedResources(app, 'SharedResourcesStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::S3::Bucket",{}));
  expectCDK(stack).to(haveResource("AWS::EC2::VPC",{}));
  expectCDK(stack).to(haveResource("AWS::ECS::Cluster",{}));
});

tap.test('Test resource presence', async subTest => {
  const app = new cdk.App();
  // WHEN
  const sr = await new Deploy.SharedResources(app, 'SharedResourcesStack');
  const stack = await new Deploy.EkkoStack(app, "ekko-server", {
    cluster: sr.cluster,
    redis: sr.redis,
    vpc: sr.vpc,
    s3: sr.s3,
  });

  // THEN
  expectCDK(stack).to(haveResource("AWS::ECS::TaskDefinition",{}));
});
