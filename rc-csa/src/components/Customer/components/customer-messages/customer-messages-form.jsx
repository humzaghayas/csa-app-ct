import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import validate from './validate';
import messages from './messages';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import { EMPLOYEE_ROLES,CUSTOMER_GROUPS,CUSTOMER_PRIORITY} from './constants';
import Constraints from '@commercetools-uikit/constraints';
import DataTable from '@commercetools-uikit/data-table';
import { useState } from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { PlusBoldIcon , MailIcon ,CartIcon } from '@commercetools-uikit/icons';
import { ContentNotification } from '@commercetools-uikit/notifications';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
  useParams
} from 'react-router-dom';
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
const rows = [
 
  { id: '--',Subject:'test',Message:'test',From:'[customer]',DateSent:'5th Aug 2022 @10.00 AM',Status:'Read',Action:'--'},
  { id: '--',Subject:'test',Message:'test',From:'[customer]',DateSent:'5th Aug 2022 @10.00 AM',Status:'Read',Action:'--'},
];

const columns = [

  { key: 'Subject', label: 'Subject' },
  { key:'Message', label: 'Message' },
  { key: 'From', label: 'From' },
  { key: 'DateSent', label: 'Date Sent' },
  { key: 'Status', label: 'Status' },
  { key: 'Action', label: 'Action' },

  
];

const CustomerMessagesForm = (props) => {
   const[value , setValue] = useState(false)
  const intl = useIntl();
  const { push } = useHistory();
  const match = useRouteMatch();
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
      {/* <Spacings.Inline> */}
      <Spacings.Stack scale="m">
        <Text.Headline as="h1">{'View messages for the order #101 '}</Text.Headline>;
      <ContentNotification type="success">Your message was saved and sent to the customer along with a link for them to reply </ContentNotification>
      <Spacings.Inline>
      <SecondaryButton iconLeft={<MailIcon />} label="Send a Message" onClick={() => push(`/csa_project/csa-customer-tickets/${OrderId}/customer-message-reply`)} size = "small"/>
      <SecondaryButton  iconLeft={<CartIcon />} label="View Orders" onClick={() => push(`/csa_project/csa-customer-tickets/customer-account/${OrderId}/Customers-orders`)} size = "small"/>
      </Spacings.Inline>  
             <Constraints.Horizontal min={13}>
           
            <DataTable rows={rows} columns={columns}  />

          </Constraints.Horizontal>
          </Spacings.Stack>
      
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
CustomerMessagesForm.displayName = 'CustomerMessagesForm';
CustomerMessagesForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default CustomerMessagesForm;
