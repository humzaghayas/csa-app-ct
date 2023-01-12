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
import {ORDER_STATUS} from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
// const getEmployeeRoleOptions = Object.keys(EMPLOYEE_ROLES).map((key) => ({
//   label: EMPLOYEE_ROLES[key],
//   value: EMPLOYEE_ROLES[key],
// }));

// const getCustomerGroupsOptions = Object.keys(CUSTOMER_GROUPS).map((key) => ({
//   label: key,
//   value: CUSTOMER_GROUPS[key],
// }));
const getTicketStatusOptions = Object.keys(ORDER_STATUS).map((key) => ({
  label: key,
  value: ORDER_STATUS[key],
}));


const OrderStatusForm = (props) => {
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
              {'Order Status'}
            </CollapsiblePanel.Header>
          }
          scale="l">
            <Constraints.Horizontal >
             <Spacings.Stack scale="m">
           
     <Spacings.Stack scale="s">
      
        <SelectField
          name="Order Status"
          title="Order Status"
          value={formik.values.roles}
          errors={formik.errors.roles}
          touched={formik.touched.roles}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          
          options={getTicketStatusOptions}
          isReadOnly={props.isReadOnly}
          isRequired
          horizontalConstraint={13}
        />
        </Spacings.Stack>
     
        
        <Spacings.Stack scale="s">
        <Spacings.Inline>
                {/* <SecondaryButton
                  onClick={formik.handleReset}
                  isDisabled={formik.isSubmitting}
                  label="Edit"
                /> */}
                <PrimaryButton
  
    label="Submit"
    //onClick={() => alert('Button clicked')}
    isDisabled={false}
  />
              </Spacings.Inline>
              </Spacings.Stack>
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
OrderStatusForm.displayName = 'OrderStatusForm';
OrderStatusForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default OrderStatusForm;
