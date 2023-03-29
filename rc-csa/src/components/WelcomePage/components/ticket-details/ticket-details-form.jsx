import React, { useEffect, useState } from 'react';
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
  SelectField,
} from '@commercetools-frontend/ui-kit';
import { Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useDataTableSortingState, usePaginationState } from '@commercetools-uikit/hooks';
import DataTable from '@commercetools-uikit/data-table';
import { getTicketRows } from 'ct-tickets-helper-api/lib/helper-methods';
import TicketAccount from '../../../Ticket/components/ticket-account/ticket-account';
// import { Pie } from 'react-chartjs-2';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import ExportExcel from './excelexport';
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
import { PieChart, Pie, Cell, Label } from 'recharts';
import { CART_STATE, REPORT_TYPE } from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import styles from './ticket-details.module.css'
import { useFetchOrderById, useOrdersFetcher } from '../../../../hooks/use-orders-connector';
import { useCartsFetcher } from '../../../../hooks/use-cart-connector/use-cart-connector';
//import { getOrderData } from './conversions';

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
  const orderData = props?.order;
  const cartData = props?.cart;

  const totalTicket = ticketData?.customObjects?.count;
  const newTickets = newFunctionTickets(ticketData);
  const highTickets = highProirityTickets(ticketData);
  const resolvedstatusTickets = resolvedTickets(ticketData);
  const inprogTickets = inProgressTickets(ticketData);
  const dataExcel = ExcelData;

  console.log(orderData);
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


  const filtereOrderData = orderData?.ordersPaginatedResult?.results?.filter((obj) => {
    const createdAt = new Date(obj.createdAt);

    return createdAt >= startDate && createdAt <= endDate;
  });

  const filterCartData = cartData?.cartPaginatedResult?.results?.filter((obj) => {
    const createdAt = new Date(obj.createdAt);

    return createdAt >= startDate && createdAt <= endDate;
  });

  const starttDate = moment(startDate).format('DD-MM-YYYY');
  const enddDate = moment(endDate).format('DD-MM-YYYY');

  // console.log(filteredData);
  const ticketExcel = filteredData?.map((obj) => {
    return {
      'Ticket Number': obj?.value?.ticketNumber,
      'Customer': obj?.value?.email,
      // CreatedAt: obj?.createdAt,
      'Created': moment(obj?.value?.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      // LastModifiedAt: obj?.lastModifiedAt
      'Modified': moment(obj?.value?.lastModifiedAt).format(
        'YYYY-MM-DD HH:mm:ss'
      ),
      'Source': obj?.value?.source,
      'Status': obj?.value?.status,
      'Priority': obj?.value?.priority,
      'Category': obj?.value?.category,
      'Subject': obj?.value?.subject,
      'Assignee': obj?.value?.assignedTo,
      'Created by': obj?.value?.createdBy,
      'Message': obj?.value?.ticketData?.message,
      'Worklog': obj?.value?.ticketData?.comments?.comment ?? '--',

    };
  });


  const Orders = filtereOrderData?.map((obj) => {
    return {
      'Order Number': obj?.id,
      'Customer': fullName(obj?.customer?.firstName ?? '--', obj?.customer?.lastName),
      'Order Total': amountCalculator(obj?.totalPrice?.centAmount, obj?.totalPrice?.fractionDigits),
      'No.of Order Items': obj?.lineItems?.length,
      'Total Items': obj?.lineItems.map(item => item.quantity).reduce((a, b) => a + b, 0),
      'Order Status': obj?.orderState ?? '--',
      'Shipment Status': obj?.shipmentState ?? '--',
      'Payment Status': obj?.paymentState ?? '--',
      'Created At': moment(obj?.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      'Last ModifiedAt': moment(obj?.lastModifiedAt).format('YYYY-MM-DD HH:mm:ss'),
      // 'Product Name': obj?.lineItems?.nameAllLocales?.value ?? '--',
      // 'SKU': obj?.lineItems?.variants?.sku ?? '--',
      // 'Unit Price': amountCalculator(obj?.lineItems?.price?.value?.centAmount, obj?.lineItems?.price?.value?.fractionDigits),
      // 'Quantity': obj?.lineItems?.quantity ?? '--',
      'Shipping ID': obj?.shippingAddress?.id ?? '--',
      'Shipped Quantity': obj?.lineItems.map(item => item.quantity).reduce((a, b) => a + b, 0),
      'Street Number': obj?.shippingAddress?.streetNumber ?? '--',
      'Street Name': obj?.shippingAddress?.streetName,
      'Building': obj?.shippingAddress?.building ?? '--',
      'City': obj?.shippingAddress?.city ?? '--',
      'Postal Code': obj?.shippingAddress?.postalCode ?? '--',
      'State': obj?.shippingAddress?.state ?? '--',
      'Country': obj?.shippingAddress?.country ?? '--',
      'Return Tracking ID': obj?.returninfo?.returnTrackingId ?? '--',
      'Return Date': obj?.returninfo?.returnDate ?? '--',
      'Payment ID': obj?.paymentInfo?.payments?.id ?? '--',
      'Interface ID': obj?.paymentInfo?.payments?.interfaceId ?? '--',
    };
  });


  function amountCalculator(centAmount, fractionDigits) {
    centAmount = centAmount / 100;
    centAmount = "$" + centAmount + ".00";
    return centAmount;
  }
  function fullName(firstName, lastName) {
    const f1 = firstName ? firstName : "";
    const f2 = lastName ? lastName : "";
    return f1 + " " + f2;
  }

  const Carts = filterCartData?.map((obj) => {
    return {
      'Cart Number': obj?.id,
      'Order Number': obj?.orderId,
      'Customer': fullName(obj?.customer?.firstName ?? '--', obj?.customer?.lastName),
      'Cart Total': amountCalculator(obj?.totalPrice?.centAmount, obj?.totalPrice?.fractionDigits),
      'No.of Order Items': obj?.lineItems?.length,
      'Total Items': obj?.lineItems.map(item => item.quantity).reduce((a, b) => a + b, 0),
      'Cart Status': obj?.cartState ?? '--',
      'Created At': moment(obj?.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      'Last ModifiedAt': moment(obj?.lastModifiedAt).format('YYYY-MM-DD HH:mm:ss')
    };
  });
  function amountCalculator(centAmount, fractionDigits) {
    centAmount = centAmount / 100;
    centAmount = "$" + centAmount + ".00";
    return centAmount;
  }
  function fullName(firstName, lastName) {
    const f1 = firstName ? firstName : "";
    const f2 = lastName ? lastName : "";
    return f1 + " " + f2;
  }


  const exportData = () => {
    console.log(selectedOption)
    switch (selectedOption) {
      case "Tickets": return ticketExcel;
      case "Orders": return Orders;
      case "Carts": return Carts;
    }

  }

  // Dropdown options
  const [selectedOption, setSelectedOption] = useState('--');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //PieChart
  const data = [
    { name: 'newTickets', tickets: newTickets, fill: 'teal' },
    { name: 'highTickets', tickets: highTickets, fill: 'gray' },
    {
      name: 'resolvedstatusTickets',
      tickets: resolvedstatusTickets,
      fill: 'orangered',
    },
    { name: 'inprogTickets', tickets: inprogTickets, fill: 'royalblue' },
  ];

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
      <div
        className={styles.header}>
        <Header />
      </div>
      <br />

      <Spacings.Inline alignItems="stretch" justifyContent="space-between">
        <div
          className={styles.ticdetails}>
          <Spacings.Stack scale="xl" alignItems="flexEnd">
            <Constraints.Horizontal constraint="l" max={8}>
              <Card constraint="xl">
                <br />
                <div>
                  <Text.Subheadline as="h4" isBold={true} tone="positive">
                    {'Ticket details'}
                  </Text.Subheadline>
                  <br />
                  <div style={{ display: 'inline-block', marginRight: '20px' }}>
                    <PieChart width={200} height={200}>
                      <Pie
                        data={data}
                        dataKey="tickets"
                        nameKey="name"
                        outerRadius={100}
                      >
                        {data.map((entry, index) => (
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
                    <Text.Subheadline as="h5" isBold={true} tone="primary">
                      {'Total tickets = '}
                      {totalTicket}
                    </Text.Subheadline>
                  </div>
                  <br />
                  <div style={{ display: 'inline-block', marginRight: '20px' }}>
                    <Text.Subheadline as="h5" isBold={true} tone="information">
                      {'High Priority = '}
                      {highTickets}
                    </Text.Subheadline>
                    <Text.Subheadline as="h5" isBold={true} tone="information">
                      {'New Tickets = '}
                      {newTickets}
                    </Text.Subheadline>
                    <Text.Subheadline as="h5" isBold={true} tone="information">
                      {'In-progress = '}
                      {inprogTickets}
                    </Text.Subheadline>
                    <Text.Subheadline as="h5" isBold={true} tone="information">
                      {'Resloved = '}
                      {resolvedstatusTickets}
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
            <div
              className={styles.tickets_component}
            >
              <Card constraint="xl" theme="dark" insetScale="l">

                <Text.Subheadline as="h4" isBold={true} tone="positive">
                  {'Recent Tickets '}

                </Text.Subheadline>
                <br />
                {rows ? (
                  <Spacings.Stack scale="l">
                    <DataTable
                      isCondensed
                      columns={columns}
                      rows={rows.slice(0, 5)} // limit to first 5 rows
                      maxHeight={600}
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

      </Spacings.Inline >
      <br />


      <Spacings.Inline alignItems="stretch" justifyContent="space-between">
        <Spacings.Stack scale="xl" alignItems="flexEnd">
          <Constraints.Horizontal min={14} max={15}>
            <Card constraint="xl">
              <Text.Subheadline as="h4" isBold={true} tone="positive">
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
                      theme="dark"
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
                      <div>
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

                          fileName={'Work Report - ' + selectedOption + ' (' + starttDate + ' to ' + enddDate + ')'}
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
              <Text.Subheadline as="h4" isBold={true} tone="positive">
                {'Agent details'}
              </Text.Subheadline>
              <br />
              <Spacings.Inline>
                <Spacings.Stack scale="l">
                  <Constraints.Horizontal>
                    <Card constraint="xl" theme="dark" insetScale="l">
                      <Text.Subheadline
                        as="h4"
                        isBold={true}
                        tone="information"
                      >
                        {'Total Agents'}
                      </Text.Subheadline>
                      <Text.Subheadline as="h3">50</Text.Subheadline>
                    </Card>
                  </Constraints.Horizontal>
                </Spacings.Stack>
                <Spacings.Stack scale="l">
                  <Constraints.Horizontal>
                    <Card constraint="xl" theme="dark" insetScale="l">
                      <Text.Subheadline
                        as="h4"
                        isBold={true}
                        tone="information"
                      >
                        {'Present     '}
                      </Text.Subheadline>
                      {/* make changes here */}
                      <Text.Subheadline as="h3">47</Text.Subheadline>
                    </Card>
                  </Constraints.Horizontal>
                </Spacings.Stack>
                <Spacings.Stack scale="l">
                  <Constraints.Horizontal>
                    <Card constraint="xl" theme="dark" insetScale="l">
                      <Text.Subheadline
                        as="h4"
                        isBold={true}
                        tone="information"
                      >
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
                      <Text.Subheadline
                        as="h4"
                        isBold={true}
                        tone="information"
                      >
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
        <div style={{ float: 'right', textAlign: 'right' }}>
          <Spacings.Stack scale="l" alignItems="flexEnd">
            <Constraints.Horizontal max={6}>
              <Card theme="dark" insetScale="l">
                <Text.Subheadline as="h4" isBold={true} tone="information">
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
      <br />
      <br />
    </Spacings.Stack >
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
