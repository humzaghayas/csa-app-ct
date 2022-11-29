import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import { EMPLOYEE_ROLES,CUSTOMER_GROUPS,CUSTOMER_PRIORITY} from './constants';
import Constraints from '@commercetools-uikit/constraints';
import DataTable from '@commercetools-uikit/data-table';
import { useState } from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
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
 
  { id: '--',CompanyName:'--',Address:'--',City:'--',PostalCode:'--',State:'--',Region:'--',Country:'--',AddressType:'--'},
];

const columns = [

  { key: 'ContactName', label: 'ContactName' },
  { key:'CompanyName', label: 'CompanyName' },
  { key: 'Address', label: 'Address' },
  { key: 'City', label: 'City' },
  { key: 'PostalCode', label: 'PostalCode' },
  { key: 'State', label: 'State' },
  { key: 'Region', label: 'Region' },
  { key: 'Country', label: 'Country' },
 
  { key: 'AddressType', label: 'Address Type' },
];

const CustomerAddressForm = (props) => {
   const[value , setValue] = useState(false)
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
      <Spacings.Stack scale="m">
            
             <Spacings.Stack scale="s">
             <SecondaryButton iconLeft={<PlusBoldIcon />} label="Add Address" onClick={() => setValue(true)} />
             </Spacings.Stack>
             <Constraints.Horizontal min={13}>
            <DataTable rows={rows} columns={columns}  />

          </Constraints.Horizontal>
          </Spacings.Stack>
        {value == true ? <div >
      <CollapsiblePanel
          data-testid="quote-summary-panel"
          header={
            <CollapsiblePanel.Header>
              {/* {formatMessage(messages.panelTitle)} */}
              {'Address Details'}
            </CollapsiblePanel.Header>
          }
          scale="l">
            <Constraints.Horizontal >
             <Spacings.Stack scale="m">
             <Spacings.Stack scale="s">
        <TextField
          name="Address Type"
          title="Address Type"
          value={formik.values.title}
          errors={formik.errors.title}
          touched={formik.touched.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        </Spacings.Stack>
          <Spacings.Stack scale="s">
            <Spacings.Inline>
          <TextField
          name="Street Number"
          title="Street Number"
          value={formik.values.firstName}
          errors={formik.errors.firstName}
          touched={formik.touched.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
      
          <TextField
          name="Street Name"
          title="Street Name"
          value={formik.values.firstName}
          errors={formik.errors.firstName}
          touched={formik.touched.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        </Spacings.Inline>
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        <TextField
          name="Building"
          title="Building"
          value={formik.values.title}
          errors={formik.errors.title}
          touched={formik.touched.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        <TextField
          name="City"
          title="City"
          value={formik.values.title}
          errors={formik.errors.title}
          touched={formik.touched.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        <TextField
          name="Postal Code"
          title="Postal Code"
          value={formik.values.title}
          errors={formik.errors.title}
          touched={formik.touched.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        <TextField
          name="State"
          title="State"
          value={formik.values.title}
          errors={formik.errors.title}
          touched={formik.touched.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        <TextField
          name="Country"
          title="Country"
          value={formik.values.title}
          errors={formik.errors.title}
          touched={formik.touched.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        </Spacings.Stack>
        </Spacings.Stack>
        </Constraints.Horizontal>
      {/* </Spacings.Inline> */}
     </CollapsiblePanel>
     </div> : null} 
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
CustomerAddressForm.displayName = 'CustomerAddressForm';
CustomerAddressForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default CustomerAddressForm;
