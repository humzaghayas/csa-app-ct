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
import { SHIPMENT_STATUS,PAYMENT_STATUS,ORDER_STATE} from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import DataTable from '@commercetools-uikit/data-table';
import { MoneyField } from '@commercetools-frontend/ui-kit';
//import iphone from './iphone.jpg'

const getOrderStates = Object.keys(ORDER_STATE).map((key) => ({
  label: key,
  value: ORDER_STATE[key],
}));

const getPaymentStates = Object.keys(PAYMENT_STATUS).map((key) => ({
  label: key,
  value: PAYMENT_STATUS[key],
}));

const getShipmentStates = Object.keys(SHIPMENT_STATUS).map((key) => ({
  label: key,
  value: SHIPMENT_STATUS[key],
}));

const rows = [
  {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
  {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
  {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
];

const columns = [
  { key: 'product', label: 'product' },
  { key: 'unitPrice', label: 'originalUnitPrice' },
  { key: 'unitPrice', label: 'UnitPrice' },
  { key: 'quantity', label: 'Qty' },
  // { key: 'lineItemState', label: 'LineItemState' },
  { key: 'subTotalPrice', label: 'subTotal' },
  { key: 'tax', label: 'Tax' },
  { key: 'totalPrice', label: 'Total' },
];

const itemRenderer = (item, column) => {
  switch (column.key) {
    case 'product':
      return <div>
                <Spacings.Stack scale='s'>
                    <img src={item.product.image} height={50} width={50}/>
                    <div>{item.product.name}</div>
                    <div>SKU: {item.product.sku}</div>
                    <div>Key: {item.product.key}</div>
                </Spacings.Stack>
              </div>;
    default:
      return item[column.key];
  }
}


const OrderCreateForm = (props) => {
  const intl = useIntl();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  console.log("Order details LineItems");
  console.log(formik?.values);

  const formElements = (
    <Spacings.Stack scale="l">
     
     <CollapsiblePanel
          data-testid="quote-summary-panel"
          header={
            <CollapsiblePanel.Header>
              {/* {formatMessage(messages.panelTitle)} */}
              {'Order Summary'}
            </CollapsiblePanel.Header>
          }
          scale="l">
            <Constraints.Horizontal >
             <Spacings.Stack scale="m">
            
     <Spacings.Stack scale="s">
      
        <SelectField
          name="Order status"
          title="Order status"
          value={formik.values.orderState}
          errors={formik.errors.roles}
          touched={formik.touched.roles}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          
          options={getOrderStates}
          isReadOnly={props.isReadOnly}
          // isRequired
          horizontalConstraint={13}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
      
      <SelectField
        name="Payment status"
        title="Payment status"
        value={formik.values.paymentState}
        errors={formik.errors.roles}
        touched={formik.touched.roles}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        
        options={getPaymentStates}
        isReadOnly={props.isReadOnly}
        // isRequired
        horizontalConstraint={13}
      />
      </Spacings.Stack>
      <Spacings.Stack scale="s">
      
        <SelectField
          name="Shipment status"
          title="Shipment status"
          value={formik.values.shipmentState}
          errors={formik.errors.roles}
          touched={formik.touched.roles}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          
          options={getShipmentStates}
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
              {'Order Items'}
            </CollapsiblePanel.Header>
          }
          scale="l">
            <Constraints.Horizontal >
             <Spacings.Stack scale="m">
            
             {formik?.values?.lineItems? 
             <DataTable 
             rows={formik.values.lineItems} 
             columns={columns} 
             itemRenderer={itemRenderer}
             />:null}
              </Spacings.Stack>
        </Constraints.Horizontal>
       
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
OrderCreateForm.displayName = 'OrderCreateForm';
OrderCreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default OrderCreateForm;
