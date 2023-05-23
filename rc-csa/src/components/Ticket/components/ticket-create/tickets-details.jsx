import { useCallback, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import {
  docToFormValues,
  formValuesToDoc,
  formValuesToDocRequest,
} from './conversions';
import TicketCreateForm from './ticket-create-form';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';
import {
  useCreateOrUpdateTicket,
  useGetTicketById,
} from '../../../../hooks/use-register-user-connector';
import { useSendOrderMail } from '../../../../hooks/use-order-sendmail-connector';
import { CONSTANTS, TICKET_STATUS } from 'ct-tickets-helper-api/lib/constants';
import { useEmailSender } from '../../../../hooks/use-email-sender';

const TicketDetailsP = (props) => {
  const match = useRouteMatch();
  const { projectKey, dataLocale, languages } = useApplicationContext(
    (context) => ({
      dataLocale: context.dataLocale ?? '',
      projectKey: context.project.key,
      languages: context.project?.languages ?? [],
    })
  );
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.ManageCsaTickets],
  });

  const [ticket, setTicket] = useState(null);

  const { getTicketById } = useGetTicketById(); //();

  const {execSendEmail} = useEmailSender();

  useEffect(async () => {
    if (!ticket) {
      console.log('calling execute !');
      const t = await getTicketById(projectKey, match.params.id);

      console.log('ticket det', t);
      setTicket(t);
    }
  }, [ticket]);

  const { execute: execSendEmail } = useSendOrderMail();

  const { execute } = useCreateOrUpdateTicket();
  const handleSubmit = useCallback(
    async (formValues) => {
      let data = formValuesToDoc(formValues);

      console.log('data from form', data);
      const opr = formValues?.operation ?? '';
      let t = await execute(projectKey, data);

      let t = await execute(projectKey,data);
      console.log(t);
      if (ticket.status === 'inprogress' && data.status === 'done') {
        const ticketEmail = await execSendEmail(
          {},
          {
            to: ticket?.email,
            subject: 'Your ticket is resolved',
            html: `<p>Thanks for contacting CSA Support.</p><p>Your Ticket ID: ${ticket.ticketNumber} </p> 
            <p> Please take a moment to submit your feedback by visiting <br>
            <a href="https://mc.us-central1.gcp.commercetools.com/csa-project-4/csa-customer-tickets/feedback">https://mc.us-central1.gcp.commercetools.com/csa-project-4/csa-customer-tickets/feedback</a> </p>
            <p>Thank you, have a great day!</p>`,
          }
        );
        console.log('Email sent', ticketEmail);
      }
      sendEmail(t?.tickets);
    },
    [execute]
  );

  const sendEmail = useCallback(
    async (ticket) => {
        console.log("In send email",ticket);
        console.log("Ticket status is equal to done",ticket?.status=="done")
        console.log("Ticket status is equal to closed",ticket?.status=="closed")
      if(ticket?.status == TICKET_STATUS.closed.name || ticket?.status == TICKET_STATUS.done.name){
        const response = await execSendEmail({},{
          to:ticket?.email,
          subject:"Complain ticket created",
          html:`<h1>A new ticket is created with reference to your complain</h1> 
          <br/>
          <h2> Ticket subject: ${ticket?.subject} </h2>
          <h2> Message: ${ticket?.message}</h2>
          <br/>
          <h2>Ticket Number: ${ticket?.ticketNumber}</h2>
          <h2>Ticket Status: ${ticket?.status}</h2>
          <body>We appreciate your patience our time Is looking into the issue.</body>
          <h3>Thanks</h3>
          `
        });
        console.log("Email send response", response);
      }
    }
    ,[execSendEmail]
  )

  if (!ticket) {
    return <LoadingSpinner />;
  }

  return (
    <Spacings.Stack scale="xl">
      <TicketCreateForm
        initialValues={docToFormValues(ticket, languages, true)}
        onSubmit={handleSubmit}
        isReadOnly={!canManage}
        dataLocale={dataLocale}
      />
    </Spacings.Stack>
  );
};

export default TicketDetailsP;
