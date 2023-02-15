import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
// import {
//   CUSTOMER_GROUP,
//   PREFERED_LANGUAGE,
//   GENDER,
//   AGE_GROUP,
//   PREFERED_CURRENCY,
// } from './constants';
import { PrimaryButton, SecondaryButton } from '@commercetools-frontend/ui-kit';

// const getCustomerGroup = Object.keys(CUSTOMER_GROUP).map((key) => ({
//   label: key,
//   value: CUSTOMER_GROUP[key],
// }));
// const getCustomerGender = Object.keys(GENDER).map((key) => ({
//   label: key,
//   value: GENDER[key],
// }));

// const getCustomerAgeGroup = Object.keys(AGE_GROUP).map((key) => ({
//   label: key,
//   value: AGE_GROUP[key],
// }));

// const getCustomerPreferedCurrency = Object.keys(PREFERED_CURRENCY).map(
//   (key) => ({
//     label: key,
//     value: PREFERED_CURRENCY[key],
//   })
// );

// const getCustomerPreferedLanguage = Object.keys(PREFERED_LANGUAGE).map(
//   (key) => ({
//     label: key,
//     value: PREFERED_LANGUAGE[key],
//   })
// );

const AtgLoginForm = (props) => {
  const intl = useIntl();
  console.log('propsPF', props);
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });
  console.log('formik', formik);
  const formElements = (
    <Spacings.Stack scale="l">
      <form onSubmit={formik.handleSubmit}>
        <Spacings.Stack scale="l">
          <Spacings.Stack scale="m">
            <Spacings.Inline>
              <TextField
                name="userName"
                title="User Name"
                value={formik.values.userName}
                errors={formik.errors.userName}
                touched={formik.touched.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
              />
            </Spacings.Inline>
          </Spacings.Stack>
          <Spacings.Stack>
            <Spacings.Inline>
              <TextField
                name="password"
                title="Password"
                value={formik.values.password}
                errors={formik.errors.password}
                touched={formik.touched.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
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
AtgLoginForm.displayName = 'AtgLoginForm';
AtgLoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default AtgLoginForm;
