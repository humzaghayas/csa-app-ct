"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TICKET_TYPE = exports.CONSTANTS = exports.TICKET_PRIORITIY_VALUES = exports.TICKET_SOURCE = exports.TICKET_WORKFLOW = exports.TICKET_STATUS = void 0;
exports.TICKET_STATUS = {
    new: { name: "new", label: "New" },
    open: { name: "open", label: "Open" },
    inprogress: { name: "inprogress", label: "In Progress" },
    rejected: { name: "reject", label: "Reject" },
    done: { name: "done", label: "Done" },
    closed: { name: "closed", label: "Closed" }
};
exports.TICKET_WORKFLOW = (_a = {},
    _a[exports.TICKET_STATUS["new"]["name"]] = [exports.TICKET_STATUS.open],
    _a[exports.TICKET_STATUS["open"]["name"]] = [exports.TICKET_STATUS.inprogress, exports.TICKET_STATUS.rejected],
    _a[exports.TICKET_STATUS["inprogress"]["name"]] = [exports.TICKET_STATUS.done, exports.TICKET_STATUS.rejected],
    _a[exports.TICKET_STATUS["done"]["name"]] = [exports.TICKET_STATUS.closed],
    _a[exports.TICKET_STATUS["closed"]["name"]] = [],
    _a[exports.TICKET_STATUS["rejected"]["name"]] = [],
    _a);
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
    USER_CONTRAINER_KEY: "mc-users",
    USER_CONTAINER: "mc-user-info",
    TICKET_DATA: "{{TICKET_DATA}}",
    TICKET_TYPE_RESET_PASSWORD: 'passwordReset',
    TICKET_TYPE_GENERAL_INFO_CHANGE: 'generalInfoChange',
    TICKET_TYPE_ORDER_INQUIRY: 'orderInquiry',
    TICKET_TYPE_PAYMENT_METHODS: 'paymentMethod',
    TICKET_TYPE_RETURNS: 'returns',
    TICKET_INITIAL_STATUS: exports.TICKET_STATUS.new.name
};
exports.TICKET_TYPE = (_b = {},
    _b[exports.CONSTANTS.TICKET_TYPE_REQUEST] = "Request",
    _b[exports.CONSTANTS.TICKET_TYPE_GENERAL_INFO_CHANGE] = "General Info Change",
    _b[exports.CONSTANTS.TICKET_TYPE_RESET_PASSWORD] = "Password Reset",
    _b[exports.CONSTANTS.TICKET_TYPE_ORDER_INQUIRY] = "Order Inquiry",
    _b[exports.CONSTANTS.TICKET_TYPE_PAYMENT_METHODS] = "Payment Methods",
    _b[exports.CONSTANTS.TICKET_TYPE_RETURNS] = "Returns",
    _b);
