import React from 'react';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { FormModalPage } from '@commercetools-frontend/application-components';
import { useRouteMatch } from 'react-router-dom';
import CustomerSchedulesForm from './customer-schedules-forms';

const CustomerSchedulesCreate = (props) => {
  const languages = useApplicationContext((context) => context.project.languages);
  const handleSubmit = props.onSubmit;
  const match = useRouteMatch();

  return (
    <CustomerSchedulesForm
      initialValues={props?.initialValues}
      onSubmit={handleSubmit}
      customerId = {props?.customerId}
    >
      {(formProps) => {
        return (
          <FormModalPage
            title="Schedules create"
            isOpen
            onClose={props.onClose}
            isPrimaryButtonDisabled={formProps.isSubmitting}
            onSecondaryButtonClick={() => {
              formProps.handleCancel();
              props.onClose()
            }}
            onPrimaryButtonClick={formProps.submitForm}
          >
            {formProps.formElements}
          </FormModalPage>
        )
      }}
    </CustomerSchedulesForm>
  );
}

export default CustomerSchedulesCreate;