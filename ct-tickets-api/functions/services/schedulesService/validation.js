module.exports = ()=>{

    const scheduleValidate = {};

    scheduleValidate.validate = async(data)=>{

        let isValid = {isError:false,errors:[]};

        if (!data.customerId || data.customerId == '') isValid.errors.push('Customer Id is required field');
        if (!data.scheduleDate || data.scheduleDate == '') isValid.errors.push('Schedule date is required field');
        if (!data.repeat || data.repeat == '') isValid.errors.push('Repeat is required field and options are month, 2month, 3month');
        if (!data.orderId || data.orderId == '') isValid.errors.push('OrderId is required field');
        // if (!data.isActive || data.isActive == '' ) isValid.errors.push('Schedule status isActive is required field');
        if (!data.createdBy || data.createdBy == '') isValid.errors.push('Created by is required field');
      
        if(isValid.errors.length > 0){
            isValid.isError = true;
        }

        return isValid;
    };

    return scheduleValidate;
}