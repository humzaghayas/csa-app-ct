import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import MultilineTextField from '@commercetools-uikit/multiline-text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import Constraints from '@commercetools-uikit/constraints';
import DataTable from '@commercetools-uikit/data-table';
import { useState } from 'react';
import { PrimaryButton, SecondaryButton } from '@commercetools-frontend/ui-kit';
import { PlusBoldIcon, MailIcon, CartIcon } from '@commercetools-uikit/icons';
import { ContentNotification } from '@commercetools-uikit/notifications';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

import validate  from './validate';
const rows = [
  {
    id: '--',
    Subject: 'test',
    Message: 'test',
    From: '[customer]',
    DateSent: '5th Aug 2022 @10.00 AM',
    Status: 'Read',
    Action: '--',
  },
  {
    id: '--',
    Subject: 'test',
    Message: 'test',
    From: '[customer]',
    DateSent: '5th Aug 2022 @10.00 AM',
    Status: 'Read',
    Action: '--',
  },
];

const columns = [
  { key: 'Subject', label: 'Subject' },
  { key: 'Message', label: 'Message' },
  { key: 'From', label: 'From' },
  { key: 'DateSent', label: 'Date Sent' },
  { key: 'Status', label: 'Status' },
  { key: 'Action', label: 'Action' },
];

const CustomerReplyForm = (props) => {
  const [value, setValue] = useState(false);
  const intl = useIntl();
  const { push } = useHistory();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });
  const params = useParams();
  const OrderId = params.id;

  const formElements = (
    <Spacings.Stack scale="l">
      <Spacings.Stack scale="m">
        <Text.Headline as="h1">{'Send a Message'}</Text.Headline>
      </Spacings.Stack>
      <Spacings.Stack scale="m">
        <Text.Subheadline as="h2" isBold="true">
          {'Message Details'}
        </Text.Subheadline>
        
        <Spacings.Stack tone="secondary">
          <TextField
            title="To: "
            value="foo"
            onChange={(event) => alert(event)}
            horizontalConstraint={13}
          />

          <TextField
            title="Subject:"
            value=" "
            onChange={(event) => alert(event)}
            horizontalConstraint={13}
          />

          <MultilineTextField
            title="Description:"
            value=""
            onChange={(event) => alert(event.target.value)}
          />
        </Spacings.Stack>
      </Spacings.Stack>
      <Spacings.Inline>
        <SecondaryButton label="Cancel" onClick={formik.handleReset} />
        <PrimaryButton
          type="submit"
          label="Send"
          onClick={formik.handleSubmit}
          isDisabled={formik.isSubmitting}
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
CustomerReplyForm.displayName = 'CustomerReplyForm';
CustomerReplyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default CustomerReplyForm;
