"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_TYPES = exports.TICKET_WORKFLOW = exports.TICKET_TYPE = exports.CONSTANTS = exports.TICKET_PRIORITIY_VALUES = exports.TICKET_SOURCE = exports.TICKET_STATUS = void 0;
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
exports.TICKET_PRIORITIY_VALUES = {
    Low: "Low",
    normal: "Normal",
    high: "High",
    medium: "Medium"
};
exports.CONSTANTS = {
    containerKey: "ticket-container",
    TICKET_TYPE_REQUEST: 'request',
    TICKET_TYPE_INQUIRY: 'inquiry',
    TICKET_TYPE_QUERY: 'query',
    USER_CONTRAINER_KEY: "mc-users",
    USER_CONTAINER: "mc-user-info",
    TICKET_DATA: "{{TICKET_DATA}}",
    REQUEST_TYPE_RESET_PASSWORD: 'passwordReset',
    REQUEST_TYPE_GENERAL_INFO_CHANGE: 'generalInfoChange',
    REQUEST_TYPE_ADD_ADDRESS: 'addAddress',
    REQUEST_TYPE_CHANGE_ADDRESS: 'changeAddress'
};
exports.TICKET_TYPE = (_a = {},
    _a[exports.CONSTANTS.TICKET_TYPE_QUERY] = "Query",
    _a[exports.CONSTANTS.TICKET_TYPE_REQUEST] = "Request",
    _a[exports.CONSTANTS.TICKET_TYPE_INQUIRY] = "Inquiry",
    _a);
exports.TICKET_WORKFLOW = {
    pending: "Pending",
    approve: "Approve",
    reject: "Reject",
    resolved: "Resolved"
};
exports.REQUEST_TYPES = (_b = {},
    _b[exports.CONSTANTS.REQUEST_TYPE_RESET_PASSWORD] = "Password Reset",
    _b[exports.CONSTANTS.REQUEST_TYPE_GENERAL_INFO_CHANGE] = "General Info Change",
    _b[exports.CONSTANTS.REQUEST_TYPE_ADD_ADDRESS] = "Add Address",
    _b[exports.CONSTANTS.REQUEST_TYPE_CHANGE_ADDRESS] = "Change Address",
    _b);
