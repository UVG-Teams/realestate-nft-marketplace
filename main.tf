terraform {
    backend "remote" {
        # The name of your Terraform Cloud organization.
        organization = "uvg-teams"

        # The name of the Terraform Cloud workspace to store Terraform state files in.
        workspaces {
            name = "realestate-nft-marketplace"
        }
    }
}

# AWS Lightsail Instance
# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lightsail_instance

resource "aws_lightsail_instance" "example_test" {
    name                = "example_test_name"
    availability_zone   = "eu-west-2a"
    blueprint_id        = "ubuntu_20_04"
    bundle_id           = "nano_2_0"
    key_pair_name       = "lightsail-servers-test"
}
