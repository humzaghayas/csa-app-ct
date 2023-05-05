
resource "commercetools_subscription" "subscribe" {
  key = "my-subscription"

  destination {
    type          = "GoogleCloudPubSub"
    project_id     = "${var.gcp_project_id}"
    topic         = "${var.gcp_topic}"
   }

  message {
    resource_type_id = "order"
    types            = ["OrderCreated","OrderStateChanged"]
  }
}