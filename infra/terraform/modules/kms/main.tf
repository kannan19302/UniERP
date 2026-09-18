variable "environment" {
  type        = string
  description = "Target deployment environment"
}

resource "aws_kms_key" "database" {
  description             = "KMS key for UniERP database storage encryption"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    Name        = "unierp-${var.environment}-kms-db"
    Environment = var.environment
  }
}

resource "aws_kms_key" "pii_envelope" {
  description             = "KMS Key Encryption Key (KEK) for application field-level PII encryption"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    Name        = "unierp-${var.environment}-kms-pii"
    Environment = var.environment
  }
}

resource "aws_kms_key" "storage" {
  description             = "KMS key for S3 document and backup storage encryption"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    Name        = "unierp-${var.environment}-kms-storage"
    Environment = var.environment
  }
}

output "database_key_arn" {
  value = aws_kms_key.database.arn
}

output "pii_envelope_key_arn" {
  value = aws_kms_key.pii_envelope.arn
}

output "storage_key_arn" {
  value = aws_kms_key.storage.arn
}
