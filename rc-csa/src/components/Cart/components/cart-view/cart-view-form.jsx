import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import { SHIPMENT_STATUS,PAYMENT_STATUS,ORDER_STATE , CART_STATE} from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import DataTable from '@commercetools-uikit/data-table';
import { MoneyField } from '@commercetools-frontend/ui-kit';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import { useHistory } from 'react-router-dom';
//import iphone from './iphone.jpg'

const getCartStates = Object.keys(CART_STATE).map((key) => ({
  label: key,
  value: CART_STATE[key],
}));


const rows = [
  {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
  {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
  {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
];

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
      return <div>
                <Spacings.Stack scale='s'>
                  <Spacings.Inline>
                    <img src={item.product.image} height={65} width={65}/>
                    <Spacings.Stack scale='s'>
                      <div>{item.product.name}</div>
                      <div>SKU: {item.product.sku}</div>
                      <div>Key: {item.product.key}</div>
                    </Spacings.Stack>
                  </Spacings.Inline>
                </Spacings.Stack>
              </div>;
    default:
      return item[column.key];
  }
}


const CartViewForm = (props) => {
  const intl = useIntl();
  const { push } = useHistory();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  console.log("Cart details LineItems");
  console.log(formik?.values);

  const formElements = (
    <Spacings.Stack scale="l">
     
    
      <Spacings.Stack scale='m'>
        <Spacings.Inline>
        <SecondaryButton
          label="Place Order"
          data-track-event="click"
          onClick={() => push(`add-shipping-address`)}
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
          scale="l">
            <Constraints.Horizontal >
             <Spacings.Stack scale="m">
            
     <Spacings.Stack scale="s">
      
        <SelectField
          name="Cart status"
          title="Cart status"
          value={formik.values.cartState}
          errors={formik.errors.roles}
          touched={formik.touched.roles}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          
          options={getCartStates}
          isReadOnly={props.isReadOnly}
          // isRequired
          horizontalConstraint={13}
        />
        </Spacings.Stack>
       
        <Spacings.Stack scale="s">
        <Spacings.Inline>
                <SecondaryButton
                  onClick={formik.handleReset}
                  
                  label="Edit"
                />
                <PrimaryButton
                  onClick={formik.handleSubmit}
                  
                  label="Submit"
                />
              </Spacings.Inline>
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
          scale="l">
            <Spacings.Stack scale="s">
            <Constraints.Horizontal min={13}>
            {/* <SecondaryButton iconLeft={<PlusBoldIcon />} label="Place Order" onClick={() => setValue(true)} /> */}

             <Spacings.Stack scale="m">
            
             {formik?.values?.lineItems? 
             <DataTable 
             rows={formik.values.lineItems} 
             columns={columns} 
             itemRenderer={itemRenderer}
             />:null}
              </Spacings.Stack>
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
