"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FETCH_CUSTOMERS = exports.CREATE_TICKET_MUTATION = exports.FETCH_TICKETS_BY_ID = exports.FETCH_TICKETS = void 0;
exports.FETCH_TICKETS = "\n query FetchTickets($container:String!,$limit:Int,$offset:Int) {\n    customObjects(container: $container,limit:$limit,offset:$offset){\n      total\n      count\n      offset\n    results{\n      id\n      version\n      createdAt\n      lastModifiedAt\n      container\n      value\n      key\n    }\n  }\n  }\n ";
exports.FETCH_TICKETS_BY_ID = "\n query FetchTicketById($id:String) {\n    customObject(id: $id){\n      id\n      version\n      createdAt\n      lastModifiedAt\n      container\n      value\n      key\n    }\n  }\n ";
exports.CREATE_TICKET_MUTATION = "\n mutation CreateClaimObject($draft:CustomObjectDraft!){\n  createOrUpdateCustomObject(draft:$draft){\n    container\n    value\n  }\n}\n ";
exports.FETCH_CUSTOMERS = "\n query($limit:Int,$offset:Int){\n  customers(limit:$limit,offset:$offset){\n    total\n    count\n    offset\n    results{\n      email\n      id\n    }\n  }\n}\n ";
