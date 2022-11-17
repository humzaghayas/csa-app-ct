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
import { EMPLOYEE_ROLES,CUSTOMER_GROUPS,TICKET_PRIORITY} from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import{getTicketCategories,getTicketPriorityValues,getTicketContactTypes} from 'ct-tickets-helper-api';
import { PrimaryButton, SecondaryButton } from '@commercetools-frontend/ui-kit';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useState } from 'react';
// const getEmployeeRoleOptions = Object.keys(EMPLOYEE_ROLES).map((key) => ({
//   label: EMPLOYEE_ROLES[key],
//   value: EMPLOYEE_ROLES[key],
// }));

// const getCustomerGroupsOptions = Object.keys(CUSTOMER_GROUPS).map((key) => ({
//   label: key,
//   value: CUSTOMER_GROUPS[key],
// }));

const ticketCategories = getTicketCategories();
const ticketPriorityVal =getTicketPriorityValues();
const getTicketContactTypesVals = getTicketContactTypes();
const getTicketPriorityOptions = Object.keys(ticketPriorityVal).map((key) => ({
  label: ticketPriorityVal[key],
  value: key,
}));

const getTicketCategoriesOpts = Object.keys(ticketCategories).map((key) => ({
  label: ticketCategories[key],
  value: key,
}));

const getTicketContactTypesOpt= Object.keys(getTicketContactTypesVals).map((key) => ({
  label: getTicketContactTypesVals[key],
  value: key,
})); 

const TicketCreateForm = (props) => {
  const dataLocale = useApplicationContext((context) => context.dataLocale);


  const formik = useFormik({
    // Pass initial values from the parent component.
    initialValues: props.initialValues,
    // Handle form submission in the parent component.
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
        <Spacings.Stack scale="l">
        
        <CollapsiblePanel
              data-testid="quote-summary-panel"
              header={
                <CollapsiblePanel.Header>
                  {/* {formatMessage(messages.panelTitle)} */}
                  {'Ticket Details'}
                </CollapsiblePanel.Header>
              }
              scale="l">
                <Constraints.Horizontal >
                <Spacings.Stack scale="m">


                <Spacings.Stack scale="s">
                  <SelectField
                      name="email"
                      title="Customer"
                      value={formik.values.email}
                      errors={formik.errors.email}
                      touched={formik.touched.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      options={getTicketContactTypesOpt}
                      isReadOnly={props.isReadOnly}
                      isRequired
                      horizontalConstraint={13}
                    />
                 </Spacings.Stack>



                <Spacings.Stack scale="s">
                <SelectField
                    name="contactType"
                    title="Contact Type"
                    value={formik.values.contactType}
                    errors={formik.errors.contactType}
                    touched={formik.touched.contactType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    options={getTicketContactTypesOpt}
                    isReadOnly={props.isReadOnly}
                    isRequired
                    horizontalConstraint={13}
                  />
            </Spacings.Stack>
            <Spacings.Stack scale="s">
            <SelectField
              name="category"
              title="Ticket Category"
              value={formik.values.category}
              errors={formik.errors.category}
              touched={formik.touched.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={getTicketCategoriesOpts}
              isReadOnly={props.isReadOnly}
              isRequired
              horizontalConstraint={13}
            />
        
        </Spacings.Stack>
        <Spacings.Stack scale="s">
        <SelectField
              name="priority"
              title="Ticket Priority"
              value={formik.values.priority}
              errors={formik.errors.priority}
              touched={formik.touched.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={getTicketPriorityOptions}
              isReadOnly={props.isReadOnly}
              isRequired
              horizontalConstraint={13}
            />
            </Spacings.Stack>


            <Spacings.Stack scale="s">
                <TextField name="subject"
                    title="Subject"
                    isRequired
                    value={formik.values.subject}
                    errors={
                      TextField.toFieldErrors(formik.errors).subject
                    }
                    touched={formik.touched.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
              </Spacings.Stack>


            {(formik?.values?.category !== null && 
            (formik?.values?.category == "query" || formik?.values?.category == "inquiry")) && (
              <Spacings.Stack scale="s">
                <TextField name="message"
                    title="Message"
                    isRequired
                    value={formik.values.message}
                    errors={
                      TextField.toFieldErrors(formik.errors).message
                    }
                    touched={formik.touched.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
              </Spacings.Stack>
            )}

          {(formik?.values?.category !== null && 
            (formik?.values?.category == "request" )) && (
              <Spacings.Stack scale="s">
                <TextField name="firstName"
                    title="First Name"
                    isRequired
                    value={formik.values.firstName}
                    errors={
                      TextField.toFieldErrors(formik.errors).firstName
                    }
                    touched={formik.touched.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                  <TextField name="lastName"
                    title="Last Name"
                    isRequired
                    value={formik.values.lastName}
                    errors={
                      TextField.toFieldErrors(formik.errors).lastName
                    }
                    touched={formik.touched.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
              </Spacings.Stack>
            )}
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
            </Spacings.Stack>
            </Constraints.Horizontal>
          {/* </Spacings.Inline> */}
        </CollapsiblePanel>
        </Spacings.Stack>
    </form>
  )}

  export default TicketCreateForm;