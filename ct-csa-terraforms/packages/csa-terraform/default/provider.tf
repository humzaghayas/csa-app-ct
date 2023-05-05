terraform {
  required_providers {
    commercetools = {
      source = "labd/commercetools"
      version = "1.6.9"
    }
  }
}

provider "google" {
  project = "${var.gcp_project_id}"
  region  = "${var.gcp_region}"
}

provider "commercetools" {
  client_id     = "${var.client_id}"
  client_secret = "${var.client_secret}"
  project_key   = "${var.ct_project_key}"
  scopes        = "${var.scopes}"
  token_url     = "${var.token_url}"
  api_url       = "${var.api_url}"
}