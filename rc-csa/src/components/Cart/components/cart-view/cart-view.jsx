import { useIntl } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer, useState } from 'react';
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
import CartViewForm from './cart-view-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { useRouteMatch } from 'react-router-dom';
import {
  useFetchCartById,
  useCartUpdateById,
  useCreateOrderEditById,
  useCartEditApply,
} from '../../../../hooks/use-cart-connector/use-cart-connector';
import Spacings from '@commercetools-uikit/spacings';
import { PlusBoldIcon, SecondaryButton } from '@commercetools-frontend/ui-kit';
import { useFetchOrderById } from '../../../../hooks/use-orders-connector';

const CartView = (props) => {
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

  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();

  //const [order,setOrder] = useState(null);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  let { cart } = useFetchCartById(match.params.id);

  const handleSubmit = useCallback(async (e) => {
    console.log('In Handle Submit');
    const actions = e.actions;
    if (actions.length != 0) {
      try {
        const draft = {
          cartId: cart.id,
          version: cart.version,

          actions,
        };
        console.log(draft);
        const result = await executeUpdateCart(draft);

        console.log(result);

        forceUpdate();
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: intl.formatMessage(messages.CartUpdated),
        });

        window.location.reload(true)
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

  const handleChange = useCallback(async (e) => {
    console.log('handle Change');
    console.log(e);
    const payload = e?.payload;
    try {
      const result = await executeUpdateCart(payload);

      // console.log(result);
      forceUpdate();
      showNotification({
        kind: 'success',
        domain: DOMAINS.SIDE,
        text: intl.formatMessage(messages.CartUpdated),
      });

      window.location.reload(true)
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
    <CartViewForm
      initialValues={docToFormValues(
        //cart?.data?.cart,
        cart,
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
    </CartViewForm>
  );
};
CartView.displayName = 'CartDetails';
CartView.propTypes = {

};
export default CartView;
