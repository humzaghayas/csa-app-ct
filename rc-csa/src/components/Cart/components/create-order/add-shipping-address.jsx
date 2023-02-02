import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
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
import { docToFormValues, formValuesToDoc } from './conversions';
import ShippingAddressForm from './add-shipping-address-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import validate from './validate';
import { useCartsFetcher ,
         useShippingAddressCreator,
         useAddLineItem,
         useFetchCartById
} from '../../../../hooks/use-cart-connector/use-cart-connector';



const ShippingAddress = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { cart, error, loading } = useFetchCartById(params.id);
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
  const shippingAddressCreator = useShippingAddressCreator();
  const handleSubmit = useCallback(
    async (formikValues, formikHelpers) => {
      const data = formValuesToDoc(formikValues);
      try {
        await shippingAddressCreator.execute({
          originalDraft: cart,
          nextDraft: data,
          
        });
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: intl.formatMessage(messages.OrderPlaced),
        });
      } catch (graphQLErrors) {
        const transformedErrors = transformErrors(graphQLErrors);
        if (transformedErrors.unmappedErrors.length > 0) {
          showApiErrorNotification({
            errors: transformedErrors.unmappedErrors,
          });
        }

     //  formikHelpers.setErrors(transformedErrors.formErrors);
      }
    },
    [
      shippingAddressCreator,
      dataLocale,
      intl,
      projectLanguages,
      showApiErrorNotification,
      showNotification,
    ]
  );
  //const { employee } = useEmployeeDetailsFetcher(params.id);

  return (
    <ShippingAddressForm
      initialValues={docToFormValues(null, projectLanguages)}
      onSubmit={handleSubmit}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
    >
      {(formProps) => {
        return (
          <FormModalPage
            title={intl.formatMessage(messages.modalTitle)}
            subtitle={intl.formatMessage(messages.subTitle)}
            isOpen
            onClose={props.onClose}
            isPrimaryButtonDisabled={
              formProps.isSubmitting || !formProps.isDirty || !canManage
            }
            isSecondaryButtonDisabled={!formProps.isDirty}
            onSecondaryButtonClick={formProps.handleReset}
            //onPrimaryButtonClick={formProps.submitForm}
            onPrimaryButtonClick={handleSubmit}
            labelPrimaryButton={FormModalPage.Intl.save}
            labelSecondaryButton={FormModalPage.Intl.cancel}
          >
            {formProps.formElements}
          </FormModalPage>
        );
      }}
    </ShippingAddressForm>
  );
};
ShippingAddress.displayName = 'ShippingAddress';


export default ShippingAddress;
