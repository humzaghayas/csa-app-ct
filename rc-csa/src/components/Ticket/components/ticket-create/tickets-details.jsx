import { useCallback, useEffect, useState } from 'react';
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
import { CONSTANTS } from 'ct-tickets-helper-api/lib/constants';

const TicketDetailsP = (props) => {
  const match = useRouteMatch();
  const {projectKey, dataLocale, languages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectKey:context.project.key,
    languages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.ManageCsaTickets],
  });

  const [ticket, setTicket] = useState(null);

  const {getTicketById} = useGetTicketById();//();
 
  
  useEffect(async () => {
    if(!ticket){
      console.log('calling execute !');
      const t = await getTicketById(projectKey,match.params.id);

      console.log('ticket det',t);
      setTicket(t);
    }
  },[ticket]);

  const{execute} = useCreateOrUpdateTicket();
  const handleSubmit = useCallback(
    async (formValues) => {

      let data =formValuesToDoc(formValues);

      console.log("data from form",data);
      const opr = formValues?.operation ?? '';
      let t = await execute(projectKey,data);

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
