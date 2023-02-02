
export const TICKET_PRIORITY= {
Low: 'Low',
Moderate: 'Moderate',
High: 'High',
};

export const ORDER_STATE = {
    Open:'Open',
    Confirmed:'Confirmed',
    Completed:'Complete',
    Cancelled:'Cancelled'
}
export const PAYMENT_STATUS = {
    BalanceDue:'BalanceDue',
    Pending:'Pending',
    Paid:'Paid',
    CreditOwed:'CreditOwed',
    Failed:'Failed'
}
export const SHIPMENT_STATUS = {
    Ready:'Ready',
    Pending:'Pending',
    Partial:'Partial',
    Delayed:'Delayed',
    Shipped:'Shipped',
    Backorder:'Backorder'
}


const ChangeOrderState = "changeOrderState";
const ChangePaymentState= "changePaymentState";
const ChangeShipmentState= "changeShipmentState";


export const ORDER_UPDATE_ACTIONS_LIST ={
    ChangeOrderState,
    ChangePaymentState,
    ChangeShipmentState
}