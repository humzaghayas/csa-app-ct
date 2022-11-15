export function getTicketRows(customObjects){

//
    console.log("customObjects :: " +JSON.stringify(customObjects));
    if(customObjects?.results){
        return customObjects?.results.map(co =>{
            return { id: co.value.id,
                Customer: co.value.email,Created: co.value.changes.createdAt,Modified:co.value.changes.modifiedAt,
                Source:co.value.source,Status:co.value.status,Priority:co.value.priority,Category:co.value.category,
                Subject:co.value.changes.subject}
        });
    }

    // return {};
   return []
}