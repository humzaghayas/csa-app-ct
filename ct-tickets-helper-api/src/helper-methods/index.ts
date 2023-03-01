import { TICKET_TYPE,TICKET_PRIORITIY_VALUES,TICKET_SOURCE, CONSTANTS, TICKET_STATUS } from "../constants";
import { CREATE_CUSTOMOBJECT_MUTATION } from "../graphql-queries";
import { v4 as uuidv4 } from 'uuid';
import { InvoiceNumber } from 'invoice-number';

export function getTicketRows(customObjects){

//
    console.log("customObjects :: " +JSON.stringify(customObjects));
    if(customObjects?.results){
        return customObjects?.results.map(co =>{
            return { id: co.id,
                ticketNumber:co.value.ticketNumber,
                Customer: co.value.email,
                Created: co.createdAt,
                Modified:co.lastModifiedAt,
                Source:co.value.source,
                status:co.value.status,
                Priority:co.value.priority,
                Category:co.value.category,
                Subject:co.value.subject,
                assignedTo:co.value.assignedTo,
                createdBy:co.value.createdBy}
        });
    }

    // return {};
   return []
}

export function getOrderRows(orderPaginationResult){
    if(orderPaginationResult?.results){
        return orderPaginationResult?.results.map(order =>{
            return {
                id:order?.id, 
                orderNumber: order?.orderNumber,
                customer: order?.customer?.firstName+" "+order?.customer?.lastName,
                createdAt: order?.createdAt,
                lastModifiedAt:order?.lastModifiedAt,
                orderState:order?.orderState,
                shipmentStatus:order?.shipmentStatus,
                paymentStatus:order?.paymentStatus,
                shippingMethodName:order?.shippingInfo?.shippingMethodName,
                orderTotal:order?.orderTotal,
                noOforderItems:order?.lineitems?.length,
                totalItems:order?.lineitems?.quantity
            }
        });
    }
}

export function getCartRows(cartPaginationResult){
    console.log(cartPaginationResult.results);
    if(cartPaginationResult?.results){
        return cartPaginationResult?.results.map(carts =>{
            return {
                id:carts.id, 
                customer: carts.customer?.firstName+" "+carts.customer?.lastName,
                createdAt: carts.createdAt,
                lastModifiedAt:carts.lastModifiedAt,
                cartState:carts.cartState,
                // orderTotal:cart?.orderTotal,
                // noOforderItems:cart?.lineitems?.length,
                // totalItems:cart?.lineitems?.quantity
                
            }
        });
    }
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

    return CREATE_CUSTOMOBJECT_MUTATION;
}

export async function getCreateTicketDraft(ticketInfo){
    const email = ticketInfo.email;
    const uuid = uuidv4(); 

    if(!ticketInfo.key){
        ticketDraft.key = uuid;
    }else{
        ticketDraft.key = ticketInfo.key;
    }

    const filesStr = ticketInfo.files.map((f) =>{
        return `{\"name\":\"${f.name}\",\"url\":\"${f.url}\"}`
    }).toString();

    const d = new Date().toISOString();
    const commentsStr = ticketInfo?.comments?.map((c) =>{
        if(c.createdAt){
            return `{\"comment\":\"${c.comment}\",\"createdAt\":\"${c.createdAt}\"}`
        }else{
            return `{\"comment\":\"${c.comment}\",\"createdAt\":\"${d}\"}`
        }
    }).toString();

    
    let orderNumberStr = '';
    if(ticketInfo.category && (ticketInfo.category == CONSTANTS.TICKET_TYPE_ORDER_INQUIRY
        || ticketInfo.category == CONSTANTS.TICKET_TYPE_PAYMENT_METHODS
        || ticketInfo.category == CONSTANTS.TICKET_TYPE_RETURNS)){
        orderNumberStr = `,\"orderNumber\":\"${ticketInfo.orderNumber}\"`;
    }
    
    let value = `\"ticketData\":{	
        \"message\": \"${ticketInfo.message}\",
        \"files\": [${filesStr}],
        \"comments\":[${commentsStr}]
        ${orderNumberStr}}`;
        
    ticketDraft.value = getTicketValueString(ticketInfo,uuid);   
    ticketDraft.value =ticketDraft.value.replace(CONSTANTS.TICKET_DATA,value);
    return ticketDraft;
}

export async function createTicketHistory(ticketInfo,ticketDraft){

    let history = ticketInfo.history;
    if(!history){
        history = [];
    }

    let h = {user:ticketInfo.email};
    h[CONSTANTS.PRIORITY] = ticketInfo.priority;
    h[CONSTANTS.STATUS] = ticketInfo.status;
    h[CONSTANTS.ASSIGNED_TO] = ticketInfo.assignedTo;
    h['operationDate']= new Date().toUTCString();
    history.push(h);

    const historyString = history?.map((h) =>{
        return `{\"${CONSTANTS.PRIORITY}\":\"${h[CONSTANTS.PRIORITY] }\",
                \"${CONSTANTS.STATUS}\":\"${h[CONSTANTS.STATUS] }\",
                \"${CONSTANTS.ASSIGNED_TO}\":\"${h[CONSTANTS.ASSIGNED_TO] }\",
                \"user\":\"${h.user}\",\"operationDate\":\"${h.operationDate}\"}`
    }).toString();

    ticketDraft.value =  ticketDraft.value.replace(CONSTANTS.TICKET_HISTORY,`\"history\":[${historyString}]`);
}

