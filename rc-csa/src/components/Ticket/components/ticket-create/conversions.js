import { TextInput } from '@commercetools-frontend/ui-kit';
import {CONSTANTS, escapeQuotes} from 'ct-tickets-helper-api'
export const docToFormValues = (ticket, languages,isEdit) => {
  let doc = docToFormCommonValues(ticket,isEdit);

  if(ticket?.category && ticket?.category !== CONSTANTS.TICKET_TYPE_REQUEST){
    doc.message= ticket?.message ?? '';
    doc.files =ticket?.files ?? [];
  }else{
    doc.requestType = ticket?.requestType ?? '';
    if(ticket?.requestType && ticket?.requestType == CONSTANTS.REQUEST_TYPE_GENERAL_INFO_CHANGE){
      doc.firstName =ticket?.firstName ?? '';
      doc.lastName = ticket?.lastName ?? '';
      doc.middleName=ticket?.middleName  ?? '';
      doc.title=ticket?.title ?? '';
      doc.dateOfBirth=ticket?.dateOfBirth  ?? '';
      doc.companyName=ticket?.companyName  ?? '';
      doc.addresses=ticket?.addresses  ?? '';
      doc.salutation=ticket?.salutation ?? '';
    }
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

    doc.requestType= !TextInput.isEmpty(formValues.requestType) 
      ? formValues.requestType
      : '';

      if(formValues.requestType && formValues.requestType == CONSTANTS.REQUEST_TYPE_GENERAL_INFO_CHANGE){ 
        doc.firstName= !TextInput.isEmpty(formValues.firstName) 
          ? escapeQuotes(formValues.firstName)
          : '';
          

        doc.lastName=!TextInput.isEmpty(formValues.lastName)
          ? escapeQuotes(formValues.lastName)
          : '';

          doc.middleName= !TextInput.isEmpty(formValues.middleName)
            ? escapeQuotes(formValues.middleName)
            : doc.middleName= '';

          doc.title= !TextInput.isEmpty(formValues.title)
            ? escapeQuotes(formValues.title)
            : doc.title= '';

          doc.dateOfBirth= !TextInput.isEmpty(formValues.dateOfBirth)
            ? escapeQuotes(formValues.dateOfBirth)
            : '';     

          doc.companyName= !TextInput.isEmpty(formValues.companyName)
            ? escapeQuotes(formValues.companyName)
            : doc.companyName= '';

          doc.salutation= !TextInput.isEmpty(formValues.salutation)
            ? escapeQuotes(formValues.salutation)
            : '';
      }else if(formValues.requestType && formValues.requestType == CONSTANTS.REQUEST_TYPE_ADD_ADDRESS){
            console.log('Add address in developent phase' );
        }

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