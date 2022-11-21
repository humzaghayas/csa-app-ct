"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadBytesResumable = exports.getDownloadURL = exports.ref = exports.storage = exports.app = exports.CONSTANTS = exports.escapeQuotes = exports.isEmailValid = exports.getTicketFromCO = exports.getCreateTicketDraft = exports.getTicketContactTypes = exports.getTicketPriorityValues = exports.getTicketCategories = exports.getTicketRows = exports.FETCH_CUSTOMERS = exports.CREATE_TICKET_MUTATION = exports.FETCH_TICKETS_BY_ID = exports.FETCH_TICKETS = void 0;
var graphql_queries_1 = require("./graphql-queries");
Object.defineProperty(exports, "FETCH_TICKETS", { enumerable: true, get: function () { return graphql_queries_1.FETCH_TICKETS; } });
Object.defineProperty(exports, "FETCH_TICKETS_BY_ID", { enumerable: true, get: function () { return graphql_queries_1.FETCH_TICKETS_BY_ID; } });
Object.defineProperty(exports, "CREATE_TICKET_MUTATION", { enumerable: true, get: function () { return graphql_queries_1.CREATE_TICKET_MUTATION; } });
Object.defineProperty(exports, "FETCH_CUSTOMERS", { enumerable: true, get: function () { return graphql_queries_1.FETCH_CUSTOMERS; } });
var helper_methods_1 = require("./helper-methods");
Object.defineProperty(exports, "getTicketRows", { enumerable: true, get: function () { return helper_methods_1.getTicketRows; } });
Object.defineProperty(exports, "getTicketCategories", { enumerable: true, get: function () { return helper_methods_1.getTicketCategories; } });
Object.defineProperty(exports, "getTicketPriorityValues", { enumerable: true, get: function () { return helper_methods_1.getTicketPriorityValues; } });
Object.defineProperty(exports, "getTicketContactTypes", { enumerable: true, get: function () { return helper_methods_1.getTicketContactTypes; } });
Object.defineProperty(exports, "getCreateTicketDraft", { enumerable: true, get: function () { return helper_methods_1.getCreateTicketDraft; } });
Object.defineProperty(exports, "getTicketFromCO", { enumerable: true, get: function () { return helper_methods_1.getTicketFromCO; } });
Object.defineProperty(exports, "isEmailValid", { enumerable: true, get: function () { return helper_methods_1.isEmailValid; } });
Object.defineProperty(exports, "escapeQuotes", { enumerable: true, get: function () { return helper_methods_1.escapeQuotes; } });
var constants_1 = require("./constants");
Object.defineProperty(exports, "CONSTANTS", { enumerable: true, get: function () { return constants_1.CONSTANTS; } });
var firebase_1 = require("./firebase");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return firebase_1.app; } });
Object.defineProperty(exports, "storage", { enumerable: true, get: function () { return firebase_1.storage; } });
var storage_1 = require("firebase/storage");
Object.defineProperty(exports, "ref", { enumerable: true, get: function () { return storage_1.ref; } });
Object.defineProperty(exports, "getDownloadURL", { enumerable: true, get: function () { return storage_1.getDownloadURL; } });
Object.defineProperty(exports, "uploadBytesResumable", { enumerable: true, get: function () { return storage_1.uploadBytesResumable; } });
