resource "aws_s3_bucket" "shared_resources_ekkobucket331a3a61_dexqbg3bet5j" {
  tags = {
    "aws-cdk:auto-delete-objects" = "true"
    service                       = "ekko"
  }

  tags_all = {
    "aws-cdk:auto-delete-objects" = aws_vpc.shared_resources_ekkosharedvpc.enable_dns_hostnames
    service                       = "ekko"
  }

  arn            = "arn:aws:s3:::shared-resources-ekkobucket331a3a61-dexqbg3bet5j"
  bucket         = "shared-resources-ekkobucket331a3a61-dexqbg3bet5j"
  hosted_zone_id = "Z3BAZG2TWCNX0D"
}

