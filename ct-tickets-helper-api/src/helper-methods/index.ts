import { TICKET_TYPE,TICKET_PRIORITIY_VALUES,TICKET_SOURCE, CONSTANTS, TICKET_STATUS } from "../constants";
import { CREATE_TICKET_MUTATION } from "../graphql-queries";

export function getTicketRows(customObjects){

//
    console.log("customObjects :: " +JSON.stringify(customObjects));
    if(customObjects?.results){
        return customObjects?.results.map(co =>{
            return { id: co.id,
                Customer: co.value.email,Created: co.createdAt,Modified:co.lastModifiedAt,
                Source:co.value.source,Status:co.value.status,Priority:co.value.priority,Category:co.value.category,
                Subject:co.value.subject}
        });
    }

    // return {};
   return []
}

export function getTicketCategories(){

    return TICKET_TYPE
}

export function getTicketPriorityValues(){

    return TICKET_PRIORITIY_VALUES
}

export function getTicketContactTypes(){

    return TICKET_SOURCE;
}

let ticketDraft:any ={"container": CONSTANTS.containerKey};

export function getCreateTicketMutaion(){

    return CREATE_TICKET_MUTATION;
}

export function getCreateTicketDraft(ticketInfo){

    const currentDate = new Date().toUTCString();
    const email = "humza.ghayas@royalcyber.com";

    if(!ticketInfo.key){
        const num = getRandomInt(1,2000);
        ticketDraft.key = `${getForKey(email)}_${num}`;
    }else{
        ticketDraft.key = ticketInfo.key;
    }

    if(ticketInfo.category && ticketInfo.category !== 'request'){
        ticketDraft.value = `{
                \"id\": 1,
                \"customerId\": \"31319151-a3ec-4c8b-8202-0d89723b9fd1\",
                \"email\":\"${email}\",
                \"source\": \"${ticketInfo.contactType}\",
                \"status\": \"${TICKET_STATUS.open}\",
                \"priority\": \"${ticketInfo.priority}\",
                \"category\": \"${ticketInfo.category}\",
                \"subject\": \"${ticketInfo.subject}\",
            \"type\":\"${ticketInfo.category}\",
                \"createdAt\": \"${currentDate}\",
                \"modifiedAt\": \"${currentDate}\",
                \"ticketData\":{	
                        \"message\": \"${ticketInfo.message}\"
                }
            }`
    }else{
        ticketDraft.value = `{
            \"id\": 1,
            \"customerId\": \"31319151-a3ec-4c8b-8202-0d89723b9fd1\",
            \"email\":\"${email}\",
            \"source\": \"${ticketInfo.contactType}\",
            \"status\": \"${TICKET_STATUS.open}\",
            \"priority\": \"${ticketInfo.priority}\",
            \"category\": \"${ticketInfo.category}\",
            \"subject\": \"${ticketInfo.subject}\",
        \"type\":\"${ticketInfo.category}\",
            \"createdAt\": \"${currentDate}\",
            \"modifiedAt\": \"${currentDate}\",
            \"ticketData\":{	
                    \"firstName\": \"${ticketInfo.firstName}\",
                    \"lastName\": \"${ticketInfo.lastName}\"
            }
        }`
    }
    return ticketDraft;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  function getForKey(email){
    return email.replace("@","ATTHERATE")
  }


  export function getTicketFromCO(data){

    return {
        id: data?.customObject?.id ?? '',
        key: data?.customObject?.key ?? '',
        container: data?.customObject?.container ?? '',
        version: data?.customObject?.version ?? '',
        category: data?.customObject?.value?.category ?? '',
        Customer: data?.customObject?.value?.email ?? '',
        contactType: data?.customObject?.value?.source ?? '',
        Status: data?.customObject?.value?.status ?? '',
        priority: data?.customObject?.value?.priority ?? '',
        message: data?.customObject?.value?.ticketData?.message ?? '',
        subject: data?.customObject?.value?.subject ?? '',
        firstName : data?.customObject?.value?.ticketData?.firstName ?? '',
        lastName : data?.customObject?.value?.ticketData?.lastName ?? '',
        lastModifiedAt : data?.customObject?.lastModifiedAt ?? '',
        createdAt : data?.customObject?.createdAt ?? '',
        email: data?.customObject?.email ?? ''
    }
}