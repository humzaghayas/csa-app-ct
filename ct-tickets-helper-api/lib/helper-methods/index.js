"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailValid = exports.escapeQuotes = exports.getTicketFromCO = exports.getForKey = exports.getCreateTicketDraft = exports.getCreateTicketMutaion = exports.getTicketContactTypes = exports.getTicketPriorityValues = exports.getTicketCategories = exports.getTicketRows = void 0;
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
    var email = ticketInfo.email;
    var customerId = ticketInfo.customerId;
    if (!ticketInfo.key) {
        var num = getRandomInt(1, 2000);
        ticketDraft.key = "".concat(getForKey(email), "_").concat(num);
    }
    else {
        ticketDraft.key = ticketInfo.key;
    }
    if (ticketInfo.category && ticketInfo.category !== constants_1.CONSTANTS.TICKET_TYPE_REQUEST) {
        var filesStr = ticketInfo.files.map(function (f) {
            return "{\"name\":\"".concat(f.name, "\",\"url\":\"").concat(f.url, "\"}");
        }).toString();
        ticketDraft.value = "{\n                \"id\": 1,\n                \"customerId\": \"".concat(customerId, "\",\n                \"email\":\"").concat(email, "\",\n                \"source\": \"").concat(ticketInfo.contactType, "\",\n                \"status\": \"").concat(constants_1.TICKET_STATUS.open, "\",\n                \"priority\": \"").concat(ticketInfo.priority, "\",\n                \"category\": \"").concat(ticketInfo.category, "\",\n                \"subject\": \"").concat(ticketInfo.subject, "\",\n                \"type\":\"").concat(ticketInfo.category, "\",\n                \"createdAt\": \"").concat(currentDate, "\",\n                \"modifiedAt\": \"").concat(currentDate, "\",\n                \"ticketData\":{\t\n                        \"message\": \"").concat(ticketInfo.message, "\",\n                        \"files\": [").concat(filesStr, "]\n                },\n                \"createdBy\":\"").concat(ticketInfo.createdBy, "\",\n                \"assignedTo\":\"").concat(ticketInfo.assignedTo, "\"\n            }");
    }
    else {
        ticketDraft.value = "{\n            \"id\": 1,\n            \"customerId\": \"".concat(customerId, "\",\n            \"email\":\"").concat(email, "\",\n            \"source\": \"").concat(ticketInfo.contactType, "\",\n            \"status\": \"").concat(constants_1.TICKET_STATUS.open, "\",\n            \"priority\": \"").concat(ticketInfo.priority, "\",\n            \"category\": \"").concat(ticketInfo.category, "\",\n            \"subject\": \"").concat(ticketInfo.subject, "\",\n            \"type\":\"").concat(ticketInfo.category, "\",\n            \"createdAt\": \"").concat(currentDate, "\",\n            \"modifiedAt\": \"").concat(currentDate, "\",\n            \"ticketData\":{\t\n                    \"firstName\": \"").concat(ticketInfo.firstName, "\",\n                    \"lastName\": \"").concat(ticketInfo.lastName, "\"\n            },\n            \"createdBy\":\"").concat(ticketInfo.createdBy, "\",\n            \"assignedTo\":\"").concat(ticketInfo.assignedTo, "\"\n        }");
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
exports.getForKey = getForKey;
function getTicketFromCO(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63;
    if (((_b = (_a = data === null || data === void 0 ? void 0 : data.customObject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.category) === constants_1.CONSTANTS.TICKET_TYPE_REQUEST) {
        return {
            id: (_d = (_c = data === null || data === void 0 ? void 0 : data.customObject) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : '',
            key: (_f = (_e = data === null || data === void 0 ? void 0 : data.customObject) === null || _e === void 0 ? void 0 : _e.key) !== null && _f !== void 0 ? _f : '',
            container: (_h = (_g = data === null || data === void 0 ? void 0 : data.customObject) === null || _g === void 0 ? void 0 : _g.container) !== null && _h !== void 0 ? _h : '',
            version: (_k = (_j = data === null || data === void 0 ? void 0 : data.customObject) === null || _j === void 0 ? void 0 : _j.version) !== null && _k !== void 0 ? _k : '',
            category: (_o = (_m = (_l = data === null || data === void 0 ? void 0 : data.customObject) === null || _l === void 0 ? void 0 : _l.value) === null || _m === void 0 ? void 0 : _m.category) !== null && _o !== void 0 ? _o : '',
            Customer: (_r = (_q = (_p = data === null || data === void 0 ? void 0 : data.customObject) === null || _p === void 0 ? void 0 : _p.value) === null || _q === void 0 ? void 0 : _q.email) !== null && _r !== void 0 ? _r : '',
            contactType: (_u = (_t = (_s = data === null || data === void 0 ? void 0 : data.customObject) === null || _s === void 0 ? void 0 : _s.value) === null || _t === void 0 ? void 0 : _t.source) !== null && _u !== void 0 ? _u : '',
            Status: (_x = (_w = (_v = data === null || data === void 0 ? void 0 : data.customObject) === null || _v === void 0 ? void 0 : _v.value) === null || _w === void 0 ? void 0 : _w.status) !== null && _x !== void 0 ? _x : '',
            priority: (_0 = (_z = (_y = data === null || data === void 0 ? void 0 : data.customObject) === null || _y === void 0 ? void 0 : _y.value) === null || _z === void 0 ? void 0 : _z.priority) !== null && _0 !== void 0 ? _0 : '',
            subject: (_3 = (_2 = (_1 = data === null || data === void 0 ? void 0 : data.customObject) === null || _1 === void 0 ? void 0 : _1.value) === null || _2 === void 0 ? void 0 : _2.subject) !== null && _3 !== void 0 ? _3 : '',
            firstName: (_7 = (_6 = (_5 = (_4 = data === null || data === void 0 ? void 0 : data.customObject) === null || _4 === void 0 ? void 0 : _4.value) === null || _5 === void 0 ? void 0 : _5.ticketData) === null || _6 === void 0 ? void 0 : _6.firstName) !== null && _7 !== void 0 ? _7 : '',
            lastName: (_11 = (_10 = (_9 = (_8 = data === null || data === void 0 ? void 0 : data.customObject) === null || _8 === void 0 ? void 0 : _8.value) === null || _9 === void 0 ? void 0 : _9.ticketData) === null || _10 === void 0 ? void 0 : _10.lastName) !== null && _11 !== void 0 ? _11 : '',
            lastModifiedAt: (_13 = (_12 = data === null || data === void 0 ? void 0 : data.customObject) === null || _12 === void 0 ? void 0 : _12.lastModifiedAt) !== null && _13 !== void 0 ? _13 : '',
            createdAt: (_15 = (_14 = data === null || data === void 0 ? void 0 : data.customObject) === null || _14 === void 0 ? void 0 : _14.createdAt) !== null && _15 !== void 0 ? _15 : '',
            assignedTo: (_17 = (_16 = data === null || data === void 0 ? void 0 : data.customObject) === null || _16 === void 0 ? void 0 : _16.assignedTo) !== null && _17 !== void 0 ? _17 : '',
            email: (_19 = (_18 = data === null || data === void 0 ? void 0 : data.customObject) === null || _18 === void 0 ? void 0 : _18.value.email) !== null && _19 !== void 0 ? _19 : '',
            customerId: (_21 = (_20 = data === null || data === void 0 ? void 0 : data.customObject) === null || _20 === void 0 ? void 0 : _20.value.customerId) !== null && _21 !== void 0 ? _21 : ''
        };
    }
    else {
        return {
            id: (_23 = (_22 = data === null || data === void 0 ? void 0 : data.customObject) === null || _22 === void 0 ? void 0 : _22.id) !== null && _23 !== void 0 ? _23 : '',
            key: (_25 = (_24 = data === null || data === void 0 ? void 0 : data.customObject) === null || _24 === void 0 ? void 0 : _24.key) !== null && _25 !== void 0 ? _25 : '',
            container: (_27 = (_26 = data === null || data === void 0 ? void 0 : data.customObject) === null || _26 === void 0 ? void 0 : _26.container) !== null && _27 !== void 0 ? _27 : '',
            version: (_29 = (_28 = data === null || data === void 0 ? void 0 : data.customObject) === null || _28 === void 0 ? void 0 : _28.version) !== null && _29 !== void 0 ? _29 : '',
            category: (_32 = (_31 = (_30 = data === null || data === void 0 ? void 0 : data.customObject) === null || _30 === void 0 ? void 0 : _30.value) === null || _31 === void 0 ? void 0 : _31.category) !== null && _32 !== void 0 ? _32 : '',
            Customer: (_35 = (_34 = (_33 = data === null || data === void 0 ? void 0 : data.customObject) === null || _33 === void 0 ? void 0 : _33.value) === null || _34 === void 0 ? void 0 : _34.email) !== null && _35 !== void 0 ? _35 : '',
            contactType: (_38 = (_37 = (_36 = data === null || data === void 0 ? void 0 : data.customObject) === null || _36 === void 0 ? void 0 : _36.value) === null || _37 === void 0 ? void 0 : _37.source) !== null && _38 !== void 0 ? _38 : '',
            Status: (_41 = (_40 = (_39 = data === null || data === void 0 ? void 0 : data.customObject) === null || _39 === void 0 ? void 0 : _39.value) === null || _40 === void 0 ? void 0 : _40.status) !== null && _41 !== void 0 ? _41 : '',
            priority: (_44 = (_43 = (_42 = data === null || data === void 0 ? void 0 : data.customObject) === null || _42 === void 0 ? void 0 : _42.value) === null || _43 === void 0 ? void 0 : _43.priority) !== null && _44 !== void 0 ? _44 : '',
            message: (_48 = (_47 = (_46 = (_45 = data === null || data === void 0 ? void 0 : data.customObject) === null || _45 === void 0 ? void 0 : _45.value) === null || _46 === void 0 ? void 0 : _46.ticketData) === null || _47 === void 0 ? void 0 : _47.message) !== null && _48 !== void 0 ? _48 : '',
            files: (_52 = (_51 = (_50 = (_49 = data === null || data === void 0 ? void 0 : data.customObject) === null || _49 === void 0 ? void 0 : _49.value) === null || _50 === void 0 ? void 0 : _50.ticketData) === null || _51 === void 0 ? void 0 : _51.files) !== null && _52 !== void 0 ? _52 : '',
            subject: (_55 = (_54 = (_53 = data === null || data === void 0 ? void 0 : data.customObject) === null || _53 === void 0 ? void 0 : _53.value) === null || _54 === void 0 ? void 0 : _54.subject) !== null && _55 !== void 0 ? _55 : '',
            lastModifiedAt: (_57 = (_56 = data === null || data === void 0 ? void 0 : data.customObject) === null || _56 === void 0 ? void 0 : _56.lastModifiedAt) !== null && _57 !== void 0 ? _57 : '',
            createdAt: (_59 = (_58 = data === null || data === void 0 ? void 0 : data.customObject) === null || _58 === void 0 ? void 0 : _58.createdAt) !== null && _59 !== void 0 ? _59 : '',
            email: (_61 = (_60 = data === null || data === void 0 ? void 0 : data.customObject) === null || _60 === void 0 ? void 0 : _60.value.email) !== null && _61 !== void 0 ? _61 : '',
            customerId: (_63 = (_62 = data === null || data === void 0 ? void 0 : data.customObject) === null || _62 === void 0 ? void 0 : _62.value.customerId) !== null && _63 !== void 0 ? _63 : ''
        };
    }
}
exports.getTicketFromCO = getTicketFromCO;
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
