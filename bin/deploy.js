#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { SharedResources } = require('../lib/deploy-stack');

// A construct which represents the entire CDK app
class EkkoApp extends cdk.App {
  constructor() {
    super();
    const sharedResources = new SharedResources(this, "shared-resources");
  }
}

new EkkoApp().synth();
