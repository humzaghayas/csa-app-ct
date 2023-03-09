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
import {
  formatLocalizedString,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import messages from './messages';
// import toggleFeature from '@commercetools-frontend/application-shell/node_modules/@flopflip/react-broadcast/dist/declarations/src/components/toggle-feature';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { useCartsFetcher } from '../../../../hooks/use-cart-connector/use-cart-connector';
import './cart-list-module.css';
import CartAccount from '../cart-account/cart-account';
import { getCartRows } from './rows';
import MoneyField from '@commercetools-uikit/money-field';
import { useOrdersFetcher } from '../../../../hooks/use-orders-connector/use-orders-connector';

const rows = [
  // { CartNumber: 'CS0012875',Customer:'Lahari',CartTotal:'$350.00',NooforderItems:'1',TotalItems:'1',CartStatus:'',ShipmentStatus:"",PaymentStatus:'',Created:'jun 14, 2022,2:54:47...',Modified:'Aug 14, 2022,2:54:47...'},
  // { CartNumber: 'CS0012875',Customer:'Lahari',CartTotal:'$350.00',NooforderItems:'1',TotalItems:'1',CartStatus:'',ShipmentStatus:"",PaymentStatus:'',Created:'jun 14, 2022,2:54:47...',Modified:'Aug 14, 2022,2:54:47...'},
  // { CartNumber: 'CS0012875',Customer:'Lahari',CartTotal:'$350.00',NooforderItems:'1',TotalItems:'1',CartStatus:'',ShipmentStatus:"",PaymentStatus:'',Created:'jun 14, 2022,2:54:47...',Modified:'Aug 14, 2022,2:54:47...'},
  // { OrderNumber: '00012876',Customer:'women',Created:'Apr 11, 2022,2:54:47...',Modified:'Apr 11, 2022,2:54:47...',Status:'In Progress',DeliveryMode:'standard'},
  // { OrderNumber: '00012877',Customer:'women',Created:'Apr 11, 2022,2:54:47...',Modified:'Apr 11, 2022,2:54:47...',Status:'In Progress',DeliveryMode:'standard'},
  // { OrderNumber: '00012879',Customer:'RanjithKumar',Created:'Nov 11, 2022,2:54:47...',Modified:'Dec 11, 2022,2:54:47...',Status:'In Progress',DeliveryMode:'standard'},
];

const columns = [
  { key: 'id', label: 'Cart Number' },
  //{ key: 'key', label: 'Cart Key' },
  { key: 'cart_ordernumber', label: 'Order Number' },
  { key: 'customer', label: 'Customer' },
  { key: 'totalPrice', label: 'Cart Total' },
  { key: 'noOforderItems', label: 'No.of order Items' },
  { key: 'totalItems', label: 'Total Items' },
  { key: 'cartState', label: 'Cart Status' },
  { key: 'createdAt', label: 'Created' },
  { key: 'lastModifiedAt', label: 'Modified' },
];

const Cart = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });

  const { cartPaginatedResult, data, error, loading } = useCartsFetcher({
    // data,
    page,
    perPage,
    tableSorting,
    
  });

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

      {cartPaginatedResult ? (
        <Spacings.Stack scale="l">
          <DataTable
            isCondensed
            columns={columns}
            rows={getCartRows(cartPaginatedResult)}
            //rows = {cartPaginatedResult.results}
            // itemRenderer={(item, column) => itemRenderer(item, column)}
            maxHeight={600}
            //sortedBy={tableSorting.value.key}
            // sortDirection={tableSorting.value.order}
            // onSortChange={tableSorting.onChange}
            onRowClick={(row) => push(`cart-edit/${row.id}/cart-general`)}
            // onRowClick={(row) => push(`Ticket-account/${row.id}/companies-general`)}
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={cartPaginatedResult.total}
          />
          <Switch>
            {/* <SuspendedRoute path={`${match.path}/:id`}>
                <TicketAccount onClose={() => push(`${match.url}`)} />  
            </SuspendedRoute> */}

            <SuspendedRoute path={`${match.path}/:id`}>
              <CartAccount onClose={() => push(`${match.url}`)} />
            </SuspendedRoute>

            {/* <SuspendedRoute path={`${match.path}/ticket-details`}>
            <TicketDetails  onClose={() => push(`${match.url}`)} />
            </SuspendedRoute> */}
          </Switch>
        </Spacings.Stack>
      ) : null}
    </Spacings.Stack>
  );
};
Cart.displayName = 'Cart';
Cart.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Cart;
