const all = 'all';
const customerEmail = 'customerEmail';
const firstName = 'firstName';
const lastName  = 'lastName';
const orderNumber = 'orderNumber';
const sku   =  'lineItems.variant.sku';
const store = 'store';
const city  = 'city';
const company = 'company';
const country = 'country';
const createdByAnonymousId ='createdBy.anonymousId';
const createdByClientId='createdBy.clientId';
const createdByExternalUserId='createdBy.externalUserId';
const customerGroup='customerGroup.name';
const lastModifiedBy='lastModifiedBy.clientId';
const lineItem='lineItems.name';
const paymentInteractionId='paymentInfo.payments.interfaceId';
const paymentinterfaceId='paymentInfo.payments.interfaceId';
const paymenttransactionsId='paymentInfo.payments.transactions.id';
const paymenttransactionsInteractionId='paymentInfo.payments.transactions.interactionId';
const phoneNumber='phone';
const postalCode='postalCode';
const productId='lineItems.productId';
const returnTrackingId='returnInfo.returnTrackingId';
const orderStatus='orderState';
const isScheduleOrder='custom.isScheduleOrder';
const scheduleDate='custom.scheduleDate';

export const orderSearchOptions = [
    { value: all, label: 'All fields' },
    { value: customerEmail, label: 'Customer email address' },
    { value: firstName, label: 'First name' },
    { value: lastName, label: 'Last name' },
    { value: orderNumber, label: 'Order number' },
    { value: sku, label: 'SKU' },
    { value: store, label: 'Store' },
    { value: city, label: 'City' },
    { value: company, label: 'Company' },
    { value: country, label: 'Country' },
    { value: createdByAnonymousId, label: 'Created by anonymous ID' },
    { value: createdByClientId, label: 'Created by client ID' },
    { value: createdByExternalUserId, label: 'Created by external ID' },
    { value: customerGroup, label: 'Customer group' },
    { value: lastModifiedBy , label: 'Last modified by' },
    { value: lineItem , label: 'Line item' },
    { value: paymentInteractionId , label: 'Payment interaction ID' },
    { value: paymentinterfaceId , label: 'Payment interface ID' },
    { value: paymenttransactionsId , label: 'Payment transactions ID' },
    { value: paymenttransactionsInteractionId , label: 'Payment transactions interaction ID' },
    { value: phoneNumber , label: 'Phone number' },
    { value: postalCode , label: 'Postal code' },
    { value: productId , label: 'Product Id' },
    { value: returnTrackingId , label: 'Return tracking ID' },
    { value: orderStatus , label: 'Order Status' },
    { value: isScheduleOrder , label: 'Schedule Order' },
    { value: scheduleDate , label: 'Schedule Order Date' },
]


export const queryBuilderHelper = (option,optionValue) => {

    const query = {};

    switch(option){
        case postalCode:
        case phoneNumber:
        case country:
        case company:
        case city:
        case lastName:
        case firstName:
            console.log(option)
            query.or= fullTextuQuery(
                ["billingAddress."+option,"itemShippingAddresses."+option,"shippingAddress."+option],
                optionValue)
            return query;
        case orderNumber:
            query.exact={
                field:orderNumber,
                value:optionValue
            }
            return query;
        case store:
            query.or=[
                {
                    exact:{
                        field:"store.key",
                        value:optionValue
                    }
                },
                {
                    fullText:{
                        field:"store.name",
                        value:optionValue,
                        language:"en-US"
                    }
                }
            ]
            return query;
        case paymenttransactionsId:
        case productId:
        case returnTrackingId:
        case paymenttransactionsInteractionId:
        case paymentinterfaceId:
        case paymentInteractionId:
        case createdByExternalUserId:
        case createdByAnonymousId:
            query.exact={
                field:option,
                value:optionValue
            }
            return query;
        case lineItem:
            query.fullText={
                field:option,
                value:optionValue,
                language:"en-US"
            }
            return query;
        case isScheduleOrder:
            query.exact={
                field:isScheduleOrder,
                value:optionValue?true:false,
                customType:"BooleanType"
            }
            return query;
        case scheduleDate:
            query.exact={
                field:scheduleDate,
                value:optionValue,
                customType:"SetType.DateType"
            }
            return query;
        default:
            query.fullText = {
                field:option,
                value:optionValue
            }
            return query;
    }


}


const fullTextuQuery = (fields,value) =>(
    fields?.map(field=>{
        return {
            fullText:{
                field:field,
                value:value ? value : ""
            }
        }
    })
)

export const getOrderIds = (orderHits) =>{
    let orderIds = [];
    orderHits?.forEach(e => {
        orderIds.push(e?.id)
    });
    return orderIds;
}