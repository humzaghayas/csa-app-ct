import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (order, languages) => ({
  id:order?.id,
  version:order?.version,
  quantity:order?.lineItems.map(item => item.quantity).reduce((a,b)=>a+b,0),
  streetNumber:order?.shippingAddress?.streetNumber,
  streetName:order?.shippingAddress?.streetName,
  postalCode:order?.shippingAddress?.postalCode,
  country:order?.shippingAddress?.country,
  city:order?.shippingAddress?.city,
  state:order?.shippingAddress?.state,
  building:order?.shippingAddress?.building,
  shippingMethod:{
    value:order?.shippingInfo?.shippingMethod?.id,
    label:order?.shippingInfo?.shippingMethodName
  }
});


export const formValuesToDoc = (formValues) => (
  {
    orderId:formValues?.id,
    version:formValues?.version,
    actions:[
      {
        "setShippingAddress":{
          "address":{
            country:formValues?.country,
            streetName:formValues?.streetName,
            streetNumber:formValues?.streetNumber,
            postalCode:formValues?.postalCode,
            city:formValues?.city,
            state:formValues?.state,
            building:formValues?.building
          }
        }
      }
    ]
  }
);

export const shippingMethodOptions = (shippingMethods,country) =>(
  shippingMethods?.map((shippingMethod)=>{
    return {
        value:shippingMethod?.id,
        label:shippingMethod?.name
    }
  })
)