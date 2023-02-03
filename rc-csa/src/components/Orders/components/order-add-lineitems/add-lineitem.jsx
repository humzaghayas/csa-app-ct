import { useIntl } from 'react-intl';
import { useParams, useRouteMatch } from 'react-router-dom';
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
import AddLineItemForm from './addline-item-form';
import { transformErrors } from './transform-errors';
import messages from './messages';


import {
  useCustomerAddressDetailsCreator,
} from '../../../../hooks/use-customers-connector/use-customers-connector';

const OrderAddLineItem = (props) => {
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
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
  const customerAddressCreator = useCustomerAddressDetailsCreator();
  console.log("params",JSON.stringify(params));
  console.log("props.customer",JSON.stringify(props));
  console.log(match);
  console.log("Onclose ",props.onClose);
  const handleSubmit = useCallback(
    async (formikValues, formikHelpers) => {
      const data = formValuesToDoc(formikValues);
      console.log("dataForm",JSON.stringify(data));

      try {
        await customerAddressCreator.execute({
          originalDraft: props.customer,
          nextDraft: data,
        });
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: "Customer Created",
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
      customerAddressCreator,
      dataLocale,
      intl,
      projectLanguages,
      showApiErrorNotification,
      showNotification,
    ]
  );

  return (
    <AddLineItemForm
      initialValues={docToFormValues(null, projectLanguages)}
      onSubmit={handleSubmit}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
    >
      {(formProps) => {
        return (
          <FormModalPage
            title={intl.formatMessage(messages.title)}
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
            {formProps.formElements}
          </FormModalPage>
        );
      }}
    </AddLineItemForm>
  );
};
OrderAddLineItem.displayName = 'OrderAddLineItem';

export default OrderAddLineItem;
