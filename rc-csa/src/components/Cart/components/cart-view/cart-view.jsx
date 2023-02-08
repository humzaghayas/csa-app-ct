import { useIntl } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
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
  // useCartUpdateById,
  // //useCreateCartEditById,
  // useCartEditApply,
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
  // const { executeUpdateCart } = useCartUpdateById();
  // //const { executeCreateCartEdit } = useCreateCartEditById();
  // const { executeCartEditApply } = useCartEditApply();
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();

  //const [order,setOrder] = useState(null);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const { cart } = useFetchCartById(match.params.id);
  //console.log('cart', cart);
  const handleSubmit = useCallback(async (e) => {
    console.log('In Handle Submit');
    const cartItem = e.cartItem;
    if (!cartItem.isQuantityUpdated) {
      try {
        const draft = {
          resource: {
            id: cart?.id,
            typeId: 'cart',
          },
          stagedActions: [
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
        const result = await executeCreateCartEdit(draft);
        const data = await result.data.createCartEdit;
        const cartEditId = data?.id;
        const editVersion = data?.version;
        const cartVersion = cart?.data?.cart?.version;
        const resulType = data?.result?.type;

        const payload = {
          resourceVersion: cartVersion,
          editVersion: editVersion,
        };

        console.log(payload);
        console.log(resulType);
        console.log(resulType == 'PreviewSuccess');

        if (resulType == 'PreviewSuccess') {
          console.log('Apply edit');
          const result2 = await executeCartEditApply(payload, cartEditId);
          console.log(result2);
        }

        console.log(result.data.createCartEdit);
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
    <CartViewForm
      initialValues={docToFormValues(
        //cart?.data?.cart
        cart,
        projectLanguages
      )}
      //onSubmit={handleSubmit}
      //onChange={handleChange}
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
  onClose: PropTypes.func.isRequired,
};
export default CartView;
