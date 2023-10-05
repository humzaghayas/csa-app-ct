const dataToFormValues = async(schedule,isEdit) => {
    let data ={
        id: schedule?.id? schedule?.id : schedule?._id ?? '',
        customerId : schedule?.customerId ?? '',
        createdBy:schedule?.createdBy ?? '',
        scheduleDate:schedule?.scheduleDate ?? '',
        repeat:schedule?.repeat ?? 'month',
        // cartId:schedule?.cartId ?? '',
        orderId:schedule?.orderId,
        isActive:schedule?.isActive ?? true,
        isEdit:isEdit ?? false,
    }  
  return data;
}

module.exports={dataToFormValues}
