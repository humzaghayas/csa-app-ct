variable "gcp_project_id" {
  type        = string
  description = "The Google Cloud project identifier"
  default     = "commerce-tools-b2b-services"
}

variable "ct_project_key" {
  type        = string
  description = "The Commerce Tools projct key"
  default     = "tcs-test-project"
}

variable "gcp_topic" {
  type        = string
  description = "region for the gcp resources"
  default     = "us-east1"
}

variable "gcp_region" {
  type        = string
  description = "region for the gcp resources"
  default     = "us-east1"
}

variable "region_functions" {
  type        = string
  description = "region for firebase functions"
  default     = "australia"
}

variable "add_monthly_spent_topic" {
  type = string
}

variable "ct_countries" {
  type    = list(string)
  default = ["US"]
}

variable "client_id" {
  type        = string
  description = "The Commerce Tools client id"
}

variable "client_secret" {
  type        = string
  description = "The Commerce Tools secret key"
}

variable "scopes" {
  type        = string
  description = "The Commerce Tools client scope"
}

variable "token_url" {
  type        = string
  description = "The Commerce Tools client url"
}

variable "api_url" {
  type        = string
  description = "The Commerce Tools client auth url"
}