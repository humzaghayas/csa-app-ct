"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANTS = exports.TICKET_PRIORITIY_VALUES = exports.REQUEST_TYPES = exports.TICKET_SOURCE = exports.TICKET_STATUS = exports.TICKET_TYPE = void 0;
exports.TICKET_TYPE = {
    query: "Query",
    request: "Request",
    inquery: "Inquiry"
};
exports.TICKET_STATUS = {
    new: "New",
    open: "Open",
    inprogress: "In Progress",
    closed: "Closed"
};
exports.TICKET_SOURCE = {
    phone: "Phone",
    email: "E-Mail"
};
exports.REQUEST_TYPES = {
    passwordReset: "Password Reset",
    addressChange: "Address Change",
    generalInfoChange: "General Info Change"
};
exports.TICKET_PRIORITIY_VALUES = {
    Low: "Low",
    normal: "Normal",
    high: "High",
    medium: "Medium"
};
exports.CONSTANTS = {
    containerKey: "ticket-container"
};
