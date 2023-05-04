resource "commercetools_subscription" "csa-order-subscription" {
  key = "csa-order-subscription"

  destination = {
    type          = "GoogleCloudPubSub"
    projectId     = "${var.gcp_project_id}"
    topic         = "${var.gcp_topic}"
    region        = "${var.gcp_region}"
   }

  message {
    resource_type_id = "order"
    types            = [ "OrderCreated","OrderStateChanged"]
  }
}