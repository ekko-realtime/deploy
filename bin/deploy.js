#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { EkkoStack, SharedResources } = require('../lib/deploy-stack');

// A construct which represents the entire CDK app
class EkkoApp extends cdk.App {
  constructor() {
    super();

    const sharedResources = new SharedResources(this, "shared-resources");

    const server = new EkkoStack(this, "ekko-server", {
      cluster: sharedResources.cluster,
      redis: sharedResources.redis,
      vpc: sharedResources.vpc,
    });
  }
}

new EkkoApp().synth();
