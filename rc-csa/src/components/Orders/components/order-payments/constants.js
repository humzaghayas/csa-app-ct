export const columns = [
    {key:'timestamp',label:'Date'},
    {key:'type',label:'Transaction type'},
    {key:'state',label:'Status'},
    {key:'amount',label:'Amount'},
    {key:'interactionId',label:'Interaction ID'},
    {key:'id',label:'Transaction ID'}
]

export const dummyRows = [
    {
        date:"Date",
        transactionType:"COD",
        status:"Pending",
        amount:"10536$",
        interactionId:"369852147",
        transactionId:"1478522"
    }
]

export const paymentColumns = [
    
    {key:'id',label:'Id'},
    {key:'interfaceId',label:'Interface Id'},
    {key:'amountPlanned',label:'Amount planned'},
    {key:'paymentMethodInfo',label:'Payment method info'},
    {key:'createdAt',label:'Date'},
    {key:'lastModifiedAt',label:'Modified'},
    
]