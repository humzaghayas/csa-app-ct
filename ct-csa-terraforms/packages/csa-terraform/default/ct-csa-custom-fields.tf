resource "commercetools_type" "paymentFields" {
    key =   "paymentFields"
    name =   {
        en =   "Payment Fields"
    }
    description = {
        en = "Payment url field and Payment PSP Status Field to save the url of payment link of PSP."
    }
    
    resource_type_ids  =   ["payment"]

    field {
            name  =   "paymentLink"
            label  =   {
                en  =   "PaymentLink"
            }
            required  =   false
            type   {
                name  =   "String"
            }
            input_hint  =   "SingleLine"
        }

    field {
            name  =   "pspPaymentStatus"
            label  =   {
                en  =   "PspPaymentStatus"
            }
            required  =   false
            type   {
                name  =   "String"
            }
            input_hint  =   "SingleLine"
        }
}

resource "commercetools_type" "promotionsList" {
    key  =   "promotionsList"

    name  =   {
        en  =   "Promotions List"
    }    
    
    description  =   {
      en  =   "List of promotions (eg. vouchers, gift cards) assigned to cusotmer."
    }

    resource_type_ids  =   [ "customer" ]
    
    field  {
          name  =   "promotions"
          label  =   {
              en  =   "Promotions"
          }
          type  {
              name  =  "Set"
              element_type {
                  name  =  "Reference"
                  reference_type_id  =  "cart-discount"
              }
          }
          required  =  false
          input_hint  =   "SingleLine"
      }
}

resource "commercetools_type" "profileFields" {
    key  =   "profileFields"
    name  =   {
        en  =   "Profile custom fields"
    }
    description  =   {
        en  =   "List of customer custom profile fields"
    }
    resource_type_ids  =   [
        "customer"
    ]
    field {
            name  =   "occupation"
            label  =   {
                en  =   "Occupation"
            }
            required  =   false
            type   {
                name  =   "String"
            }
            input_hint  =   "SingleLine"
        }

    field {
            name  =   "preferredLanguage"
            label  =   {
                en  =   "Preferred Language"
            }
            required  =   false
            type   {
                name  =   "String"
            }
            input_hint  =   "SingleLine"
        }
    field {
            name  =   "ageGroup"
            label  =   {
                en  =   "Age Group"
            }
            required  =   false
            type   {
                name  =   "String"
            }
            input_hint  =   "SingleLine"
        }
    field {
            name  =   "gender"
            label  =   {
                en  =   "Gender"
            }
            required  =   false
            type   {
                name  =   "String"
            }
            input_hint  =   "SingleLine"
        }
    field {
            name  =   "preferredCurrency"
            label  =   {
                en  =   "Preferred Currency"
            }
            required  =   false
            type   {
                name  =   "String"
            }
            input_hint  =   "SingleLine"
        }
    field {
          name  =   "promotions"
          label  =   {
              en   =   "Promotions"
          }
          type  {
              name = "Set"
              element_type {
                  name = "Reference"
                  reference_type_id = "cart-discount"
              }
          }
          required = false
          input_hint =  "SingleLine"
      }
}