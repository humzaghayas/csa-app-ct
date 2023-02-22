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
import ShippingAddressForm from './add-shipping-address-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import validate from './validate';
import {
  useCartsFetcher,
  useShippingAddressCreator,
  useAddLineItem,
  useFetchCartById,
  useCartUpdateById,
} from '../../../../hooks/use-cart-connector/use-cart-connector';

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

  //const {executeFetchOrder} = useFetchOrderById(match.params.id);
  const { executeUpdateCart } = useCartUpdateById();
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();

  // const [order,setOrder] = useState(async()=>{
  //   return await executeFetchOrder(match.params.id);
  // });

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  // useEffect(async()=>{
  //   if(order == null){
  //     const result  = await executeFetchOrder(match.params.id);
  //     setOrder(result);
  //   }
  // },[reducerValue]);

  let { cart } = useFetchCartById(match.params.id);
  const handleSubmit = useCallback(async (payload) => {
    console.log('In Handle Submit');
    console.log(payload);
    try {
      const result = await executeUpdateCart(payload);
      cart = result?.data?.updateCart?.version
        ? result?.data?.updateCart?.version
        : cart;
      console.log(result);
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
          errors: graphQLErrors.message,
        });
      }
    }
  });

  return (
    <ShippingAddressForm
      initialValues={docToFormValues(cart, projectLanguages)}
      onSubmit={handleSubmit}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
    >
      {(formProps) => {
        return (
          <React.Fragment>{formProps.formElements}</React.Fragment>
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
    </ShippingAddressForm>
  );
};
ShippingAddress.displayName = 'ShippingAddress';

export default ShippingAddress;
