"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreateTicketDraft = exports.getCreateTicketMutaion = exports.getTicketContactTypes = exports.getTicketPriorityValues = exports.getTicketCategories = exports.getTicketRows = void 0;
var constants_1 = require("../constants");
var graphql_queries_1 = require("../graphql-queries");
function getTicketRows(customObjects) {
    //
    console.log("customObjects :: " + JSON.stringify(customObjects));
    if (customObjects === null || customObjects === void 0 ? void 0 : customObjects.results) {
        return customObjects === null || customObjects === void 0 ? void 0 : customObjects.results.map(function (co) {
            return { id: co.value.id,
                Customer: co.value.email, Created: co.value.createdAt, Modified: co.value.modifiedAt,
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
    var num = getRandomInt(1, 2000);
    ticketDraft.key = getForKey(email) + "_" + num;
    ticketDraft.value = "{\n            \"id\": 1,\n            \"customerId\": \"31319151-a3ec-4c8b-8202-0d89723b9fd1\",\n            \"email\":\"" + email + "\",\n            \"source\": \"" + ticketInfo.contactType + "\",\n            \"status\": \"" + constants_1.TICKET_STATUS.open + "\",\n            \"priority\": \"" + ticketInfo.priority + "\",\n            \"category\": \"" + ticketInfo.category + "\",\n            \"subject\": \"" + ticketInfo.subject + "\",\n           \"type\":\"" + ticketInfo.category + "\",\n            \"createdAt\": \"" + currentDate + "\",\n            \"modifiedAt\": \"" + currentDate + "\",\n            \"ticketData\":{\t\n                    \"message\": \"" + ticketInfo.message + "\"\n            }\n        }";
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
