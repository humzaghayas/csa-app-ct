"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailValid = exports.escapeQuotes = exports.getTicketFromCustomObject = exports.getForKey = exports.getCreateTicketDraft = exports.getCreateTicketMutaion = exports.getTicketContactTypes = exports.getTicketPriorityValues = exports.getTicketCategories = exports.getOrderRows = exports.getTicketRows = void 0;
var constants_1 = require("../constants");
var graphql_queries_1 = require("../graphql-queries");
var uuid_1 = require("uuid");
function getTicketRows(customObjects) {
    //
    console.log("customObjects :: " + JSON.stringify(customObjects));
    if (customObjects === null || customObjects === void 0 ? void 0 : customObjects.results) {
        return customObjects === null || customObjects === void 0 ? void 0 : customObjects.results.map(function (co) {
            return { id: co.id,
                Customer: co.value.email,
                Created: co.createdAt,
                Modified: co.lastModifiedAt,
                Source: co.value.source,
                status: co.value.status,
                Priority: co.value.priority,
                Category: co.value.category,
                Subject: co.value.subject,
                assignedTo: co.value.assignedTo,
                createdBy: co.value.createdBy };
        });
    }
    // return {};
    return [];
}
exports.getTicketRows = getTicketRows;
function getOrderRows(orderPaginationResult) {
    if (orderPaginationResult === null || orderPaginationResult === void 0 ? void 0 : orderPaginationResult.results) {
        return orderPaginationResult === null || orderPaginationResult === void 0 ? void 0 : orderPaginationResult.results.map(function (order) {
            var _a, _b, _c;
            return {
                id: order === null || order === void 0 ? void 0 : order.id,
                OrderNumber: order === null || order === void 0 ? void 0 : order.orderNumber,
                Customer: ((_a = order === null || order === void 0 ? void 0 : order.customer) === null || _a === void 0 ? void 0 : _a.firstName) + " " + ((_b = order === null || order === void 0 ? void 0 : order.customer) === null || _b === void 0 ? void 0 : _b.lastName),
                Created: order === null || order === void 0 ? void 0 : order.createdAt,
                Modified: order === null || order === void 0 ? void 0 : order.lastModifiedAt,
                Type: order === null || order === void 0 ? void 0 : order.type,
                Status: order === null || order === void 0 ? void 0 : order.orderState,
                DeliveryMode: (_c = order === null || order === void 0 ? void 0 : order.shippingInfo) === null || _c === void 0 ? void 0 : _c.shippingMethodName
            };
        });
    }
}
exports.getOrderRows = getOrderRows;
function getTicketCategories() {
    return constants_1.TICKET_TYPE;
}
exports.getTicketCategories = getTicketCategories;
function getTicketPriorityValues() {
    return constants_1.TICKET_PRIORITIY_VALUES;
}
exports.getTicketPriorityValues = getTicketPriorityValues;
function getTicketContactTypes() {
    return constants_1.TICKET_SOURCE;
}
exports.getTicketContactTypes = getTicketContactTypes;
var ticketDraft = { "container": constants_1.CONSTANTS.containerKey };
function getCreateTicketMutaion() {
    return graphql_queries_1.CREATE_CUSTOMOBJECT_MUTATION;
}
exports.getCreateTicketMutaion = getCreateTicketMutaion;
function getCreateTicketDraft(ticketInfo) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var email, uuid, filesStr, d, commentsStr, orderNumberStr, value;
        return __generator(this, function (_b) {
            email = ticketInfo.email;
            uuid = (0, uuid_1.v4)();
            if (!ticketInfo.key) {
                ticketDraft.key = uuid;
            }
            else {
                ticketDraft.key = ticketInfo.key;
            }
            filesStr = ticketInfo.files.map(function (f) {
                return "{\"name\":\"".concat(f.name, "\",\"url\":\"").concat(f.url, "\"}");
            }).toString();
            d = new Date().toISOString();
            commentsStr = (_a = ticketInfo === null || ticketInfo === void 0 ? void 0 : ticketInfo.comments) === null || _a === void 0 ? void 0 : _a.map(function (c) {
                if (c.createdAt) {
                    return "{\"comment\":\"".concat(c.comment, "\",\"createdAt\":\"").concat(c.createdAt, "\"}");
                }
                else {
                    return "{\"comment\":\"".concat(c.comment, "\",\"createdAt\":\"").concat(d, "\"}");
                }
            }).toString();
            orderNumberStr = '';
            if (ticketInfo.category && (ticketInfo.category == constants_1.CONSTANTS.TICKET_TYPE_ORDER_INQUIRY
                || ticketInfo.category == constants_1.CONSTANTS.TICKET_TYPE_PAYMENT_METHODS
                || ticketInfo.category == constants_1.CONSTANTS.TICKET_TYPE_RETURNS)) {
                orderNumberStr = ",\"orderNumber\":\"".concat(ticketInfo.orderNumber, "\"");
            }
            value = "\"ticketData\":{\t\n        \"message\": \"".concat(ticketInfo.message, "\",\n        \"files\": [").concat(filesStr, "],\n        \"comments\":[").concat(commentsStr, "]\n        ").concat(orderNumberStr, "}");
            ticketDraft.value = getTicketValueString(ticketInfo, uuid);
            ticketDraft.value = ticketDraft.value.replace(constants_1.CONSTANTS.TICKET_DATA, value);
            return [2 /*return*/, ticketDraft];
        });
    });
}
exports.getCreateTicketDraft = getCreateTicketDraft;
function getTicketValueString(ticketInfo, uuid) {
    var currentDate = new Date().toUTCString();
    var email = ticketInfo.email;
    var customerId = ticketInfo.customerId;
    return "{\n        \"id\": \"".concat(uuid, "\",\n        \"customerId\": \"").concat(customerId, "\",\n        \"email\":\"").concat(email, "\",\n        \"source\": \"").concat(ticketInfo.contactType, "\",\n        \"status\": \"").concat(ticketInfo.status, "\",\n        \"priority\": \"").concat(ticketInfo.priority, "\",\n        \"category\": \"").concat(ticketInfo.category, "\",\n        \"subject\": \"").concat(ticketInfo.subject, "\",\n        \"type\":\"").concat(ticketInfo.category, "\",\n        \"createdAt\": \"").concat(currentDate, "\",\n        \"modifiedAt\": \"").concat(currentDate, "\",\n        \"createdBy\":\"").concat(ticketInfo.createdBy, "\",\n        \"assignedTo\":\"").concat(ticketInfo.assignedTo, "\",\n        ").concat(constants_1.CONSTANTS.TICKET_DATA, "\n    }");
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function getForKey(email) {
    return email.replace("@", "ATTHERATE");
}
exports.getForKey = getForKey;
function getTicketFromCustomObject(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var ticket = createTicketFromCustomObject(data);
    ticket['message'] = (_d = (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.customObject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.ticketData) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : '';
    ticket['files'] = (_h = (_g = (_f = (_e = data === null || data === void 0 ? void 0 : data.customObject) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.ticketData) === null || _g === void 0 ? void 0 : _g.files) !== null && _h !== void 0 ? _h : '';
    ticket['comments'] = (_m = (_l = (_k = (_j = data === null || data === void 0 ? void 0 : data.customObject) === null || _j === void 0 ? void 0 : _j.value) === null || _k === void 0 ? void 0 : _k.ticketData) === null || _l === void 0 ? void 0 : _l.comments) !== null && _m !== void 0 ? _m : [];
    // if(data?.customObject?.value?.category === CONSTANTS.TICKET_TYPE_REQUEST){
    //     ticket['requestType'] = data?.customObject?.value?.ticketData?.requestType ?? '';
    //     if(data?.customObject?.value?.ticketData?.requestType == CONSTANTS.TICKET_TYPE_GENERAL_INFO_CHANGE){
    //         ticket['firstName'] = data?.customObject?.value?.ticketData?.firstName ?? '';
    //         ticket['lastName'] = data?.customObject?.value?.ticketData?.lastName ?? '';
    //         ticket['middleName'] = data?.customObject?.value?.ticketData?.middleName ?? '';
    //         ticket['salutation'] = data?.customObject?.value?.ticketData?.salutation ?? '';
    //         ticket['title'] = data?.customObject?.value?.ticketData?.title ?? '';
    //         ticket['dateOfBirth'] = data?.customObject?.value?.ticketData?.dateOfBirth ?? '';
    //         ticket['companyName'] = data?.customObject?.value?.ticketData?.companyName ?? '';
    //     }
    // }else{
    //     ticket['message'] = data?.customObject?.value?.ticketData?.message ?? '';
    //     ticket['files'] = data?.customObject?.value?.ticketData?.files ?? '';
    // }
    return ticket;
}
exports.getTicketFromCustomObject = getTicketFromCustomObject;
function createTicketFromCustomObject(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17;
    return {
        id: (_b = (_a = data === null || data === void 0 ? void 0 : data.customObject) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '',
        key: (_d = (_c = data === null || data === void 0 ? void 0 : data.customObject) === null || _c === void 0 ? void 0 : _c.key) !== null && _d !== void 0 ? _d : '',
        container: (_f = (_e = data === null || data === void 0 ? void 0 : data.customObject) === null || _e === void 0 ? void 0 : _e.container) !== null && _f !== void 0 ? _f : '',
        version: (_h = (_g = data === null || data === void 0 ? void 0 : data.customObject) === null || _g === void 0 ? void 0 : _g.version) !== null && _h !== void 0 ? _h : '',
        category: (_l = (_k = (_j = data === null || data === void 0 ? void 0 : data.customObject) === null || _j === void 0 ? void 0 : _j.value) === null || _k === void 0 ? void 0 : _k.category) !== null && _l !== void 0 ? _l : '',
        Customer: (_p = (_o = (_m = data === null || data === void 0 ? void 0 : data.customObject) === null || _m === void 0 ? void 0 : _m.value) === null || _o === void 0 ? void 0 : _o.email) !== null && _p !== void 0 ? _p : '',
        contactType: (_s = (_r = (_q = data === null || data === void 0 ? void 0 : data.customObject) === null || _q === void 0 ? void 0 : _q.value) === null || _r === void 0 ? void 0 : _r.source) !== null && _s !== void 0 ? _s : '',
        status: (_v = (_u = (_t = data === null || data === void 0 ? void 0 : data.customObject) === null || _t === void 0 ? void 0 : _t.value) === null || _u === void 0 ? void 0 : _u.status) !== null && _v !== void 0 ? _v : '',
        priority: (_y = (_x = (_w = data === null || data === void 0 ? void 0 : data.customObject) === null || _w === void 0 ? void 0 : _w.value) === null || _x === void 0 ? void 0 : _x.priority) !== null && _y !== void 0 ? _y : '',
        subject: (_1 = (_0 = (_z = data === null || data === void 0 ? void 0 : data.customObject) === null || _z === void 0 ? void 0 : _z.value) === null || _0 === void 0 ? void 0 : _0.subject) !== null && _1 !== void 0 ? _1 : '',
        lastModifiedAt: (_3 = (_2 = data === null || data === void 0 ? void 0 : data.customObject) === null || _2 === void 0 ? void 0 : _2.lastModifiedAt) !== null && _3 !== void 0 ? _3 : '',
        createdAt: (_5 = (_4 = data === null || data === void 0 ? void 0 : data.customObject) === null || _4 === void 0 ? void 0 : _4.createdAt) !== null && _5 !== void 0 ? _5 : '',
        email: (_7 = (_6 = data === null || data === void 0 ? void 0 : data.customObject) === null || _6 === void 0 ? void 0 : _6.value.email) !== null && _7 !== void 0 ? _7 : '',
        customerId: (_9 = (_8 = data === null || data === void 0 ? void 0 : data.customObject) === null || _8 === void 0 ? void 0 : _8.value.customerId) !== null && _9 !== void 0 ? _9 : '',
        assignedTo: (_11 = (_10 = data === null || data === void 0 ? void 0 : data.customObject) === null || _10 === void 0 ? void 0 : _10.value.assignedTo) !== null && _11 !== void 0 ? _11 : '',
        createdBy: (_13 = (_12 = data === null || data === void 0 ? void 0 : data.customObject) === null || _12 === void 0 ? void 0 : _12.value.createdBy) !== null && _13 !== void 0 ? _13 : '',
        orderNumber: (_17 = (_16 = (_15 = (_14 = data === null || data === void 0 ? void 0 : data.customObject) === null || _14 === void 0 ? void 0 : _14.value) === null || _15 === void 0 ? void 0 : _15.ticketData) === null || _16 === void 0 ? void 0 : _16.orderNumber) !== null && _17 !== void 0 ? _17 : ''
    };
}
function escapeQuotes(field) {
    return field.replaceAll('\"', '\\\"').replaceAll('\n', '\\n');
}
exports.escapeQuotes = escapeQuotes;
function isEmailValid(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) {
        return true;
    }
    return false;
}
exports.isEmailValid = isEmailValid;
