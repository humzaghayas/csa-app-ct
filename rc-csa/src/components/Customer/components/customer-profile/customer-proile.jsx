import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';
import {
  useCustomerDetailsUpdater,
} from '../../../../hooks/use-customers-connector/use-customers-connector';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { docToFormValues, formValuesToDoc } from './conversions';
import CustomerProfileForm from './customer-profile.form';
import { transformErrors } from './transform-errors';
import messages from './messages';

const CustomerProfile = (props) => {
  console.log("propsCUst",JSON.stringify(props));
  // const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
  //   dataLocale: context.dataLocale ?? '',
  //   projectLanguages: context.project?.languages ?? [],
  // }));
  // const canManage = useIsAuthorized({
  //   demandedPermissions: [PERMISSIONS.Manage],
  // });
  // const handleSubmit = useCallback(
  // );

  const intl = useIntl();
  const params = useParams();
  //const { employee, error, loading } = useEmployeeDetailsFetcher(params.id);
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
 const customer = props?.customer;
 
 console.log("customerproile",customer?.custom?.customFieldsRaw);
const customFieldsRaw1 = customer?.custom?.customFieldsRaw;
 const transformCustomFieldsRawToCustomFields = customFieldsRaw => {
  console.log("entere");
  if (!customFieldsRaw || customFieldsRaw.length === 0) return null;
  return customFieldsRaw.reduce(
    (customFields, customField) => ({
      ...customFields,
      [customField.name]: customField.value,
    }),
    {}
  );
};
const customeCustomerFields=transformCustomFieldsRawToCustomFields(customFieldsRaw1);
console.log("transformCustomFieldsRawToCustomFields",customeCustomerFields);
  const customerDetailsUpdater = useCustomerDetailsUpdater();
  const handleSubmit = useCallback(
    
    async (formikValues, formikHelpers) => {
      const data = formValuesToDoc(formikValues);
      console.log("Customer profile data to update",data);
      try {
        await customerDetailsUpdater.execute({
          originalDraft: customer,
          nextDraft: data,
        });
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: "Customer Updated",
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
      customer,
      customerDetailsUpdater,
      dataLocale,
      intl,
      projectLanguages,
      showApiErrorNotification,
      showNotification,
    ]
  );


  return (
    <CustomerProfileForm
    initialValues={docToFormValues(customer,customeCustomerFields, projectLanguages)}
    onSubmit={handleSubmit}
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
    </CustomerProfileForm>
  );
};
CustomerProfile.displayName = 'CustomerDetails';
CustomerProfile.propTypes = {
  
};
export default CustomerProfile;
