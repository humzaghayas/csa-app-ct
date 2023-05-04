export const columns = [
    {key:'item',label:'Item'},
    {key:'quantity',label:'Quantity'},
    {key:'shipmentState',label:'Shipment state'},
    {key:'paymentState',label:'Payment State'},
    {key:'createdAt',label:'Date Created'},
    {key:'lastModifiedAt',label:'Date Modified'},
    {key:'comment',label:'Comment'},
]

export const columnsCreateOrderReturns = [
    {key:'checkBox',label:''},
    {key:'product',label:'Product'},
    {key:'orderdQuantity',label:'Ordered quantity'},
    {key:'quantityInPreviousReturns',label:'Quantity in previous returns'},
    {key:'returnQuantity',label:'Return quantity'},
    {key:'comment',label:'Comment'},
]

export const dummyCreateReturnOrderRows =[
    {
        product:{
            name:"Iphone",
            key:"Iphone",
            sku:"Iphone",
            image:"sfasfasas"
        },
        orderdQuantity:5,
        quantityInPreviousReturns:0,
        returnQuantity:0,
        comment:"No Comment"
    }
]

export const dummyrows = [
    {no:1,item:{
        name:"Iphone",
        key:"Iphone",
        sku:"Iphone",
        image:"sfasfasas"
    },quantity:1,comment:"No Comment",shipmentState:"State",paymentState:"State",dateCreated:"date",dateModified:"date"}
]

export const SHIPMENT_STATUS = {
    Returned:'Returned',
    Advised:'Advised'
}

export const PAYMENT_STATUS = {
    Initial:'Initial',
    Refunded:'Refunded',
    NotRefunded:'Not Refunded'
}

export const SHIPMENT_STATUS_RETURN = {
    Returned:'Returned',
    BackInStock:'Back In Stock',
    Unusable:'Unusable'
}