import { TextInput } from '@commercetools-frontend/ui-kit';
import {CONSTANTS, escapeQuotes} from 'ct-tickets-helper-api'
export const docToFormValues = (ticket, languages,isEdit) => {
  let doc = docToFormCommonValues(ticket,isEdit);

  if(ticket?.category && ticket?.category !== CONSTANTS.TICKET_TYPE_REQUEST){
    doc.message= ticket?.message ?? '';
    doc.files =ticket?.files ?? [];
  }else{
    doc.firstName =ticket?.firstName ?? '';
    doc.lastName = ticket?.lastName ?? '';
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
  
  if(formValues.category && formValues.category == CONSTANTS.TICKET_TYPE_REQUEST){ 
    doc.firstName= !TextInput.isEmpty(formValues.firstName)
      ? escapeQuotes(formValues.firstName)
      : undefined;
    doc.lastName= !TextInput.isEmpty(formValues.lastName)
      ? escapeQuotes(formValues.lastName)
      : undefined;
  }else{
    doc.message= !TextInput.isEmpty(formValues.message)
      ? escapeQuotes(formValues.message)
      : undefined;
    doc.files=  formValues?.files ?? null;
  }
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
    : undefined
    });