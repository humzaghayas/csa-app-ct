import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { useParams, useRouteMatch } from 'react-router-dom';
import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import React, { useCallback, useReducer } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../../../constants';
import { docToFormValues, formValuesToDoc } from './conversions';
import ShippingAddressForm from './shipping-address-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
//import validate from './validate';
import {
  useCartsFetcher,
  useShippingAddressCreator,
  useAddLineItem,
  useFetchCartById,
  useCartUpdateById,
  useFetchAddressByCartId,
} from '../../../../hooks/use-cart-connector/use-cart-connector';
import { useCustomerAddressesFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';

const ShippingAddress = (props) => {
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

  const isQuoteRequest = props?.isQuoteRequest;

  //const {executeFetchOrder} = useFetchOrderById(match.params.id);
  const { executeUpdateCart } = useCartUpdateById();
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();

  // const [order,setOrder] = useState(async()=>{
  //   return await executeFetchOrder(match.params.id);
  // });

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);


  let { cart } = useFetchAddressByCartId(match.params.id);
  const handleSubmit = useCallback(async (payload) => {
    console.log('In Handle Submit');
    payload.cartId = cart?.id;
    payload.version = cart?.version;
    //payload.actions = cart?.setBillingAddress || cart?.setShippingAddress;
    console.log(payload);
    try {
      //if(cart?.shippingAddress){
      const result = await executeUpdateCart(payload);
      cart = result?.data?.updateCart?.version
        ? result?.data?.updateCart?.version
        : cart;
      console.log(result);
      console.log(cart);
      forceUpdate();
      showNotification({
        kind: 'success',
        domain: DOMAINS.SIDE,
        text: intl.formatMessage(messages.CartUpdated),
      });
    } catch (graphQLErrors) {
      console.log('humza : ' + graphQLErrors);
      const transformedErrors = transformErrors(graphQLErrors);
      if (transformedErrors.unmappedErrors.length > 0) {
        showApiErrorNotification({
          errors: graphQLErrors.message,
        });
      }
    }
  });

  const handleChange = useCallback(async (e) => {
  });
  //console.log("Cart in shipping address", cart)

  const { customer } = useCustomerAddressesFetcher(cart?.customerId);


  return (
    <ShippingAddressForm
      initialValues={docToFormValues(cart?.shippingAddress, projectLanguages)}
      addresses={customer?.addresses}
      onSubmit={handleSubmit}
      onChange={handleChange}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
      onClose={props?.onClose}
      cartId={cart?.id}
      cartVersion={cart?.version}
      isQuoteRequest={isQuoteRequest}
    >
      {(formProps) => {
        return (
          <React.Fragment>{formProps.formElements}</React.Fragment>
        );
      }}
    </ShippingAddressForm>
  );
};
ShippingAddress.displayName = 'ShippingAddress';
ShippingAddress.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default ShippingAddress;
