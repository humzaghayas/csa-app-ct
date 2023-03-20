"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FETCH_ORDER_COUNT = exports.FETCH_ACTIVE_CART_COUNT = exports.UPDATE_CART_BY_ID = exports.CREATE_ORDER_FROMCART = exports.CREATE_SHIPPING_BILLING_ADDRESS = exports.FETCH_CART_BY_CARTNUMBER = exports.FETCH_CARTS = void 0;
exports.FETCH_CARTS = "query FetchAllCarts($where:String,$limit: Int!, $offset: Int!, $sort: [String!]) {\n    carts(where:$where,limit: $limit, offset: $offset, sort: $sort) {\n        total\n        count\n        offset\n        results {\n            id\n            cartState\n            key\n\n            customer {\n                firstName\n                lastName\n            }\n            custom {\n                type {\n                    id\n                    key\n                }\n                customFieldsRaw{\n                value\n              }\n                \n            }\n            customerEmail\n            createdAt\n            createdBy {\n                customerRef {\n                    typeId\n                    id\n                }\n            }\n            lastModifiedAt\n            shippingInfo {\n                shippingMethodName\n                shippingMethodState\n            }\n            lineItems {\n                quantity\n            }\n            totalPrice {\n                type\n                centAmount\n                currencyCode\n                fractionDigits\n            }\n            \n        }\n    }\n}\n";
exports.FETCH_CART_BY_CARTNUMBER = "query($id:String!){\n    cart(id:$id){\n        id\n        version\n        key\n        createdAt\n        lastModifiedAt\n          createdBy{\n          customerRef{\n            typeId\n            id\n          }\n        }\n        customerId\n        customerEmail\n        country\n        cartState\n        origin\n        ...lineItems\n        ...shippingAddress\n        ...shippingInfo\n        ...billingAddress\n        ...taxedPrice\n        ...custom\n        customLineItems{\n            __typename\n        }\n        discountCodes{\n            __typename\n        }\n        directDiscounts{\n            __typename\n        }\n    }\n  }\n  \n  fragment taxedPrice on Cart{\n        taxedPrice{\n           totalNet{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n           }\n           totalGross{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n           }\n           totalTax{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n           }\n           taxPortions{\n               rate\n               amount{\n                    type\n                    currencyCode\n                    centAmount\n                    fractionDigits\n               }\n               name\n           }\n        }            \n    }\n \n  \n  fragment lineItems on Cart{\n    lineItems{\n        id\n        productId\n        productKey\n        name(locale:\"en-US\")\n        ...productType\n        ...variant\n        ...price\n        quantity\n        discountedPricePerQuantity{\n            __typename\n        }\n        ...taxRate\n        lastModifiedAt\n        ...state\n        priceMode\n        lineItemMode\n        ...totalPriceLineItem\n        ...taxedPriceLineItem\n    }\n  }\n  \n  fragment state on LineItem{\n    state{\n        quantity\n        state{\n            id\n              name(locale:\"en-US\")\n              description(locale:\"en-US\")\n              initial\n        }        \n    }\n  }\n  fragment productType on LineItem{\n    productType{\n            id\n            name\n        }\n  }\n  fragment variant on LineItem{\n    variant{\n        \n        sku\n        key\n        prices{\n            id\n            value{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            country\n        }\n        images{\n            url\n        }\n        attributesRaw{\n            name\n            value\n        }\n        assets{\n            __typename\n        }\n    }\n  }\n  fragment price on LineItem{\n    price{\n        id\n            value{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            country\n    }\n  }\n  fragment taxRate on LineItem{\n    taxRate{\n        name\n        amount\n        includedInPrice\n        country\n        id\n        subRates{\n            __typename\n        }\n    }\n  }\n  fragment totalPriceLineItem on LineItem{\n    totalPrice{\n            type\n            currencyCode\n            centAmount\n            fractionDigits\n        }\n  }\n  fragment taxedPriceLineItem on LineItem{\n    taxedPrice{\n           totalNet{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n           }\n           totalGross{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n           }\n           totalTax{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n           }\n        } \n  }\n   fragment shippingInfo on Cart{\n    shippingInfo{\n        shippingMethodName\n        shippingMethodState\n        price{\n            type\n            currencyCode\n            centAmount\n            fractionDigits\n        }\n        shippingRate{\n            price{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            freeAbove{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            tiers{\n                type\n                __typename\n            }\n        }\n        taxRate{\n            name\n            amount\n            country\n            includedInPrice\n            id\n            subRates{\n                __typename\n            }\n        }\n        taxCategory{\n            id\n            name\n        }\n        shippingMethod{\n            id\n            name\n        }\n        taxedPrice{\n            totalNet{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            totalGross{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            totalTax{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n        }\n    }\n  }\n  \n  fragment shippingAddress on Cart{\n    shippingAddress{\n      id\n      streetName\n      streetNumber\n      salutation\n      additionalStreetInfo\n      additionalAddressInfo\n      city\n      region\n      state\n      country\n      company\n      department\n      building\n      apartment\n      pOBox\n      phone\n      mobile\n      email\n      firstName\n      lastName\n      postalCode\n      apartment\n    }\n  }\n  fragment billingAddress on Cart{\n    billingAddress{\n        id\n        streetName\n        streetNumber\n        postalCode\n          city\n          state\n          building\n        country\n    }\n  }\n  fragment custom on Cart{\n    custom {\n                type {\n                    id\n                    key\n                }\n               customFieldsRaw{\n                value\n              } \n            }\n  }";
exports.CREATE_SHIPPING_BILLING_ADDRESS = "mutation updateCart(\n    $version: Long!\n    $actions: [CartUpdateAction!]!\n  ) {\n    updateCart(\n\n      version: $version\n      actions: $actions\n    ) {\n      ...CartFrag\n    }\n  }\n  \n   fragment CartFrag on Cart{\n    shippingAddress{\n      id\n      streetName\n      streetNumber\n      postalCode\n      city\n      state\n      building\n      country\n    }\n  }\n  ";
exports.CREATE_ORDER_FROMCART = "mutation createOrder(\n    $draft: OrderCartCommand!\n  ) {\n    createOrderFromCart(draft: $draft\n) {\n    id\n    ...cart\n    version\n    customerEmail\n    customerId\n    purchaseOrderNumber\n    paymentState\n    orderState\n    ...state\n    shipmentState\n    orderNumber\n    ...custom\n}\n    \n  }\n  fragment cart on Order{\n  cart{\n      id        \n  }\n}\nfragment state on Order{\n  state{\n     id      \n  }\n}\n  fragment custom on Order{\n    custom{\n      type{\n        id\n        key\n      }\n    }\n  }";
exports.UPDATE_CART_BY_ID = "mutation updateCartById($version:Long!,\n    $actions:[CartUpdateAction!]!,\n    $id:String!){\n      updateCart(version:$version,actions:$actions,id:$id){\n        id\n        cartState\n        version\n        lineItems{\n          productId\n           price{\n        id\n            value{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            country\n    }\n          variant{\n        \n        sku\n        key\n        prices{\n            id\n            value{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            country\n        }\n        images{\n            url\n        }\n        attributesRaw{\n            name\n            value\n        }\n        assets{\n            __typename\n        }\n    }\n\n        }\n        shippingAddress{\n      id\n      streetName\n      streetNumber\n      postalCode\n      city\n      state\n      building\n      country\n    }\n      }\n    }";
exports.FETCH_ACTIVE_CART_COUNT = "query FetchActiveCarts ($where:String){\n  carts(where:$where){\n      total\n      count\n      offset\n  }\n}\n  ";
exports.FETCH_ORDER_COUNT = "query FETCH_ORDER_COUNT ($where:String){\n    orders(where:$where){\n        total\n        count\n        offset\n        }\n    }\n    ";
