"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FETCH_ORDER_RETURNINFO_BY_ID = exports.FETCH_ORDER_PAYMENTS_BY_ID = exports.FETCH_PAYMENTS_TO_DISPLAY = exports.REPLICATE_ORDER = exports.CREATE_EDIT_ORDER_BY_ID = exports.UPDATE_ORDER_BY_ID = exports.FETCH_ORDER_BY_ID = exports.FETCH_ORDERS = void 0;
exports.FETCH_ORDERS = "query FetchAllOrders($limit: Int!, $offset: Int!, $sort: [String!]) {\n  orders(limit: $limit, offset: $offset, sort: $sort) {\n    total\n    count\n    offset\n    results {\n      id\n      orderState\n      orderNumber\n      paymentState\n      shipmentState\n      customer {\n        firstName\n        lastName\n      }\n      customerEmail\n      createdAt\n      createdBy {\n        customerRef {\n          typeId\n          id\n        }\n      }\n      lastModifiedAt\n      shippingInfo {\n        shippingMethodName\n        shippingMethodState\n      }\n      shippingAddress {\n        id\n        streetNumber\n        streetName\n        building\n        city\n        postalCode\n        state\n        country\n      }\n      lineItems {\n        quantity\n        nameAllLocales {\n          value\n        }\n        variant{\n          sku\n        }\n        price {\n          value {\n            centAmount\n            currencyCode\n            fractionDigits\n          }\n        }\n      }\n      totalPrice {\n        type\n        centAmount\n        currencyCode\n        fractionDigits\n      }\n      returnInfo{\n        returnTrackingId\n        returnDate\n        items{\n          type\n          id\n          quantity\n          comment\n          shipmentState\n          paymentState\n          lastModifiedAt\n          createdAt\n        }\n      }\n      paymentInfo{\n        payments{\n          id\n      key\n      interfaceId\n      version\n      createdAt\n      lastModifiedAt\n      custom{\n        customFieldsRaw{\n          name\n          value\n        }\n      }\n      paymentStatus{\n        interfaceCode\n        interfaceText\n      }\n      customer{\n        id\n      }\n      amountPlanned{\n        type\n        currencyCode\n        centAmount\n        fractionDigits\n      }\n      paymentMethodInfo{\n        paymentInterface\n        method\n        name(locale:\"en\")\n      }\n      transactions{\n        id\n        type\n        interactionId\n        timestamp\n        type\n        state\n        amount{\n          type\n          currencyCode\n          fractionDigits\n          centAmount\n        }\n        }\n        }\n      }\n    }\n  }\n}";
exports.FETCH_ORDER_BY_ID = "query($id:String!){\n    order(id:$id){\n        id\n        version\n        createdAt\n        lastModifiedAt\n          createdBy{\n          customerRef{\n            typeId\n            id\n          }\n        }\n        customerId\n        customerEmail\n        country\n        orderState\n        orderNumber\n        paymentState\n          shipmentState\n        origin\n        ...shippingInfo\n        ...shippingAddress\n        ...billingAddress\n        ...lineItems\n        ...cart\n        ...paymentInfo\n        ...totalPrice\n        ...taxedPrice\n        ...returnInfo\n        customLineItems{\n            __typename\n        }\n        discountCodes{\n            __typename\n        }\n        directDiscounts{\n            __typename\n        }\n    }\n  }\n  fragment totalPrice on Order{\n        totalPrice{\n            type\n            currencyCode\n            centAmount\n            fractionDigits\n        }            \n    }\n  fragment taxedPrice on Order{\n        taxedPrice{\n           totalNet{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n           }\n           totalGross{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n           }\n           totalTax{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n           }\n           taxPortions{\n               rate\n               amount{\n                    type\n                    currencyCode\n                    centAmount\n                    fractionDigits\n               }\n               name\n           }\n        }            \n    }\n  fragment shippingInfo on Order{\n    shippingInfo{\n        shippingMethodName\n        shippingMethodState\n        price{\n            type\n            currencyCode\n            centAmount\n            fractionDigits\n        }\n        shippingRate{\n            price{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            freeAbove{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            tiers{\n                type\n                __typename\n            }\n        }\n        taxRate{\n            name\n            amount\n            country\n            includedInPrice\n            id\n            subRates{\n                __typename\n            }\n        }\n        taxCategory{\n            id\n            name\n        }\n        shippingMethod{\n            id\n            name\n        }\n        taxedPrice{\n            totalNet{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            totalGross{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            totalTax{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n        }\n    }\n  }\n  fragment shippingAddress on Order{\n    shippingAddress{\n        id\n        streetName\n        streetNumber\n        postalCode\n          city\n          state\n          building\n        country\n    }\n  }\n  fragment lineItems on Order{\n    lineItems{\n        id\n        productId\n        productKey\n        name(locale:\"en-US\")\n        ...prioductType\n        ...variant\n        ...price\n        quantity\n        discountedPricePerQuantity{\n            __typename\n        }\n        ...taxRate\n        lastModifiedAt\n        ...state\n        priceMode\n        lineItemMode\n        ...totalPriceLineItem\n        ...taxedPriceLineItem\n    }\n  }\n  fragment cart on Order{\n    cart{\n        id        \n    }\n  }\n  fragment paymentInfo on Order{\n    paymentInfo{\n        payments{\n            id\n        }\n    }\n  }\n  fragment billingAddress on Order{\n    billingAddress{\n        id\n        streetName\n        streetNumber\n        postalCode\n          city\n          state\n          building\n        country\n    }\n  }\n  fragment state on LineItem{\n    state{\n        quantity\n        state{\n            id\n              name(locale:\"en-US\")\n              description(locale:\"en-US\")\n              initial\n        }        \n    }\n  }\n  fragment prioductType on LineItem{\n    productType{\n            id\n            name\n        }\n  }\n  fragment variant on LineItem{\n    variant{\n\n        sku\n        key\n        prices{\n            id\n            value{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            country\n        }\n        images{\n            url\n        }\n        attributesRaw{\n            name\n            value\n        }\n        assets{\n            __typename\n        }\n    }\n  }\n  fragment price on LineItem{\n    price{\n        id\n            value{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n            }\n            country\n    }\n  }\n  fragment taxRate on LineItem{\n    taxRate{\n        name\n        amount\n        includedInPrice\n        country\n        id\n        subRates{\n            __typename\n        }\n    }\n  }\n  fragment totalPriceLineItem on LineItem{\n    totalPrice{\n            type\n            currencyCode\n            centAmount\n            fractionDigits\n        }\n  }\n  fragment taxedPriceLineItem on LineItem{\n    taxedPrice{\n           totalNet{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n           }\n           totalGross{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n           }\n           totalTax{\n                type\n                currencyCode\n                centAmount\n                fractionDigits\n           }\n        } \n  }\n  \n  fragment returnInfo on Order{\n    returnInfo{\n          returnTrackingId\n          returnDate\n          items{\n            type\n            id\n            quantity\n            comment\n            shipmentState\n            paymentState\n            lastModifiedAt\n            createdAt\n          }\n        }\n  }";
exports.UPDATE_ORDER_BY_ID = "mutation updateOrderById($version:Long!,\n    $actions:[OrderUpdateAction!]!,\n    $id:String!){\n      updateOrder(version:$version,actions:$actions,id:$id){\n        id\n        orderState\n        orderNumber\n        shipmentState\n        paymentState\n        version\n        shippingAddress{\n            id\n            streetName\n            streetNumber\n            postalCode\n              city\n              state\n              building\n            country\n        }\n\n          lineItems{\n              id\n              productId\n              productKey\n              name(locale:\"en-US\")\n              quantity\n          }\n      }\n  }";
exports.CREATE_EDIT_ORDER_BY_ID = "mutation createOrderEdit($draft:OrderEditDraft!){\n    createOrderEdit(draft:$draft){\n      id\n      version\n      result{\n        type\n      }\n    }\n  }";
exports.REPLICATE_ORDER = "mutation orderReplicate($referenceInput:ReferenceInput!) {\n  replicateCart(reference:$referenceInput){\n    id\n  }\n}";
exports.FETCH_PAYMENTS_TO_DISPLAY = "query FETCH_PAYMENTS_TO_DISPLAY($where:String,$offset:Int,$limit:Int) {\n  orders(where:$where,offset:$offset,limit:$limit){\n  \tcount\n    total\n    results{\n      id\n      paymentInfo{\n        payments{\n          transactions{\n            timestamp\n            state\n          }\n          paymentStatus{\n            interfaceCode\n            interfaceText\n            state{\n              key\n            }\n          }\n          paymentMethodInfo{\n            method\n            name(locale:\"en\")\n          }\n        }\n      }\n    }\n  }\n}\n";
exports.FETCH_ORDER_PAYMENTS_BY_ID = "query FetchOrderPaymentsByOrderId($id:String!){\n  order(id:$id){\n      id\n      version\n      createdAt\n      lastModifiedAt\n      customerId\n      customerEmail\n      country\n      orderState\n      orderNumber\n      paymentInfo{\n        payments{\n          id\n      key\n      interfaceId\n      version\n      createdAt\n      lastModifiedAt\n      custom{\n        customFieldsRaw{\n          name\n          value\n        }\n      }\n      paymentStatus{\n        interfaceCode\n        interfaceText\n      }\n      customer{\n        id\n      }\n      amountPlanned{\n        type\n        currencyCode\n        centAmount\n        fractionDigits\n      }\n      paymentMethodInfo{\n        paymentInterface\n        method\n        name(locale:\"en\")\n      }\n      transactions{\n        id\n        type\n        interactionId\n        timestamp\n        type\n        state\n        amount{\n          type\n          currencyCode\n          fractionDigits\n          centAmount\n        }\n        }\n        }\n      }\n  }\n}";
exports.FETCH_ORDER_RETURNINFO_BY_ID = "query fetchOrderReturnInfo($id:String!){\n  order(id:$id){\n      id\n      version\n      orderNumber\n      ...lineItems\n      ...returnInfo\n  }\n}\n\nfragment lineItems on Order{\n  lineItems{\n      id\n      productId\n      productKey\n      name(locale:\"en-US\")\n      ...prioductType\n      ...variant\n      ...price\n      quantity\n      discountedPricePerQuantity{\n          __typename\n      }\n      ...taxRate\n      lastModifiedAt\n      ...state\n      priceMode\n      lineItemMode\n      ...totalPriceLineItem\n      ...taxedPriceLineItem\n  }\n}\nfragment state on LineItem{\n  state{\n      quantity\n      state{\n          id\n            name(locale:\"en-US\")\n            description(locale:\"en-US\")\n            initial\n      }        \n  }\n}\nfragment prioductType on LineItem{\n  productType{\n          id\n          name\n      }\n}\nfragment variant on LineItem{\n  variant{\n\n      sku\n      key\n      prices{\n          id\n          value{\n              type\n              currencyCode\n              centAmount\n              fractionDigits\n          }\n          country\n      }\n      images{\n          url\n      }\n      attributesRaw{\n          name\n          value\n      }\n      assets{\n          __typename\n      }\n  }\n}\nfragment price on LineItem{\n  price{\n      id\n          value{\n              type\n              currencyCode\n              centAmount\n              fractionDigits\n          }\n          country\n  }\n}\nfragment taxRate on LineItem{\n  taxRate{\n      name\n      amount\n      includedInPrice\n      country\n      id\n      subRates{\n          __typename\n      }\n  }\n}\nfragment totalPriceLineItem on LineItem{\n  totalPrice{\n          type\n          currencyCode\n          centAmount\n          fractionDigits\n      }\n}\nfragment taxedPriceLineItem on LineItem{\n  taxedPrice{\n         totalNet{\n              type\n              currencyCode\n              centAmount\n              fractionDigits\n         }\n         totalGross{\n              type\n              currencyCode\n              centAmount\n              fractionDigits\n         }\n         totalTax{\n              type\n              currencyCode\n              centAmount\n              fractionDigits\n         }\n      } \n}\n\nfragment returnInfo on Order{\n  returnInfo{\n        returnTrackingId\n        returnDate\n        items{\n          ... on LineItemReturnItem{\n            lineItemId\n          }\n          type\n          id\n          quantity\n          comment\n          shipmentState\n          paymentState\n          lastModifiedAt\n          createdAt\n        }\n      }\n}\n";
