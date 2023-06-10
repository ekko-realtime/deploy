resource "aws_internet_gateway" "shared_resources_ekkosharedvpc" {
  tags = {
    Name    = "shared-resources/EkkoSharedVpc"
    service = "ekko"
  }

  tags_all = {
    Name    = "shared-resources/EkkoSharedVpc"
    service = "ekko"
  }

  vpc_id = "vpc-0b46e506dfa582c2d"
}

resource "aws_nat_gateway" "shared_resources_ekkosharedvpc_publicsubnet1" {
  tags = {
    Name    = "shared-resources/EkkoSharedVpc/PublicSubnet1"
    service = "ekko"
  }

  tags_all = {
    Name    = "shared-resources/EkkoSharedVpc/PublicSubnet1"
    service = "ekko"
  }

  allocation_id     = "eipalloc-0af09f322925cec6d"
  connectivity_type = "public"
  subnet_id         = "subnet-0e45388e9397e29c3"
}

resource "aws_route_table" "shared_resources_ekkosharedvpc_privatesubnet1" {
  tags = {
    Name    = "shared-resources/EkkoSharedVpc/PrivateSubnet1"
    service = "ekko"
  }

  tags_all = {
    Name    = "shared-resources/EkkoSharedVpc/PrivateSubnet1"
    service = "ekko"
  }

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.shared_resources_ekkosharedvpc_publicsubnet1.id
  }

  vpc_id = aws_vpc.shared_resources_ekkosharedvpc.id
}

resource "aws_route_table" "shared_resources_ekkosharedvpc_privatesubnet2" {
  tags = {
    Name    = "shared-resources/EkkoSharedVpc/PrivateSubnet2"
    service = "ekko"
  }

  tags_all = {
    Name    = "shared-resources/EkkoSharedVpc/PrivateSubnet2"
    service = "ekko"
  }

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.shared_resources_ekkosharedvpc_publicsubnet1.id
  }

  vpc_id = aws_vpc.shared_resources_ekkosharedvpc.id
}

resource "aws_route_table" "shared_resources_ekkosharedvpc_publicsubnet1" {
  tags = {
    Name    = "shared-resources/EkkoSharedVpc/PublicSubnet1"
    service = "ekko"
  }

  tags_all = {
    Name    = "shared-resources/EkkoSharedVpc/PublicSubnet1"
    service = "ekko"
  }

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.shared_resources_ekkosharedvpc.id
  }

  vpc_id = aws_vpc.shared_resources_ekkosharedvpc.id
}

resource "aws_route_table" "shared_resources_ekkosharedvpc_publicsubnet2" {
  tags = {
    Name    = "shared-resources/EkkoSharedVpc/PublicSubnet2"
    service = "ekko"
  }

  tags_all = {
    Name    = "shared-resources/EkkoSharedVpc/PublicSubnet2"
    service = "ekko"
  }

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.shared_resources_ekkosharedvpc.id
  }

  vpc_id = aws_vpc.shared_resources_ekkosharedvpc.id
}

resource "aws_security_group" "sg_01571e98a600a79c3" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  description = "Automatically created Security Group for ELB ekkoserverLB15E79C18"
  egress {
    description     = "Load balancer to target"
    from_port       = 80
    protocol        = "tcp"
    security_groups = ["sg-0458286e5ac70e244"]
    to_port         = 80
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow from anyone on port 80"
    from_port   = 80
    protocol    = "tcp"
    to_port     = 80
  }

  name   = "ekko-server-ekkoserverLBSecurityGroupD8A41D86-1NNIIZZB6HUB2"
  vpc_id = aws_vpc.shared_resources_ekkosharedvpc.id
}

resource "aws_security_group" "sg_0458286e5ac70e244" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  description = "ekko-server/ekko-server/Service/SecurityGroup"
  egress {
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic by default"
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
  }

  ingress {
    description     = "Load balancer to target"
    from_port       = 80
    protocol        = "tcp"
    security_groups = ["sg-01571e98a600a79c3"]
    to_port         = 80
  }

  name   = "ekko-server-ekkoserverServiceSecurityGroup96FFD2ED-1L8G92CLCQGRF"
  vpc_id = aws_vpc.shared_resources_ekkosharedvpc.id
}

