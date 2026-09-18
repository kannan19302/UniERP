output "vpc_id" {
  value       = module.network.vpc_id
  description = "The VPC ID"
}

output "database_endpoint" {
  value       = module.database.endpoint
  description = "Aurora PostgreSQL primary cluster endpoint"
}

output "redis_endpoint" {
  value       = module.cache.primary_endpoint_address
  description = "Redis replication group primary endpoint"
}

output "storage_bucket" {
  value       = module.storage.documents_bucket_id
  description = "Encrypted documents S3 bucket name"
}

output "ecs_cluster_name" {
  value       = module.compute.cluster_name
  description = "Production ECS cluster name"
}
