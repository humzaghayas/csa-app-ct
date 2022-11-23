import { useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { docToFormValues, formValuesToDoc, formValuesToDocRequest } from './conversions';
import{FETCH_TICKETS_BY_ID,getTicketFromCO} from 'ct-tickets-helper-api'
import { gql } from '@apollo/client';
import TicketCreateForm from './ticket-create-form';
import { useMcMutation, useMcQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';
import{CREATE_TICKET_MUTATION,getCreateTicketDraft} from 'ct-tickets-helper-api'
import { useCreateOrUpdateTicket, useGetTicketById } from '../../../../hooks/use-register-user-connector';

const TicketDetailsP = (props) => {
  const match = useRouteMatch();
  const { dataLocale, languages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    languages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });

  const {ticket} = useGetTicketById(match.params.id);
  console.log("ticket",ticket);

  const{execute} = useCreateOrUpdateTicket();
  const handleSubmit = useCallback(
    async (formValues) => {

      let data = {};
      if(formValues.category && formValues.category !== "request"){
        data = formValuesToDoc(formValues);
      }else{
        data = formValuesToDocRequest(formValues);
      }

      console.log("data from form",data);
      
      await execute(data);
      // This would trigger the request, for example a mutation.
      
      // If successful, show a notification and redirect
      // to the Channels details page.
      // If errored, show an error notification.
    },
    [execute]
  );

  if (!ticket) {
    return <LoadingSpinner />;
  }

  return (
    <Spacings.Stack scale="xl">
      <Text.Headline as="h1">
        Manage Channel
      </Text.Headline>
      <TicketCreateForm
        initialValues={docToFormValues(ticket, languages,true)}
        onSubmit={handleSubmit}
        isReadOnly={!canManage}
        dataLocale={dataLocale}
      />
    </Spacings.Stack>
  );
}

export default TicketDetailsP;
