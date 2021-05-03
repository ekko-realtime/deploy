const { expect, haveResource, SynthUtils } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const tap = require('tap');

const { EkkoStack, SharedResources } = require('../lib/deploy-stack');

import { Stack } from '@aws-cdk/core';

const EkkoCDK = require'../lib/deploy-stack';

tap.test('stack creates an alarm', () => {
  const stack = new Stack();
  new EkkoCDK.SharedResources(stack, 'shared-resources');
  tap.equal(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

// // tap.test('S3 bucket created', test => {
// //   const app = new cdk.App();
// //   const stack = new cdk.Stack(app);
// //   new SharedResources(stack, 'SharedResources', {});


// //   // assert.expect(stack).toHaveResource("AWS::S3::Bucket");


// // })


// tap.test("Test Stack", () => {
//   const app = new cdk.App();
//   const stack = new SharedResources(app, "test-shared-resources-stack");

//   expect(stack).to(
//     haveResource("AWS::S3::Bucket", {})
//   );
//   tap.done();
// });

// // // make sure our stack resources exist
// // expect(stack).to(haveResource('AWS::CertificateManager::Certificate', {
// //   DomainName: 'test.example.com',
// //   // Note: some properties omitted here

// //   ShouldNotExist: ABSENT
// // }));


// // // check the existence of outputs

// // expect(synthStack).to(haveOutput({
// //   outputName: 'TestOutputName',
// //   exportName: 'TestOutputExportName',
// //   outputValue: {
// //     'Fn::GetAtt': [
// //       'TestResource',
// //       'Arn'
// //     ]
// //   }
// // }));
