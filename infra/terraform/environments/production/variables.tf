variable "region" {
  type        = string
  default     = "us-east-1"
  description = "Primary AWS region"
}

variable "environment" {
  type        = string
  default     = "production"
  description = "Environment identifier"
}
