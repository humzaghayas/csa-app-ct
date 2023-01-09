import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import Text from '@commercetools-uikit/text';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import {
  EMPLOYEE_ROLES,
  CUSTOMER_GROUPS,
  CUSTOMER_PRIORITY,
} from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import {
  Card,
  Constraints,
  Label,
  PrimaryButton,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';

import styles from './customer-password-reset.module.css';
import { Pagination } from '@commercetools-uikit/pagination';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import DataTable from '@commercetools-uikit/data-table';

// const rows = [];

// const columns = [];

const PasswordResetForm = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Spacings.Stack scale="l">
        <Spacings.Inline>
          <TextField
            name="tokenValue"
            title="Token Value"
            value={formik.values.tokenValue}
            errors={formik.errors.tokenValue}
            touched={formik.touched.tokenValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            horizontalConstraint={13}
            isRequired
          />
        </Spacings.Inline>
        <Spacings.Inline>
          <TextField
            name="newPassword"
            title="New Password"
            value={formik.values.newPassword}
            errors={formik.errors.newPassword}
            touched={formik.touched.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            horizontalConstraint={13}
            isRequired
          />
          <TextField
            name="confirmPassword"
            title="Confirm Password"
            value={formik.values.confirmPassword}
            errors={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            horizontalConstraint={13}
          />
        </Spacings.Inline>
        <Spacings.Inline>
          <SecondaryButton
            label="Cancel"
            // onClick={formik.handleReset}
          />
          <PrimaryButton
            type="submit"
            label="Submit"
            // onClick={formik.handleSubmit}
            // isDisabled={formik.isSubmitting}
          />
        </Spacings.Inline>
      </Spacings.Stack>
    </form>
  );
};
PasswordResetForm.displayName = 'PasswordResetForm';
PasswordResetForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default PasswordResetForm;
