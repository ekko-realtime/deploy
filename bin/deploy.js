#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { EkkoStack, SharedResources } = require('../lib/deploy-stack');
const { Tags } = require('@aws-cdk/core');

// A construct which represents the entire CDK app
class EkkoApp extends cdk.App {
  constructor() {
    super();

    const sharedResources = new SharedResources(this, "shared-resources");

    const server = new EkkoStack(this, "ekko-server", {
      cluster: sharedResources.cluster,
      redis: sharedResources.redis,
      vpc: sharedResources.vpc,
      s3: sharedResources.s3,
    });

    Tags.of(sharedResources).add("service", "ekko");
    Tags.of(server).add("service", "ekko");
  }
}

const app = new EkkoApp().synth();
