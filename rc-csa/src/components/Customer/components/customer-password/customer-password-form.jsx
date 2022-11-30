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
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import { EMPLOYEE_ROLES,CUSTOMER_GROUPS,CUSTOMER_PRIORITY} from './constants';
import Constraints from '@commercetools-uikit/constraints';
import PasswordField from '@commercetools-uikit/password-field';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { useState } from 'react';
// const getEmployeeRoleOptions = Object.keys(EMPLOYEE_ROLES).map((key) => ({
//   label: EMPLOYEE_ROLES[key],
//   value: EMPLOYEE_ROLES[key],
// }));

// const getCustomerGroupsOptions = Object.keys(CUSTOMER_GROUPS).map((key) => ({
//   label: key,
//   value: CUSTOMER_GROUPS[key],
// }));
const getCustomerPriorityOptions = Object.keys(CUSTOMER_PRIORITY).map((key) => ({
  label: key,
  value: CUSTOMER_PRIORITY[key],
}));


const CustomerPasswordForm = (props) => {
  const intl = useIntl();
  const[password , setPassword] = useState(false)
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  const formElements = (
    <Spacings.Stack scale="m">
     
            
           
           
            
             <PasswordField
    title="My Password"
    value="s3cr3t"
    onChange={(event) => alert(event.target.value)}
    horizontalConstraint={13}
  />
 

 <Spacings.Inline>
               <PrimaryButton
                label="Change Password"
                onClick={() => setPassword(true)}
               isDisabled={false}
                // horizontalConstraint={13}
               size = "big"
  />
  </Spacings.Inline>
  {password == true ? <div >
  <ContentNotification type="info" align="center" >A link send to your mail to reset the password</ContentNotification>
 </div>: null}
 {password == true ? <div >
  <ContentNotification type="success" align="center" >your password has been changed successfully</ContentNotification>
  </div>: null}
             {/* <Spacings.Stack scale="s">
        <TextField
          name="Password Type"
          title="Password Type"
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
          name="Password Question"
          title="Password Question"
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
          name="Change Password"
          title="Change Password"
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
          name="Confirm Password"
          title="Confirm Password"
          value={formik.values.firstName}
          errors={formik.errors.firstName}
          touched={formik.touched.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        </Spacings.Stack> */}
       
       
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
CustomerPasswordForm.displayName = 'CustomerPasswordForm';
CustomerPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default CustomerPasswordForm;
