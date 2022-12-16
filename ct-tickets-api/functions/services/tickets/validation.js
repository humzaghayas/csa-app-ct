
module.exports = ()=>{

    const validateTicket = {};

    validateTicket.validate = async(data)=>{

        let isValid = {isError:false,errors:[]};

        if (!data.customerId || data.customerId == '') isValid.errors.push('customerId Missing!');
        if (!data.email || data.email == '') isValid.errors.push('Email Missing!');
            
        if (!data.contactType || data.contactType == '') isValid.errors.push('ContactType Field Missing!');
        if (!data.priority || data.priority == '') isValid.errors.push('Priority Field Missing!');
      
        if (!data.subject || data.subject == '' ) isValid.errors.push('Subject Field Missing!');
        if (!data.message || data.message == '') isValid.errors.push('Message Field Missing!');
      
      
        if (!data.category || data.category == ''){
            isValid.errors.push('Category Field Missing!');
          
        }
        
        // else if( formikValues.category== CONSTANTS.TICKET_TYPE_ORDER_INQUIRY
        //   || formikValues.category== CONSTANTS.TICKET_TYPE_PAYMENT_METHODS
        //   || formikValues.category==CONSTANTS.TICKET_TYPE_RETURNS){
      
        //     if (!data.orderNumber) isValid.errors.push('OrderNumber Field Missing!');
        // }

        if(isValid.errors.length > 0){
            isValid.isError = true;
        }

        return isValid;
    };

    return validateTicket;
}