resource "aws_ecs_cluster" "shared_resources_ekkosharedcluster4120c207_48twmhcfmggy" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  name = "shared-resources-EkkoSharedCluster4120C207-48twmHcfmggy"
  setting {
    name  = "containerInsights"
    value = "disabled"
  }

}

resource "aws_ecs_service" "shared_resources_ekkosharedcluster4120c207_48twmhcfmggy_ekkoserver" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  cluster = aws_ecs_cluster.shared_resources_ekkosharedcluster4120c207_48twmhcfmggy.arn
  deployment_circuit_breaker {
    enable   = false
    rollback = false
  }

  deployment_controller {
    type = "ECS"
  }

  deployment_maximum_percent         = 200
  deployment_minimum_healthy_percent = 50
  desired_count                      = 1
  health_check_grace_period_seconds  = 60
  iam_role                           = "aws-service-role"
  launch_type                        = "FARGATE"
  load_balancer {
    container_name   = "ekkoServiceContainer"
    container_port   = 80
    target_group_arn = aws_alb_target_group.arn_aws_elasticloadbalancing_eu_north_1_746690549776_targetgroup_ekko_s_ekkos_s7njknjrvurv_7aab81bf49e7fd51.arn
  }

  name = "ekkoServer"
  network_configuration {
    security_groups = [aws_security_group.sg_0458286e5ac70e244.id]
    subnets         = [aws_subnet.shared_resources_ekkosharedvpc_privatesubnet1.id, aws_subnet.shared_resources_ekkosharedvpc_privatesubnet2.id]
  }

  platform_version    = "LATEST"
  propagate_tags      = "NONE"
  scheduling_strategy = "REPLICA"
  task_definition     = "ekkoserverekkoServiceTaskDefinition1784AEED:1"
}

resource "aws_ecs_task_definition" "arn_aws_ecs_eu_north_1_746690549776_task_definition_ekkoserverekkoservicetaskdefinition1784aeed_1" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  container_definitions    = "[{\"command\":[],\"cpu\":0,\"dnsSearchDomains\":[],\"dnsServers\":[],\"dockerLabels\":{},\"dockerSecurityOptions\":[],\"entryPoint\":[],\"environment\":[{\"name\":\"PORT\",\"value\":\"80\"},{\"name\":\"REDIS_ENDPOINT\",\"value\":\"sha-re-11moaiyqzemmh.2xivwj.0001.eun1.cache.amazonaws.com\"},{\"name\":\"REDIS_PORT\",\"value\":\"6379\"},{\"name\":\"S3_BUCKET\",\"value\":\"shared-resources-ekkobucket331a3a61-dexqbg3bet5j\"},{\"name\":\"SECRET_KEY\",\"value\":\"e73214269f48a8fb84f8a0dd730fe0ca149c8090526f85e8ce7c76624ce36a56\"}],\"environmentFiles\":[],\"essential\":true,\"extraHosts\":[],\"image\":\"public.ecr.aws/u0n8j4n8/ekko:latest\",\"links\":[],\"logConfiguration\":{\"logDriver\":\"awslogs\",\"options\":{\"awslogs-group\":\"ekko-server-ekkoServiceTaskDefinitionekkoServiceContainerLogGroup8EAB83C5-5ZCRReQ1Vjb7\",\"awslogs-region\":\"eu-north-1\",\"awslogs-stream-prefix\":\"ekko-server\"},\"secretOptions\":[]},\"mountPoints\":[],\"name\":\"ekkoServiceContainer\",\"portMappings\":[{\"containerPort\":80,\"hostPort\":80,\"protocol\":\"tcp\"}],\"secrets\":[],\"systemControls\":[],\"ulimits\":[{\"hardLimit\":65500,\"name\":\"nofile\",\"softLimit\":50000}],\"volumesFrom\":[]}]"
  cpu                      = "1024"
  execution_role_arn       = aws_iam_role.ekko_server_ekkoservicetaskdefinitionexecutionrole_ldj5x1reqaie.arn
  family                   = "ekkoserverekkoServiceTaskDefinition1784AEED"
  memory                   = "2048"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  task_role_arn            = aws_iam_role.ekko_server_ekkoservicetaskdefinitiontaskroleee32f_1relgzo9yar29.arn
}

