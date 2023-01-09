import { TextInput } from '@commercetools-frontend/ui-kit';
import {CONSTANTS, escapeQuotes} from 'ct-tickets-helper-api'
export const docToFormValues = (ticket, languages,isEdit) => {
  let doc = docToFormCommonValues(ticket,isEdit);
  doc.message= ticket?.message ?? '';
  doc.files =ticket?.files ?? [];

  doc.comments =ticket?.comments ?? [];


  if(doc.category && (doc.category == CONSTANTS.TICKET_TYPE_ORDER_INQUIRY
    || doc.category == CONSTANTS.TICKET_TYPE_PAYMENT_METHODS
    || doc.category == CONSTANTS.TICKET_TYPE_RETURNS)){
      doc.orderNumber = ticket?.orderNumber ?? '';
    }

  if(!ticket){
    doc.status = CONSTANTS.TICKET_INITIAL_STATUS;
  }else{
    doc.status = ticket.status;
  }
  return doc;
}

const docToFormCommonValues=(ticket,isEdit)=>(
  {
    id: ticket?.id ?? '',
    key: ticket?.key ?? '',
    email : ticket?.email ?? '',
    customerId : ticket?.customerId ?? '',
    container: ticket?.container ?? '',
    version: ticket?.version ?? '',
    category: ticket?.category ?? '',
    contactType: ticket?.contactType ?? '',
    priority: ticket?.priority ?? '',
    subject: ticket?.subject ?? '',
    isEdit:isEdit ?? false,
    createdBy:ticket?.createdBy ?? '',
    assignedTo:ticket?.assignedTo ?? ''
  }
);

export const formValuesToDoc = (formValues) => {
   
    let doc=formValuesToDocCommonValues(formValues);

    if(doc.category && (doc.category == CONSTANTS.TICKET_TYPE_ORDER_INQUIRY
      || doc.category == CONSTANTS.TICKET_TYPE_PAYMENT_METHODS
      || doc.category == CONSTANTS.TICKET_TYPE_RETURNS)){
        doc.orderNumber= !TextInput.isEmpty(formValues.orderNumber) 
          ? formValues?.orderNumber
          : undefined;
      }
    doc.message= !TextInput.isEmpty(formValues.message)
      ? escapeQuotes(formValues.message)
      : undefined;

      doc.comments = formValues.comments ?? [];
      // if(!TextInput.isEmpty(formValues.commentMessage)){
        
      //   doc.comments =formValues.comments.concat({"comment":escapeQuotes(formValues.commentMessage)});
      // }else{
      //   doc.comments =formValues.comments;
      // }

      if(formValues.comments && formValues.comments.length != 0){
        doc.comments = formValues.comments.map(c => {
          let cmt = {"comment":escapeQuotes(c.comment)};

          if(c.createdAt){
            cmt.createdAt = c.createdAt;
          }

          return cmt;
        })
      }
    doc.files=  formValues?.files ?? null;
  return doc;
};

  export const formValuesToDocCommonValues = (formValues) => ({
    id:formValues?.id ?? undefined,
    key:formValues?.key ?? undefined,
    customerId:formValues?.customerId ?? undefined,
    createdBy:formValues?.createdBy ?? undefined,
    assignedTo: !TextInput.isEmpty(formValues.assignedTo) 
    ? formValues.assignedTo : '',
    email: !TextInput.isEmpty(formValues.email)
    ? formValues.email
    : undefined,
    category: !TextInput.isEmpty(formValues.category)
    ? formValues.category
    : undefined,
    contactType: !TextInput.isEmpty(formValues.contactType)
    ? formValues.contactType
    : undefined,
    priority: !TextInput.isEmpty(formValues.priority)
    ? formValues.priority
    : undefined,
    subject: !TextInput.isEmpty(formValues.subject)
    ? escapeQuotes(formValues.subject)
    : undefined,
    status: !TextInput.isEmpty(formValues.status)
    ? formValues.status
    : '',
    });


    export const docToFormValuesCustomer= (doc,customer)=>{

        doc.firstName=customer.firstName;
        doc.lastName=customer.lastName;
        doc.middleName=customer.middleName;
        doc.title=customer.title;
        doc.dateOfBirth=customer.dateOfBirth;
        doc.companyName=customer.companyName;
        doc.addresses=customer.addresses;
        doc.salutation=customer.salutation;

    }