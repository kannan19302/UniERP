terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.30"
    }
  }

  backend "s3" {
    bucket         = "unierp-production-tfstate"
    key            = "foundation/production/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "unierp-production-tflocks"
  }
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Project     = "UniERP"
      Environment = var.environment
      ManagedBy   = "Terraform"
      Compliance  = "SOC2-HIPAA-PCI"
    }
  }
}

module "kms" {
  source      = "../../modules/kms"
  environment = var.environment
}

module "network" {
  source      = "../../modules/network"
  environment = var.environment
}

module "database" {
  source      = "../../modules/database"
  environment = var.environment
  vpc_id      = module.network.vpc_id
  subnet_ids  = module.network.database_subnet_ids
  kms_key_arn = module.kms.database_key_arn
}

module "cache" {
  source      = "../../modules/cache"
  environment = var.environment
  vpc_id      = module.network.vpc_id
  subnet_ids  = module.network.private_subnet_ids
}

module "storage" {
  source      = "../../modules/storage"
  environment = var.environment
  kms_key_arn = module.kms.storage_key_arn
}

module "compute" {
  source             = "../../modules/compute"
  environment        = var.environment
  vpc_id             = module.network.vpc_id
  private_subnet_ids = module.network.private_subnet_ids
}
