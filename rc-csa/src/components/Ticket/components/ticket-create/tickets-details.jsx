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
import { CONSTANTS } from 'ct-tickets-helper-api/lib/constants';
import { useSendOrderMail } from '../../../../hooks/use-order-sendmail-connector';

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
    },
    [execute]
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
