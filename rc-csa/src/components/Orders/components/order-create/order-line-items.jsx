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
import OrderLineItemsForm from './order-line-items-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useFetchOrderById, useOrderUpdateById, useCreateOrderEditById,useOrderEditApply} from '../../../../hooks/use-orders-connector';
import { useEffect } from 'react';
import { useState } from 'react';
import { useReducer } from 'react';

const OrderLineItems = (props) => {
  const intl = useIntl();
  const params = useParams();
  const match = useRouteMatch();
  const { push } = useHistory();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });

  
  const {executeUpdateOrder} = useOrderUpdateById();
  const {executeCreateOrderEdit} = useCreateOrderEditById();
  const {executeOrderEditApply} = useOrderEditApply();
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
  
  // const [order,setOrder] = useState(null);

  const [reducerValue, forceUpdate] = useReducer(x => x+1,0);

  const {data,loading,error} =  useFetchOrderById(match.params.id);

  const order = {data};
  
  // setOrder(data);

  const handleSubmit = useCallback(
    async(e) =>{
      console.log("In Handle Submit");
      const orderItem = e.orderItem;
      if(!orderItem.isQuantityUpdated){
        try{
          const draft= {
            resource : {
             id: order?.data?.order?.id,
             typeId: "order"
           },
           stagedActions: [
             {
                changeLineItemQuantity: {
                  lineItemId: orderItem?.lineItemId,
                  quantity: orderItem?.quantity
               } 
             }
           ],
           comment: orderItem?.comment?orderItem?.comment:"No Comment"
         }
         console.log(draft);
          const result = await executeCreateOrderEdit(draft);
          const data = await result.data.createOrderEdit;
          const orderEditId  = data?.id;
          const editVersion  = data?.version;
          const orderVersion = order?.data?.order?.version;
          const resulType = data?.result?.type;

          const payload = {
            resourceVersion:orderVersion,
            editVersion:editVersion
          }

          console.log(payload);
          console.log(resulType);
          console.log(resulType=="PreviewSuccess");
          
          if(resulType=="PreviewSuccess"){
            console.log("Apply edit");
            const result2 = await executeOrderEditApply(payload,orderEditId)
            console.log(result2);
          }

          console.log(result.data.createOrderEdit);
          forceUpdate();
            showNotification({
            kind: 'success',
            domain: DOMAINS.SIDE,
            text: intl.formatMessage(messages.OrderUpdated),
          }); 
        }
        catch (graphQLErrors) {
          console.log(graphQLErrors.message)
          const transformedErrors = transformErrors(graphQLErrors);
          if (transformedErrors.unmappedErrors.length > 0) {
            showApiErrorNotification({
              errors: transformedErrors.unmappedErrors,
            });
          }
        }
      }
      push(`${match.url}`);
    }
  )

  const handleChange = useCallback (
    async (e)=>
    {
      console.log("handle Change");  
      console.log(e);
      const payload = e?.payload;
      try{
        const result = await executeUpdateOrder(payload);
        // window.location.reload(true)
        // console.log(result);
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
                  errors: transformedErrors.unmappedErrors,
                });
              }
      }
  }
  )

  return (
    <OrderLineItemsForm
    initialValues={docToFormValues(order?.data?.order, projectLanguages)}
    onSubmit={handleSubmit}
    onChange={handleChange}
    isReadOnly={!canManage}
    dataLocale={dataLocale}
    >
      {(formProps) => {
        return (
          <React.Fragment>
          {formProps.formElements}
        </React.Fragment>
         
        );
      }}
    </OrderLineItemsForm>
  );
};
OrderLineItems.displayName = 'OrderDetails';
OrderLineItems.propTypes = {
  
};
export default OrderLineItems;
