import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (customer,customeCustomerFields, languages) => {
  
    let profile = {
      firstName: customer?.firstName ?? '',
      middleName: customer?.middleName ?? '',
      lastName: customer?.lastName ?? '',
      //email: customer?.email ?? '',
      dateOfBirth: customer?.dateOfBirth ?? '',
      customerNumber: customer?.customerNumber ?? '',
      customerGroup:customer?.customerGroup?.name ?? '',
      companyName:customer?.companyName ?? '',
      externalId: customer?.externalId ?? '',
      occupation:customeCustomerFields?.occupation ?? '',
      preferredLanguage: '',
      ageGroup: '',
      gender: '',
      preferredCurrency: '',
  }

  if(customeCustomerFields?.occupation){
    profile.occupation =customeCustomerFields?.occupation ;
  }

  if(customeCustomerFields?.preferredLanguage && customeCustomerFields?.preferredLanguage.length > 0){
    profile.preferredLanguage =customeCustomerFields?.preferredLanguage;
  
  }
  if(customeCustomerFields?.ageGroup && customeCustomerFields?.ageGroup.length > 0){
    profile.ageGroup =customeCustomerFields?.ageGroup;
  
  }
  if(customeCustomerFields?.gender && customeCustomerFields?.gender.length > 0){
    profile.gender =customeCustomerFields?.gender;
  
  }
  if(customeCustomerFields?.preferredCurrency && customeCustomerFields?.preferredCurrency.length > 0){
    profile.preferredCurrency =customeCustomerFields?.preferredCurrency;
  
  }

return profile;

};

export const formValuesToDoc = (formValues) => ({
  firstName: !TextInput.isEmpty(formValues.firstName)
  ? formValues.firstName
  : undefined,
  dateOfBirth: !TextInput.isEmpty(formValues.dateOfBirth)
  ? formValues.dateOfBirth
  : undefined,
  companyName: !TextInput.isEmpty(formValues.companyName)
  ? formValues.companyName
  : undefined,
  custom:{
    type:{
      key:"profileFields",
      typeId:"type"
    },
    fields: getCustomFields(formValues)
  },
  // customerGroup:{
  //   id:"",
  //   typeId:"customer-group"
  // }

  });

  const getCustomFields = (formValues)=>{
    const fields = [];
    
    if(formValues?.occupation){
      fields.push(
        {
        name: "occupation",
        value : JSON.stringify(formValues?.occupation)
      }
      )
    }

    if(formValues?.preferredLanguage){
      fields.push(
        {
          name: "preferredLanguage",
          value : JSON.stringify(formValues.preferredLanguage)
        }
      )
    }
    if(formValues?.ageGroup){
      fields.push(
        {
          name:"ageGroup",
          value : JSON.stringify(formValues?.ageGroup)
        }
      )
    }
    if(formValues?.gender){
      fields.push(
        {
          name:"gender",
          value: JSON.stringify(formValues?.gender)
        }
      )
    }
    if(formValues?.preferredCurrency){
      fields.push(
        {
          name: "preferredCurrency",
          value: JSON.stringify(formValues?.preferredCurrency)
        }
      )
    }

    return fields;
  }