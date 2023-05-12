resource "commercetools_type" "line-items-custom-type" {
  key = "line-items-custom-type"
  name = {
    en = "line-items-custom-types"
  }
  description = {
    en = "line-items custom"    
  }

  resource_type_ids = ["line-item"]
  
  field {
    name = "stripe_session_ids"
	  required = false
    label = {
      en = "Stripe Session ID"
    }
    type {
      name = "Set"
      element_type {
        name = "String"
      }
    }
  }


  field {
    name = "quantity_charged"
	  required = false
    label = {
      en = "Quantity Already Charged"
    }
    type {
      name = "Number"
    }
  }
}