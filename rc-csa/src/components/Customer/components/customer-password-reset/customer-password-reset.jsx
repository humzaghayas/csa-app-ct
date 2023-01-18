import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
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
  showApiErrorNotification,
  showNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../../../constants';
// import {
//   useCustomerDetailsCreator,
// } from '../../../../hooks/use-Customer-connector/use-Customere-graphql-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import { transformErrors } from './transform-errors';
import messages from './messages';
import PasswordResetForm from './customer-password-reset-form';
import {
  useCustomerDetailsFetcher,
  usePasswordReset,
  usePasswordResetToken,
} from '../../../../hooks/use-customers-connector/use-customers-connector';

const PasswordReset = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });

  // const handleSubmit = useCallback();
  // console.log("props",JSON.stringify(props));
  // const showNotification = useShowNotification();
  // const showApiErrorNotification = useShowApiErrorNotification();
  // const CustomerPasswordToken = usePasswordResetToken();

  // Password reset token
  // const customer = useCustomerDetailsFetcher(params.id);
  // const customer = props?.customer;
  // console.log('customer', JSON.stringify(customer));
  // console.log('customer', customer);
  // const { execute } = usePasswordResetToken();
  // useEffect(() => {
  //   execute(customer.email);
  // }, [customer.email]);

  //Password token
  const customer = useCustomerDetailsFetcher(params.id);
  // console.log('customer', customer);
  const { execute } = usePasswordResetToken(customer.email);
  useEffect(() => {
    execute(customer.email);
  }, [customer.email]);

  //Password reset
  const passwordReset = usePasswordReset();
  const handleSubmit = useCallback(
    async (formikValues, formikHelpers) => {
      const data = formValuesToDoc(formikValues);
      try {
        await passwordReset.execute({
          originalDraft: customer,
          // nextDraft: data,
        });
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: 'Customer Updated',
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
      passwordReset,
      dataLocale,
      intl,
      projectLanguages,
      showApiErrorNotification,
      showNotification,
    ]
  );

  return (
    <PasswordResetForm
      initialValues={docToFormValues(customer, projectLanguages)}
      onSubmit={handleSubmit}
      customer={props.customer}
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
    </PasswordResetForm>
  );
};
PasswordReset.displayName = 'CustomerDetails';
PasswordReset.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default PasswordReset;
