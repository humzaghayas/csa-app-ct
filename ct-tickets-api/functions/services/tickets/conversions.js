const {CONSTANTS, escapeQuotes} =require('ct-tickets-helper-api');
const dataToFormValues = async(ticket,isEdit) => {
  let data = dataToFormCommonValues(ticket,isEdit);
  data.files =ticket?.files ?? [];
  data.message= escapeQuotes(ticket?.message )?? '';
  data.comments =ticket?.comments ?? [];
  data.history =ticket?.history ?? [];

  if(data.category && (data.category == CONSTANTS.TICKET_TYPE_ORDER_INQUIRY
    || data.category == CONSTANTS.TICKET_TYPE_PAYMENT_METHODS
    || data.category == CONSTANTS.TICKET_TYPE_RETURNS)){
      data.orderNumber = ticket?.orderNumber ?? '';
    }

  if(!ticket?._id){
    data.status = CONSTANTS.TICKET_INITIAL_STATUS;
  }else{
    data.status = ticket.status;
  }

  if(ticket?._id ){
    data._id= ticket._id;
  }
  return data;
}



const dataToFormCommonValues=(ticket,isEdit)=>(
  {
    id: ticket?.id ?? '',
    key: ticket?.key ?? '',
    email : ticket?.email ?? '',
    customerId : ticket?.customerId ?? '',
    container: ticket?.container ?? '',
    version: ticket?.version ?? '',
    source:ticket?.source ?? '',
    category: ticket?.category ?? '',
    contactType: ticket?.contactType ?? '',
    priority: ticket?.priority ?? '',
    subject: escapeQuotes(ticket?.subject) ?? '',
    isEdit:isEdit ?? false,
    createdBy:ticket?.createdBy ?? '',
    assignedTo:ticket?.assignedTo ?? '',
    timeSpentOnTicket:ticket?.timeSpentOnTicket ?? 0
  }
);

module.exports={dataToFormValues}