function getTicketValueString( ticketInfo,uuid){

    const currentDate = new Date().toUTCString();
    const email = ticketInfo.email;
    const customerId = ticketInfo.customerId;
    let tNumber = ticketInfo.ticketNumber;

    if(!tNumber){
        tNumber = getInvoiceNumber();
    }

    return `{
        \"id\": \"${uuid}\",
        \"ticketNumber\":\"${tNumber}\",
        \"customerId\": \"${customerId}\",
        \"email\":\"${email}\",
        \"source\": \"${ticketInfo.contactType}\",
        \"status\": \"${ticketInfo.status}\",
        \"priority\": \"${ticketInfo.priority}\",
        \"category\": \"${ticketInfo.category}\",
        \"subject\": \"${ticketInfo.subject}\",
        \"type\":\"${ticketInfo.category}\",
        \"createdAt\": \"${currentDate}\",
        \"modifiedAt\": \"${currentDate}\",
        \"createdBy\":\"${ticketInfo.createdBy}\",
        \"assignedTo\":\"${ticketInfo.assignedTo}\",
        ${CONSTANTS.TICKET_DATA},
        ${CONSTANTS.TICKET_HISTORY}
    }`
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  export function getForKey(email){
    return email.replace("@","ATTHERATE")
  }


  export function getTicketFromCustomObject(data){

    let ticket = createTicketFromCustomObject(data); 

    ticket['message'] = data?.customObject?.value?.ticketData?.message ?? '';
    ticket['files'] = data?.customObject?.value?.ticketData?.files ?? '';
    ticket['comments'] = data?.customObject?.value?.ticketData?.comments ?? [];

    // if(data?.customObject?.value?.category === CONSTANTS.TICKET_TYPE_REQUEST){

    //     ticket['requestType'] = data?.customObject?.value?.ticketData?.requestType ?? '';
    //     if(data?.customObject?.value?.ticketData?.requestType == CONSTANTS.TICKET_TYPE_GENERAL_INFO_CHANGE){
    //         ticket['firstName'] = data?.customObject?.value?.ticketData?.firstName ?? '';
    //         ticket['lastName'] = data?.customObject?.value?.ticketData?.lastName ?? '';
    //         ticket['middleName'] = data?.customObject?.value?.ticketData?.middleName ?? '';
    //         ticket['salutation'] = data?.customObject?.value?.ticketData?.salutation ?? '';
    //         ticket['title'] = data?.customObject?.value?.ticketData?.title ?? '';
    //         ticket['dateOfBirth'] = data?.customObject?.value?.ticketData?.dateOfBirth ?? '';
    //         ticket['companyName'] = data?.customObject?.value?.ticketData?.companyName ?? '';
    //     }
       
    // }else{
    //     ticket['message'] = data?.customObject?.value?.ticketData?.message ?? '';
    //     ticket['files'] = data?.customObject?.value?.ticketData?.files ?? '';
    // }

    return ticket;
}

function createTicketFromCustomObject(data){

    return {
        id: data?.customObject?.id ?? '',
        ticketNumber: data?.customObject?.value?.ticketNumber ?? '',
        key: data?.customObject?.key ?? '',
        container: data?.customObject?.container ?? '',
        version: data?.customObject?.version ?? '',
        category: data?.customObject?.value?.category ?? '',
        Customer: data?.customObject?.value?.email ?? '',
        contactType: data?.customObject?.value?.source ?? '',
        status: data?.customObject?.value?.status ?? '',
        priority: data?.customObject?.value?.priority ?? '',
        subject: data?.customObject?.value?.subject ?? '',
        lastModifiedAt : data?.customObject?.lastModifiedAt ?? '',
        createdAt : data?.customObject?.createdAt ?? '',
        email: data?.customObject?.value.email ?? '',
        customerId: data?.customObject?.value.customerId ?? '',
        assignedTo: data?.customObject?.value.assignedTo ?? '',
        createdBy: data?.customObject?.value.createdBy ?? '',
        orderNumber: data?.customObject?.value?.ticketData?.orderNumber ?? '',
        history : data?.customObject?.value?.history ?? []
    }
}

export function escapeQuotes(field){
    return field.replaceAll('\"','\\\"').replaceAll('\n','\\n');
}


export function isEmailValid(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { 
        return true; 
    }

    return false;
}

let invoiceNumber ;

export function getInvoiceNumber(prefix="RC") {
    const today = new Date();

    invoiceNumber = invoiceNumber? InvoiceNumber.next(invoiceNumber) :
    `${today.getFullYear()}${today.getMonth()+1}${today.getDate()}-${today.getHours()}${today.getMinutes()}` ;

    return `${prefix}-${invoiceNumber}`
}

export function getPaymentList(orders){
    let paymentList = [];
    orders?.results?.forEach(o => {
        

        o.paymentInfo.payments.forEach(p =>{
          let payment ={};

          payment['orderNumber'] = o.id;

          if(p.transactions && p.transactions.length > 0){

            const trans = p.transactions.find(t => t.state === 'Success');
              if(trans){
                payment['status']= 'Completed';
                payment['paymentDate']=trans.timestamp;
              }else{ 
                const trans = p.transactions.find(t => t.state === 'Failure');
                if(trans){
                    payment['status']= 'Failure';
                    payment['paymentDate']=trans.timestamp;
                  }else {
                    const trans = p.transactions.find(t => t.state === 'Pending');
                    if(trans){
                        payment['status']= 'Not Complete';
                        payment['paymentDate']=trans.timestamp;
                      }else{
                        const trans = p.transactions.find(t => t.state === 'Initial');
                        if(trans){
                            payment['status']= 'Not Accepted';
                            payment['paymentDate']=trans.timestamp;
                          }else{
                            payment['status']= 'Not Initiated Yet!';
                          }
                      }
                  }
                } 
          }

          payment['paymentMethod'] = p.paymentMethodInfo.method;

          paymentList.push(payment);
        });
      });

      return paymentList;
    }