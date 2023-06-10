resource "aws_lambda_function" "shared_resources_customs3autodeleteobjectscustomre_t99ivmzy1pkf" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  architectures = ["x86_64"]
  description   = "Lambda function for auto-deleting objects in shared-resources-ekkobucket331a3a61-dexqbg3bet5j S3 bucket."
  ephemeral_storage {
    size = 512
  }

  function_name                  = "shared-resources-CustomS3AutoDeleteObjectsCustomRe-T99ivMzy1PKf"
  handler                        = "__entrypoint__.handler"
  memory_size                    = 128
  package_type                   = "Zip"
  reserved_concurrent_executions = -1
  role                           = aws_iam_role.shared_resources_customs3autodeleteobjectscustomre_1od701gau16hh.arn
  runtime                        = "nodejs14.x"
  source_code_hash               = "6Nwpw89YlhHQnlxR+8libqb1UVPUBWEeY0f+4JAk0aU="
  timeout                        = 900
  tracing_config {
    mode = "PassThrough"
  }

}

