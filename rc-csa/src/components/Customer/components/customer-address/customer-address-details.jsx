import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { formatLocalizedString } from '@commercetools-frontend/l10n';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../../../constants';
import { docToFormValues, formValuesToDoc } from './conversions';
import AddressDetailsForm from './customer-address-details-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { useCustomerAddressDetailsFetcher,
  useCustomerAddressDetailsUpdater } from '../../../../hooks/use-customers-connector/use-customers-connector';

import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';

const AddressDetails = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
 //const employee = props?.employee;
 console.log("parms",JSON.stringify(params));
 console.log("propsCUstomerDetails",JSON.stringify(props));
 const custId = "ddca9941-549a-47b0-98b2-e940f6393e28";
 const addressIds = params.id.split('+');
 console.log("answer_array",addressIds);
 const { loading, error, customerAddress } = useCustomerAddressDetailsFetcher(addressIds[1]);
 console.log("customerAddress",JSON.stringify(customerAddress));

 const item = customerAddress?.addresses?.find(
  (item) => item.id === addressIds[0]
);

console.log("item",item);

  const customerAddressDetailsUpdater = useCustomerAddressDetailsUpdater();
  const handleSubmit = useCallback(
    async (formikValues, formikHelpers) => {
      const data = formValuesToDoc(formikValues);
      try {
        await customerAddressDetailsUpdater.execute({
          originalDraft: customerAddress,
          nextDraft: data,
          addressId:addressIds[0],
        });
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: "Update Success",
        });
      } catch (graphQLErrors) {
        const transformedErrors = transformErrors(graphQLErrors);
        if (transformedErrors.unmappedErrors.length > 0) {
          showApiErrorNotification({
            errors: transformedErrors.unmappedErrors,
          });
        }

        formikHelpers.setErrors(transformedErrors.formErrors);
      }
    },
    [
      customerAddress,
      customerAddressDetailsUpdater,
      dataLocale,
      intl,
      projectLanguages,
      showApiErrorNotification,
      showNotification,
    ]
  );

  return (
    <AddressDetailsForm
      initialValues={docToFormValues(item, projectLanguages)}
      onSubmit={handleSubmit}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
    >
      {/* {(formProps) => {
        return (
            <React.Fragment>
              {formProps.formElements}
            </React.Fragment>
        );
      }} */}
       {(formProps) => {
        return (
          <FormModalPage
            title="Customer Address"
            isOpen
            onClose={props.onClose}
            isPrimaryButtonDisabled={
              formProps.isSubmitting || !formProps.isDirty || !canManage
            }
            isSecondaryButtonDisabled={!formProps.isDirty}
            onSecondaryButtonClick={formProps.handleReset}
            onPrimaryButtonClick={formProps.submitForm}
            labelPrimaryButton={FormModalPage.Intl.save}
            labelSecondaryButton={FormModalPage.Intl.revert}
          >
            {/* {loading && (
              <Spacings.Stack alignItems="center">
                <LoadingSpinner />
              </Spacings.Stack>
            )}
            {error && (
              <ContentNotification type="error">
                <Text.Body>
                  {intl.formatMessage(messages.backToWelcome)}
                </Text.Body>
              </ContentNotification>
            )} */}
            {customerAddress && formProps.formElements}
            {customerAddress === null && <PageNotFound />}
          </FormModalPage>
        );
      }}
    </AddressDetailsForm>
  );
};
AddressDetails.displayName = 'AddressDetails';
AddressDetails.propTypes = {
 // 
};

export default AddressDetails;
