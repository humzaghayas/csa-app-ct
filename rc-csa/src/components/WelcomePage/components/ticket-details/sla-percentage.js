export function getSlaPercentage(customObjects) {
  if (customObjects && customObjects.results) {
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
  if (customObjects && customObjects.results) {
    return customObjects.results.map((co) => {
      const created = co?.createdAt;
      const modified = co?.lastModifiedAt;
      const slaStatus = getSLARate(created, modified);

      return {
        ticketNumber: co?.value?.ticketNumber,
        Customer: co?.value?.email,
        Created: co?.createdAt,
        Modified: co?.lastModifiedAt,
        status: co?.value?.status,
        Priority: co?.value?.priority,
        SLA: slaStatus,
      };
    });
  }
  return [];
}

function getSLARate(created, modified) {
  const createdAt = new Date(created);
  const modifiedAt = new Date(modified);

  const timeDiffInMinutes = Math.round(
    (modifiedAt.getTime() - createdAt.getTime()) / 60000
  );
  return timeDiffInMinutes < 30 ? 'SLA met' : 'SLA not met';
}

function getSLAHighRate(created, modified) {
  const createdAt = new Date(created);
  const modifiedAt = new Date(modified);

  const timeDiffInMinutes = Math.round(
    (modifiedAt.getTime() - createdAt.getTime()) / 60000
  );
  return timeDiffInMinutes < 20 ? 'SLA met' : 'SLA not met';
}

export function getSlaHighPercentage(customObjects) {
  if (customObjects && customObjects.results) {
    let highPriorityTickets = 0;
    let highPrioritySlaMetTickets = 0;

    customObjects.results.forEach((co) => {
      const created = co?.createdAt;
      const modified = co?.lastModifiedAt;
      const slaStatus = getSLAHighRate(created, modified);

      if (co.value.priority === 'high') {
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
