resource "aws_elasticache_cluster" "sha_re_11moaiyqzemmh" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  auto_minor_version_upgrade = aws_vpc.shared_resources_ekkosharedvpc.enable_dns_hostnames
  availability_zone          = "eu-north-1a"
  az_mode                    = "single-az"
  cluster_id                 = "sha-re-11moaiyqzemmh"
  engine                     = "redis"
  engine_version             = "7.x"
  maintenance_window         = "sat:03:30-sat:04:30"
  node_type                  = "cache.t3.micro"
  num_cache_nodes            = 1
  parameter_group_name       = "default.redis7"
  port                       = 6379
  security_group_ids         = [aws_security_group.sg_0f4110ea36b08f242.id]
  snapshot_window            = "01:00-02:00"
  subnet_group_name          = "shared-resources-redisredissubnetgroup11af7b54-0bjd85c5swbk"
}

