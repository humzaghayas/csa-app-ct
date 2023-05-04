terraform {
  required_providers {
    commercetools = {
      source = "labd/commercetools"
      version = "1.6.9"
    }
  }
}

provider "google" {
  project = "commerce-tools-b2b-services"
  region  = "us-central1"
}

provider "commercetools" {
  client_id     = "xnoi2rD_OY2_Lin4SWv-FEW_"
  client_secret = "pvMXVvg7n9Zw39nEt6XUAVQQGxe5SUQd"
  project_key   = "csa-project-3"
  scopes        = "manage_project:csa-project-3"
  token_url     = "https://auth.us-central1.gcp.commercetools.com"
  api_url       = "https://api.us-central1.gcp.commercetools.com"
}