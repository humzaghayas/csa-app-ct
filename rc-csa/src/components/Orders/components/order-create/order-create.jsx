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
//   useTicketDetailsCreator,
// } from '../../../../hooks/use-Ticket-connector/use-Tickete-graphql-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import OrderCreateForm from './order-create-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { useRouteMatch } from 'react-router-dom';
import { useFetchOrderById} from '../../../../hooks/use-orders-connector';

const OrderCreate = (props) => {
  const intl = useIntl();
  const params = useParams();
  const match = useRouteMatch();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const {order} = useFetchOrderById(match.params.id);
  // const showNotification = useShowNotification();
  // const showApiErrorNotification = useShowApiErrorNotification();
  // const TicketDetailsCreator = useTicketDetailsCreator();
  const handleSubmit = useCallback(
    // async (formikValues, formikHelpers) => {
    //   const data = formValuesToDoc(formikValues);
    //   try {
    //     await TicketDetailsCreator.execute({
    //       nextDraft: data,
    //     });
    //     showNotification({
    //       kind: 'success',
    //       domain: DOMAINS.SIDE,
    //       text: intl.formatMessage(messages.OrderCreated),
    //     });
    //   } catch (graphQLErrors) {
    //     const transformedErrors = transformErrors(graphQLErrors);
    //     if (transformedErrors.unmappedErrors.length > 0) {
    //       showApiErrorNotification({
    //         errors: transformedErrors.unmappedErrors,
    //       });
    //     }

    //     formikHelpers.setErrors(transformedErrors.formErrors);
    //   }
    // },
    // [
    //   TicketDetailsCreator,
    //   dataLocale,
    //   intl,
    //   projectLanguages,
    //   showApiErrorNotification,
    //   showNotification,
    // ]
  );

  return (
    <OrderCreateForm
    initialValues={docToFormValues(order, projectLanguages)}
    onSubmit={handleSubmit}
    isReadOnly={!canManage}
    dataLocale={dataLocale}
    >
      {(formProps) => {
        return (
          <React.Fragment>
          {formProps.formElements}
        </React.Fragment>
          // <FormModalPage
          //   title={intl.formatMessage(messages.modalTitle)}
          //   isOpen
          //   onClose={props.onClose}
          //   isPrimaryButtonDisabled={
          //     formProps.isSubmitting || !formProps.isDirty || !canManage
          //   }
          //   isSecondaryButtonDisabled={!formProps.isDirty}
          //   onSecondaryButtonClick={formProps.handleReset}
          //   onPrimaryButtonClick={formProps.submitForm}
          //   labelPrimaryButton={FormModalPage.Intl.save}
          //   labelSecondaryButton={FormModalPage.Intl.revert}
          // >
          //   {formProps.formElements}
          // </FormModalPage>
        );
      }}
    </OrderCreateForm>
  );
};
OrderCreate.displayName = 'OrderDetails';
OrderCreate.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default OrderCreate;
