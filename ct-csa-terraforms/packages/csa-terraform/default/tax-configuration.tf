
resource "commercetools_tax_category" "my-tax-category" {
  key         = "my-tax-category-key"
  name        = "Standard tax category"
  description = "Example category"
}

resource "commercetools_tax_category_rate" "no-tax" {
  tax_category_id   = commercetools_tax_category.my-tax-category.id
  name              = "GST"
  amount            = 0.05
  included_in_price = false
  country           = "CA"
  state             = "AB"
}