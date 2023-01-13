import PropTypes from 'prop-types';
import { lazy,useState } from 'react';
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
import { BackIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable from '@commercetools-uikit/data-table';
// import AccessibleButton from '@commercetools-uikit/accessible-button';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import SearchSelectField from '@commercetools-uikit/async-select-field';
import {
  formatLocalizedString,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import messages from './messages';
// import toggleFeature from '@commercetools-frontend/application-shell/node_modules/@flopflip/react-broadcast/dist/declarations/src/components/toggle-feature';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import SearchSelectInput from '@commercetools-uikit/search-select-input';
import { useOrdersFetcher } from '../../../../hooks/use-orders-connector/use-orders-connector';
import { getOrderRows } from 'ct-tickets-helper-api';
import {
  // BinLinearIcon,
  // IconButton,
  // LoadingSpinner,
  // Text,
  // SecondaryButton,
  PlusBoldIcon,
} from '@commercetools-uikit/icons';

import OrderAccount from '../order-account/order-account';

// import { getCompanies } from '../../api';
// import { useEffect } from 'react';

// import NoImageIcon from '@commercetools-frontend/assets/images/camera.svg';
// import TicketAccount from '../Ticket-account';

// const QUERY = {
//   perPage: 20,
//   page: 1,
//   sortBy: 'createdAt',
//   sortDirection: 'desc',
// };

const rows = [
  { OrderNumber: '00012875',Customer:'Lahari',Created:'jun 14, 2022,2:54:47...',Modified:'Aug 14, 2022,2:54:47...',Type:'Change',Status:'In Progress',DeliveryMode:'standard'},
  { OrderNumber: '00012876',Customer:'women',Created:'Apr 11, 2022,2:54:47...',Modified:'Apr 11, 2022,2:54:47...',Type:'Cancel',Status:'In Progress',DeliveryMode:'standard'},
  { OrderNumber: '00012877',Customer:'women',Created:'Apr 11, 2022,2:54:47...',Modified:'Apr 11, 2022,2:54:47...',Type:'Enquiry',Status:'In Progress',DeliveryMode:'standard'},
  { OrderNumber: '00012879',Customer:'RanjithKumar',Created:'Nov 11, 2022,2:54:47...',Modified:'Dec 11, 2022,2:54:47...',Type:'Cancel',Status:'In Progress',DeliveryMode:'standard'},
];

const columns = [

  { key: 'OrderNumber', label: 'Order Number' },
  { key:'Customer', label: 'Customer' },
  { key: 'Created', label: 'Order Placed' },
  { key: 'Modified', label: 'Query Raised' },
  { key: 'Type', label: 'Type' },
  { key: 'Status', label: 'Status' },
  { key: 'DeliveryMode', label: 'Delivery Mode' },
 
];


const Orders = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });

  const { ordersPaginatedResult, error, loading } =  useOrdersFetcher({
    page,
    perPage,
    tableSorting,
  });
  console.log(ordersPaginatedResult);

  return (
    <Spacings.Stack scale="l">
    
        <FlatButton
          as={RouterLink}
          to={props.linkToWelcome}
          label={intl.formatMessage(messages.backToWelcome)}
          icon={<BackIcon />}
        />
        <Text.Headline as="h2" intlMessage={messages.title} />
          {/* <Spacings.Stack scale="m"> */}
        <Spacings.Inline scale="l" alignItems="flex-end">
      
        {/* <SearchSelectField
    title=" "
    id="customer"
    name="customer"
    isRequired={false}
    horizontalConstraint={7}
    optionType="single-lined"
    isAutofocussed={false}
    backspaceRemovesValue={true}
    isClearable={true}
    isDisabled={false}
    isReadOnly={false}
    isMulti={false}
    onChange={() => {}}
    // noOptionsMessage="No exact match found"
    // loadingMessage="loading exact matches"
    placeholder="Search by Order Number"
    loadOptions={() => {}}
    
    cacheOptions={false}
  /> */}
  {/* </Spacings.Stack>
  <Spacings.Stack scale="m"> */}
  <SearchSelectInput
      id="customers"
      name="customers"
      horizontalConstraint={7}
      optionType="single-lined"
      isAutofocussed={false}
      backspaceRemovesValue={true}
      isClearable={true}
      isDisabled={false}
      isReadOnly={false}
      isMulti={true}
      onChange={() => {}}
      defaultOptions={[
        {
          label: 'Animals',
          options: [
            { value: 'dogs', label: 'Dogs' },
            { value: 'whales', label: 'Whales' },
            { value: 'antilopes', label: 'Antilopes' },
            { value: 'snakes', label: 'Snakes' },
          ],
        },
        {
          label: 'Flavours',
          options: [
            {
              value: 'vanilla',
              label: 'Vanilla',
            },
            {
              value: 'chocolate',
              label: 'Chocolate',
            },
            {
              value: 'strawberry',
              label: 'Strawberry',
            },
            {
              value: 'salted-caramel',
              label: 'Salted Caramel',
            },
          ],
        },
      ]}
      noOptionsMessage="No exact match found"
      loadingMessage="loading exact matches"
      placeholder="Filter By Order Status          "
      // eslint-disable-next-line no-undef
      loadOptions={() => {}}
      cacheOptions={false}
    />
    
    <SearchSelectInput
      id="customers"
      name="customers"
      horizontalConstraint={7}
      optionType="single-lined"
      isAutofocussed={false}
      backspaceRemovesValue={true}
      isClearable={true}
      isDisabled={false}
      isReadOnly={false}
      isMulti={true}
      onChange={() => {}}
      defaultOptions={[
        {
          label: 'Animals',
          options: [
            { value: 'dogs', label: 'Dogs' },
            { value: 'whales', label: 'Whales' },
            { value: 'antilopes', label: 'Antilopes' },
            { value: 'snakes', label: 'Snakes' },
          ],
        },
        {
          label: 'Flavours',
          options: [
            {
              value: 'vanilla',
              label: 'Vanilla',
            },
            {
              value: 'chocolate',
              label: 'Chocolate',
            },
            {
              value: 'strawberry',
              label: 'Strawberry',
            },
            {
              value: 'salted-caramel',
              label: 'Salted Caramel',
            },
          ],
        },
      ]}
      noOptionsMessage="No exact match found"
      loadingMessage="loading exact matches"
      placeholder="Search By Order Number"
      // eslint-disable-next-line no-undef
      loadOptions={() => {}}
      cacheOptions={false}
    />
    </Spacings.Inline>
         {/* </Spacings.Stack> */}
   
      {/* {loading && <LoadingSpinner />} */}
     
      {ordersPaginatedResult?(
        <Spacings.Stack scale="l">
         
          <DataTable
            isCondensed
            columns={columns}
            rows={getOrderRows(ordersPaginatedResult)}
            // itemRenderer={(item, column) => itemRenderer(item, column)}
            maxHeight={600}
            // sortedBy={tableSorting.value.key}
            // sortDirection={tableSorting.value.order}
            // onSortChange={tableSorting.onChange}
            onRowClick={(row) => push(`order-edit/${row.id}/orders-general`)}
            // onRowClick={(row) => push(`Ticket-account/${row.id}/companies-general`)}
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={ordersPaginatedResult?.total}
          />
           <Switch>
            {/* <SuspendedRoute path={`${match.path}/:id`}>
                <TicketAccount onClose={() => push(`${match.url}`)} />  
            </SuspendedRoute> */}
            
            <SuspendedRoute path={`${match.path}/:id`}>
              <OrderAccount onClose={() => push(`${match.url}`)} />
            </SuspendedRoute>
          
          {/* <SuspendedRoute path={`${match.path}/ticket-details`}>
            <TicketDetails  onClose={() => push(`${match.url}`)} />
            </SuspendedRoute> */}
          </Switch> 
        </Spacings.Stack>
      ):null}
    </Spacings.Stack>
  );
};
Orders.displayName = 'Orders';
Orders.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Orders;
