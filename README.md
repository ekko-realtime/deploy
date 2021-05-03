# Ekko Infrastructure Deployment

This repository contains files that are used to deploy ekko's server infrastructure to AWS. What follows is an explanation for how to interact with the CDK deployment code contained within this repository, though we recommend you use the [Ekko CLI tool](https://github.com/ekko-live/cli) as the primary means of deploying infrastructure.

WARNING: the [Ekko CLI tool](https://github.com/ekko-live/cli) is the best way to work with deploying and setting up your ekko infrastructure. (The 'deploy' repository is used implicitly by the Ekko CLI, and the recommended way of deploying your server infrastructure is through the `ekko init` command).

## Prerequisites

- [an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html?nc2=h_ct&src=default&tag=soumet-20)
- `npm` is [installed](https://www.npmjs.com/get-npm)
- the AWS CLI is [installed](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html?tag=soumet-20) and configured
- the AWS CDK command-line tool is [installed](https://docs.aws.amazon.com/cdk/latest/guide/cli.html?tag=soumet-20)

## How to Deploy Ekko Infrastructure

- clone this repository to your local machine using `git clone`
- `cd` into the folder and run `npm install` to install all dependencies
- run `cdk bootstrap` — this will initialise some AWS infrastructure to allow you to deploy using `cdk`. (If you have already run this command for the AWS region you're deploying to, it will return an error that you can safely ignore.)
- run `cdk deploy "*" --outputs-file cdk-outputs.json` to deploy all the ekko server infrastructure on AWS.
	- the `aws-cdk` CLI tool will confirm that you want to deploy infrastructure, and it will do so for each of the two stacks this code deploys
	- all relevant variables and endpoints will be printed to the terminal at the end of deployment, and those variables are also stored in a `cdk-outputs.json` file that was generated during the deployment process.

## Useful Commands

- `cdk synth "*"`

This command prepares the CloudFormation template files and writes them to a `cdk.out` folder inside the root directory of the deploy repository. Use this command if you want to see the full details of the infrastructure being deployed. You can even amend these CloudFormation templates if you wish.

- `cdk diff "*"`

This command outputs a report showing the differences between the infrastructure currently deployed on AWS to whatever is represented by the CDK code in the repository. Use this command when you are changing things in the CDK code and you want to see what is different in terms of deployed infrastructure constructs.

- `cdk deploy ekko-server`

This command deploys only the `ekko-server` stack.

- `cdk deploy shared-resources`

This command deploys only the `shared-resources` stack.

- `cdk destroy "*"`

This command deletes all infrastructure from AWS for both stacks, tearing down anything that was deployed during the `cdk deploy` process.

- `cdk deploy "*" --require-approval never`

This command deploys both stacks *without* asking you for confirmation as to whether you actually want to deploy it. Use this command if you want to run the deployment process and not have to keep checking back for any messages / confirmation prompts.

- `npm run test`

This command performs and runs unit tests for the repository.
