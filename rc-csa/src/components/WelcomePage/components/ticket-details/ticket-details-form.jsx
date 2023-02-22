import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import Header from './Header';
import { Card, Constraints } from '@commercetools-frontend/ui-kit';
import { Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { usePaginationState } from '@commercetools-uikit/hooks';
import DataTable from '@commercetools-uikit/data-table';
import { getTicketRows } from 'ct-tickets-helper-api/lib/helper-methods';
import TicketAccount from '../../../Ticket/components/ticket-account/ticket-account';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import ExportExcel from './Excelexport';
import ExcelData from './values';

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

const TicketDisplayForm = (props) => {
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

  // console.log('data', props?.ticket);

  const ticketData = props?.ticket;

  function newStatusTickets() {
    const results = ticketData?.customObjects?.results; // get the results array

    let countNew = 0; // initialize count of "new" status to 0

    // loop through the results array and increment count if status is "new"
    results?.forEach((result) => {
      const status = result?.value?.status;
      if (status === 'new') {
        countNew++;
      }
    });

    // countNew variable will have the count of "new" status

    return countNew;
  }

  function highProirityTickets() {
    const results = ticketData?.customObjects?.results; // get the results array

    let countNew = 0; // initialize count of "new" status to 0

    // loop through the results array and increment count if status is "new"
    results?.forEach((result) => {
      const priority = result?.value?.priority;
      if (priority === 'high') {
        countNew++;
      }
    });

    // countNew variable will have the count of "new" status
    console.log('highCount', countNew);
    return countNew;
  }

  function inProgressTickets() {
    const results = ticketData?.customObjects?.results; // get the results array

    let countNew = 0; // initialize count of "new" status to 0

    // loop through the results array and increment count if status is "new"
    results?.forEach((result) => {
      const status = result?.value?.status;
      if (status === 'inprogress') {
        countNew++;
      }
    });
    return countNew;
  }

  function resolvedTickets() {
    const results = ticketData?.customObjects?.results; // get the results array

    let countNew = 0; // initialize count of "new" status to 0

    // loop through the results array and increment count if status is "new"
    results?.forEach((result) => {
      const status = result?.value?.status;
      if (status === 'done') {
        countNew++;
      }
    });

    // countNew variable will have the count of "new" status
    // console.log('doneCount', countNew);
    return countNew;
  }

  const newStatus = newStatusTickets();
  const highTickets = highProirityTickets();
  const resolvedstatusTickets = resolvedTickets();
  const inprogTickets = inProgressTickets();
  const dataExcel = ExcelData;

  rows = getTicketRows(ticketData?.customObjects);

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
            // rows={rows}
            rows={rows.slice(0, 5)} // limit to first 5 rows
            // itemRenderer={(item, column) => itemRenderer(item, column)}
            maxHeight={600}
            // sortedBy={tableSorting.value.key}
            // sortDirection={tableSorting.value.order}
            // onSortChange={tableSorting.onChange}
            // onRowClick={(row) => push(`ticket-edit/${row.id}/tickets-general`)}
            onRowClick={(row) => push(`ticket-edit/${row.id}/tickets-general`)}
            // onRowClick={(row) => push(`Ticket-account/${row.id}/companies-general`)}
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
      <div>
        <ExportExcel excelData={dataExcel} fileName={'Work Report'} />
      </div>
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
