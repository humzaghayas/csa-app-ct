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
import {
  MoneyField,
  //SearchSelectInput
} from '@commercetools-frontend/ui-kit';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { getSearchProductRows } from './conversions';
import { useProductSearchByText } from '../../../../hooks/use-product-search-connector/use-product-search-connector';
import { NumberInput, SearchSelectInput } from '@commercetools-frontend/ui-kit';

import { SuspendedRoute } from '@commercetools-frontend/application-shell';

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

const searchColumns = [
  { key: 'product', label: 'Product' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'quantity', label: 'Qty' },
  { key: 'addButton', label: '' },
];

const CartViewForm = (props) => {
  const intl = useIntl();
  const { push } = useHistory();
  const match = useRouteMatch();
  const [active, setActive] = useState(false);
  const { executeProductSearch } = useProductSearchByText();

  const [searchProducts, setSearchProducts] = useState([]);

  //const placeOrder = () => {};
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    onChange: props.onChange,
    validate,
    enableReinitialize: true,
  });

  const params = useParams();
  const lineItemId = params.id;

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
      case 'quantity':
        return (
          <div>
            <Spacings.Stack scale="s">
              <Spacings.Inline>
                <Spacings.Stack scale="s">
                  <NumberInput
                    id="quantity"
                    label="Quantity"
                    value={item.quantity}
                    isDisabled={item.isEditQuantity}
                    onChange={(e) => {
                      e.actions = [
                        {
                          changeLineItemQuantity: {
                            lineItemId: item?.id,
                            quantity: Number(e.target.value),
                          },
                        },
                      ];
                      props.onSubmit(e);
                      console.log('type of', typeof e.target.value);
                    }}
                  />
                </Spacings.Stack>
              </Spacings.Inline>
            </Spacings.Stack>
          </div>
        );
      case 'isEditQuantity':
        return (
          <div>
            <Spacings.Stack scale="s">
              <Spacings.Inline>
                <Spacings.Stack scale="s">
                  <PrimaryButton
                    label="Edit Quantity"
                    onClick={() => {
                      item.isEditQuantity = true;
                    }}
                  />
                </Spacings.Stack>
              </Spacings.Inline>
            </Spacings.Stack>
          </div>
        );
      default:
        return item[column.key];
    }
  };

  const itemRendererSearch = (item, column) => {
    switch (column.key) {
      case 'product':
        return (
          <div>
            <Spacings.Stack scale="s">
              <Spacings.Inline>
                <img src={item?.image?.url} height={65} width={65} />
                <Spacings.Stack scale="s">
                  <div>{item?.product}</div>
                  <div>SKU: {item?.sku}</div>
                  <div>Key: {item?.key}</div>
                </Spacings.Stack>
              </Spacings.Inline>
            </Spacings.Stack>
          </div>
        );
      case 'quantity':
        return (
          <div>
            <Spacings.Stack scale="s">
              <Spacings.Inline>
                <NumberInput
                  value={item.quantity}
                  isReadOnly={false}
                  onChange={(e) => {
                    item.quantity = e.target.value;
                  }}
                  horizontalConstraint={2}
                />
              </Spacings.Inline>
            </Spacings.Stack>
          </div>
        );
      case 'addButton':
        return (
          <div>
            <Spacings.Stack scale="s">
              <Spacings.Inline>
                <PrimaryButton
                  title="Add"
                  label="Add"
                  type="button"
                  onClick={(e) => {
                    console.log('Add Cart Item');
                    console.log('item', item);

                    e.actions = [
                      {
                        addLineItem: {
                          productId: item?.productId,
                          variantId: item?.variantId,
                          quantity: item?.quantity,
                        },
                      },
                    ];
                    props.onSubmit(e);
                  }}
                />
              </Spacings.Inline>
            </Spacings.Stack>
          </div>
        );

      default:
        return item[column.key];
    }
  };

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
            //onClick={() => push(`place-order`)}
            onClick={() => push(`shipping-address`)}
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
                name="cart_ordernumber"
                title="Order Number"
                value={formik.values.cart_ordernumber}
                //errors={formik.errors.cart_ordernumber}
                //touched={formik.touched.cart_ordernumber}
                //onChange={formik.handleChange}
                onChange={(event) => console.log(event)}
                //onBlur={formik.handleBlur}
                isReadOnly={props.isReadOnly}
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
                //onChange={onChange}
                onBlur={formik.handleBlur}
                options={getCartStates}
                // isReadOnly={props.isReadOnly}
                // isRequired
                horizontalConstraint={13}
              />
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
        <Constraints.Horizontal min={13}>
          <Spacings.Stack scale="s">
            {/* <SecondaryButton iconLeft={<PlusBoldIcon />} label="Place Order" onClick={() => setValue(true)} /> */}

            <Spacings.Stack scale="m">
              {formik?.values?.lineItems ? (
                <DataTable
                  rows={formik.values.lineItems}
                  columns={columns}
                  itemRenderer={itemRenderer}
                />
              ) : null}
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
            {'Add line items'}
          </CollapsiblePanel.Header>
        }
        scale="l"
      >
        <Constraints.Horizontal>
          <Spacings.Stack scale="m">
            <Spacings.Stack scale="s">
              <SearchSelectInput
                id="searchProduct"
                name="searchProduct"
                horizontalConstraint={7}
                optionType="single-lined"
                isAutofocussed={false}
                backspaceRemovesValue={true}
                isClearable={true}
                isDisabled={false}
                isReadOnly={false}
                isMulti={false}
                onChange={() => {}}
                placeholder="Search products by name"
                loadOptions={async (s) => {
                  console.log(s);
                  const result = await executeProductSearch(s);
                  setSearchProducts(
                    result?.data?.productProjectionSearch?.results
                  );
                  console.log(result);
                  // return s;
                }}
                // noOptionsMessage="No exact match found"
                // loadingMessage="loading exact matches"
                // placeholder="Select customers"
                // eslint-disable-next-line no-undef
                // loadOptions={customLoadOptionsFunction}
                // cacheOptions={false}
              />

              {searchProducts.length > 0 ? (
                <DataTable
                  rows={getSearchProductRows(searchProducts)}
                  columns={searchColumns}
                  itemRenderer={itemRendererSearch}
                />
              ) : null}
            </Spacings.Stack>
          </Spacings.Stack>
        </Constraints.Horizontal>
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
