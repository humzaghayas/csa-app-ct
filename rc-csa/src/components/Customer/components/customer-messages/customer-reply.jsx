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
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../../../constants';
// import {
//   useCustomerDetailsCreator,
// } from '../../../../hooks/use-Customer-connector/use-Customere-graphql-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import CustomerReplyForm from './customer-reply-form';
import { transformErrors } from './transform-errors';
import messages from './messages';

const CustomerReply = (props) => {
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
  const handleSubmit = useCallback(
    // async (formikValues, formikHelpers) => {
    //   const data = formValuesToDoc(formikValues);
    //   try {
    //     await CustomerDetailsCreator.execute({
    //       nextDraft: data,
    //     });
    //     showNotification({
    //       kind: 'success',
    //       domain: DOMAINS.SIDE,
    //       text: intl.formatMessage(messages.CustomerReplyd),
    //     });
    //   } catch (graphQLErrors) {
    //     const transformedErrors = transformErrors(graphQLErrors);
    //     if (transformedErrors.unmappedErrors.length > 0) {
    //       showApiErrorNotification({
    //         errors: transformedErrors.unmappedErrors,
    //       });
    //     }

    //     formikHelpers.setErrors(transformedErrors.formErrors);
    //   }
    // },
    // [
    //   CustomerDetailsCreator,
    //   dataLocale,
    //   intl,
    //   projectLanguages,
    //   showApiErrorNotification,
    //   showNotification,
    // ]
  );

  return (
    <CustomerReplyForm
    initialValues={docToFormValues(null, projectLanguages)}
    onSubmit={handleSubmit}
    isReadOnly={!canManage}
    dataLocale={dataLocale}
    >
      {(formProps) => {
        return (
          <React.Fragment>
          {formProps.formElements}
        </React.Fragment>
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
    </CustomerReplyForm>
  );
};
CustomerReply.displayName = 'CustomerReply';
CustomerReply.propTypes = {
  
};
export default CustomerReply;
