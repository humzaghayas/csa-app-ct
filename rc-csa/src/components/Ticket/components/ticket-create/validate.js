import TextInput from '@commercetools-uikit/text-input';
import omitEmpty from 'omit-empty-es';
import{CONSTANTS} from 'ct-tickets-helper-api'

const validate = (formikValues) => {
  const errors = {
    category: {},
    contactType: {},
    priority: {},
    message: {},
    subject: {},
    orderNumber: {}
   // assignedTo:{}
  };

  const EMAIL_REGEX = /^[\wäöüÄÖÜß._%+-]+@[\wäöüÄÖÜß.-]+\.[A-Z]{2,}$/i;

  
  if (TextInput.isEmpty(formikValues.contactType)) errors.contactType.missing = true;
  if (TextInput.isEmpty(formikValues.priority)) errors.priority.missing = true;

  if (TextInput.isEmpty(formikValues.subject)) errors.subject.missing = true;
  if (TextInput.isEmpty(formikValues.message)) errors.message.missing = true;


  if (TextInput.isEmpty(formikValues.category)){
     errors.category.missing = true
    
  }else if( formikValues.category== CONSTANTS.TICKET_TYPE_ORDER_INQUIRY
    || formikValues.category== CONSTANTS.TICKET_TYPE_PAYMENT_METHODS
    || formikValues.category==CONSTANTS.TICKET_TYPE_RETURNS){

      if (TextInput.isEmpty(formikValues.orderNumber)) errors.orderNumber.missing = true;
  }


  return omitEmpty(errors);
};

export default validate;
