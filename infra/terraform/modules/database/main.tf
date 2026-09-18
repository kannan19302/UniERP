variable "environment" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

variable "kms_key_arn" {
  type = string
}

variable "instance_class" {
  type    = string
  default = "db.r6g.xlarge"
}

resource "aws_db_subnet_group" "main" {
  name       = "unierp-${var.environment}-db-subnet-group"
  subnet_ids = var.subnet_ids

  tags = {
    Name        = "unierp-${var.environment}-db-subnet-group"
    Environment = var.environment
  }
}

resource "aws_security_group" "rds" {
  name        = "unierp-${var.environment}-rds-sg"
  description = "Allow inbound PostgreSQL from compute tier"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
    description = "PostgreSQL access from VPC internal CIDR"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "unierp-${var.environment}-rds-sg"
    Environment = var.environment
  }
}

resource "aws_rds_cluster" "postgresql" {
  cluster_identifier      = "unierp-${var.environment}-pg-cluster"
  engine                  = "aurora-postgresql"
  engine_version          = "16.1"
  database_name           = "unierp"
  master_username         = "unierp_admin"
  manage_master_user_password = true
  master_user_secret_kms_key_id = var.kms_key_arn

  db_subnet_group_name    = aws_db_subnet_group.main.name
  vpc_security_group_ids  = [aws_security_group.rds.id]

  storage_encrypted       = true
  kms_key_id              = var.kms_key_arn

  backup_retention_period = 30
  preferred_backup_window = "02:00-03:00"
  copy_tags_to_snapshot   = true
  deletion_protection     = true

  enabled_cloudwatch_logs_exports = ["postgresql"]

  tags = {
    Name        = "unierp-${var.environment}-aurora-pg"
    Environment = var.environment
  }
}

resource "aws_rds_cluster_instance" "instances" {
  count              = 2
  identifier         = "unierp-${var.environment}-pg-instance-${count.index}"
  cluster_identifier = aws_rds_cluster.postgresql.id
  instance_class     = var.instance_class
  engine             = aws_rds_cluster.postgresql.engine
  engine_version     = aws_rds_cluster.postgresql.engine_version

  tags = {
    Name        = "unierp-${var.environment}-pg-instance-${count.index}"
    Environment = var.environment
  }
}

output "endpoint" {
  value = aws_rds_cluster.postgresql.endpoint
}

output "reader_endpoint" {
  value = aws_rds_cluster.postgresql.reader_endpoint
}
