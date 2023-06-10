resource "aws_eip" "shared_resources_ekkosharedvpc_publicsubnet1" {
  tags = {
    Name    = "shared-resources/EkkoSharedVpc/PublicSubnet1"
    service = "ekko"
  }

  tags_all = {
    Name    = "shared-resources/EkkoSharedVpc/PublicSubnet1"
    service = "ekko"
  }

  network_border_group = aws_s3_bucket.shared_resources_ekkobucket331a3a61_dexqbg3bet5j.region
  network_interface    = "eni-0f6e9c1fe914b95c0"
  public_ipv4_pool     = "amazon"
  vpc                  = true
}

