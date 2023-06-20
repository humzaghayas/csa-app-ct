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

  const { execSendEmail } = useEmailSender();

  useEffect(async () => {
    if (!ticket) {
      console.log('calling execute !');
      const t = await getTicketById(projectKey, match.params.id);

      console.log('ticket det', t);
      setTicket(t);
    }
  }, [ticket]);

  // const { execute: execSendEmail } = useSendOrderMail();

  const { execute } = useCreateOrUpdateTicket();
  const handleSubmit = useCallback(
    async (formValues) => {
      let data = formValuesToDoc(formValues);

      console.log('data from form', data);
      const opr = formValues?.operation ?? '';
      let t = await execute(projectKey, data);

      console.log(t);
      if (ticket.status === 'inprogress' && data.status === 'done') {
        const ticketEmail = await execSendEmail(
          {},
          {
            to: ticket?.email,
            // subject: 'Your ticket is resolved, please leave a feedback!',
            subject: `Your ticket #${ticket.ticketNumber} is resolved, please leave us a feedback!`,
            html: `<p>Hello, </p>
            <p>We were glad to serve you, please let us know your experience. </p> 
            <p>Your feedback allows us to understand what we're doing well and identify areas where we can improve. Please take a moment to submit your feedback by visiting <br>
            <a href="https://mc.us-central1.gcp.commercetools.com/csa-project-4/csa-customer-tickets/feedback">https://mc.us-central1.gcp.commercetools.com/csa-project-4/csa-customer-tickets/feedback</a> </p>
            <p>Your feedback is valuable to us, as it helps us improve our products and services.</p>
            <p>Thank you, have a great day!</p>`,
          }
        );
        console.log('Email sent', ticketEmail);
      }
      sendEmail(t?.tickets);
      sendInprogEmail(t?.tickets);
    },
    [execute]
  );

  const sendEmail = useCallback(
    async (ticket) => {
      console.log('In send email', ticket);
      console.log('Ticket status is equal to done', ticket?.status == 'done');
      console.log(
        'Ticket status is equal to closed',
        ticket?.status == 'closed'
      );
      if (
        ticket?.status == TICKET_STATUS.closed.name ||
        ticket?.status == TICKET_STATUS.done.name
      ) {
        const response = await execSendEmail(
          {},
          {
            to: ticket?.email,
            subject: `Service request #${ticket?.ticketNumber} is resolved.`,
            html: `<h3>Hello, <br/>
            We are pleased to inform you that we have successfully resolved your ticket.</h3> 
          <br/>
          <h3> Ticket subject: ${ticket?.subject} </h3>
          <h3> Message: ${ticket?.message}</h3>
          <br/>
          <h3>Ticket Number: ${ticket?.ticketNumber}</h3>
          <h3>Ticket Status: ${ticket?.status}</h3>
          <h3>Our support team worked diligently to address your concern, and we are happy to report that your concern has been resolved.</h3>
          <h3>Thank you for giving us the opportunity to assist you. We look forward to serving you in the future.</h3>
          <h3>Have a great day!</h3>
          `,
          }
        );
        console.log('Email send response', response);
      }
    },
    [execSendEmail]
  );

  const sendInprogEmail = useCallback(
    async (ticket) => {
      console.log('In send email', ticket);
      console.log(
        'Ticket status is equal to inprogress',
        ticket?.status == 'inprogress'
      );
      if (ticket?.status == TICKET_STATUS.inprogress.name) {
        const response = await execSendEmail(
          {},
          {
            to: ticket?.email,
            subject: `Update: Your ticket #${ticket?.ticketNumber} is inprogress.`,
            html: `<h3>Hello, <br/>
            We wanted to provide you with an update regarding the support ticket you raised with us. <h3> 
          <br/>
          <h3> Ticket subject: ${ticket?.subject} </h3>
          <h3> Message: ${ticket?.message}</h3>
          <br/>
          <h3>Ticket Number: ${ticket?.ticketNumber}</h3>
          <h3>Ticket Status: ${ticket?.status}</h3>
          <h3>Our team has been actively working on resolving your inquiry and wanted to assure you that your case is currently in progress. Our Team will get back to you shortly.</h3>
          <h3>Thank you.</h3>
          `,
          }
        );
        console.log('Email send response', response);
      }
    },
    [execSendEmail]
  );

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
