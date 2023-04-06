import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
  useHistory,
  useParams,
} from 'react-router-dom';
import {
  TabularModalPage,
  useModalState,
  TabHeader,
  TabularMainPage,
  TabularDetailPage,
} from '@commercetools-frontend/application-components';
import PropTypes from 'prop-types';

import Spacings from '@commercetools-uikit/spacings';
import Avatar from '@commercetools-uikit/avatar';
import CustomerCreate from '../customer-create/customer-create';
import CustomerPassword from '../customer-password/customer-password';
import CustomerProfile from '../customer-profile';
import CustomerOrder from '../customer-orders/customer-order';
import CustomerTickets from '../customer-Tickets/customer-tickets';
import CustomerList from '../customer-address/customer-address-list';
import { useCustomerDetailsFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';

import CustomerAddressCreate from '../customer-address/customer-address-create';
import CustomerPayment from '../customer-payment/customer-payment';
import CustomerReturn from '../customer-returns/customer-return';
import { CONSTANTS } from 'ct-tickets-helper-api';
import { useGetTicketByCustomerEmail } from '../../../../hooks/use-register-user-connector';
import { useEffect, useState } from 'react';
import { useGetActiveCartByCustomer, useGetOrdersByCustomer } from '../../../../hooks/use-cart-connector';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { entryPointUriPath } from '../../../../constants';
import CustomerCart from '../customer-carts/customer-cart';
import { getPermission } from '../../../../utils';
import CustomerShoppinglist from '../customer-shoppinglist/customer-shoppinglist';
import CustomerWishlist from '../customer-wishlist/customer-wishlist';
import CustomerPromotion from '../customer-promotion/customer-promotion';


const CustomerAccount = (props) => {
  const match = useRouteMatch();
  const history = useHistory();
  const params = useParams();
  const { customer, error, loading } = useCustomerDetailsFetcher(params.id);
  const [ticket, setTicket] = useState(null);

  const canViewCustomer360 = getPermission('ViewCsaCustomer');
  const canManageCustomer360 = getPermission('ManageCsaCustomer');
  const canViewCustomerCarts = getPermission('ViewCustomerCarts');
  const canManageCustomerCarts = getPermission('ManageCustomerCarts');
  const canViewCustomerOrders = getPermission('ViewCustomerOrders');
  const canManageCustomerOrders = getPermission('ManageCustomerOrders');
  const canViewCustomerPayments = getPermission('ViewCustomerPayments');

  const { projectKey } = useApplicationContext((context) => ({
    projectKey: context.project.key
  }));
  const [customerSummary, setCustomerSummary] = useState({
    ticketsCount: 0,
    activeCartCount: 0,
    orderCount: 0,
    salesCount: 0
  });

  const { execute } = useGetTicketByCustomerEmail();
  const { execute: executeCartService } = useGetActiveCartByCustomer();
  const { execute: executeOrderService } = useGetOrdersByCustomer();

  useEffect(async () => {
    console.log('ticket 12121');
    const d = await execute(customer?.email);
    const c = await executeCartService(params.id);
    const o = await executeOrderService(params.id
      , "\"" + CONSTANTS.OPEN_STATUS + "\"");
    const s = await executeOrderService(params.id
      , "\"" + CONSTANTS.CONFIRMED_STATUS + "\"");
    setTicket(d?.data);

    setCustomerSummary({
      ticketsCount: d?.data?.customObjects?.total,
      activeCartCount: c?.data?.carts?.total,
      orderCount: o.data?.orders?.total,
      salesCount: s.data?.orders?.total
    })
    console.log('ticket', d?.data);
    console.log('cart: ', c);
  }, [customer?.email, customer?.id]);


  return (
    <TabularDetailPage
      title=" "
      onPreviousPathClick={() => history.push(`/${projectKey}/${entryPointUriPath}/Customers`)}
      previousPathLabel="Go to View Customers"
      tabControls={
        <>
          <Spacings.Stack scale="xxl">
            <Spacings.Inline>

              <Avatar
                gravatarHash="20c9c1b252b46ab49d6f7a4cee9c3e68"
                firstName={customer?.firstName}
                lastName={customer?.lastName}
                size="l"
              />
              <Spacings.Stack scale="xs">
                <Spacings.Stack scale="xl">
                </Spacings.Stack>
                <h1>{customer?.firstName} 360° view</h1>
                <h4>{customer?.email}</h4>
              </Spacings.Stack>
            </Spacings.Inline>
          </Spacings.Stack>
          <Spacings.Stack scale="xl">
            <Spacings.Inline>

              <TabHeader to={`${match.url}/Customers-summary`} label="Summary" />
              {canViewCustomerCarts ? (
                <TabHeader to={`${match.url}/Customers-profile`} label="Profile" />
              ) : null}
              {canViewCustomerCarts ? (
                <TabHeader to={`${match.url}/Customers-carts`} label="Carts" />
              ) : null}

              {canViewCustomerOrders ? (<>
                <TabHeader to={`${match.url}/Customers-orders`} label="Orders" />

                <TabHeader to={`${match.url}/Customers-returns`} label="Returns" />
              </>
              ) : null}
              {canViewCustomerPayments ? (
                <TabHeader to={`${match.url}/Customers-payments`} label="Payments" />
              ) : null}
              {canViewCustomer360 ? (
                <TabHeader to={`${match.url}/Customers-Address`} label="Addresses" />
              ) : null}

              <TabHeader to={`${match.url}/Customers-tickets`} label="Tickets" />
              {canManageCustomer360 ? (
                <TabHeader to={`${match.url}/Customers-password`} label="Password" />
              ) : null}
              <TabHeader to={`${match.url}/Customers-wishlist`} label="Wishlist" />
              <TabHeader to={`${match.url}/Customers-shoppinglist`} label="Shoppinglist" />

              <TabHeader to={`${match.url}/Customers-promotions`} label="Promotions" />
            </Spacings.Inline>
          </Spacings.Stack>
        </>
      }
    >
      <Switch>
        <Route path={`${match.path}/Customers-summary`}>
          <CustomerCreate customer={customer} customerSummary={customerSummary} />
        </Route>
        <Route path={`${match.path}/Customers-profile`}>
          <CustomerProfile customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-carts`}>
          <CustomerCart customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-orders`}>
          <CustomerOrder customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-returns`}>
          <CustomerReturn customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-password`}>
          <CustomerPassword customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-promotions`}>
          <CustomerPromotion customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-Address`}>
          <CustomerList customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-tickets`}>
          <CustomerTickets customer={customer} ticket={ticket} />
        </Route>
        <Route path={`${match.path}/customer-address-create`}>
          <CustomerAddressCreate customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-wishlist`}>
          <CustomerWishlist customer={customer}
          />
        </Route>
        <Route path={`${match.path}/Customers-shoppinglist`}>
          <CustomerShoppinglist customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-payments`}>
          <CustomerPayment />
        </Route>
      </Switch>
    </TabularDetailPage>
  );
};
CustomerAccount.displayName = 'Companies';
CustomerAccount.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,

};
export default CustomerAccount;
