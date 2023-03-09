export const TICKET_STATUS={
    new:{name:"new",label:"New"},
    open:{name:"open",label:"Open"},
    inprogress:{name:"inprogress",label:"In Progress"},
    rejected:{name:"reject",label:"Reject"},
    done:{name:"done",label:"Done"},
    closed:{name:"closed",label:"Closed"}
}

export const TICKET_WORKFLOW={
    [TICKET_STATUS["new"]["name"]]:[TICKET_STATUS.open],
    [TICKET_STATUS["open"]["name"]]:[TICKET_STATUS.inprogress,TICKET_STATUS.rejected],
    [TICKET_STATUS["inprogress"]["name"]]:[TICKET_STATUS.done,TICKET_STATUS.rejected],
    [TICKET_STATUS["done"]["name"]]:[TICKET_STATUS.closed],
    [TICKET_STATUS["closed"]["name"]]:[],
    [TICKET_STATUS["rejected"]["name"]]:[]
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
    USER_CONTRAINER_KEY:"mc-users",
    USER_CONTAINER:"mc-user-info",
    TICKET_DATA:"{{TICKET_DATA}}",
    TICKET_HISTORY:"{{TICKET_HISTORY}}",
    TICKET_TYPE_RESET_PASSWORD :'passwordReset',
    TICKET_TYPE_GENERAL_INFO_CHANGE :'generalInfoChange',
    TICKET_TYPE_ORDER_INQUIRY :'orderInquiry',
    TICKET_TYPE_PAYMENT_METHODS :'paymentMethod',
    TICKET_TYPE_RETURNS :'returns',
    TICKET_INITIAL_STATUS:TICKET_STATUS.new.name,
    CREATE_OPERATION:'CREATED',
    STATUS_OPERATION:'UPDATED',
    PRIORITY:'Priority',
    STATUS:'Status',
    ASSIGNED_TO:'Assigned_To'
}

export const TICKET_TYPE={
    [CONSTANTS.TICKET_TYPE_REQUEST]:"Request",
    [CONSTANTS.TICKET_TYPE_GENERAL_INFO_CHANGE]:"General Info Change",
    [CONSTANTS.TICKET_TYPE_RESET_PASSWORD]:"Password Reset",
    [CONSTANTS.TICKET_TYPE_ORDER_INQUIRY]:"Order Inquiry",
    [CONSTANTS.TICKET_TYPE_PAYMENT_METHODS]:"Payment Methods",
    [CONSTANTS.TICKET_TYPE_RETURNS]:"Returns",
}