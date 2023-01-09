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
  showApiErrorNotification,
  showNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../../../constants';
// import {
//   useCustomerDetailsCreator,
// } from '../../../../hooks/use-Customer-connector/use-Customere-graphql-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import CustomerPasswordForm from './customer-password-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { usePasswordResetToken } from '../../../../hooks/use-customers-connector/use-customers-connector';

const CustomerPassword = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  // const showNotification = useShowNotification();
  // const showApiErrorNotification = useShowApiErrorNotification();
  // const CustomerDetailsCreator = useCustomerDetailsCreator();
  // const handleSubmit = useCallback(
  //   // async (formikValues, formikHelpers) => {
  //   //   const data = formValuesToDoc(formikValues);
  //   //   try {
  //   //     await CustomerDetailsCreator.execute({
  //   //       nextDraft: data,
  //   //     });
  //   //     showNotification({
  //   //       kind: 'success',
  //   //       domain: DOMAINS.SIDE,
  //   //       text: intl.formatMessage(messages.CustomerPasswordd),
  //   //     });
  //   //   } catch (graphQLErrors) {
  //   //     const transformedErrors = transformErrors(graphQLErrors);
  //   //     if (transformedErrors.unmappedErrors.length > 0) {
  //   //       showApiErrorNotification({
  //   //         errors: transformedErrors.unmappedErrors,
  //   //       });
  //   //     }

  //   //     formikHelpers.setErrors(transformedErrors.formErrors);
  //   //   }
  //   // },
  //   // [
  //   //   CustomerDetailsCreator,
  //   //   dataLocale,
  //   //   intl,
  //   //   projectLanguages,
  //   //   showApiErrorNotification,
  //   //   showNotification,
  //   // ]
  // );

  // Password reset token
  const customer = props?.customer;
  const passwordResetToken = usePasswordResetToken();
  const handleSubmit = useCallback(
    async (formikValues, formikHelpers) => {
      const data = formValuesToDoc(formikValues);
      try {
        await passwordResetToken.execute({
          originalDraft: customer,
          nextDraft: data,
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
      passwordResetToken,
      dataLocale,
      intl,
      projectLanguages,
      showApiErrorNotification,
      showNotification,
    ]
  );

  return (
    <CustomerPasswordForm
      initialValues={docToFormValues(null, projectLanguages)}
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
    </CustomerPasswordForm>
  );
};
CustomerPassword.displayName = 'CustomerDetails';
CustomerPassword.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default CustomerPassword;
