
resource "commercetools_subscription" "subscribe" {
  key = "my-subscription"

  destination {
    type        = "GoogleCloudPubSub"
    project_id  = "commerce-tools-b2b-services"
    topic       = "csa-order-topic"
  }

  message {
    resource_type_id = "order"
    types            = ["OrderCreated"]
  }
}