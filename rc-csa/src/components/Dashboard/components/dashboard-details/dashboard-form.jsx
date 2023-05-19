import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import Header from './Header';
import {
  Card,
  Constraints,
  PrimaryButton,
} from '@commercetools-frontend/ui-kit';
import { Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { usePaginationState } from '@commercetools-uikit/hooks';
import DataTable from '@commercetools-uikit/data-table';
import TicketAccount from '../../../Ticket/components/ticket-account/ticket-account';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import ExportExcel from './Excelexport';
import {
  countActiveTickets,
  highProirityTickets,
  inProgressTickets,
  newFunctionTickets,
  openStatusTickets,
} from './function';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as moment from 'moment';
import { PieChart, Pie, Cell, Label } from 'recharts';
import TawkTo from './chat';
import styles from './dashboard.module.css';
import {
  getSLARate,
  getSlaHighPercentage,
  getSlaPercentage,
  getSlaRow,
} from './sla-percentage';
import {
  generateCartExcel,
  generateCustomerExcel,
  generateOrderExcel,
  generateProductExcel,
  generateSLAExcel,
  generateTicketExcel,
} from './generateExcelData';
//import { getOrderData } from './conversions';

let rows = null;

const columns = [
  { key: 'ticketNumber', label: 'Ticket ID' },
  { key: 'Created', label: 'Created' },
  { key: 'Source', label: 'Source' },
  { key: 'status', label: 'Status' },
  { key: 'Priority', label: 'Priority' },
  { key: 'Category', label: 'Category' },
  { key: 'Subject', label: 'Subject' },
];

let rowsSla = null;

const columnsSla = [
  { key: 'ticketNumber', label: 'Ticket ID' },
  { key: 'Created', label: 'Created' },
  { key: 'status', label: 'Status' },
  { key: 'Priority', label: 'Priority' },
  { key: 'Resolution', label: 'Resolution' },
  { key: 'SLA', label: 'SLA' },
];

const DashboardDisplayForm = (props) => {
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

  const ticketData = props?.ticket;
  const orderData = props?.order;
  const cartData = props?.cart;
  const customerData = props?.customer;
  const productData = props?.product;
  const totalTicket = ticketData?.length || 0;
  const activeTicket = countActiveTickets(ticketData);
  const newTickets = newFunctionTickets(ticketData);
  const highTickets = highProirityTickets(ticketData);
  const openTickets = openStatusTickets(ticketData);
  const inprogTickets = inProgressTickets(ticketData);
  console.log('print', ticketData);

  //Assigning row values
  rows = ticketData;
  rowsSla = getSlaRow(ticketData);

  //SLA Details
  const slaPercentage = getSlaPercentage(ticketData);
  const slaMetPercentage = Number(slaPercentage);
  const slaNotMetPercent = 100.0 - slaPercentage;
  const slaHighPercentage = getSlaHighPercentage(ticketData);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Export to excel
  const starttDate = moment(startDate).format('DD-MM-YYYY');
  const enddDate = moment(endDate).format('DD-MM-YYYY');

  const exportData = () => {
    switch (selectedOption) {
      case 'Tickets':
        return generateTicketExcel(ticketData, startDate, endDate);
      case 'Orders':
        return generateOrderExcel(orderData, startDate, endDate);
      case 'Carts':
        return generateCartExcel(cartData, startDate, endDate);
      case 'Customer':
        return generateCustomerExcel(customerData, startDate, endDate);
      case 'Product':
        return generateProductExcel(productData, startDate, endDate);
      case 'SLA':
        return generateSLAExcel(ticketData, startDate, endDate);
    }
  };

  // Dropdown options
  const [selectedOption, setSelectedOption] = useState('--');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //PieChart
  const dataPie = [
    { name: 'newTickets', tickets: newTickets, fill: 'teal' },
    { name: 'openTickets', tickets: openTickets, fill: 'gray' },
    { name: 'inprogTickets', tickets: inprogTickets, fill: 'royalblue' },
  ];

  // //PieChart SLA

  const dataSla = [
    { name: 'slaMet', tickets: slaMetPercentage, fill: 'teal' },
    { name: 'slaNotMet', tickets: slaNotMetPercent, fill: 'gray' },
  ];

  // chat link
  function navigateToLink(link) {
    window.location.href = link;
  }

  // Login details
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginTime, setLoginTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerId, setTimerId] = useState(null);

  function formatElapsedTime(elapsedTime) {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  const handleLoginClick = () => {
    setIsLoggedIn(true);
    setLoginTime(new Date());
    setTimerId(
      setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000)
    );
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setLoginTime(null);
    setElapsedTime(0);
    clearInterval(timerId);
    setTimerId(null);
  };

  const formElements = (
    <Spacings.Stack scale="xxl">
      <div className={styles.header}>
        <Header />
      </div>
      {/* <br /> */}

      <Spacings.Inline alignItems="stretch" justifyContent="space-between">
        <div className={styles.ticdetails}>
          <Spacings.Stack scale="xl" alignItems="flexEnd">
            <Constraints.Horizontal constraint="l" max={8}>
              <Card constraint="xl">
                <br />
                <div>
                  <Text.Subheadline as="h4" isBold={true} >
                    {'Ticket details'}
                  </Text.Subheadline>
                  <br />
                  <div style={{ display: 'inline-block', marginRight: '20px' }}>
                    <PieChart width={200} height={200}>
                      <Pie
                        data={dataPie}
                        dataKey="tickets"
                        nameKey="name"
                        outerRadius={100}
                      >
                        {dataPie.map((entry, index) => (
                          <>
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                            {/* <Label key={`label-${index}`} position="outside" offset={10}>
                             {entry.name}
                          </Label> */}
                          </>
                        ))}
                      </Pie>
                    </PieChart>
                    <br />
                    <Text.Subheadline as="h5" isBold={true} >
                      {'Total tickets = '}
                      {totalTicket}
                    </Text.Subheadline>
                    <Text.Subheadline as="h5" isBold={true} >
                      {'Active tickets = '}
                      {activeTicket}
                    </Text.Subheadline>
                  </div>
                  <br />
                  <div style={{ display: 'inline-block', marginRight: '20px' }}>
                    <Text.Subheadline as="h5" isBold={true} >
                      {'High Priority = '}
                      {highTickets}
                    </Text.Subheadline>
                    <Text.Subheadline as="h5" isBold={true} >
                      {'New Tickets = '}
                      {newTickets}
                    </Text.Subheadline>
                    <Text.Subheadline as="h5" isBold={true} >
                      {'Open = '}
                      {openTickets}
                    </Text.Subheadline>
                    <Text.Subheadline as="h5" isBold={true} >
                      {'In-progress = '}
                      {inprogTickets}
                    </Text.Subheadline>
                  </div>
                </div>
              </Card>
            </Constraints.Horizontal>
          </Spacings.Stack>
        </div>

        <Spacings.Stack scale="xl" alignItems="flexEnd">
          {/* <Card constraint="xl"> */}

          <Constraints.Horizontal max={13}>
            <div className={styles.tickets_component}>
              <Card constraint="xl" theme="light" insetScale="l">
                <Text.Subheadline as="h4" isBold={true} >
                  {'Recent Tickets '}
                </Text.Subheadline>
                <br />
                {rows ? (
                  <Spacings.Stack scale="l">
                    <DataTable
                      isCondensed
                      columns={columns}
                      rows={rows.slice(0, 5)} // limit to first 5 rows
                      maxHeight={400}
                      onRowClick={(row) =>
                        push(`ticket-edit/${row.id}/tickets-general`)
                      }
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
              </Card>
            </div>
          </Constraints.Horizontal>

          {/* </Card> */}
        </Spacings.Stack>
      </Spacings.Inline>
      {/* <br /> */}

      <Spacings.Inline alignItems="stretch" justifyContent="space-between">
        <Spacings.Stack scale="xl" alignItems="flexEnd">
          <Constraints.Horizontal min={14} max={15}>
            <Card constraint="xl">
              <Text.Subheadline as="h4" isBold={true} >
                {'Report'}
              </Text.Subheadline>
              <br />
              <Spacings.Inline>
                <Spacings.Stack scale="l">
                  <Constraints.Horizontal>
                    <Card
                      constraint="xl"
                      // min={22}
                      // max={29}
                      theme="light"
                      insetScale="l"
                    >
                      <div
                        style={{
                          display: 'inline-block',
                          marginRight: '20px',
                        }}
                      >
                        <Text.Subheadline
                          as="h5"
                          isBold={true}
                          
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
                      <div>
                        {/* <label>To:</label> */}
                        <Text.Subheadline
                          as="h5"
                          isBold={true}
                          
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
                          
                        >
                          {'Report type:'}
                        </Text.Subheadline>
                        <select
                          id="dropdown"
                          value={selectedOption}
                          onChange={handleSelectChange}
                          style={{ width: '200px' }}
                        >
                          <option value="--">--</option>
                          <option value="Tickets">Tickets</option>
                          <option value="Agent">Agent</option>
                          <option value="Orders">Orders</option>
                          <option value="Carts">Carts</option>
                          <option value="Customer">Customer</option>
                          <option value="Product">Product</option>
                          <option value="SLA">SLA</option>
                        </select>
                      </div>
                      <br />
                      <div
                        style={{
                          display: 'inline-block',
                          marginRight: '0px',
                        }}
                      >
                        <ExportExcel
                          name={'Generatee'}
                          excelData={exportData()}
                          fileName={
                            'Report - ' +
                            selectedOption +
                            ' (' +
                            starttDate +
                            ' to ' +
                            enddDate +
                            ')'
                          }
                        />
                      </div>
                    </Card>
                  </Constraints.Horizontal>
                </Spacings.Stack>
              </Spacings.Inline>
            </Card>
          </Constraints.Horizontal>
        </Spacings.Stack>

        <Spacings.Stack scale="xl">
          <Constraints.Horizontal constraint="l">
            <Card constraint="xl">
              <Text.Subheadline as="h4" isBold={true} >
                {'Agent details'}
              </Text.Subheadline>
              <br />
              <Spacings.Inline>
                <Spacings.Stack scale="l">
                  <Constraints.Horizontal>
                    <Card constraint="xl" theme="light" insetScale="l">
                      <Text.Subheadline
                        as="h4"
                        isBold={true}
                        // tone=""
                      >
                        {'Total Agents'}
                      </Text.Subheadline>
                      <Text.Subheadline as="div">50</Text.Subheadline>
                    </Card>
                  </Constraints.Horizontal>
                </Spacings.Stack>
                <Spacings.Stack scale="l">
                  <Constraints.Horizontal>
                    <Card constraint="xl" theme="light" insetScale="l">
                      <Text.Subheadline
                        as="h4"
                        isBold={true}
                        
                      >
                        {'Present     '}
                      </Text.Subheadline>
                      {/* make changes here */}
                      <Text.Subheadline as="div">47</Text.Subheadline>
                    </Card>
                  </Constraints.Horizontal>
                </Spacings.Stack>
                <Spacings.Stack scale="l">
                  <Constraints.Horizontal>
                    <Card constraint="xl" theme="light" insetScale="l">
                      <Text.Subheadline
                        as="h4"
                        isBold={true}
                        
                      >
                        {'On Leave'}
                      </Text.Subheadline>
                      {/* make changes here */}
                      <Text.Subheadline as="div">3</Text.Subheadline>
                    </Card>
                  </Constraints.Horizontal>
                </Spacings.Stack>
                <br />
                <Spacings.Stack scale="l">
                  <Constraints.Horizontal min={13}>
                    <Card constraint="xl" insetScale="l" theme="light">
                      <Text.Subheadline
                        as="h4"
                        isBold={true}
                        
                      >
                        {'Break'}
                      </Text.Subheadline>
                      {/* make changes here */}
                      <Text.Subheadline as="div">2</Text.Subheadline>
                    </Card>
                  </Constraints.Horizontal>
                </Spacings.Stack>
              </Spacings.Inline>
            </Card>
          </Constraints.Horizontal>
        </Spacings.Stack>
        <div style={{ float: 'right', textAlign: 'right' }}>
          <Spacings.Stack scale="l" alignItems="flexEnd">
            <Constraints.Horizontal max={6}>
              <Card theme="light" insetScale="l">
                <Text.Subheadline as="h4" isBold={true} >
                  {'Time Tracker'}
                </Text.Subheadline>
                <br />
                <div>
                  {!isLoggedIn ? (
                    <PrimaryButton
                      label="Login"
                      onClick={handleLoginClick}
                      size="big"
                      isToggled={true}
                      // theme="info"
                    />
                  ) : (
                    <>
                      <Text.Subheadline as="h5" isBold={true} tone="primary">
                        {'logged in at: '}
                        {loginTime.toLocaleTimeString()}
                      </Text.Subheadline>
                      <Text.Subheadline as="h5" isBold={true} tone="primary">
                        {'logged in for: '}
                        {formatElapsedTime(elapsedTime)}
                      </Text.Subheadline>

                      <PrimaryButton
                        label="Logout"
                        onClick={handleLogoutClick}
                        size="big"
                        isToggled={true}
                        tone="urgent"
                        // theme="info"
                      />
                    </>
                  )}
                </div>
              </Card>
            </Constraints.Horizontal>
          </Spacings.Stack>
        </div>
      </Spacings.Inline>
      <Spacings.Inline alignItems="stretch" justifyContent="space-between">
        <Constraints.Horizontal max={13}>
          <div className={styles.tickets_component}>
            <Card constraint="xl" theme="light" insetScale="l">
              <Text.Subheadline as="h4" isBold={true} >
                {'SLA Matrix'}
              </Text.Subheadline>
              <br />
              {rows ? (
                <Spacings.Stack scale="l">
                  <DataTable
                    isCondensed
                    columns={columnsSla}
                    rows={rowsSla} // limit to first 5 rows
                    maxHeight={300}
                    // onRowClick={(row) =>
                    //   push(`ticket-edit/${row.id}/tickets-general`)
                    // }
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
            </Card>
          </div>
        </Constraints.Horizontal>
        <div className={styles.ticdetails}>
          <Spacings.Stack scale="xl" alignItems="flexEnd">
            <Constraints.Horizontal constraint="l" max={8}>
              <Card constraint="xl">
                <br />
                <div>
                  <Text.Subheadline as="h4" isBold={true} >
                    {'SLA Graph'}
                  </Text.Subheadline>
                  <br />
                  <div style={{ display: 'inline-block', marginRight: '20px' }}>
                    <PieChart width={200} height={200}>
                      <Pie
                        data={dataSla}
                        dataKey="tickets"
                        nameKey="name"
                        outerRadius={100}
                      >
                        {dataSla?.map((entry, index) => (
                          <>
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                            <Label
                              key={`label-${index}`}
                              position="outside"
                              offset={10}
                            >
                              {entry.name}
                            </Label>
                          </>
                        ))}
                      </Pie>
                    </PieChart>
                    <br />
                  </div>
                  <br />
                  <div style={{ display: 'inline-block', marginRight: '20px' }}>
                    <Text.Subheadline as="h5" isBold={true} tone="primary">
                      {'SLA Met (Overall) = '}
                      {slaMetPercentage + '%'}
                    </Text.Subheadline>
                    <Text.Subheadline as="h5" isBold={true} >
                      {'SLA Not Met (Overall) = '}
                      {slaNotMetPercent + '%'}
                    </Text.Subheadline>
                    <Text.Subheadline as="h5" isBold={true} >
                      {'SLA (High Priority) = '}
                      {slaHighPercentage + '%'}
                    </Text.Subheadline>
                  </div>
                </div>
              </Card>
            </Constraints.Horizontal>
          </Spacings.Stack>
        </div>
      </Spacings.Inline>
      <br />
      <br />
      <div>
        <button
          onClick={() =>
            navigateToLink('https://dashboard.tawk.to/#/dashboard')
          }
        >
          Chat
        </button>
      </div>
      <br />
      <br />
      <TawkTo />
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
DashboardDisplayForm.displayName = 'DashboardDisplayForm';
DashboardDisplayForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default DashboardDisplayForm;
