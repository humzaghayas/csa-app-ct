export function newFunctionTickets(ticketData) {
  const results = ticketData?.customObjects?.results; // get the results array

  let countNew = 0; // initialize count of "new" status to 0

  // loop through the results array and increment count if status is "new"
  results?.forEach((result) => {
    const status = result?.value?.status;
    if (status === 'new') {
      countNew++;
    }
  });

  // countNew variable will have the count of "new" status
  return countNew;
}

export function highProirityTickets(ticketData) {
  const results = ticketData?.customObjects?.results; // get the results array

  let countNew = 0; // initialize count of "high" priority to 0

  // loop through the results array and increment count if priority is "high"
  results?.forEach((result) => {
    const priority = result?.value?.priority;
    if (priority === 'high') {
      countNew++;
    }
  });

  // countNew variable will have the count of "high" priority
  return countNew;
}

export function inProgressTickets(ticketData) {
  const results = ticketData?.customObjects?.results; // get the results array

  let countNew = 0; // initialize count of "inprogress" status to 0

  // loop through the results array and increment count if status is "inprogress"
  results?.forEach((result) => {
    const status = result?.value?.status;
    if (status === 'inprogress') {
      countNew++;
    }
  });
  // countNew variable will have the count of "inprogress" status
  return countNew;
}

export function resolvedTickets(ticketData) {
  const results = ticketData?.customObjects?.results; // get the results array

  let countNew = 0; // initialize count of "resolved" status to 0

  // loop through the results array and increment count if status is "resolved"
  results?.forEach((result) => {
    const status = result?.value?.status;
    if (status === 'done') {
      countNew++;
    }
  });

  // countNew variable will have the count of "resolved" status
  return countNew;
}
