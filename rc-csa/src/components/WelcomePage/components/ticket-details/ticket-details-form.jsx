import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import Header from './Header';
import { Card, Constraints, SelectField } from '@commercetools-frontend/ui-kit';
import { Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { usePaginationState } from '@commercetools-uikit/hooks';
import DataTable from '@commercetools-uikit/data-table';
import { getTicketRows } from 'ct-tickets-helper-api/lib/helper-methods';
import TicketAccount from '../../../Ticket/components/ticket-account/ticket-account';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import ExportExcel from './Excelexport';
import ExcelData from './values';
import TicketDisplay from './ticket-details';
import {
  highProirityTickets,
  inProgressTickets,
  newFunctionTickets,
  resolvedTickets,
} from './function';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as moment from 'moment';

import { CART_STATE, REPORT_TYPE } from './constants';

let rows = null;

const columns = [
  { key: 'Customer', label: 'Customer' },
  { key: 'Created', label: 'Created' },
  { key: 'Source', label: 'Source' },
  { key: 'status', label: 'Status' },
  { key: 'Priority', label: 'Priority' },
  { key: 'Category', label: 'Category' },
  { key: 'Subject', label: 'Subject' },
];

const reportType = Object.keys(REPORT_TYPE).map((key) => ({
  label: key,
  value: REPORT_TYPE[key],
}));

const TicketDisplayForm = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const formik = useFormik({
    initialValues: props.initialValues,
    // onChange: props.onChange,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  // console.log('data', props?.ticket);

  const ticketData = props?.ticket;
  const newTickets = newFunctionTickets(ticketData);
  const highTickets = highProirityTickets(ticketData);
  const resolvedstatusTickets = resolvedTickets(ticketData);
  const inprogTickets = inProgressTickets(ticketData);
  const dataExcel = ExcelData;

  rows = getTicketRows(ticketData?.customObjects);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Export to excel
  const filteredData = ticketData?.customObjects?.results?.filter((obj) => {
    const createdAt = new Date(obj.createdAt);
    return createdAt >= startDate && createdAt <= endDate;
  });

  const ticketExcel = filteredData?.map((obj) => {
    return {
      ID: obj?.id,
      // CreatedAt: obj?.createdAt,
      CreatedAt: moment(obj?.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      // LastModifiedAt: obj?.lastModifiedAt,
      LastModifiedAt: moment(obj?.lastModifiedAt).format('YYYY-MM-DD HH:mm:ss'),
      Container: obj?.container,
      Email: obj?.value?.email,
    };
  });

  // Dropdown options
  const [selectedOption, setSelectedOption] = useState('Tickets');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const formElements = (
    <Spacings.Stack scale="xxl">
      <Header />
      <br />
      {/* last 5 tickets lookup ( */}

      {rows ? (
        <Spacings.Stack scale="l">
          <DataTable
            isCondensed
            columns={columns}
            rows={rows.slice(0, 5)} // limit to first 5 rows
            maxHeight={600}
            onRowClick={(row) => push(`ticket-edit/${row.id}/tickets-general`)}
          />
          <Switch>
            <SuspendedRoute path={`${match.path}/:id`}>
              <TicketAccount onClose={() => push(`${match.url}`)} />
            </SuspendedRoute>
          </Switch>
        </Spacings.Stack>
      ) : (
        <p>Loading...</p>
      )}

      <br />
      <br />
      <Spacings.Stack scale="xl">
        <Constraints.Horizontal constraint="l">
          <Card constraint="xl" min={23} max={27}>
            <Text.Subheadline as="h4" isBold={true} tone="positive">
              {'Ticket details'}
            </Text.Subheadline>
            <br />
            <Spacings.Inline>
              <Spacings.Stack scale="l">
                <Constraints.Horizontal>
                  <Card constraint="xl" theme="dark" insetScale="l">
                    <Text.Subheadline as="h4" isBold={true} tone="information">
                      {'Total Tickets'}
                    </Text.Subheadline>
                    <Text.Subheadline as="h3">
                      {' '}
                      {ticketData?.customObjects?.count}
                    </Text.Subheadline>
                  </Card>
                </Constraints.Horizontal>
              </Spacings.Stack>
              <Spacings.Stack scale="l">
                <Constraints.Horizontal>
                  <Card constraint="xl" theme="dark" insetScale="l">
                    <Text.Subheadline as="h4" isBold={true} tone="information">
                      {'High Priority'}
                    </Text.Subheadline>
                    {/* make changes here */}
                    <Text.Subheadline as="h3">{highTickets}</Text.Subheadline>
                  </Card>
                </Constraints.Horizontal>
              </Spacings.Stack>
              <Spacings.Stack scale="l">
                <Constraints.Horizontal>
                  <Card constraint="xl" theme="dark" insetScale="l">
                    <Text.Subheadline as="h4" isBold={true} tone="information">
                      {'New Tickets'}
                    </Text.Subheadline>
                    {/* make changes here */}
                    <Text.Subheadline as="h3">{newTickets}</Text.Subheadline>
                  </Card>
                </Constraints.Horizontal>
              </Spacings.Stack>
              <Spacings.Stack scale="l">
                <Constraints.Horizontal>
                  <Card constraint="xl" theme="dark" insetScale="l">
                    <Text.Subheadline as="h4" isBold={true} tone="information">
                      {'In-progress'}
                    </Text.Subheadline>
                    {/* make changes here */}
                    <Text.Subheadline as="h3">{inprogTickets}</Text.Subheadline>
                  </Card>
                </Constraints.Horizontal>
              </Spacings.Stack>
              <br />
              <Spacings.Stack scale="l">
                <Constraints.Horizontal min={13}>
                  <Card constraint="xl" insetScale="l" theme="dark">
                    <Text.Subheadline as="h4" isBold={true} tone="information">
                      {'Resloved'}
                    </Text.Subheadline>
                    {/* make changes here */}
                    <Text.Subheadline as="h3">
                      {resolvedstatusTickets}
                    </Text.Subheadline>
                  </Card>
                </Constraints.Horizontal>
              </Spacings.Stack>
            </Spacings.Inline>
          </Card>
        </Constraints.Horizontal>
      </Spacings.Stack>
      {/* break */}
      <br />
      <br />
      <Spacings.Stack scale="xl">
        <Constraints.Horizontal constraint="l">
          <Card constraint="xl" min={23} max={27}>
            <Text.Subheadline as="h4" isBold={true} tone="positive">
              {'Agent details'}
            </Text.Subheadline>
            <br />
            <Spacings.Inline>
              <Spacings.Stack scale="l">
                <Constraints.Horizontal>
                  <Card constraint="xl" theme="dark" insetScale="l">
                    <Text.Subheadline as="h4" isBold={true} tone="information">
                      {'Total Agents'}
                    </Text.Subheadline>
                    <Text.Subheadline as="h3">50</Text.Subheadline>
                  </Card>
                </Constraints.Horizontal>
              </Spacings.Stack>
              <Spacings.Stack scale="l">
                <Constraints.Horizontal>
                  <Card constraint="xl" theme="dark" insetScale="l">
                    <Text.Subheadline as="h4" isBold={true} tone="information">
                      {'Present'}
                    </Text.Subheadline>
                    {/* make changes here */}
                    <Text.Subheadline as="h3">47</Text.Subheadline>
                  </Card>
                </Constraints.Horizontal>
              </Spacings.Stack>
              <Spacings.Stack scale="l">
                <Constraints.Horizontal>
                  <Card constraint="xl" theme="dark" insetScale="l">
                    <Text.Subheadline as="h4" isBold={true} tone="information">
                      {'On Leave'}
                    </Text.Subheadline>
                    {/* make changes here */}
                    <Text.Subheadline as="h3">3</Text.Subheadline>
                  </Card>
                </Constraints.Horizontal>
              </Spacings.Stack>
              <br />
              <Spacings.Stack scale="l">
                <Constraints.Horizontal min={13}>
                  <Card constraint="xl" insetScale="l" theme="dark">
                    <Text.Subheadline as="h4" isBold={true} tone="information">
                      {'Break'}
                    </Text.Subheadline>
                    {/* make changes here */}
                    <Text.Subheadline as="h3">2</Text.Subheadline>
                  </Card>
                </Constraints.Horizontal>
              </Spacings.Stack>
            </Spacings.Inline>
          </Card>
        </Constraints.Horizontal>
      </Spacings.Stack>
      {/* break */}
      <br />
      <br />
      <Spacings.Stack scale="xl">
        <Constraints.Horizontal constraint="l">
          <Card constraint="xl" min={23} max={30}>
            <Text.Subheadline as="h4" isBold={true} tone="positive">
              {'Report'}
            </Text.Subheadline>
            <br />
            <Spacings.Inline>
              <Spacings.Stack scale="l">
                <Constraints.Horizontal>
                  <Card
                    constraint="xl"
                    min={22}
                    max={29}
                    theme="dark"
                    insetScale="l"
                  >
                    <div
                      style={{ display: 'inline-block', marginRight: '20px' }}
                    >
                      <Text.Subheadline
                        as="h5"
                        isBold={true}
                        tone="information"
                      >
                        {'From:'}
                      </Text.Subheadline>
                      <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                      />
                    </div>
                    <div
                      style={{ display: 'inline-block', marginRight: '20px' }}
                    >
                      {/* <label>To:</label> */}
                      <Text.Subheadline
                        as="h5"
                        isBold={true}
                        tone="information"
                      >
                        {'To:'}
                      </Text.Subheadline>
                      <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                      />
                    </div>
                    <div style={{ marginRight: '20px', marginBottom: '5px' }}>
                      <Text.Subheadline
                        as="h5"
                        isBold={true}
                        tone="information"
                      >
                        {'Report type'}
                      </Text.Subheadline>
                      {/* <SelectField
                        id="optionSelect"
                        name="optionSelect"
                        title=""
                        value={formik.values.optionSelect}
                        // errors={formik.errors.optionSelect}
                        // touched={formik.touched.optionSelect}
                        // onChange={onChange}
                        onBlur={formik.handleBlur}
                        options={reportType}
                        // isReadOnly={props.isReadOnly}
                        horizontalConstraint={13}
                      /> */}
                      <select
                        id="dropdown"
                        value={selectedOption}
                        onChange={handleSelectChange}
                        style={{ width: '200px' }}
                      >
                        <option value="Tickets">Tickets</option>
                        <option value="Agent">Agent</option>
                        <option value="Order">Order</option>
                        <option value="Cart">Cart</option>
                        <option value="Customer">Customer</option>
                        <option value="Product">Product</option>
                      </select>
                    </div>
                    <div
                      style={{ display: 'inline-block', marginRight: '0px' }}
                    >
                      <ExportExcel
                        excelData={ticketExcel}
                        fileName={'Work Report'}
                      />
                    </div>
                  </Card>
                </Constraints.Horizontal>
              </Spacings.Stack>
            </Spacings.Inline>
          </Card>
        </Constraints.Horizontal>
      </Spacings.Stack>
      <br />
      <br />
      {/* <div>
        <ExportExcel excelData={dataExcel} fileName={'Work Report'} />
      </div> */}
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
TicketDisplayForm.displayName = 'TicketDisplayForm';
TicketDisplayForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default TicketDisplayForm;
