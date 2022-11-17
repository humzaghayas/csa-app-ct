"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketFromCO = exports.getCreateTicketDraft = exports.getCreateTicketMutaion = exports.getTicketContactTypes = exports.getTicketPriorityValues = exports.getTicketCategories = exports.getTicketRows = void 0;
var constants_1 = require("../constants");
var graphql_queries_1 = require("../graphql-queries");
function getTicketRows(customObjects) {
    //
    console.log("customObjects :: " + JSON.stringify(customObjects));
    if (customObjects === null || customObjects === void 0 ? void 0 : customObjects.results) {
        return customObjects === null || customObjects === void 0 ? void 0 : customObjects.results.map(function (co) {
            return { id: co.id,
                Customer: co.value.email, Created: co.createdAt, Modified: co.lastModifiedAt,
                Source: co.value.source, Status: co.value.status, Priority: co.value.priority, Category: co.value.category,
                Subject: co.value.subject };
        });
    }
    // return {};
    return [];
}
exports.getTicketRows = getTicketRows;
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
    return graphql_queries_1.CREATE_TICKET_MUTATION;
}
exports.getCreateTicketMutaion = getCreateTicketMutaion;
function getCreateTicketDraft(ticketInfo) {
    var currentDate = new Date().toUTCString();
    var email = "humza.ghayas@royalcyber.com";
    if (!ticketInfo.key) {
        var num = getRandomInt(1, 2000);
        ticketDraft.key = getForKey(email) + "_" + num;
    }
    else {
        ticketDraft.key = ticketInfo.key;
    }
    if (ticketInfo.category && ticketInfo.category !== 'request') {
        ticketDraft.value = "{\n                \"id\": 1,\n                \"customerId\": \"31319151-a3ec-4c8b-8202-0d89723b9fd1\",\n                \"email\":\"" + email + "\",\n                \"source\": \"" + ticketInfo.contactType + "\",\n                \"status\": \"" + constants_1.TICKET_STATUS.open + "\",\n                \"priority\": \"" + ticketInfo.priority + "\",\n                \"category\": \"" + ticketInfo.category + "\",\n                \"subject\": \"" + ticketInfo.subject + "\",\n            \"type\":\"" + ticketInfo.category + "\",\n                \"createdAt\": \"" + currentDate + "\",\n                \"modifiedAt\": \"" + currentDate + "\",\n                \"ticketData\":{\t\n                        \"message\": \"" + ticketInfo.message + "\"\n                }\n            }";
    }
    else {
        ticketDraft.value = "{\n            \"id\": 1,\n            \"customerId\": \"31319151-a3ec-4c8b-8202-0d89723b9fd1\",\n            \"email\":\"" + email + "\",\n            \"source\": \"" + ticketInfo.contactType + "\",\n            \"status\": \"" + constants_1.TICKET_STATUS.open + "\",\n            \"priority\": \"" + ticketInfo.priority + "\",\n            \"category\": \"" + ticketInfo.category + "\",\n            \"subject\": \"" + ticketInfo.subject + "\",\n        \"type\":\"" + ticketInfo.category + "\",\n            \"createdAt\": \"" + currentDate + "\",\n            \"modifiedAt\": \"" + currentDate + "\",\n            \"ticketData\":{\t\n                    \"firstName\": \"" + ticketInfo.firstName + "\",\n                    \"lastName\": \"" + ticketInfo.lastName + "\"\n            }\n        }";
    }
    return ticketDraft;
}
exports.getCreateTicketDraft = getCreateTicketDraft;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function getForKey(email) {
    return email.replace("@", "ATTHERATE");
}
function getTicketFromCO(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19;
    return {
        id: (_b = (_a = data === null || data === void 0 ? void 0 : data.customObject) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '',
        key: (_d = (_c = data === null || data === void 0 ? void 0 : data.customObject) === null || _c === void 0 ? void 0 : _c.key) !== null && _d !== void 0 ? _d : '',
        container: (_f = (_e = data === null || data === void 0 ? void 0 : data.customObject) === null || _e === void 0 ? void 0 : _e.container) !== null && _f !== void 0 ? _f : '',
        version: (_h = (_g = data === null || data === void 0 ? void 0 : data.customObject) === null || _g === void 0 ? void 0 : _g.version) !== null && _h !== void 0 ? _h : '',
        category: (_l = (_k = (_j = data === null || data === void 0 ? void 0 : data.customObject) === null || _j === void 0 ? void 0 : _j.value) === null || _k === void 0 ? void 0 : _k.category) !== null && _l !== void 0 ? _l : '',
        Customer: (_p = (_o = (_m = data === null || data === void 0 ? void 0 : data.customObject) === null || _m === void 0 ? void 0 : _m.value) === null || _o === void 0 ? void 0 : _o.email) !== null && _p !== void 0 ? _p : '',
        contactType: (_s = (_r = (_q = data === null || data === void 0 ? void 0 : data.customObject) === null || _q === void 0 ? void 0 : _q.value) === null || _r === void 0 ? void 0 : _r.source) !== null && _s !== void 0 ? _s : '',
        Status: (_v = (_u = (_t = data === null || data === void 0 ? void 0 : data.customObject) === null || _t === void 0 ? void 0 : _t.value) === null || _u === void 0 ? void 0 : _u.status) !== null && _v !== void 0 ? _v : '',
        priority: (_y = (_x = (_w = data === null || data === void 0 ? void 0 : data.customObject) === null || _w === void 0 ? void 0 : _w.value) === null || _x === void 0 ? void 0 : _x.priority) !== null && _y !== void 0 ? _y : '',
        message: (_2 = (_1 = (_0 = (_z = data === null || data === void 0 ? void 0 : data.customObject) === null || _z === void 0 ? void 0 : _z.value) === null || _0 === void 0 ? void 0 : _0.ticketData) === null || _1 === void 0 ? void 0 : _1.message) !== null && _2 !== void 0 ? _2 : '',
        subject: (_5 = (_4 = (_3 = data === null || data === void 0 ? void 0 : data.customObject) === null || _3 === void 0 ? void 0 : _3.value) === null || _4 === void 0 ? void 0 : _4.subject) !== null && _5 !== void 0 ? _5 : '',
        firstName: (_9 = (_8 = (_7 = (_6 = data === null || data === void 0 ? void 0 : data.customObject) === null || _6 === void 0 ? void 0 : _6.value) === null || _7 === void 0 ? void 0 : _7.ticketData) === null || _8 === void 0 ? void 0 : _8.firstName) !== null && _9 !== void 0 ? _9 : '',
        lastName: (_13 = (_12 = (_11 = (_10 = data === null || data === void 0 ? void 0 : data.customObject) === null || _10 === void 0 ? void 0 : _10.value) === null || _11 === void 0 ? void 0 : _11.ticketData) === null || _12 === void 0 ? void 0 : _12.lastName) !== null && _13 !== void 0 ? _13 : '',
        lastModifiedAt: (_15 = (_14 = data === null || data === void 0 ? void 0 : data.customObject) === null || _14 === void 0 ? void 0 : _14.lastModifiedAt) !== null && _15 !== void 0 ? _15 : '',
        createdAt: (_17 = (_16 = data === null || data === void 0 ? void 0 : data.customObject) === null || _16 === void 0 ? void 0 : _16.createdAt) !== null && _17 !== void 0 ? _17 : '',
        email: (_19 = (_18 = data === null || data === void 0 ? void 0 : data.customObject) === null || _18 === void 0 ? void 0 : _18.email) !== null && _19 !== void 0 ? _19 : ''
    };
}
exports.getTicketFromCO = getTicketFromCO;
