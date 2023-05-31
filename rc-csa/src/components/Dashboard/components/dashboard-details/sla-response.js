/**
 * Function to calculate the response time in minutes
 * @param {*} created
 * @param {*} responseDate
 * @returns
 */
export function calculateResponseTimeInMinutes(created, responseDate) {
  const createdDate = new Date(created);
  const responseDateTime = new Date(responseDate);
  const responseTimeInMinutes =
    Math.abs(responseDateTime - createdDate) / (1000 * 60);
  return responseTimeInMinutes;
}

/**
 * Function to find the average response time in minutes
 * @param {*} ticketData
 * @returns averageResponseTime
 */
export function calculateAverageResponseTime(ticketData) {
  if (ticketData && ticketData) {
    const responseTimes = ticketData.map((ticket) =>
      calculateResponseTimeInMinutes(ticket.Created, ticket.responseDate)
    );
    const totalResponseTime = responseTimes.reduce(
      (sum, time) => sum + time,
      0
    );
    const averageResponseTime = totalResponseTime / responseTimes?.length;
    return averageResponseTime.toFixed(0);
  }
  return 0;
}

/**
 * Function to find the maximum response time in minutes
 * @param {*} ticketData
 * @returns maximumResponseTime
 */
export function findMaximumResponseTime(ticketData) {
  if (ticketData && ticketData) {
    const responseTimes = ticketData.map((ticket) =>
      calculateResponseTimeInMinutes(ticket.Created, ticket.responseDate)
    );
    const maximumResponseTime = Math.max(...responseTimes);
    return maximumResponseTime.toFixed(0);
  }
  return 0;
}

/**
 * Function to find the minimum response time in minutes
 * @param {*} ticketData
 * @returns
 */
export function findMinimumResponseTime(ticketData) {
  if (ticketData && ticketData) {
    const responseTimes = ticketData.map((ticket) =>
      calculateResponseTimeInMinutes(ticket.Created, ticket.responseDate)
    );
    const minimumResponseTime = Math.min(...responseTimes);
    return minimumResponseTime.toFixed(0);
  }
  return 0;
}

/**
 * Function to get the rows Response SLA table
 * @param {*} customObjects
 * @returns row array
 */
export function getResRow(customObjects) {
  if (customObjects && customObjects) {
    return customObjects
      .map((co) => {
        const created = co?.Created;
        const response = co?.responseDate;
        const slaStatus = getSLARate(created, response);

        return {
          ticketNumber: co?.ticketNumber,
          Customer: co?.Customer,
          Created: co?.Created,
          Response: co?.responseDate,
          status: co?.status,
          Priority: co?.Priority,
          SLA: slaStatus,
        };
      })
      .filter((co) => co.Response !== null && co.Response !== undefined);
  }
  return [];
}

/**
 * Function to find the if the Response SLA is met.
 * @param {*} created
 * @param {*} response
 * @returns timeDiffInMinutes
 */
function getSLARate(created, response) {
  const createdAt = new Date(created);
  const responseAt = new Date(response);

  const timeDiffInMinutes = Math.round(
    (responseAt.getTime() - createdAt.getTime()) / 60000
  );
  return timeDiffInMinutes < 16 ? 'SLA met' : 'SLA not met';
}

/**
 * Gets the percentage of the Response SLA
 * @param {*} customObjects
 * @returns slaMetPercentage
 */
export function getResPercentage(customObjects) {
  if (customObjects && customObjects) {
    const slaRows = getResRow(customObjects);
    const totalRows = slaRows.length;
    const slaMetRows = slaRows.filter((row) => row.SLA === 'SLA met');
    const slaMetCount = slaMetRows.length;
    const slaMetPercentage = (slaMetCount / totalRows) * 100;
    return slaMetPercentage.toFixed(2); // Restrict to two decimal places
  }
  return 0;
}

/**
 * Finds the percentage of the tickets which are high in priority
 * @param {*} customObjects
 * @returns
 */
export function getResHighPercentage(customObjects) {
  if (customObjects && customObjects) {
    let highPriorityTickets = 0;
    let highPrioritySlaMetTickets = 0;

    customObjects.forEach((co) => {
      const created = co?.Created;
      const response = co?.Response;
      const slaStatus = getSLAHighRate(created, response);

      if (co?.Priority === 'high') {
        highPriorityTickets++;
        if (slaStatus === 'SLA met') {
          highPrioritySlaMetTickets++;
        }
      }
    });

    const slaHighPercentage =
      (highPrioritySlaMetTickets / highPriorityTickets) * 100;
    return slaHighPercentage.toFixed(2); // Restrict to two decimal places
  }

  return 0;
}

function getSLAHighRate(created, response) {
  const createdAt = new Date(created);
  const responseAt = new Date(response);

  const timeDiffInMinutes = Math.round(
    (responseAt.getTime() - createdAt.getTime()) / 60000
  );
  return timeDiffInMinutes < 11 ? 'SLA met' : 'SLA not met';
}
