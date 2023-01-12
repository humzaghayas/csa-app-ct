"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FETCH_ORDERS = void 0;
exports.FETCH_ORDERS = "query FetchAllOrders($limit: Int!, $offset: Int!, $sort: [String!]){\n    orders(limit: $limit, offset: $offset, sort: $sort){\n      total\n      count\n      offset\n      results{\n        id\n        orderState\n        orderNumber\n        customer{\n            firstName\n            lastName\n        }\n        customerEmail\n        createdAt\n        lastModifiedAt\n        orderState\n        shippingInfo{\n            shippingMethodName\n            shippingMethodState\n        }    \n      }\n    }\n  } ";
