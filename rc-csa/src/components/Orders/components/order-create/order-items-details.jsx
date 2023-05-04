import React from 'react';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { FormModalPage } from '@commercetools-frontend/application-components';
import { docToFormValues, formValuesToDoc } from './conversions';
import OrderItemsForm from './order-items-form';
import { useRouteMatch } from 'react-router-dom';

const OrderItemDetails = (props) => {
  const languages = useApplicationContext((context) => context.project.languages);
  const handleSubmit = props.onSubmit;
  const match = useRouteMatch();
  const orderItem = props?.orderItems?.filter((item)=> {return item.id ==  match?.params?.id})[0];
  console.log("In order items details");

  return (
    <OrderItemsForm
      initialValues={orderItem}
      onSubmit={handleSubmit}
    >
      {(formProps) => {
        return (
          <FormModalPage
            title="Order item"
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
    </OrderItemsForm>
  );
}

export default OrderItemDetails;