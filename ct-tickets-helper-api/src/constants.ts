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

export const REQUEST_TYPES={
    passwordReset:"Password Reset",
    addressChange:"Address Change",
    generalInfoChange:"General Info Change"
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
