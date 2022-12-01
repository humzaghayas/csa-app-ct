import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import Constraints from '@commercetools-uikit/constraints';

const AddressDetailsForm = (props) => {
  const intl = useIntl();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  const formElements = (
    <Spacings.Stack scale="l">
      <Spacings.Inline>
        <Constraints.Horizontal>
          <Spacings.Stack scale="m">
            <Spacings.Stack scale="s">
              {/* <TextField
                name="Address Type"
                title="Address Type"
                value={formik.values.title}
                errors={formik.errors.title}
                touched={formik.touched.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
              /> */}
            </Spacings.Stack>
            <Spacings.Stack scale="s">
              <Spacings.Inline>
                <TextField
                  name="streetNumber"
                  title="Street Number"
                  value={formik.values.streetNumber}
                  errors={formik.errors.streetNumber}
                  touched={formik.touched.streetNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />

                <TextField
                  name="apartment"
                  title="Apartment"
                  value={formik.values.apartment}
                  errors={formik.errors.apartment}
                  touched={formik.touched.apartment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Inline>
            </Spacings.Stack>
            <Spacings.Stack scale="s">
              <TextField
                name="building"
                title="Building"
                value={formik.values.building}
                errors={formik.errors.building}
                touched={formik.touched.building}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
              />
            </Spacings.Stack>
            <Spacings.Stack scale="s">
              <TextField
                name="city"
                title="City"
                value={formik.values.city}
                errors={formik.errors.city}
                touched={formik.touched.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
              />
            </Spacings.Stack>
            <Spacings.Stack scale="s">
              <TextField
                name="postalCode"
                title="Postal Code"
                value={formik.values.postalCode}
                errors={formik.errors.postalCode}
                touched={formik.touched.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
              />
               </Spacings.Stack>
              <Spacings.Stack scale="s">
              <TextField
                name="region"
                title="Region"
                value={formik.values.region}
                errors={formik.errors.region}
                touched={formik.touched.region}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
              />
            </Spacings.Stack>
            <Spacings.Stack scale="s">
              <TextField
                name="state"
                title="State"
                value={formik.values.state}
                errors={formik.errors.state}
                touched={formik.touched.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
              />
            </Spacings.Stack>
            <Spacings.Stack scale="s">
              <TextField
                name="country"
                title="Country"
                value={formik.values.country}
                errors={formik.errors.country}
                touched={formik.touched.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                horizontalConstraint={13}
              />
            </Spacings.Stack>
          </Spacings.Stack>
        </Constraints.Horizontal>
        {/* </Spacings.Inline> */}
      </Spacings.Inline>
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
AddressDetailsForm.displayName = 'AddressDetailsForm';
AddressDetailsForm.propTypes = {
  // onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default AddressDetailsForm;
