import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import { Ticket_ROLES,CUSTOMER_GROUPS } from './constants';
import { useState } from 'react';

const getTicketRoleOptions = Object.keys(Ticket_ROLES).map((key) => ({
  label: Ticket_ROLES[key],
  value: Ticket_ROLES[key],
}));

const getCustomerGroupsOptions = Object.keys(CUSTOMER_GROUPS).map((key) => ({
  label: key,
  value: CUSTOMER_GROUPS[key],
}));

const EmployeeDetailsForm = (props) => {
  const intl = useIntl();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });
  const defaultAmountValue = {
    currencyCode: 'USD',
    amount: '0',
  };
  const [amountValue, setAmountValue] = useState(defaultAmountValue);


  const formElements = (
    <Spacings.Stack scale="l">
      <Spacings.Inline>
        <SelectField
          name="roles"
          title="Roles"
          value={formik.values.roles}
          errors={formik.errors.roles}
          touched={formik.touched.roles}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          options={getTicketRoleOptions}
          isReadOnly={props.isReadOnly}
          isRequired
          horizontalConstraint={13}
        />
        <TextField
          name="amount"
          title="Amount"
          value={formik.values.amount}
          errors={formik.errors.amount}
          touched={formik.touched.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
          defaultAmountValue
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
EmployeeDetailsForm.displayName = 'EmployeeDetailsForm';
EmployeeDetailsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default EmployeeDetailsForm;
