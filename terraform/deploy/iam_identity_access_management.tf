resource "aws_iam_role" "ekko_server_ekkoservicetaskdefinitionexecutionrole_ldj5x1reqaie" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  assume_role_policy = "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"ecs-tasks.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}"
  inline_policy {
    name   = "ekkoServiceTaskDefinitionExecutionRoleDefaultPolicyD1D16612"
    policy = "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"logs:CreateLogStream\",\"logs:PutLogEvents\"],\"Resource\":\"arn:aws:logs:eu-north-1:746690549776:log-group:ekko-server-ekkoServiceTaskDefinitionekkoServiceContainerLogGroup8EAB83C5-5ZCRReQ1Vjb7:*\",\"Effect\":\"Allow\"}]}"
  }

  max_session_duration = 3600
  name                 = "ekko-server-ekkoServiceTaskDefinitionExecutionRole-LDJ5X1REQAIE"
  path                 = "/"
}

resource "aws_iam_role" "ekko_server_ekkoservicetaskdefinitiontaskroleee32f_1relgzo9yar29" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  assume_role_policy = "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"ecs-tasks.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}"
  inline_policy {
  }

  managed_policy_arns  = ["arn:aws:iam::aws:policy/AWSLambda_FullAccess", "arn:aws:iam::aws:policy/AmazonS3FullAccess"]
  max_session_duration = 3600
  name                 = "ekko-server-ekkoServiceTaskDefinitionTaskRoleEE32F-1RELGZO9YAR29"
  path                 = "/"
}

resource "aws_iam_role" "ekko_server_lambdabasicexecution61fa4ad4_4sfg010hehba" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  assume_role_policy = "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}"
  inline_policy {
  }

  managed_policy_arns  = ["arn:aws:iam::aws:policy/AWSLambda_FullAccess"]
  max_session_duration = 3600
  name                 = "ekko-server-lambdabasicexecution61FA4AD4-4SFG010HEHBA"
  path                 = "/"
}

resource "aws_iam_role" "shared_resources_customs3autodeleteobjectscustomre_1od701gau16hh" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  assume_role_policy = "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}"
  inline_policy {
  }

  managed_policy_arns  = ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"]
  max_session_duration = 3600
  name                 = "shared-resources-CustomS3AutoDeleteObjectsCustomRe-1OD701GAU16HH"
  path                 = "/"
}

