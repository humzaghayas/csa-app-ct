import React from 'react';
import { useFormik } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import { Constraints, NumberField } from '@commercetools-frontend/ui-kit';

const CartItemsForm = (props) => {
  const dataLocale = useApplicationContext((context) => context.dataLocale);
  const formik = useFormik({
    // Pass initial values from the parent component.
    initialValues: props.initialValues,
    // Handle form submission in the parent component.
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  const onSubmit = (e) => {
    e.orderItem = {
      cartId: props?.cartId,
      lineItemId: formik?.values?.id,
      quantity: formik?.values?.quantity,
      comment: formik?.values?.comment,
      isQuantityUpdated:
        formik?.values?.quantity === props?.initialValues?.quantity,
    };
    props.onSubmit(e);
  };

  // Only contains the form elements, no buttons.
  const formElements = (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="l">
        <img src={formik?.values?.product?.image} height={80} width={80} />
      </Spacings.Stack>
      <Spacings.Stack scale="l">
        <TextField
          name="product"
          title="Product"
          value={formik?.values?.product?.name}
          touched={formik.touched.key}
          onBlur={formik.handleBlur}
          isReadOnly={true}
          horizontalConstraint={6}
        />
      </Spacings.Stack>
      <Spacings.Stack scale="l">
        <NumberField
          name="quantity"
          title="Quantity"
          value={formik?.values?.quantity}
          onChange={formik.handleChange}
          touched={formik.touched.key}
          onBlur={formik.handleBlur}
          horizontalConstraint={6}
        />
      </Spacings.Stack>
    </Spacings.Stack>
  );

  return props.children({
    formElements,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: onSubmit,
    handleCancel: formik.handleReset,
  });
};

export default CartItemsForm;
