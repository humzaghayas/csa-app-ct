import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Spacings from '@commercetools-uikit/spacings';
import Tickets from './components/Ticket/components/Ticket-list/ticket-list';
// import TicketDetails from './components/Ticket/components/Ticket-history/ticket-details';
import TicketAccount from './components/Ticket/components/ticket-account/ticket-account';
import Customers from './components/Customer/components/customer-list/customer-list';
import CustomerAccount from './components/Customer/components/customer-account/customer-account';
import CustomerCreate from './components/Customer/components/customer-create/customer-create';
import Orders from './components/Orders/components/order-list/order-list';
import Cart from './components/Cart/components/cart-list/cart-list';
import OrderAccount from './components/Orders/components/order-account/order-account';
import CartAccount from './components/Cart/components/cart-account/cart-account';
import TicketCreate from './components/Ticket/components/ticket-create/ticket-create';
import { PageUnauthorized } from '@commercetools-frontend/application-components';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from './constants';
import CustomerMessagesForm from './components/Customer/components/customer-messages/customer-messages-form';
import CustomerMessages from './components/Customer/components/customer-messages/customer-messages';
import CustomerReply from './components/Customer/components/customer-messages/customer-reply';
import AtgAccount from './components/ATG-Poc/components/atg-account/atg-account';
import ProductAccount from './components/Products/components/product-account/product-account';
import ProductDetails from './components/Products/components/product-details';
import { getPermission } from './utils';
import KnowledgebaseAccount from './components/Knowledgebase-FAQ/components/knowledgebase-account/knowledgebase-account';
import DashboardDisplay from './components/Dashboard/components/dashboard-details/dashboard';
import Feedback from './components/Dashboard/components/feedback/feedback';
import FeedbackSetup from './components/Dashboard/components/feedback/feedback-essential';
import ProductStock from './components/Products/components/product-stockNotify/product-stock';

const ApplicationRoutes = () => {
  const match = useRouteMatch();

  // const canManageTickets = useIsAuthorized({
  //   demandedPermissions: [PERMISSIONS.Manage],
  // });

  const canManageTickets = getPermission('ManageCsaTickets');
  const canViewTickets = getPermission('ViewCsaTickets');
  const canViewCustomer360 = getPermission('ViewCsaCustomer');
  const canManageCustomer360 = getPermission('ManageCsaCustomer');
  const canViewCustomerCarts = getPermission('ViewCustomerCarts');
  const canViewDashboard = getPermission('ViewCsaDashboard');
  const canManageCustomerCarts = getPermission('ManageCustomerCarts');
  const canViewCustomerOrders = getPermission('ViewCustomerOrders');
  const canManageCustomerOrders = getPermission('ManageCustomerOrders');
  const canViewProductSearch = getPermission('ViewProductSearch');

  console.log('canManageTickets', PERMISSIONS);
  console.log('canManageCustomer', canViewCustomer360);
  console.log('canManageCustomerOrders', canManageCustomerOrders);

  /**
   * When using routes, there is a good chance that you might want to
   * restrict the access to a certain route based on the user permissions.
   * You can evaluate user permissions using the `useIsAuthorized` hook.
   * For more information see https://docs.commercetools.com/custom-applications/development/permissions
   *
   * NOTE that by default the Custom Application implicitly checks for a "View" permission,
   * otherwise it won't render. Therefore, checking for "View" permissions here
   * is redundant and not strictly necessary.
   */

  return (
    <Spacings.Inset scale="l">
      <Switch>
        <Route path={`${match.path}/Tickets`}>
          {canViewTickets ? (
            <Tickets linkToWelcome={match.url} />
          ) : (
            <PageUnauthorized />
          )}
        </Route>

        <Route path={`${match.path}/ticket-create`}>
          {canManageTickets ? (
            <TicketCreate linkToWelcome={match.url} />
          ) : (
            <PageUnauthorized />
          )}
        </Route>
        <Route path={`${match.path}/Customers`}>
          {canViewCustomer360 ? (
            <Customers linkToWelcome={match.url} />
          ) : (
            <PageUnauthorized />
          )}
        </Route>
        <Route path={`${match.path}/Products`}>
          {canViewProductSearch ? (
            <ProductAccount linkToWelcome={match.url} />
          ) : (
            <PageUnauthorized />
          )}
        </Route>
        <Route path={`${match.path}/product-details/:id`}>
          {canViewProductSearch ? (
            <ProductDetails linkToWelcome={match.url} />
          ) : (
            <PageUnauthorized />
          )}
        </Route>
        <Route path={`${match.path}/product-enquiry/:id`}>
          {canViewProductSearch ? (
            <ProductStock linkToWelcome={match.url} />
          ) : (
            <PageUnauthorized />
          )}
        </Route>
        <Route path={`${match.path}/Orders`}>
          {canViewCustomerOrders ? (
            <Orders linkToWelcome={match.url} />
          ) : (
            <PageUnauthorized />
          )}
        </Route>
        <Route path={`${match.path}/Cart`}>
          {canViewCustomerCarts ? (
            <Cart linkToWelcome={match.url} />
          ) : (
            <PageUnauthorized />
          )}
        </Route>
        <Route path={`${match.path}/order-edit/:id`}>
          {canManageCustomerOrders ? (
            <OrderAccount linkToWelcome={match.url} />
          ) : (
            <PageUnauthorized />
          )}
        </Route>

        <Route path={`${match.path}/cart-edit/:id`}>
          {canManageCustomerCarts ? (
            <CartAccount linkToWelcome={match.url} />
          ) : (
            <PageUnauthorized />
          )}
        </Route>
        <Route path={`${match.path}/customer-edit/:lahari`}>
          <CustomerAccount linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/ticket-edit/:id`}>
          {canManageTickets ? (
            <TicketAccount linkToWelcome={match.url} />
          ) : (
            <PageUnauthorized />
          )}
        </Route>
        <Route path={`${match.path}/customer-create`}>
          <CustomerCreate linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/customer-account/:id`}>
          <CustomerAccount linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/:id/customer-order-messages`}>
          <CustomerMessages linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/:id/customer-message-reply`}>
          <CustomerReply linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/ATG`}>
          <AtgAccount linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/dashboard`}>
          <DashboardDisplay linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/feedback`}>
          <FeedbackSetup linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/Knowledgebase`}>
          <KnowledgebaseAccount linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/`}>
          <DashboardDisplay linkToWelcome={match.url} />
        </Route>
      </Switch>
    </Spacings.Inset>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
