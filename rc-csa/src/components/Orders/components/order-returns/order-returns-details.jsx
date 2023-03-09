import React from 'react';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { FormModalPage } from '@commercetools-frontend/application-components';
import { docToFormValues } from './conversions';
import { useRouteMatch } from 'react-router-dom';
import OrderReturnsForm from './order-returns-form';
import { SHIPMENT_STATUS } from './constants';

const OrderReturnsNew = (props) => {
  const languages = useApplicationContext((context) => context.project.languages);
  const handleSubmit = props.onSubmit;

  const match = useRouteMatch();
  const initialValues = {
    returnTrackingid:"",
    returnDate:"",
    shipmentState:SHIPMENT_STATUS.Returned,
    orderInfo:props?.initialValues,
    returnQuantity:0,
    checkbox:false
  }

  return (
    <OrderReturnsForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {(formProps) => {
        return (
          <FormModalPage
            title="New return info"
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
    </OrderReturnsForm>
  );
}

export default OrderReturnsNew;