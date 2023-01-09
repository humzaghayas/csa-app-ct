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
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../../../constants';
// import {
//   useTicketCreateCreator,
// } from '../../../../hooks/use-Ticket-connector/use-Tickete-graphql-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import TicketCreateForm from './ticket-create-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { TextInput } from '@commercetools-frontend/ui-kit';

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
  const handleSubmit = useCallback(
    async (formValues) => {

      let message= !TextInput.isEmpty(formValues.message)
        ? formValues.message
        : undefined;
      console.log(formValues);
      //const data = formValuesToDoc(formValues);
      
      // This would trigger the request, for example a mutation.
      
      // If successful, show a notification and redirect
      // to the Channels details page.
      // If errored, show an error notification.
    },
    [createTicket]
  );

  const createTicket = async (data)=>{
    console.log("createTicket");
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
