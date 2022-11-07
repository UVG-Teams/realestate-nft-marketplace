# https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-build#write-configuration
terraform {
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


# Configure the AWS Provider
provider "aws" {
    region  = "us-east-1"
}


# AWS Lightsail Instance
# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lightsail_instance

resource "aws_lightsail_instance" "example_test" {
    name                = "vesta-cd"
    availability_zone   = "us-east-1a"
    blueprint_id        = "ubuntu_20_04"
    bundle_id           = "nano_2_0"
    key_pair_name       = "lightsail-servers-test"
}
