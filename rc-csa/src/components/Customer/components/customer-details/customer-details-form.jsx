import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';

const TicketDetailsForm = (props) => {
  const intl = useIntl();
  const formik = useFormik({
    initialValues: props.initialValues,
    // onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  const formElements = (
    <Spacings.Stack scale="l">
      <Spacings.Inline>
        <TextField
          name="name"
          title="name"
          value={formik.values.name}
          errors={formik.errors.name}
          touched={formik.touched.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        <TextField
          name="logo"
          title="logo"
          value={formik.values.logo}
          errors={formik.errors.logo}
          touched={formik.touched.logo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
      </Spacings.Inline>
      <Spacings.Inline>
        <TextField
          name="channels"
          title="Channels"
          value={formik.values.channels}
          errors={formik.errors.channels}
          touched={formik.touched.channels}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        <TextField
          name="addresses"
          title="Addresses"
          value={formik.values.addresses}
          errors={formik.errors.addresses}
          touched={formik.touched.addresses}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
      </Spacings.Inline>
      <Spacings.Inline>
        <TextField
          name="budget"
          title="Budget"
          value={formik.values.budget}
          errors={formik.errors.budget}
          touched={formik.touched.budget}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        <TextField
          name="rules"
          title="Rules"
          isRequired
          value={formik.values.rules}
          errors={formik.errors.rules}
          touched={formik.touched.rules}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
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
TicketDetailsForm.displayName = 'ComapanyDetailsForm';
TicketDetailsForm.propTypes = {
  // onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default TicketDetailsForm;