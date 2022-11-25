export const TICKET_STATUS={
    new:"New",
    open:"Open",
    inprogress:"In Progress",
    closed:"Closed"
}

export const TICKET_SOURCE={
    phone:"Phone",
    email:"E-Mail"
}

export const TICKET_PRIORITIY_VALUES={
    Low:"Low",
    normal:"Normal",
    high:"High",
    medium:"Medium"
}

export const CONSTANTS ={
    containerKey :"ticket-container",
    TICKET_TYPE_REQUEST :'request',
    TICKET_TYPE_INQUIRY :'inquiry',
    TICKET_TYPE_QUERY :'query',
    USER_CONTRAINER_KEY:"mc-users",
    USER_CONTAINER:"mc-user-info",
    TICKET_DATA:"{{TICKET_DATA}}",
    REQUEST_TYPE_RESET_PASSWORD :'passwordReset',
    REQUEST_TYPE_GENERAL_INFO_CHANGE :'generalInfoChange',
    REQUEST_TYPE_ADD_ADDRESS :'addAddress',
    REQUEST_TYPE_CHANGE_ADDRESS :'changeAddress'
}

export const TICKET_TYPE={
    [CONSTANTS.TICKET_TYPE_QUERY]:"Query",
    [CONSTANTS.TICKET_TYPE_REQUEST]:"Request",
    [CONSTANTS.TICKET_TYPE_INQUIRY]:"Inquiry"
}

export const TICKET_WORKFLOW={
    pending:"Pending",
    approve:"Approve",
    reject:"Reject",
    resolved:"Resolved"
}

export const REQUEST_TYPES={
    [CONSTANTS.REQUEST_TYPE_RESET_PASSWORD]:"Password Reset",
    [CONSTANTS.REQUEST_TYPE_GENERAL_INFO_CHANGE]:"General Info Change",
    [CONSTANTS.REQUEST_TYPE_ADD_ADDRESS]:"Add Address",
    [CONSTANTS.REQUEST_TYPE_CHANGE_ADDRESS]:"Change Address"
}
