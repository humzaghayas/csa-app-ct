import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import { CUSTOMER_GROUP,PREFERED_LANGUAGE,GENDER,AGE_GROUP,PREFERED_CURRENCY } from './constants';
import DateField from '@commercetools-uikit/date-field';
import RadioField from '@commercetools-uikit/radio-field';
import RadioInput from '@commercetools-uikit/radio-input';
import DateInput from '@commercetools-uikit/date-input';
import {
  PrimaryButton,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';


const getCustomerGroup = Object.keys(CUSTOMER_GROUP).map(
  (key) => ({
    label: key,
    value: CUSTOMER_GROUP[key],
  })
);
const getCustomerGender = Object.keys(GENDER).map(
  (key) => ({
    label: key,
    value: GENDER[key],
  })
);

const getCustomerAgeGroup = Object.keys(AGE_GROUP).map(
  (key) => ({
    label: key,
    value: AGE_GROUP[key],
  })
);

const getCustomerPreferedCurrency= Object.keys(PREFERED_CURRENCY).map(
  (key) => ({
    label: key,
    value: PREFERED_CURRENCY[key],
  })
);

const getCustomerPreferedLanguage = Object.keys(PREFERED_LANGUAGE).map(
  (key) => ({
    label: key,
    value: PREFERED_LANGUAGE[key],
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
        <Spacings.Stack scale="l">
          <Spacings.Stack scale="m">
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
                name="occupation"
                title="Occupation"
                value={formik.values.occupation}
                errors={formik.errors.occupation}
                touched={formik.touched.occupation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
              />
            </Spacings.Inline>
          </Spacings.Stack>
          <Spacings.Stack>
            <Spacings.Inline>
              <TextField
                name="companyName"
                title="Company Name"
                value={formik.values.companyName}
                errors={formik.errors.companyName}
                touched={formik.touched.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
              />
              <SelectField
                name="preferredLanguage"
                title="Preferred Language"
                value={formik.values.preferredLanguage}
                errors={formik.errors.preferredLanguage}
                touched={formik.touched.preferredLanguage}
                onChange={formik.handleChange}
                options={getCustomerPreferedLanguage}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
                isRequired
              />
            </Spacings.Inline>
          </Spacings.Stack>
          <Spacings.Stack>
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
                name="ageGroup"
                title="Age Group"
                value={formik.values.ageGroup}
                errors={formik.errors.ageGroup}
                touched={formik.touched.ageGroup}
                onChange={formik.handleChange}
                options={getCustomerAgeGroup}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
                isRequired
              />
            </Spacings.Inline>
          </Spacings.Stack>
          <Spacings.Stack>
            <Spacings.Inline>
              {/* <RadioField
                title="Gender"
                name="Gender"
                value="Female"
                onChange={(event) => alert(event.target.value)}
              >
                <RadioInput.Option value="Male">{'Male'}</RadioInput.Option>
                <RadioInput.Option value="Female">{'Female'}</RadioInput.Option>
                <RadioInput.Option value="Others">{'Others'}</RadioInput.Option>
              </RadioField> */}
              <SelectField
                name="gender"
                title="Gender"
                value={formik.values.gender}
                errors={formik.errors.gender}
                touched={formik.touched.gender}
                onChange={formik.handleChange}
                options={getCustomerGender}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
                isRequired
              />
            </Spacings.Inline>
          </Spacings.Stack>
          <Spacings.Stack>
            <Spacings.Inline>
              <SelectField
                title="Preferred Currency"
                name="preferredCurrency"
                value={formik.values.preferredCurrency}
                errors={formik.errors.preferredCurrency}
                touched={formik.touched.preferredCurrency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
             //   isDisabled={formik.isSubmitting}
                // options={[
                //   { value: 'EUR', label: 'EUR' },
                //   { value: 'USD', label: 'USD' },
                // ]}
                options={getCustomerPreferedCurrency}
                horizontalConstraint={13}
              />
              <SelectField
                name="customerGroup"
                title="Customer Group"
                value={formik.values.customerGroup}
                errors={formik.errors.customerGroup}
                touched={formik.touched.customerGroup}
                onChange={formik.handleChange}
                options={getCustomerGroup}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
                isRequired
              />
            </Spacings.Inline>
          </Spacings.Stack>
          <Spacings.Stack>
            <Spacings.Inline>
              <SecondaryButton label="Cancel" onClick={formik.handleReset} />
              <PrimaryButton
                type="submit"
                label="Submit"
                onClick={formik.handleSubmit}
                isDisabled={formik.isSubmitting}
              />
            </Spacings.Inline>
          </Spacings.Stack>
        </Spacings.Stack>
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
