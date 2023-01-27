import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import React from 'react';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';
// import {
//   useTicketCreateCreator,
// } from '../../../../hooks/use-Ticket-connector/use-Tickete-graphql-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import TicketCreateForm from './ticket-create-form';
import { useCreateOrUpdateTicket } from '../../../../hooks/use-register-user-connector';

const TicketCreate = (props) => {
  const intl = useIntl();
  const params = useParams();

  const { dataLocale, projectLanguages, user } = useApplicationContext(
    (context) => ({
      dataLocale: context.dataLocale ?? '',
      projectLanguages: context.project?.languages ?? [],
      user: context.user,
    })
  );
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  // const showNotification = useShowNotification();
  // const showApiErrorNotification = useShowApiErrorNotification();
  // const TicketCreateCreator = useTicketCreateCreator();

  //  const [createOrUpdateCustomObject, { data, loading, error }] = useMcMutation(gql`${CREATE_TICKET_MUTATION}`);
  const { execute } = useCreateOrUpdateTicket();

  const handleSubmit = useCallback(
    async (formValues) => {
      let data = {};
      formValues.createdBy = user.email;
      // formValues.id='a';
      // formValues.key='a';

      if (!formValues.assignedTo) {
        formValues.assignedTo = user.email;
      }

      data = formValuesToDoc(formValues);

      console.log('data');
      console.log(data);
      let t = await execute(data);

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
//   onClose: PropTypes.func.isRequired,
// };
export default TicketCreate;