resource "aws_security_group" "sg_0f4110ea36b08f242" {
  tags = {
    service = "ekko"
  }

  tags_all = {
    service = "ekko"
  }

  description = "shared-resources/redis/redis-security-group"
  egress {
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic by default"
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
  }

  ingress {
    description     = "from ekkoserverServiceSecurityGroup0A42D4E9:undefined"
    from_port       = 6379
    protocol        = "tcp"
    security_groups = ["sg-0458286e5ac70e244"]
    to_port         = 6379
  }

  name   = "shared-resources-redisredissecuritygroup2BFE4C6A-1M6ZOYHH6I9U3"
  vpc_id = aws_vpc.shared_resources_ekkosharedvpc.id
}

resource "aws_subnet" "shared_resources_ekkosharedvpc_privatesubnet1" {
  tags = {
    Name                  = "shared-resources/EkkoSharedVpc/PrivateSubnet1"
    "aws-cdk:subnet-name" = "Private"
    "aws-cdk:subnet-type" = "Private"
    service               = "ekko"
  }

  tags_all = {
    Name                  = "shared-resources/EkkoSharedVpc/PrivateSubnet1"
    "aws-cdk:subnet-name" = "Private"
    "aws-cdk:subnet-type" = "Private"
    service               = "ekko"
  }

  availability_zone                   = "eu-north-1a"
  cidr_block                          = "10.0.128.0/18"
  private_dns_hostname_type_on_launch = "ip-name"
  vpc_id                              = aws_vpc.shared_resources_ekkosharedvpc.id
}

resource "aws_subnet" "shared_resources_ekkosharedvpc_privatesubnet2" {
  tags = {
    Name                  = "shared-resources/EkkoSharedVpc/PrivateSubnet2"
    "aws-cdk:subnet-name" = "Private"
    "aws-cdk:subnet-type" = "Private"
    service               = "ekko"
  }

  tags_all = {
    Name                  = "shared-resources/EkkoSharedVpc/PrivateSubnet2"
    "aws-cdk:subnet-name" = "Private"
    "aws-cdk:subnet-type" = "Private"
    service               = "ekko"
  }

  availability_zone                   = "eu-north-1b"
  cidr_block                          = "10.0.192.0/18"
  private_dns_hostname_type_on_launch = "ip-name"
  vpc_id                              = aws_vpc.shared_resources_ekkosharedvpc.id
}

resource "aws_subnet" "shared_resources_ekkosharedvpc_publicsubnet1" {
  tags = {
    Name                  = "shared-resources/EkkoSharedVpc/PublicSubnet1"
    "aws-cdk:subnet-name" = "Public"
    "aws-cdk:subnet-type" = "Public"
    service               = "ekko"
  }

  tags_all = {
    Name                  = "shared-resources/EkkoSharedVpc/PublicSubnet1"
    "aws-cdk:subnet-name" = "Public"
    "aws-cdk:subnet-type" = "Public"
    service               = "ekko"
  }

  availability_zone                   = "eu-north-1a"
  cidr_block                          = "10.0.0.0/18"
  map_public_ip_on_launch             = true
  private_dns_hostname_type_on_launch = "ip-name"
  vpc_id                              = aws_vpc.shared_resources_ekkosharedvpc.id
}

resource "aws_subnet" "shared_resources_ekkosharedvpc_publicsubnet2" {
  tags = {
    Name                  = "shared-resources/EkkoSharedVpc/PublicSubnet2"
    "aws-cdk:subnet-name" = "Public"
    "aws-cdk:subnet-type" = "Public"
    service               = "ekko"
  }

  tags_all = {
    Name                  = "shared-resources/EkkoSharedVpc/PublicSubnet2"
    "aws-cdk:subnet-name" = "Public"
    "aws-cdk:subnet-type" = "Public"
    service               = "ekko"
  }

  availability_zone                   = "eu-north-1b"
  cidr_block                          = "10.0.64.0/18"
  map_public_ip_on_launch             = true
  private_dns_hostname_type_on_launch = "ip-name"
  vpc_id                              = aws_vpc.shared_resources_ekkosharedvpc.id
}

resource "aws_vpc" "shared_resources_ekkosharedvpc" {
  tags = {
    Name    = "shared-resources/EkkoSharedVpc"
    service = "ekko"
  }

  tags_all = {
    Name    = "shared-resources/EkkoSharedVpc"
    service = "ekko"
  }

  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  instance_tenancy     = "default"
}

