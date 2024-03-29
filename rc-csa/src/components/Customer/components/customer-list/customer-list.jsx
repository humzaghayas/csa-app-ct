import PropTypes from 'prop-types';
import { lazy, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
// import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable from '@commercetools-uikit/data-table';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import {
  formatLocalizedString,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import messages from './messages';
import Grid from '@commercetools-uikit/grid';
import { SecondaryIconButton, } from '@commercetools-frontend/ui-kit';

import SecondaryButton from '@commercetools-uikit/secondary-button';
import { BackIcon, RefreshIcon } from '@commercetools-uikit/icons';
import {
  // BinLinearIcon,
  // IconButton,
  // LoadingSpinner,
  // Text,
  // SecondaryButton,
  PlusBoldIcon,
} from '@commercetools-uikit/icons';
import CustomerDetails from '../customer-details/customer-details';
import CustomerAccount from '../customer-account/customer-account';
// import CustomerCreate from '../customer-create/customer-create';

// import { getCompanies } from '../../api';
// import { useEffect } from 'react';

// import NoImageIcon from '@commercetools-frontend/assets/images/camera.svg';
// import CustomerAccount from '../Customer-account';

// const QUERY = {
//   perPage: 20,
//   page: 1,
//   sortBy: 'createdAt',
//   sortDirection: 'desc',
// };

import { useCustomersFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

// const rows = [
//   { Customernumber: '00000001',ExternalId:'--',FirstName:'Lahari',LastName:'Ramurthi',Email:'lahari.r@royalcyber.com',Company:'--',CustomerGroup:'Company A',DateCreated:'Apr 11, 2022,2:54:47...',DateModified:'Apr 11, 2022,2:54:47...'},
//   { Customernumber: '00000002',ExternalId:'--',FirstName:'Lahari',LastName:'Ramurthi',Email:'lahari.r@royalcyber.com',Company:'--',CustomerGroup:'Company A',DateCreated:'Apr 11, 2022,2:54:47...',DateModified:'Apr 11, 2022,2:54:47...',},
//   { Customernumber: '00000003',ExternalId:'--',FirstName:'Lahari',LastName:'Ramurthi',Email:'lahari.r@royalcyber.com',Company:'--',CustomerGroup:'Company A',DateCreated:'Apr 11, 2022,2:54:47...',DateModified:'Apr 11, 2022,2:54:47...',},
//   { Customernumber: '00000003',ExternalId:'--',FirstName:'RanjithKumar',LastName:'Rajendran',Email:'ranjithKumar.r@royalcyber.com',Company:'--',CustomerGroup:'Company A',DateCreated:'Apr 11, 2022,2:54:47...',DateModified:'Apr 11, 2022,2:54:47...',},
// ];

// const columns = [

//   { key: 'Customernumber', label: 'Customer number' },
//   { key:'ExternalId', label: 'External Id' },
//   { key: 'FirstName', label: 'First Name' },
//   { key: 'LastName', label: 'LastName' },
//   { key: 'Company', label: 'Company' },
//   { key: 'Email', label: 'Email' },
//   { key: 'CustomerGroup', label: 'Customer Group' },
//   { key: 'DateCreated', label: 'Date Created' },
//   { key: 'DateModified', label: 'Date Modified' },
// ];

const columns = [
  { key: 'customerNumber', label: 'Customer number' },
  { key: 'externalId', label: 'External Id' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'LastName' },
  { key: 'companyName', label: 'Company' },
  { key: 'email', label: 'Email' },
  { key: 'customerGroup', label: 'Customer Group' },
  { key: 'createdAt', label: 'Date Created' },
  { key: 'lastModifiedAt', label: 'Date Modified' },
];

const itemRenderer = (item, column) => {
  switch (column.key) {
    case 'customerNumber':
      return item.customerNumber;
    case 'externalId':
      return item.externalId;
    case 'firstName':
      return item.firstName;
    case 'lastName':
      return item.lastName;
    case 'companyName':
      return item.companyName;
    case 'email':
      return item.email;
    case 'customerGroup':
      return item.customerGroup?.name;
    case 'createdAt':
      return item.createdAt;
    case 'lastModifiedAt':
      return item.lastModifiedAt;
    default:
      return item[column.key];
  }
};

const Customers = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });

  const { projectKey } =useApplicationContext((context) => ({
    projectKey:context.project.key
  }));

  const { customersPaginatedResult, error, loading ,refetch} = useCustomersFetcher({
    page,
    perPage,
    tableSorting,
  });

 // console.log("customersPaginatedResult",JSON.stringify(customersPaginatedResult));
  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
        <FlatButton
          as={RouterLink}
          to={props.linkToWelcome}
          label={intl.formatMessage(messages.backToWelcome)}
          icon={<BackIcon />}
        />
        <Text.Headline as="h2" intlMessage={messages.title} />
      </Spacings.Stack>
      {/* {loading && <LoadingSpinner />} */}
      <Spacings.Stack>
        <Grid gridGap="16px" gridAutoColumns="12fr" gridTemplateColumns="20% 70% 10%">
            <Grid.Item >
                <SecondaryButton
                  label="Add Customer"
                  data-track-event="click"
                  // onClick={() => push(`/${projectKey}/customers/new`)}
                  onClick={() => {
                    const win = window.open(`/${projectKey}/customers/new`, "_blank");
                    win.focus();
                    
                    // push(`/${projectKey}/orders/quotes/${row.id}`)
                  }}
                  iconLeft={<PlusBoldIcon />}
                  size="medium"
                />
            </Grid.Item>
            <Grid.Item>&nbsp;</Grid.Item>
            <Grid.Item>
           
                <SecondaryIconButton
                  label="Refresh"
                  data-track-event="click" 
                  onClick={()=>{refetch()}}
                  icon={<RefreshIcon />}
                  size="medium"/>

            </Grid.Item>
        </Grid>
      </Spacings.Stack>
      {/* {data ? ( */}
      <Spacings.Stack scale="l">
        {/* <DataTable
            isCondensed
            columns={columns}
            rows={rows}
            // itemRenderer={(item, column) => itemRenderer(item, column)}
            maxHeight={600}
            // sortedBy={tableSorting.value.key}
            // sortDirection={tableSorting.value.order}
            // onSortChange={tableSorting.onChange}
            onRowClick={() => push(`Customer-edit/Customers-summary`)}
            // onRowClick={(row) => push(`${row.FirstName}`)}
            // onRowClick={(row) => push(`Customer-account/${row.id}/companies-general`)}
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            // totalItems={data.total}
          /> */}

        {customersPaginatedResult ? (
          <Spacings.Stack scale="l">
            <DataTable
              isCondensed
              columns={columns}
              rows={customersPaginatedResult.results}
              itemRenderer={(item, column) => itemRenderer(item, column)}
              maxHeight={600}
              onRowClick={(row) => push(`customer-account/${row.id}/Customers-summary`)}
            />
            <Pagination
              page={page.value}
              onPageChange={page.onChange}
              perPage={perPage.value}
              onPerPageChange={perPage.onChange}
              totalItems={customersPaginatedResult.total}
            />
            <Switch>
              <SuspendedRoute path={`${match.path}/:id`}>
                <CustomerAccount onClose={() => push(`${match.url}`)} />
              </SuspendedRoute>
            </Switch>
          </Spacings.Stack>
        ) : null}
        <Switch>
          {/* <SuspendedRoute path={`${match.path}/:id`}>
                <CustomerAccount onClose={() => push(`${match.url}`)} />  
            </SuspendedRoute> */}

          {/* <SuspendedRoute path={`${match.path}/Customer-edit`}> */}
          {/* <SuspendedRoute path={`${match.path}/:lahari`}>
              <CustomerAccount onClose={() => push(`${match.url}`)} />  */}
          {/* <CustomerDetails onClose={() => push(`${match.url}`)} /> */}
          {/* </SuspendedRoute> */}

          {/* <SuspendedRoute path={`${match.path}/Customer-create`}>
            <CustomerCreate  onClose={() => push(`${match.url}`)} />
            </SuspendedRoute> */}
        </Switch>
      </Spacings.Stack>
      {/* ) : null} */}
    </Spacings.Stack>
  );
};
Customers.displayName = 'Customers';
Customers.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Customers;
