# output for eks cluster
output "shared_resources_s3_bucket_name" {
  value = data.aws_s3_bucket.shared_resources_ekko.bucket
}
