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
// const getEmployeeRoleOptions = Object.keys(EMPLOYEE_ROLES).map((key) => ({
//   label: EMPLOYEE_ROLES[key],
//   value: EMPLOYEE_ROLES[key],
// }));

// const getCustomerGroupsOptions = Object.keys(CUSTOMER_GROUPS).map((key) => ({
//   label: key,
//   value: CUSTOMER_GROUPS[key],
// }));
const getTicketPriorityOptions = Object.keys(TICKET_PRIORITY).map((key) => ({
  label: key,
  value: TICKET_PRIORITY[key],
}));


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
              {'Product Details'}
            </CollapsiblePanel.Header>
          }
          scale="l">
            <Constraints.Horizontal >
             <Spacings.Stack scale="m">
             <Spacings.Stack scale="s">
        <TextField
          name="Product Code"
          title="Product Code"
          value={formik.values.title}
          errors={formik.errors.title}
          touched={formik.touched.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
          <TextField
          name="Product Name"
          title="Product Name"
          value={formik.values.firstName}
          errors={formik.errors.firstName}
          touched={formik.touched.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
     
     </Spacings.Stack>
     <Spacings.Stack scale="s">
        <TextField
          name="Item Price"
          title="Item Price"
          value={formik.values.middleName}
          errors={formik.errors.middleName}
          touched={formik.touched.middleName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        </Spacings.Stack>
        
       
    
     
        
        <Spacings.Stack scale="s">
        <Spacings.Inline>
                <SecondaryButton
                  onClick={formik.handleReset}
                  isDisabled={formik.isSubmitting}
                  label="Edit"
                />
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
