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
import CartLineItemsForm from './cart-line-items-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { useRouteMatch, useHistory } from 'react-router-dom';
import {
  useFetchOrderById,
  useOrderUpdateById,
  // useCreateOrderEditById,
  useOrderEditApply,
} from '../../../../hooks/use-orders-connector';
// import {
//   useFetchCartById,
//   useCartUpdateById,
//   useCartEditApply,
//   useCreateOrderEditById,
// } from '../../../../hooks/use-cart-connector/use-cart-connector';
import { useEffect } from 'react';
import { useState } from 'react';
import { useReducer } from 'react';

const CartLineItems = (props) => {
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

  const { executeUpdateCart } = useCartUpdateById();
  //const { executeCreateOrderEdit } = useCreateOrderEditById();
  //const { executeCartEditApply } = useCartEditApply();
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();

  // const [order,setOrder] = useState(null);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const { data, loading, error } = useFetchCartById(match.params.id);

  const cart = { data };

  // setOrder(data);

  const handleSubmit = useCallback(async (e) => {
    console.log('In Handle Submit');
    const cartItem = e.cartItem;
    if (!cartItem.isQuantityUpdated) {
      try {
        const draft = {
          resource: {
            id: cart?.data?.cart?.id,
            typeId: 'cart',
          },
          actions: [
            {
              changeLineItemQuantity: {
                lineItemId: cartItem?.lineItemId,
                quantity: cartItem?.quantity,
              },
            },
          ],
          comment: cartItem?.comment ? cartItem?.comment : 'No Comment',
        };
        console.log(draft);
        const result = await useCartUpdateById(draft);
        const data = await result.data.createOrderEdit;
        const orderEditId = data?.id;
        const editVersion = data?.version;
        const cartVersion = cart?.data?.cart?.version;
        const resulType = data?.result?.type;

        const payload = {
          resourceVersion: cartVersion,
          editVersion: editVersion,
        };

        console.log(payload);
        console.log(result);
        console.log(resulType == 'PreviewSuccess');

        if (resulType == 'PreviewSuccess') {
          console.log('Apply edit');
          const result2 = await executeCartEditApply(payload, orderEditId);
          console.log(result2);
        }

        console.log(result.data.createOrderEdit);
        forceUpdate();
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: intl.formatMessage(messages.CartUpdated),
        });
      } catch (graphQLErrors) {
        console.log(graphQLErrors.message);
        const transformedErrors = transformErrors(graphQLErrors);
        if (transformedErrors.unmappedErrors.length > 0) {
          showApiErrorNotification({
            errors: transformedErrors.unmappedErrors,
          });
        }
      }
    }
    push(`${match.url}`);
  });
  // const handleSubmit = useCallback(
  //   async (formikValues, formikHelpers) => {
  //     const data = formValuesToDoc(formikValues);
  //     try {
  //       await executeUpdateCart.execute({
  //         originalDraft: cart,
  //         nextDraft: data,
  //       });
  //       showNotification({
  //         kind: 'success',
  //         domain: DOMAINS.SIDE,
  //         text: intl.formatMessage(messages.CartUpdated),
  //       });
  //     } catch (graphQLErrors) {
  //       const transformedErrors = transformErrors(graphQLErrors);
  //       if (transformedErrors.unmappedErrors.length > 0) {
  //         showApiErrorNotification({
  //           errors: transformedErrors.unmappedErrors,
  //         });
  //       }

  //       //  formikHelpers.setErrors(transformedErrors.formErrors);
  //     }
  //   },
  //   [
  //     executeUpdateCart,
  //     dataLocale,
  //     intl,
  //     projectLanguages,
  //     showApiErrorNotification,
  //     showNotification,
  //   ]
  // );

  const handleChange = useCallback(async (e) => {
    console.log('handle Change');
    console.log(e);
    const payload = e?.payload;
    try {
      const result = await executeUpdateCart(payload);
      // window.location.reload(true)
      // console.log(result);
      forceUpdate();
      showNotification({
        kind: 'success',
        domain: DOMAINS.SIDE,
        text: intl.formatMessage(messages.CartUpdated),
      });
    } catch (graphQLErrors) {
      console.log(graphQLErrors.message);
      const transformedErrors = transformErrors(graphQLErrors);
      if (transformedErrors.unmappedErrors.length > 0) {
        showApiErrorNotification({
          errors: transformedErrors.unmappedErrors,
        });
      }
    }
  });

  return (
    <CartLineItemsForm
      initialValues={docToFormValues(
        cart?.data?.cart,
        //cart,
        projectLanguages
      )}
      onSubmit={handleSubmit}
      onChange={handleChange}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
    >
      {(formProps) => {
        return <React.Fragment>{formProps.formElements}</React.Fragment>;
      }}
    </CartLineItemsForm>
  );
};
CartLineItems.displayName = 'OrderDetails';
CartLineItems.propTypes = {
  
};
export default CartLineItems;
