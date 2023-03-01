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
import{CREATE_TICKET_MUTATION,getCreateTicketDraft} from 'ct-tickets-helper-api'
import { gql } from '@apollo/client';
import { useCreateOrUpdateTicket } from '../../../../hooks/use-register-user-connector';
import { CONSTANTS } from 'ct-tickets-helper-api/lib/constants';

const TicketCreate = (props) => {
  const intl = useIntl();
  const params = useParams();


  const { dataLocale, projectLanguages,user } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
    user:context.user
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  // const showNotification = useShowNotification();
  // const showApiErrorNotification = useShowApiErrorNotification();
  // const TicketCreateCreator = useTicketCreateCreator();

//  const [createOrUpdateCustomObject, { data, loading, error }] = useMcMutation(gql`${CREATE_TICKET_MUTATION}`);
  const{execute} = useCreateOrUpdateTicket();

  const handleSubmit = useCallback(
    async (formValues) => {

      let data = {};
      formValues.createdBy = user.email;
      // formValues.id='a';
      // formValues.key='a';

      if(!formValues.assignedTo){
        formValues.assignedTo = user.email;
      }
      
      data = formValuesToDoc(formValues);

      console.log("data");
      console.log(data);
      let t = await execute(data,CONSTANTS.CREATE_OPERATION);

      console.log(t);
    },
    [execute]
  );



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
//   
// };
export default TicketCreate;
