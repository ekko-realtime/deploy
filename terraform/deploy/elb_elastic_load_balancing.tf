resource "aws_alb" "arn_aws_elasticloadbalancing_eu_north_1_746690549776_loadbalancer_app_ekko_ekkos_k40fqb6cs3yf_994e8a2228693472" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  access_logs {
    bucket = ""
  }

  desync_mitigation_mode           = "defensive"
  enable_cross_zone_load_balancing = true
  enable_http2                     = true
  idle_timeout                     = 75
  ip_address_type                  = "ipv4"
  load_balancer_type               = "application"
  name                             = "ekko-ekkos-K40FQB6CS3YF"
  security_groups                  = [aws_security_group.sg_01571e98a600a79c3.id]
  subnet_mapping {
    subnet_id = aws_subnet.shared_resources_ekkosharedvpc_publicsubnet2.id
  }

  subnet_mapping {
    subnet_id = aws_subnet.shared_resources_ekkosharedvpc_publicsubnet1.id
  }

  subnets = ["subnet-0e45388e9397e29c3", "subnet-02a94b7b196aa551f"]
}

resource "aws_alb_target_group" "arn_aws_elasticloadbalancing_eu_north_1_746690549776_targetgroup_ekko_s_ekkos_s7njknjrvurv_7aab81bf49e7fd51" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  deregistration_delay = "300"
  health_check {
    enabled             = true
    healthy_threshold   = 5
    interval            = 30
    matcher             = "200"
    path                = "/"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  load_balancing_algorithm_type = "round_robin"
  name                          = "ekko-s-ekkos-S7NJKNJRVURV"
  port                          = 80
  protocol                      = "HTTP"
  protocol_version              = "HTTP1"
  stickiness {
    cookie_duration = 259200
    enabled         = true
    type            = "lb_cookie"
  }

  target_type = "ip"
  vpc_id      = aws_vpc.shared_resources_ekkosharedvpc.id
}

