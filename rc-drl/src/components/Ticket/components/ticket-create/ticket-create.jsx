import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { DOMAINS, GRAPHQL_TARGETS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../../../constants';
// import {
//   useTicketCreateCreator,
// } from '../../../../hooks/use-Ticket-connector/use-Tickete-graphql-connector';
import { docToFormValues, formValuesToDoc, formValuesToDocRequest } from './conversions';
import TicketCreateForm from './ticket-create-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { TextInput } from '@commercetools-frontend/ui-kit';
import { useMcMutation } from '@commercetools-frontend/application-shell';
import{getCreateTicketMutaion,getCreateTicketDraft} from 'ct-tickets-helper-api'
import { gql } from '@apollo/client';

const TicketCreate = (props) => {
  const intl = useIntl();
  const params = useParams();


  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  // const showNotification = useShowNotification();
  // const showApiErrorNotification = useShowApiErrorNotification();
  // const TicketCreateCreator = useTicketCreateCreator();

  const [createOrUpdateCustomObject, { data, loading, error }] = useMcMutation(gql`${getCreateTicketMutaion()}`);

  const handleSubmit = useCallback(
    async (formValues) => {

      let data = {};
      if(formValues.category && formValues.category !== "request"){
        data = formValuesToDoc(formValues);
      }else{
        data = formValuesToDocRequest(formValues);
      }

      console.log("data");
      console.log(data);
      
      await createTicket(data);
      // This would trigger the request, for example a mutation.
      
      // If successful, show a notification and redirect
      // to the Channels details page.
      // If errored, show an error notification.
    },
    [createTicket]
  );

  const createTicket = async (data)=>{
    console.log("createTicket");

    const ticketDraft = getCreateTicketDraft(data);

    console.log("ticketDraft");
    console.log(ticketDraft);

    createOrUpdateCustomObject({ variables: {
      draft: ticketDraft,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    } }).then((resp) => {
      console.log(resp);
    }).catch((err) =>{
      console.log(err);
    });
    alert('Ticket Created!: ')
  }

  return (
    <TicketCreateForm
    initialValues={docToFormValues(null, projectLanguages)}
    onSubmit={handleSubmit}
    isReadOnly={!canManage}
    dataLocale={dataLocale}
    />
  );
};
TicketCreate.displayName = 'TicketCreate';
// TicketCreate.propTypes = {
//   onClose: PropTypes.func.isRequired,
// };
export default TicketCreate;
