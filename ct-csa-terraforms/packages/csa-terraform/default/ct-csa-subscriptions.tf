resource "commercetools_subscription" "csa-order-subscription" {
  key = "csa-order-subscription"

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