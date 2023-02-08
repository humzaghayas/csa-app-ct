import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import {
  SHIPMENT_STATUS,
  PAYMENT_STATUS,
  ORDER_STATE,
  CART_STATE,
} from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import DataTable from '@commercetools-uikit/data-table';
import { MoneyField } from '@commercetools-frontend/ui-kit';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import { Switch, useHistory, useRouteMatch } from 'react-router-dom';
//import iphone from './iphone.jpg'
import ChannelDeletion from '../place-order/place-order-popup';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import CartItemDetails from './cart-items-details';

const getCartStates = Object.keys(CART_STATE).map((key) => ({
  label: key,
  value: CART_STATE[key],
}));

const row = null;
const columns = [
  { key: 'product', label: 'Product' },
  { key: 'unitPrice', label: 'Original Unit Price' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'quantity', label: 'Qty' },
  // { key: 'lineItemState', label: 'LineItemState' },
  { key: 'subTotalPrice', label: 'Sub Total' },
  { key: 'tax', label: 'Tax' },
  { key: 'totalPrice', label: 'Total' },
];

const itemRenderer = (item, column) => {
  switch (column.key) {
    case 'product':
      return (
        <div>
          <Spacings.Stack scale="s">
            <Spacings.Inline>
              <img src={item.product.image} height={65} width={65} />
              <Spacings.Stack scale="s">
                <div>{item.product.name}</div>
                <div>SKU: {item.product.sku}</div>
                <div>Key: {item.product.key}</div>
              </Spacings.Stack>
            </Spacings.Inline>
          </Spacings.Stack>
        </div>
      );
    default:
      return item[column.key];
  }
};

const CartViewForm = (props) => {
  const intl = useIntl();
  const { push } = useHistory();
  const match = useRouteMatch();
  const [active, setActive] = useState(false);
  const placeOrder = () => {};
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    onChange: props.onChange,
    validate,
    enableReinitialize: true,
  });

  const onChange = (e) => {
    console.log(e?.target);
    const id = e?.target?.id;
    const value = e?.target?.value;
    const cartId = formik?.values?.id;
    const version = formik?.values?.version;
    const actions = [];
    // eslint-disable-next-line default-case
    switch (id) {
      case 'cartState':
        console.log('Cart State');
        console.log(value);
        actions.push({
          changeCartState: {
            cartState: value,
          },
        });
        e.payload = {
          actions,
          version: version,
          cartId,
        };
        props.onChange(e);
        break;
    }
  };
  // console.log('Cart details LineItems');
  // console.log(formik?.values);

  const onSubmit = (e) => {
    // console.log("In order create form");
    props.onSubmit(e);
  };
  const formElements = (
    <Spacings.Stack scale="l">
      <Spacings.Stack scale="m">
        <Spacings.Inline>
          <SecondaryButton
            label="Place Order"
            data-track-event="click"
            onClick={() => push(`place-order`)}
            //onClick={placeOrder()}
            iconLeft={<PlusBoldIcon />}
            size="medium"
          />
        </Spacings.Inline>
      </Spacings.Stack>

      <CollapsiblePanel
        data-testid="quote-summary-panel"
        header={
          <CollapsiblePanel.Header>
            {/* {formatMessage(messages.panelTitle)} */}
            {'Cart Summary'}
          </CollapsiblePanel.Header>
        }
        scale="l"
      >
        <Constraints.Horizontal>
          <Spacings.Stack scale="m">
            <Spacings.Stack scale="n">
              <TextField
                name="cartNumber"
                title="Order Number"
                value={formik.values.cartNumber}
                errors={formik.errors.cartNumber}
                touched={formik.touched.cartNumber}
                onChange={onChange}
                onBlur={formik.handleBlur}
                //isReadOnly={props.isReadOnly}
                horizontalConstraint={13}
              />
            </Spacings.Stack>
            <Spacings.Stack scale="s">
              <SelectField
                name="Cart status"
                title="Cart status"
                value={formik.values.cartState}
                // errors={formik.errors.roles}
                // touched={formik.touched.roles}
                onChange={onChange}
                onBlur={formik.handleBlur}
                options={getCartStates}
                // isReadOnly={props.isReadOnly}
                // isRequired
                horizontalConstraint={13}
              />
            </Spacings.Stack>

            <Spacings.Stack scale="s">
              {/* <Spacings.Inline>
                <SecondaryButton onClick={formik.handleReset} label="Edit" />
                <PrimaryButton onClick={formik.handleSubmit} label="Submit" />
              </Spacings.Inline> */}
            </Spacings.Stack>
          </Spacings.Stack>
        </Constraints.Horizontal>

        {/* </Spacings.Inline> */}
      </CollapsiblePanel>
      <CollapsiblePanel
        data-testid="quote-summary-panel"
        header={
          <CollapsiblePanel.Header>
            {/* {formatMessage(messages.panelTitle)} */}
            {'Cart Items'}
          </CollapsiblePanel.Header>
        }
        scale="l"
      >
        <Spacings.Stack scale="s">
          <Constraints.Horizontal min={13}>
            {/* <SecondaryButton iconLeft={<PlusBoldIcon />} label="Place Order" onClick={() => setValue(true)} /> */}

            <Spacings.Stack scale="m">
              {formik?.values?.lineItems ? (
                <DataTable
                  rows={formik.values.lineItems}
                  columns={columns}
                  itemRenderer={itemRenderer}
                  onRowClick={(row) => {
                    push(`${match.url}/${row.id}/cart-item`);
                  }}
                />
              ) : null}
            </Spacings.Stack>
            <Switch>
              <SuspendedRoute path={`${match.path}/:id/cart-item`}>
                <CartItemDetails
                  onClose={() => push(`${match.url}`)}
                  cartId={formik?.values?.id}
                  orderItems={formik?.values?.lineItems}
                  onSubmit={onSubmit}
                />
              </SuspendedRoute>
              {/* <Route path={`${match.path}/cart-line-items`}>
                <OrderLineItems onClose={() => push(`${match.url}`)} />
              </Route> */}
            </Switch>
          </Constraints.Horizontal>
        </Spacings.Stack>
        {/* </Spacings.Inline> */}
      </CollapsiblePanel>
    </Spacings.Stack>
  );

  return props.children({
    formElements,
    values: formik.values,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    handleReset: formik.handleReset,
  });
};
CartViewForm.displayName = 'CartViewForm';
CartViewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default CartViewForm;
