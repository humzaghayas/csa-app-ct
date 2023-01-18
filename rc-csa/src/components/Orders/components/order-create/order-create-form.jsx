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
import { EMPLOYEE_ROLES,CUSTOMER_GROUPS,TICKET_PRIORITY} from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import DataTable from '@commercetools-uikit/data-table';
//import iphone from './iphone.jpg'

const getTicketPriorityOptions = Object.keys(TICKET_PRIORITY).map((key) => ({
  label: key,
  value: TICKET_PRIORITY[key],
}));
const rows = [
  {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
  {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
  {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
];

const columns = [
  { key: 'product', label: 'product' 
  ,renderItem: (row) => (
    <div>
      {/* <img src={iphone} alt="" /> */}
      <Spacings.Stack scale='s'>
     <div>iphone</div>
     <div>SKU:iphone</div>
     <div>Key:iphone</div>
     </Spacings.Stack>
  </div>
  )
  },
  { key: 'originalUnitPrice', label: 'originalUnitPrice' },
  { key: 'UnitPrice', label: 'UnitPrice' },
  { key: 'Qty', label: 'Qty' },
  { key: 'LineItemState', label: 'LineItemState' },
  { key: 'subTotal', label: 'subTotal' },
  { key: 'Tax', label: 'Tax' },
  { key: 'Total', label: 'Total' },
];

const OrderCreateForm = (props) => {
  const intl = useIntl();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

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
          name="order workflow status"
          title="order workflow status"
          value={formik.values.roles}
          errors={formik.errors.roles}
          touched={formik.touched.roles}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          
          options={getTicketPriorityOptions}
          isReadOnly={props.isReadOnly}
          isRequired
          horizontalConstraint={13}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
      
      <SelectField
        name="payment status"
        title="payment status"
        value={formik.values.roles}
        errors={formik.errors.roles}
        touched={formik.touched.roles}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        
        options={getTicketPriorityOptions}
        isReadOnly={props.isReadOnly}
        isRequired
        horizontalConstraint={13}
      />
      </Spacings.Stack>
      <Spacings.Stack scale="s">
      
        <SelectField
          name="shipment status"
          title="shipment status"
          value={formik.values.roles}
          errors={formik.errors.roles}
          touched={formik.touched.roles}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          
          options={getTicketPriorityOptions}
          isReadOnly={props.isReadOnly}
          isRequired
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
            
             <DataTable rows={rows} columns={columns} />
     

       
       
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
