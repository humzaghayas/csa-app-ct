"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FETCH_CUSTOMER_TICKETS = exports.FETCH_ORDER_INFO_BY_ORDERNUMBER = exports.FETCH_CUSTOMERS = exports.CREATE_CUSTOMOBJECT_MUTATION = exports.FETCH_TICKETS_BY_ID = exports.FETCH_USERS_LIST = exports.FETCH_USERS_INFO = exports.FETCH_TICKETS = void 0;
exports.FETCH_TICKETS = "\n query FetchTickets($container:String!,$limit:Int,$offset:Int,$sort:[String!]) {\n    customObjects(container: $container,limit:$limit,offset:$offset,sort:$sort){\n      total\n      count\n      offset\n    results{\n      id\n      version\n      createdAt\n      lastModifiedAt\n      container\n      value\n      key\n    }\n  }\n  }\n ";
exports.FETCH_USERS_INFO = "\n query FetchUsers($container:String!,$key:String) {\n    customObject(container: $container,key:$key){\n      id\n      version\n      createdAt\n      lastModifiedAt\n      container\n      value\n      key\n  }\n  }\n ";
exports.FETCH_USERS_LIST = "\n query FetchUsers($container:String!) {\n    customObjects(container: $container){\n      total\n      count\n      offset\n      results{\n        id\n        version\n        createdAt\n        lastModifiedAt\n        container\n        value\n        key\n      }\n  }\n  }\n ";
exports.FETCH_TICKETS_BY_ID = "\n query FetchTicketById($id:String) {\n    customObject(id: $id){\n      id\n      version\n      createdAt\n      lastModifiedAt\n      container\n      value\n      key\n    }\n  }\n ";
exports.CREATE_CUSTOMOBJECT_MUTATION = "\n mutation CreateCustomObject($draft:CustomObjectDraft!){\n  createOrUpdateCustomObject(draft:$draft){\n    container\n    key\n    value\n  }\n}\n ";
exports.FETCH_CUSTOMERS = "\n query FetchCustomer($where:String){\n  customers(where:$where){\n    total\n    count\n    offset\n    results{\n      email\n      id\n      firstName\n      lastName\n      middleName\n      salutation\n      title\n      dateOfBirth\n      companyName\n    }\n  }\n}\n ";
exports.FETCH_ORDER_INFO_BY_ORDERNUMBER = "\n query($orderNumber:String){\n  order(orderNumber:$orderNumber){\n    id\n    orderState\n    orderNumber\n  }\n  }\n  ";
exports.FETCH_CUSTOMER_TICKETS = "\n  query FETCH_CUSTOMER_TICKETS($container:String!,$where:String) {\n      customObjects(container:$container,\n      where:$where){\n        offset\n        total\n        results{\n          id\n          key\n          version\n          createdAt\n          lastModifiedAt\n          value\n        }\n      }\n    }";
