import { useIntl } from 'react-intl';
import PropTypes, { bool } from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import React, { useCallback, useState } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { docToFormValues, formValuesToDoc } from './conversions';
import PlaceOrderForm from './place-order-form ';
import { transformErrors } from './transform-errors';
import messages from './messages';
import validate from './validate';
import {
  useCartsFetcher,
  useShippingAddressCreator,
  usePlaceOrderFromCart,
  useFetchCartById,
} from '../../../../hooks/use-cart-connector/use-cart-connector';
//import ChannelDeletion from './place-order-popup';
//import CustomPopup from './CustomPopup';
import './custom-popup.module.css';
import { useFetchOrderById } from '../../../../hooks/use-orders-connector/use-orders-connector';

const PlaceOrder = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { cart, error, loading } = useFetchCartById(params.id);
  // const { order, data } = useFetchOrderById(params.id);
  const [isShown, setIsShown] = useState(false);
  const [id, setId] = useState(null);
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  // const canManage = useIsAuthorized({
  //   demandedPermissions: [PERMISSIONS.Manage],
  // });
  const showNotification = useShowNotification();

  const showApiErrorNotification = useShowApiErrorNotification();
  const placeOrderFromCart = usePlaceOrderFromCart();

  const handleSubmit = useCallback(
    async (formikValues, formikHelpers) => {
      const data = formValuesToDoc(formikValues);
      try {
        const response = await placeOrderFromCart.execute({
          originalDraft: cart,
          //draft: order,
          nextDraft: data,
        });
        //bool window.confirm([messages.OrderPlaced]);
        setId(response.data.createOrderFromCart.id);
        setIsShown((current) => !current);
        console.log('response', response);
      } catch (graphQLErrors) {
        const transformedErrors = transformErrors(graphQLErrors);
        if (transformedErrors.unmappedErrors.length > 0) {
          showApiErrorNotification({
            errors: transformedErrors.unmappedErrors,
          });
        }

        //  formikHelpers.setErrors(transformedErrors.formErrors);
      }
      // console.log('response', response);
    },

    [
      placeOrderFromCart,
      dataLocale,
      intl,
      projectLanguages,
      showApiErrorNotification,
      showNotification,
    ]
  );

  //const { employee } = useEmployeeDetailsFetcher(params.id);

  return (
    <PlaceOrderForm
      initialValues={docToFormValues(cart, projectLanguages)}
      onSubmit={handleSubmit}
      isShown={isShown}
      id={id}
      //isReadOnly={!canManage}
      dataLocale={dataLocale}
    >
      {(formProps) => {
        return (
          // <React.Fragment>{formProps.formElements}</React.Fragment>
          <div>
            <FormModalPage
              title={intl.formatMessage(messages.modalTitle)}
              subtitle={intl.formatMessage(messages.subTitle)}
              isOpen
              onClose={props.onClose}
              onPrimaryButtonClick={handleSubmit}

              // labelPrimaryButton=" "
              // labelPrimaryButton={FormModalPage.Intl.save}
              // labelSecondaryButton={FormModalPage.Intl.cancel}
            >
              {formProps.formElements}
            </FormModalPage>
            {/* {isShown && <ChannelDeletion />} */}
            {/* <CustomPopup
              onClose={popupCloseHandler}
              show={isShown}
              title="Order Placed"
            >
              <h1>Hello This is Popup Content Area</h1>
              <h2>This is my lorem ipsum text here!</h2>
            </CustomPopup> */}
          </div>
        );
      }}
    </PlaceOrderForm>
  );
};
PlaceOrder.displayName = 'PlaceOrder';

export default PlaceOrder;
