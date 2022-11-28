import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';

import { CUSTOMER_PRIORITY } from './constants';
import DateField from '@commercetools-uikit/date-field';
import RadioField from '@commercetools-uikit/radio-field';
import RadioInput from '@commercetools-uikit/radio-input';
import DateInput from '@commercetools-uikit/date-input';
import {
  PrimaryButton,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';
const getCustomerPriorityOptions = Object.keys(CUSTOMER_PRIORITY).map(
  (key) => ({
    label: key,
    value: CUSTOMER_PRIORITY[key],
  })
);


const CustomerProfileForm = (props) => {
  const intl = useIntl();
  console.log("propsPF",props);
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });
  console.log("formik",formik);
  const formElements = (
    <Spacings.Stack scale="l">

   <form onSubmit={formik.handleSubmit}>
      <Spacings.Inline>
        <TextField
          name="firstName"
          title="Full Name"
          value={formik.values.firstName}
          errors={formik.errors.firstName}
          touched={formik.touched.firstName}
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
          options={getCustomerPriorityOptions}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isRequired
        />
      </Spacings.Inline>
      <Spacings.Inline>

        {/* <DateField
          title="Date Of Birth"
          value="1998-08-14"
          horizontalConstraint={13}
          onChange={(event) => alert(event.target.value)}
        /> */}
        
        <DateInput
          name="dateOfBirth"
          title="Date of Birth"
          value={formik.values.dateOfBirth}
          errors={formik.errors.dateOfBirth}
          touched={formik.touched.dateOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          placeholder="Date of Birth"
        />
        <SelectField
          name="role"
          title="Age Group"
          value="English"

          //  value={getCustomerPriorityOptions[Low]}
          errors={formik.errors.role}
          touched={formik.touched.role}
          onChange={formik.handleChange}
          options={getCustomerPriorityOptions}
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

          options={getCustomerPriorityOptions}

          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          isRequired
        />

      </Spacings.Inline>

    <Spacings.Inline>
          <SecondaryButton
            label="Cancel"
            onClick={formik.handleReset}
          />
          <PrimaryButton
            type="submit"
            label="Submit"
            onClick={formik.handleSubmit}
            isDisabled={formik.isSubmitting}
          />
        </Spacings.Inline>
        </form>

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
