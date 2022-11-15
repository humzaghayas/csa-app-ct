"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketRows = void 0;
function getTicketRows(customObjects) {
    //
    console.log("customObjects :: " + JSON.stringify(customObjects));
    if (customObjects === null || customObjects === void 0 ? void 0 : customObjects.results) {
        return customObjects === null || customObjects === void 0 ? void 0 : customObjects.results.map(function (co) {
            return { id: co.value.id,
                Customer: co.value.email, Created: co.value.changes.createdAt, Modified: co.value.changes.modifiedAt,
                Source: co.value.source, Status: co.value.status, Priority: co.value.priority, Category: co.value.category,
                Subject: co.value.changes.subject };
        });
    }
    // return {};
    return [];
}
exports.getTicketRows = getTicketRows;
