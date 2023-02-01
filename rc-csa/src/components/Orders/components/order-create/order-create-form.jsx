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
import { SHIPMENT_STATUS,PAYMENT_STATUS,ORDER_STATE, ORDER_UPDATE_ACTIONS_LIST} from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import DataTable from '@commercetools-uikit/data-table';
import OrderItemsForm from './order-items-form';
import { useHistory, useRouteMatch, Switch } from 'react-router-dom';
import OrderItemDetails from './order-items-details';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';

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
  { key: 'product', label: 'Product' },
  // { key: 'unitPrice', label: 'Original Unit Price' },
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




const OrderCreateForm = (props) => {
  const intl = useIntl();
  const { push } = useHistory();
  const match = useRouteMatch();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    onChange: props.onChange,
    validate,
    enableReinitialize: true,
  });
  

  const onChange = (e)=>{
    console.log(e?.target);
    const id = e?.target?.id;
    const value = e?.target?.value;
    const orderId = formik?.values?.id;
    const version = formik?.values?.version;
    const actions = [];
    // eslint-disable-next-line default-case
    switch(id){
      case 'orderState':
        console.log("Order State")
        console.log(value);
        actions.push({
          "changeOrderState":{
           "orderState":value 
          }
        })
        e.payload={
          actions,
          version:version,
          orderId
        };
        props.onChange(e);
        break;
      case 'paymentState':
        console.log("Payment State");
        console.log(value);
        actions.push({
          "changePaymentState":{
           "paymentState":value 
          }
        })
        e.payload={
          actions,
          version:version,
          orderId
        }
        props.onChange(e);
        break;
      case 'shipmentState':
        console.log("Shipment State")
        console.log(value)
        actions.push({
          "changeShipmentState":{
           "shipmentState":value 
          }
        })
        e.payload={
          actions,
          version:version,
          orderId
        }
        props.onChange(e);
        break;
    }
  }

  const onSubmit = (e) =>{
    // console.log("In order create form");
    props.onSubmit(e);
  }


  // console.log("Order details LineItems");
  // console.log(props.onSubmit);
  // console.log(props);
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
          id='orderState'
          name="orderState"
          title="Order status"
          value={formik.values.orderState}
          // errors={formik.errors.orderState}
          // touched={formik.touched.orderState}
          onChange={onChange}
          onBlur={formik.handleBlur}
          options={getOrderStates}
          // isReadOnly={props.isReadOnly}
          horizontalConstraint={13}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
      
      <SelectField
        id='paymentState'
        name="Payment status"
        title="Payment status"
        value={formik.values.paymentState}
        errors={formik.errors.roles}
        touched={formik.touched.roles}
        onChange={onChange}
        onBlur={formik.handleBlur}
        
        options={getPaymentStates}
        isReadOnly={props.isReadOnly}
        // isRequired
        horizontalConstraint={13}
      />
      </Spacings.Stack>
      <Spacings.Stack scale="s">
      
        <SelectField
          id='shipmentState'
          name="Shipment status"
          title="Shipment status"
          value={formik.values.shipmentState}
          errors={formik.errors.roles}
          touched={formik.touched.roles}
          onChange={onChange}
          onBlur={formik.handleBlur}
          options={getShipmentStates}
          isReadOnly={props.isReadOnly}
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
             onRowClick={(row) =>{ push(`${match.url}/${row.id}/order-item`);
              }
            }
             />:null}
              </Spacings.Stack>

              <Switch>
              <SuspendedRoute path={`${match.path}/:id`}>
                <OrderItemDetails 
                  onClose={() => push(`${match.url}`)} 
                  orderId = {formik?.values?.id} 
                  orderItems={formik?.values?.lineItems}
                  onSubmit = {onSubmit}
                />
              </SuspendedRoute>
              </Switch>

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
