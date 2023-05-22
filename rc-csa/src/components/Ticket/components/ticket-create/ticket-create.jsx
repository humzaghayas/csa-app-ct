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
import { useEmailSender } from '../../../../hooks/use-email-sender';

const TicketCreate = (props) => {
  const intl = useIntl();
  const params = useParams();


  const { dataLocale, projectLanguages,user,projectKey } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
    projectKey:context.project.key,
    user:context.user
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.ManageCsaTickets],
  });
  const{execute} = useCreateOrUpdateTicket();
  const {execSendEmail} = useEmailSender();

  const handleSubmit = useCallback(
    async (formValues) => {

      let data = {};
      formValues.createdBy = user.email;

      if(!formValues.assignedTo){
        formValues.assignedTo = user.email;
      }
      console.log("formvalues",formValues);
      data = formValuesToDoc(formValues);
      console.log("data");
      console.log(data);
      let t = await execute(projectKey
        ,data,CONSTANTS.CREATE_OPERATION);
      
      sendEmail(t?.tickets);

      console.log(t);
    },
    [execute]
  );

  const sendEmail = useCallback(
    async (ticket) => {
      if(ticket){
        const response = await execSendEmail({},{
          to:ticket?.email,
          subject:"Complain ticket created",
          html:`<h1>A new ticket is created with reference to your complain</h1> 
          <br/>
          <h2> Ticket subject: ${ticket?.subject} </h2>
          <h2> Message: ${ticket?.message}</h2>
          <br/>
          <h2>Ticket Number: ${ticket?.ticketNumber}</h2>
          <body>We appreciate your patience our team is looking into the issue.</body>
          <h3>Thanks</h3>
          `
        });
        console.log("Email send response", response);
      }
    }
    ,[execSendEmail]
  )



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
