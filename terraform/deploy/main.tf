terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.2.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "eu-north-1"
  default_tags {
    tags = {
      service = "ekko"
    }
  }
}


# SHARED RESOURCES

resource "aws_s3_bucket" "shared_resources_ekko" {

  bucket = "shared_resources_ekko"
}


# EKKO STACK

