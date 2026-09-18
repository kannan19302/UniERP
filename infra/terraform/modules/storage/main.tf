variable "environment" {
  type = string
}

variable "kms_key_arn" {
  type = string
}

resource "aws_s3_bucket" "documents" {
  bucket = "unierp-${var.environment}-documents-storage"

  tags = {
    Name        = "unierp-${var.environment}-documents"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_versioning" "documents" {
  bucket = aws_s3_bucket.documents.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "documents" {
  bucket = aws_s3_bucket.documents.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = var.kms_key_arn
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "documents" {
  bucket = aws_s3_bucket.documents.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

output "documents_bucket_arn" {
  value = aws_s3_bucket.documents.arn
}

output "documents_bucket_id" {
  value = aws_s3_bucket.documents.id
}
