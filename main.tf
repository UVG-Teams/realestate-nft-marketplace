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

# An example resource that does nothing.
resource "null_resource" "example" {
    triggers = {
        value = "A example resource that does nothing!"
    }
}
