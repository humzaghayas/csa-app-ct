import { useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { docToFormValues, formValuesToDoc, formValuesToDocRequest } from './conversions';
import TicketCreateForm from './ticket-create-form';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';
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

      let data =formValuesToDoc(formValues);

      console.log("data from form",data);
      let t = await execute(data);

      console.log(t);
    },
    [execute]
  );

  if (!ticket) {
    return <LoadingSpinner />;
  }

  return (
    <Spacings.Stack scale="xl">

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
