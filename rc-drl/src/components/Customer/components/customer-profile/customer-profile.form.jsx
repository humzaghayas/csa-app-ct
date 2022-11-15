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
import Text from '@commercetools-uikit/text';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
 import { CUSTOMER_PRIORITY} from './constants';
import RichTextInput from '@commercetools-uikit/rich-text-input';

import Constraints from '@commercetools-uikit/constraints';
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
// const html = '<p>hello world</p>';

const CustomerProfileForm = (props) => {
  // const [value, setValue] = React.useState(html);
  // const handleChange = React.useCallback((event) => {
  //   setValue(event.target.value);
  // }, []);
  // const ref = React.useRef(null);
  // const handleReset = React.useCallback(() => {
  //   ref.current?.resetValue('<p>after reset</p>');
  // }, []);
  const intl = useIntl();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  const formElements = (
    <Spacings.Stack scale="l">
      {/* <Spacings.Inline> */}
   {/* <h3>lahari</h3> */}
   <Spacings.Inline>
   <TextField
        name="key"
        title="Standard Language"
        // placeholder="English"
        value="English"
        // value={formik.values.amount}
          errors={formik.errors.amount}
          touched={formik.touched.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
      />
       <TextField
        name="key"
        title="Standard Currency"
        value="Dollar"
        // value={formik.values.key}
        // value={formik.values.amount}
          errors={formik.errors.amount}
          touched={formik.touched.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
      />
      </Spacings.Inline>
      <Spacings.Inline>
       <SelectField
          name="role"
          title="Groups"
         
          //  value={getCustomerPriorityOptions[Low]}
          errors={formik.errors.role}
          touched={formik.touched.role}
          onChange={formik.handleChange}
          options={ getCustomerPriorityOptions}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isRequired
        />
       <TextField
        name="key"
        title="Description"
        value="Software Engineer"
        // value={formik.values.key}
        // value={formik.values.amount}
          errors={formik.errors.amount}
          touched={formik.touched.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
      />
      </Spacings.Inline>
         {/* <>
      <button onClick={handleReset}>Reset</button>
      <RichTextInput value={value} onChange={handleChange} ref={ref} />
    </> */}
      {/* <Spacings.Stack scale="s">
        <Text.Headline as="h2">Title</Text.Headline>
        <Text.Body>Description</Text.Body>
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
CustomerProfileForm.displayName = 'CustomerProfileForm';
CustomerProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default CustomerProfileForm;
