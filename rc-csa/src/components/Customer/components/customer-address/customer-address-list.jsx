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
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import { BackIcon } from '@commercetools-uikit/icons';
import FlatButton from '@commercetools-uikit/flat-button';
import DataTable from '@commercetools-uikit/data-table';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import messages from './messages';

import SecondaryButton from '@commercetools-uikit/secondary-button';

import {
  PlusBoldIcon,
} from '@commercetools-uikit/icons';

import { useCustomerDetailsFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
const AddressDetails = lazy(() => import('../customer-address/customer-address-details'));

const columns = [
  { key: 'firstName', label: 'Contact name' },
  { key: 'company', label: 'Company Name' },
  { key: 'Address', label: 'Address' },
  { key: 'city', label: 'City Name' },
  { key: 'postalCode', label: 'PostalCode' },
  { key: 'state', label: 'state' },
  { key: 'region', label: 'Region' },
  { key: 'country', label: 'Country' },
];

const itemRenderer = (item, column) => {
  switch (column.key) {
    case 'firstName':
      return item.firstName + ' ' + item.lastName;
    case 'company':
      return item.company;
    case 'Address':
     const address = item.streetNumber + ',' + item.apartment + ',' + item.building
      return address;
    case 'city':
      return item.city;
    case 'postalCode':
      return item.postalCode;
    case 'state':
      return item.state;
    case 'region':
      return item.region;
    case 'country':
      return item.country;
    default:
      return item[column.key];
  }
};

const CustomersAddressList = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });


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
      <Spacings.Inline>
        <SecondaryButton
          label="Add Address"
          data-track-event="click"
          onClick={() => push(`customer-address-create`)}
          iconLeft={<PlusBoldIcon />}
          size="medium"
        />
      </Spacings.Inline>
      <Spacings.Stack scale="l">
        {props.customer?.addresses  ? (
          <Spacings.Stack scale="l">
            <DataTable
              isCondensed
              columns={columns}
              rows={props.customer?.addresses}
              itemRenderer={(item, column) => itemRenderer(item, column)}
              maxHeight={600}
              onRowClick={(row) => push(`${match.url}/${row.id}`)}
            />
            <Pagination
              page={page.value}
              onPageChange={page.onChange}
              perPage={perPage.value}
              onPerPageChange={perPage.onChange}
              totalItems={props.customer?.addresses}
            />
            <Switch>
              <SuspendedRoute path={`${match.path}/:id`}>
                <AddressDetails onClose={() => push(`${match.url}`)} />
              </SuspendedRoute>
            </Switch>
          </Spacings.Stack>
        ) : null}
       
      </Spacings.Stack>
    </Spacings.Stack>
  );
};
CustomersAddressList.displayName = 'CustomersAddressList';
CustomersAddressList.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default CustomersAddressList;
