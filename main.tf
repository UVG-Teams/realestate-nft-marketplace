# https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-build#write-configuration
terraform {
  # https://app.terraform.io/app/uvg-teams/workspaces/realestate-nft-marketplace/runs
  backend "remote" {
    # The name of your Terraform Cloud organization.
    organization = "uvg-teams"

    # The name of the Terraform Cloud workspace to store Terraform state files in.
    workspaces {
      name = "realestate-nft-marketplace"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

variable "db_password" {}


# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}

# AWS Lightsail Static IP
# resource "aws_lightsail_static_ip" "vesta-cd-ip" {
#   name = "vesta-cd-ip"
# }


# AWS Lightsail Database
# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lightsail_database
resource "aws_lightsail_database" "vesta_db_cd" {
  relational_database_name = "vesta-db-cd"
  availability_zone        = "us-east-1a"
  master_database_name     = "database_cd"
  master_username          = "database_cd_admin"
  master_password          = var.db_password
  blueprint_id             = "postgres_12"
  bundle_id                = "micro_1_0"
  apply_immediately        = true
}


# AWS Lightsail Instance
# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lightsail_instance

resource "aws_lightsail_instance" "vesta_cd" {
  name              = "vesta-cd"
  availability_zone = "us-east-1a"
  blueprint_id      = "ubuntu_20_04"
  bundle_id         = "small_2_0"
  key_pair_name     = "lightsail-servers-test"
}

resource "aws_lightsail_instance_public_ports" "instance_ports" {
  instance_name = aws_lightsail_instance.vesta_cd.name

  port_info {
    protocol  = "tcp"
    from_port = 22
    to_port   = 22
  }

  port_info {
    protocol  = "tcp"
    from_port = 80
    to_port   = 80
  }

  port_info {
    protocol  = "tcp"
    from_port = 443
    to_port   = 443
  }

  port_info {
    protocol  = "tcp"
    from_port = 3000
    to_port   = 3000
  }
}
