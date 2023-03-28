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
import { formValuesToDoc } from './conversions';

const OrderShippingForm = (props) => {
  const intl = useIntl();
  const formik = useFormik({
    initialValues: props.initialValues,
    validate,
    enableReinitialize: true,
  });

  const onSubmit = (e) =>{
    const updateData = formValuesToDoc(formik?.values);
    props.onSubmit(updateData);
  }

  return(  <form onSubmit={onSubmit}>
    <Spacings.Stack scale="l">
     
     <CollapsiblePanel
          data-testid="quote-summary-panel"
          header={
            <CollapsiblePanel.Header>
              {/* {formatMessage(messages.panelTitle)} */}
              {'Shipping Details'}
            </CollapsiblePanel.Header>
          }
          scale="l">
            <Constraints.Horizontal >
             <Spacings.Stack scale="m">
           
     
    
     <Spacings.Stack scale="s">
      
        <TextField
          id='shippedQuantity'
          name="shippedQuantity"
          title="Shipped Quantity"
          value={formik.values?.quantity}
          errors={formik.errors.quantity}
          touched={formik.touched.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isReadOnly={true}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
          <TextField
            id='shippingTax'
            name="shippingTax"
            title="Shipping Tax"
            value={formik.values?.tax}
            errors={formik.errors.tax}
            touched={formik.touched.tax}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            horizontalConstraint={13}
            isReadOnly={props?.isReadOnly}
          />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        
        <TextField
          id='streetNumber'
          name="streetNumber"
          title="Street Number"
          value={formik.values?.streetNumber}
          errors={formik.errors.streetNumber}
          touched={formik.touched.streetNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isReadOnly={props?.isReadOnly}
        />
      
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        <TextField
          id='streetName'
          name="streetName"
          title="Street Name"
          value={formik.values?.streetName}
          errors={formik.errors.streetName}
          touched={formik.touched.streetName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isReadOnly={props?.isReadOnly}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        <TextField
          id='building'
          name="building"
          title="Building"
          value={formik.values?.building}
          errors={formik.errors.building}
          touched={formik.touched.building}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isReadOnly={props?.isReadOnly}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        <TextField
          id='city'
          name="city"
          title="City"
          value={formik.values?.city}
          errors={formik.errors.city}
          touched={formik.touched.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isReadOnly={props?.isReadOnly}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        <TextField
          id='postalCode'
          name="postalCode"
          title="Postal Code"
          value={formik.values?.postalCode}
          errors={formik.errors.postalCode}
          touched={formik.touched.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isReadOnly={props?.isReadOnly}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        <TextField
          id='state'
          name="state"
          title="State"
          value={formik.values?.state}
          errors={formik.errors.state}
          touched={formik.touched.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isReadOnly={props?.isReadOnly}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        <TextField
          id='country'
          name="country"
          title="Country"
          value={formik.values?.country}
          errors={formik.errors.country}
          touched={formik.touched.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isReadOnly={props?.isReadOnly}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        <Spacings.Inline>
                <PrimaryButton
                  label="Submit"
                  onClick={onSubmit}
                  onSubmit={onSubmit}
                  isDisabled={props?.isReadOnly}
                />
              </Spacings.Inline>
              </Spacings.Stack>
              </Spacings.Stack>
        </Constraints.Horizontal>
       
      {/* </Spacings.Inline> */}
     </CollapsiblePanel>
    </Spacings.Stack>
  </form>)
};
OrderShippingForm.displayName = 'OrderShippingForm';
OrderShippingForm.prototype = {
  initialValues: PropTypes.object.isRequired
}

export default OrderShippingForm;
