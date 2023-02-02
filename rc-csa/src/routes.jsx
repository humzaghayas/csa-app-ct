import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Spacings from '@commercetools-uikit/spacings';
import Channels from './components/channels';
import Tickets from './components/Ticket/components/Ticket-list/ticket-list';

import Welcome from './components/welcome';

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

const ApplicationRoutes = () => {
  const match = useRouteMatch();

  const canManageTickets = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });

  const canViewTickets = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.View],
  });
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
        <Route path={`${match.path}/channels`}>
          <Channels linkToWelcome={match.url} />
        </Route>
       
        <Route path={`${match.path}/Tickets`}>
          {canViewTickets ? (
            <Tickets linkToWelcome={match.url} />
          ):(
            <PageUnauthorized />
          )}
         
        </Route>
        
        {/* <Route  path={`${match.path}/ticket-details`}>
            {canManageTickets ? (
              <TicketDetails linkToWelcome={match.url} />
            ):(
              <PageUnauthorized />
            )}
        </Route> */}
        <Route  path={`${match.path}/ticket-create`}>
           {canManageTickets ? (
              <TicketCreate linkToWelcome={match.url} />
            ):(
              <PageUnauthorized />
            )}
        </Route>
        <Route path={`${match.path}/Customers`}>
         <Customers linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/Orders`}>
      <Orders linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/Cart`}>
      <Cart linkToWelcome={match.url} />
        </Route>
        <Route  path={`${match.path}/order-edit/:id`}>
      <OrderAccount linkToWelcome={match.url} />
        </Route>
        <Route  path={`${match.path}/cart-edit/:id`}>
      <CartAccount linkToWelcome={match.url} />
        </Route>
        <Route  path={`${match.path}/customer-edit/:lahari`}>
        <CustomerAccount  linkToWelcome={match.url} />
        </Route>
        <Route  path={`${match.path}/ticket-edit/:id`}>
        <TicketAccount linkToWelcome={match.url} />
        </Route>
        <Route  path={`${match.path}/customer-create`}>
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
        <Route>
          <Welcome />
        </Route>
      </Switch>
    </Spacings.Inset>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
