import React from 'react';
import { useFormik } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import { Constraints, NumberField } from '@commercetools-frontend/ui-kit';
import DataTable from '@commercetools-uikit/data-table';
import SearchSelectInput from '@commercetools-uikit/search-select-input';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import { useRouteMatch, useHistory } from 'react-router-dom';

const rows = [
  {
    product: '',
    originalUnitPrice: '$350.00',
    UnitPrice: '$350.00',
    Qty: '3',
    LineItemState: '',
    subTotal: '$1150.00',
    Tax: '0',
    Total: '$1150.00',
  },
  {
    product: '',
    originalUnitPrice: '$350.00',
    UnitPrice: '$350.00',
    Qty: '3',
    LineItemState: '',
    subTotal: '$1150.00',
    Tax: '0',
    Total: '$1150.00',
  },
  {
    product: '',
    originalUnitPrice: '$350.00',
    UnitPrice: '$350.00',
    Qty: '3',
    LineItemState: '',
    subTotal: '$1150.00',
    Tax: '0',
    Total: '$1150.00',
  },
];

const columns = [
  { key: 'product', label: 'Product' },
  // { key: 'unitPrice', label: 'Original Unit Price' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'quantity', label: 'Qty' },
  // { key: 'lineItemState', label: 'LineItemState' },
  { key: 'subTotalPrice', label: 'Sub Total' },
  { key: 'tax', label: 'Tax' },
  { key: 'totalPrice', label: 'Total' },
];

const CartLineItemsForm = (props) => {
  const match = useRouteMatch();
  const history = useHistory();
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
    e.cartItem = {
      cartId: props?.cartId,
      lineItemId: formik?.values?.id,
      version: 10,
      quantity: formik?.values?.quantity,
      comment: formik?.values?.comment,
      isQuantityUpdated:
        formik?.values?.quantity === props?.initialValues?.quantity,
    };
    props.onSubmit(e);
  };

  //const formElements = (
  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="l">
        <Constraints.Horizontal min={13}>
          <SearchSelectInput
            id="customers"
            name="customers"
            horizontalConstraint={13}
            optionType="single-lined"
            isAutofocussed={false}
            backspaceRemovesValue={true}
            isClearable={true}
            isDisabled={false}
            isReadOnly={false}
            isMulti={true}
            noOptionsMessage="No exact match found"
            loadingMessage="loading exact matches"
            placeholder="Search By..."
            loadOptions={() => {}}
            cacheOptions={false}
            onChange={() => {}}
            className="select-input-search"
          />
        </Constraints.Horizontal>
      </Spacings.Stack>
      <Spacings.Stack scale="l">
        <DataTable rows={rows} columns={columns} />
      </Spacings.Stack>
      <Spacings.Stack scale="l">
        <Spacings.Inline>
          <SecondaryButton
            label="Go Back"
            data-track-event="click"
            onClick={() =>
              history.push(
                `/csa-project-2/csa-customer-tickets/order-edit/13d130e7-ebc8-41c4-838e-316e6a94202b/orders-general`
              )
            }
            size="medium"
          />
        </Spacings.Inline>
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

export default CartLineItemsForm;
