import { useIntl } from 'react-intl';
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
import {
  useEmployeeDetailsCreator,
} from '../../../../hooks/use-employee-connector/use-employeee-graphql-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import EmployeeDetailsForm from './add-new-rule-form';
import { transformErrors } from './transform-errors';
import messages from './messages';

const EmployeeDetails = (props) => {
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
  const employeeDetailsCreator = useEmployeeDetailsCreator();
   const handleSubmit = useCallback(
    async (formikValues, formikHelpers) => {
      const data = formValuesToDoc(formikValues);
      try {
        await employeeDetailsCreator.execute({
          nextDraft: data,
        });
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: intl.formatMessage(messages.EmployeeCreated),
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
      employeeDetailsCreator,
      dataLocale,
      intl,
      projectLanguages,
      showApiErrorNotification,
      showNotification,
    ]
  );

  return (
    <EmployeeDetailsForm
      initialValues={docToFormValues(null, projectLanguages)}
      onSubmit={handleSubmit}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
    >
      {(formProps) => {
        return (
          <FormModalPage
            title={intl.formatMessage(messages.modalTitle)}
            isOpen
            onClose={props.onClose}
            isPrimaryButtonDisabled={
              formProps.isSubmitting || !formProps.isDirty || !canManage
            }
            isSecondaryButtonDisabled={!formProps.isDirty}
            onSecondaryButtonClick={formProps.handleReset}
            onPrimaryButtonClick={formProps.submitForm}
            labelPrimaryButton={FormModalPage.Intl.save}
            labelSecondaryButton={FormModalPage.Intl.cancel}
          >
            {formProps.formElements}
          </FormModalPage>
        );
      }}
    </EmployeeDetailsForm>
  );
};
EmployeeDetails.displayName = 'EmployeeDetails';

export default EmployeeDetails;
