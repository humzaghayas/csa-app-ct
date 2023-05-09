export function newFunctionTickets(ticketData) {
  let countNew = 0; // initialize count of "new" status to 0

  // loop through the ticketData array and increment count if status is "new"
  ticketData?.forEach((result) => {
    const status = result?.status;
    if (status === 'new') {
      countNew++;
    }
  });

  // countNew variable will have the count of "new" status
  return countNew;
}

export function highProirityTickets(ticketData) {
  let countNew = 0; // initialize count of "high" priority to 0

  // loop through the ticketData array and increment count if priority is "high"
  ticketData?.forEach((result) => {
    const priority = result?.Priority;
    if (priority === 'high') {
      countNew++;
    }
  });

  // countNew variable will have the count of "high" priority
  return countNew;
}

export function inProgressTickets(ticketData) {
  let countNew = 0; // initialize count of "inprogress" status to 0

  // loop through the ticketData array and increment count if status is "inprogress"
  ticketData?.forEach((result) => {
    const status = result?.status;
    if (status === 'inprogress') {
      countNew++;
    }
  });
  // countNew variable will have the count of "inprogress" status
  return countNew;
}

export function openStatusTickets(ticketData) {
  let countNew = 0; // initialize count of "open" status to 0

  // loop through the ticketData array and increment count if status is "open"
  ticketData?.forEach((result) => {
    const status = result?.status;
    if (status === 'open') {
      countNew++;
    }
  });

  // countNew variable will have the count of "open" status
  return countNew;
}

export function getTicketMdbRows(customObjects) {
  if (customObjects && customObjects) {
    return customObjects?.map((co) => {
      return {
        id: co?.id,
        ticketNumber: co?.ticketNumber,
        customerId: co?.customerId,
        email: co?.email,
        createdAt: co?.createdAt,
        lastModifiedAt: co?.lastModifiedAt,
        resolutionDate: co?.resolutionDate,
        ticketData: co?.ticketData,
        contactType: co?.contactType,
        source: co?.source,
        status: co?.status,
        priority: co?.priority,
        category: co?.category,
        subject: co?.subject,
        type: co?.type,
        history: co?.history,
        assignedTo: co?.assignedTo,
        createdBy: co?.createdBy,
      };
    });
  }
  return [];
}

export function countActiveTickets(ticketData) {
  let count = 0;
  for (let i = 0; i < ticketData?.length; i++) {
    const status = ticketData[i]?.status;
    if (status === 'new' || status === 'inprogress' || status === 'open') {
      count++;
    }
  }
  return count;
}
