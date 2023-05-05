
resource "commercetools_tax_category" "low-tax-category" {
  key         = "low"
  name        = "Low Category"
  description = "Low Category"
}

resource "commercetools_tax_category_rate" "low-tax" {
  tax_category_id   = commercetools_tax_category.low-tax-category.id
  name              = "GST"
  amount            = 0.2
  included_in_price = false
  country           = "US"
  state             = ""
}

resource "commercetools_tax_category_rate" "low-tax-texas" {
  tax_category_id   = commercetools_tax_category.low-tax-category.id
  name              = "GST"
  amount            = 0.2
  included_in_price = false
  country           = "US"
  state             = "Texas"
}

resource "commercetools_tax_category_rate" "low-tax-california" {
  tax_category_id   = commercetools_tax_category.low-tax-category.id
  name              = "GST"
  amount            = 0.2
  included_in_price = false
  country           = "US"
  state             = "California"
}

resource "commercetools_tax_category_rate" "low-tax-florida" {
  tax_category_id   = commercetools_tax_category.low-tax-category.id
  name              = "GST"
  amount            = 0.2
  included_in_price = false
  country           = "US"
  state             = "Florida"
}


resource "commercetools_tax_category" "standard-category" {
  key         = "standard"
  name        = "Standard Category"
  description = "Standard Category"
}

resource "commercetools_tax_category_rate" "standard" {
  tax_category_id   = commercetools_tax_category.standard-category.id
  name              = "GST"
  amount            = 0.2
  included_in_price = false
  country           = "US"
  state             = ""
}

resource "commercetools_tax_category_rate" "standard-texas" {
  tax_category_id   = commercetools_tax_category.standard-category.id
  name              = "GST"
  amount            = 0.2
  included_in_price = false
  country           = "US"
  state             = "Texas"
}

resource "commercetools_tax_category_rate" "standard-california" {
  tax_category_id   = commercetools_tax_category.standard-category.id
  name              = "GST"
  amount            = 0.2
  included_in_price = false
  country           = "US"
  state             = "California"
}

resource "commercetools_tax_category_rate" "standard-florida" {
  tax_category_id   = commercetools_tax_category.standard-category.id
  name              = "GST"
  amount            = 0.2
  included_in_price = false
  country           = "US"
  state             = "Florida"
}

resource "commercetools_tax_category" "no-tax-category" {
  key         = "no-tax"
  name        = "No Tax Category"
  description = "No Tax Category"
}

resource "commercetools_tax_category_rate" "no-tax" {
  tax_category_id   = commercetools_tax_category.no-tax-category.id
  name              = "GST"
  amount            = 0.2
  included_in_price = false
  country           = "US"
  state             = ""
}

resource "commercetools_tax_category_rate" "no-tax-texas" {
  tax_category_id   = commercetools_tax_category.no-tax-category.id
  name              = "GST"
  amount            = 0.2
  included_in_price = false
  country           = "US"
  state             = "Texas"
}

resource "commercetools_tax_category_rate" "no-tax-california" {
  tax_category_id   = commercetools_tax_category.no-tax-category.id
  name              = "GST"
  amount            = 0.2
  included_in_price = false
  country           = "US"
  state             = "California"
}

resource "commercetools_tax_category_rate" "no-tax-florida" {
  tax_category_id   = commercetools_tax_category.no-tax-category.id
  name              = "GST"
  amount            = 0.2
  included_in_price = false
  country           = "US"
  state             = "Florida"
}