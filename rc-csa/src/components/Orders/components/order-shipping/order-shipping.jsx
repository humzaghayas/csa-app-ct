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
import OrderShippingForm from './order-shipping-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { useRouteMatch } from 'react-router-dom';
import { useFetchOrderById, useOrderUpdateById} from '../../../../hooks/use-orders-connector';
import { useEffect } from 'react';
import { useState } from 'react';
import { useReducer } from 'react';


const OrderShipping = (props) => {
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

  const {executeFetchOrder} = useFetchOrderById(match.params.id);
  const {executeUpdateOrder} = useOrderUpdateById();
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
  
  const [order,setOrder] = useState(async()=>{
    return await executeFetchOrder(match.params.id);
  });

  const [reducerValue, forceUpdate] = useReducer(x => x+1,0);

  useEffect(()=>{
    const fetchData = async ()=>{
      const result  = await executeFetchOrder(match.params.id);
      setOrder(result);
    }
    fetchData();
  },[reducerValue]);

  // const showNotification = useShowNotification();
  // const showApiErrorNotification = useShowApiErrorNotification();
  // const TicketDetailsCreator = useTicketDetailsCreator();
  const handleSubmit = useCallback(
    async(payload) =>{
      console.log("In Handle Submit");
      console.log(payload);
      try{
        const result = await executeUpdateOrder(payload);
        forceUpdate();
          showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: intl.formatMessage(messages.OrderUpdated),
        }); 
      }catch (graphQLErrors) {
              console.log(graphQLErrors.message)
              const transformedErrors = transformErrors(graphQLErrors);
              if (transformedErrors.unmappedErrors.length > 0) {
                showApiErrorNotification({
                  errors: graphQLErrors.message,
                });
              }
      }
    }
  );

  return (
    <OrderShippingForm
    initialValues={docToFormValues(order?.data?.order, projectLanguages)}
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
    </OrderShippingForm>
  );
};
OrderShipping.displayName = 'OrderDetails';
OrderShipping.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default OrderShipping;
