import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import Text from '@commercetools-uikit/text';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
 import { CUSTOMER_PRIORITY} from './constants';
import RichTextInput from '@commercetools-uikit/rich-text-input';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Constraints from '@commercetools-uikit/constraints';
import styles from './customer-profile.module.css';
import DateField from '@commercetools-uikit/date-field';
import RadioField from '@commercetools-uikit/radio-field';
import RadioInput from '@commercetools-uikit/radio-input';
// import FieldLabel from '@commercetools-uikit/field-label';

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
   <div className={styles.buttonss}>
   <Spacings.Stack scale="xl" >
               <Spacings.Inline>
               <Spacings.Stack scale="l">
              <SecondaryButton
            label="Revert Changes"
            data-track-event="click"
            // onClick={() => push(`required-approval`)}
            
            size="medium"
          />
          </Spacings.Stack>
           <Spacings.Stack scale="l">
            <SecondaryButton
            label="save"
            data-track-event="click"
            // onClick={() => push(`required-approval`)}
            
            size="medium"
          />
          </Spacings.Stack>
          </Spacings.Inline>
              </Spacings.Stack>
             </div>
   <Spacings.Inline>
   <TextField
        name="key"
        title="Full Name"
        // placeholder="English"
        value="Lahari Ramurthi"
        // value={formik.values.amount}
          errors={formik.errors.amount}
          touched={formik.touched.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
      />
       <TextField
        name="key"
        title="Occupation"
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
      <Spacings.Inline>
      <TextField
        name="key"
        title="Company Name"
        value="Royal cyber"
        // value={formik.values.key}
        // value={formik.values.amount}
          errors={formik.errors.amount}
          touched={formik.touched.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
      />
       <SelectField
          name="role"
          title="Preferred Language"
         
          //  value={getCustomerPriorityOptions[Low]}
          errors={formik.errors.role}
          touched={formik.touched.role}
          onChange={formik.handleChange}
          options={ getCustomerPriorityOptions}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isRequired
        />
     
      </Spacings.Inline>
      <Spacings.Inline>
      <DateField
    title="Date Of Birth"
    value="1998-08-14"
    horizontalConstraint={13}
    onChange={(event) => alert(event.target.value)}
  />
       <SelectField
          name="role"
          title="Age Group"
          value="English"
          //  value={getCustomerPriorityOptions[Low]}
          errors={formik.errors.role}
          touched={formik.touched.role}
          onChange={formik.handleChange}
          options={ getCustomerPriorityOptions}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isRequired
        />
    
      </Spacings.Inline>
      <Spacings.Inline>
      <RadioField
    title="Gender"
    name="Gender"
    value="Female"
    onChange={(event) => alert(event.target.value)}
  >
    <RadioInput.Option value="Male">{'Male'}</RadioInput.Option>
    <RadioInput.Option value="Female">{'Female'}</RadioInput.Option>
    <RadioInput.Option value="Others">{'Others'}</RadioInput.Option>
  </RadioField>

  
</Spacings.Inline>
<Spacings.Inline>
<SelectField
          title="Preferred Currency"
          name="Preferred Currency"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isDisabled={formik.isSubmitting}
          options={[
            { value: 'EUR', label: 'EUR' },
            { value: 'USD', label: 'USD' },
            
          ]}
          horizontalConstraint={13}
        />
         <SelectField
          name="role"
          title="Customer Group"
          value="English"
          //  value={getCustomerPriorityOptions[Low]}
          errors={formik.errors.role}
          touched={formik.touched.role}
          onChange={formik.handleChange}
          options={ getCustomerPriorityOptions}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isRequired
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
