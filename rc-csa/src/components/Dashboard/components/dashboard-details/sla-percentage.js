export function getSlaPercentage(customObjects) {
  if (customObjects && customObjects) {
    const slaRows = getSlaRow(customObjects);
    const totalRows = slaRows.length;
    const slaMetRows = slaRows.filter((row) => row.SLA === 'SLA met');
    const slaMetCount = slaMetRows.length;
    const slaMetPercentage = (slaMetCount / totalRows) * 100;
    return slaMetPercentage.toFixed(2); // Restrict to two decimal places
  }
  return 0;
}

export function getSlaRow(customObjects) {
  if (customObjects && customObjects) {
    return customObjects
      .map((co) => {
        const created = co?.Created;
        const resolution = co?.Resolution;
        const slaStatus = getSLARate(created, resolution);

        return {
          ticketNumber: co?.ticketNumber,
          Customer: co?.Customer,
          Created: co?.Created,
          Resolution: co?.Resolution,
          status: co?.status,
          Priority: co?.Priority,
          SLA: slaStatus,
        };
      })
      .filter((co) => co.Resolution !== null && co.Resolution !== undefined);
  }
  return [];
}

export function getSLARate(created, resolution) {
  const createdAt = new Date(created);
  const resolutionAt = new Date(resolution);

  const timeDiffInMinutes = Math.round(
    (resolutionAt.getTime() - createdAt.getTime()) / 60000
  );
  return timeDiffInMinutes < 30 ? 'SLA met' : 'SLA not met';
}

function getSLAHighRate(created, resolution) {
  const createdAt = new Date(created);
  const resolutionAt = new Date(resolution);

  const timeDiffInMinutes = Math.round(
    (resolutionAt.getTime() - createdAt.getTime()) / 60000
  );
  return timeDiffInMinutes < 20 ? 'SLA met' : 'SLA not met';
}

export function getSlaHighPercentage(customObjects) {
  if (customObjects && customObjects) {
    let highPriorityTickets = 0;
    let highPrioritySlaMetTickets = 0;

    customObjects.forEach((co) => {
      const created = co?.Created;
      const resolution = co?.Resolution;
      const slaStatus = getSLAHighRate(created, resolution);

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
