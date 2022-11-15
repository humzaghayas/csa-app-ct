"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_TICKET_MUTATION = exports.FETCH_TICKETS = void 0;
exports.FETCH_TICKETS = "\n query FetchClaims($container:String!,$limit:Int,$offset:Int) {\n    customObjects(container: $container,limit:$limit,offset:$offset){\n      total\n      count\n      offset\n    results{\n      container\n      value\n      key\n    }\n  }\n  }\n ";
exports.CREATE_TICKET_MUTATION = "\n query FetchClaims($container:String!,$limit:Int,$offset:Int) {\n    customObjects(container: $container,limit:$limit,offset:$offset){\n      total\n      count\n      offset\n    results{\n      container\n      value\n      key\n    }\n  }\n  }\n ";
