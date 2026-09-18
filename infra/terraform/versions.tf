terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.30"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }

  backend "s3" {
    bucket         = "unierp-production-tfstate"
    key            = "foundation/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "unierp-production-tflocks"
  }
}
