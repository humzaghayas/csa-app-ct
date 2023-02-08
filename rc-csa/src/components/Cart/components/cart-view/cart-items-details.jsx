import React from 'react';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { FormModalPage } from '@commercetools-frontend/application-components';
import { docToFormValues, formValuesToDoc } from './conversions';
import CartItemsForm from './cart-items-form';
import { useRouteMatch } from 'react-router-dom';

const CartItemDetails = (props) => {
  const languages = useApplicationContext(
    (context) => context.project.languages
  );
  const handleSubmit = props.onSubmit;
  const match = useRouteMatch();
  const cartItem = props?.orderItems?.filter((item) => {
    return item.id == match?.params?.id;
  })[0];
  console.log('In cart items details');

  return (
    <CartItemsForm initialValues={cartItem} onSubmit={handleSubmit}>
      {(formProps) => {
        return (
          <FormModalPage
            title="Cart item"
            isOpen
            onClose={props.onClose}
            isPrimaryButtonDisabled={formProps.isSubmitting}
            onSecondaryButtonClick={() => {
              formProps.handleCancel();
              props.onClose();
            }}
            onPrimaryButtonClick={formProps.submitForm}
          >
            {formProps.formElements}
          </FormModalPage>
        );
      }}
    </CartItemsForm>
  );
};

export default CartItemDetails;
