import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Spacings from '@commercetools-uikit/spacings';
import Channels from './components/channels';
import Tickets from './components/Ticket/components/Ticket-list/ticket-list';

import Welcome from './components/welcome';

import TicketDetails from './components/Ticket/components/ticket-details/ticket-details';
import TicketAccount from './components/Ticket/components/ticket-account/ticket-account';
import Customers from './components/Customer/components/customer-list/customer-list';
import CustomerAccount from './components/Customer/components/customer-account/customer-account';
import CustomerCreate from './components/Customer/components/customer-create/customer-create';
import Orders from './components/Orders/components/order-list/order-list';
import OrderAccount from './components/Orders/components/order-account/order-account';
import TicketCreate from './components/Ticket/components/ticket-create/ticket-create';
const ApplicationRoutes = () => {
  const match = useRouteMatch();

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
         <Tickets linkToWelcome={match.url} />
        </Route>
        
        <Route  path={`${match.path}/ticket-details`}>
            <TicketDetails linkToWelcome={match.url} />
        </Route>
        <Route  path={`${match.path}/ticket-create`}>
           <TicketCreate linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/Customers`}>
         <Customers linkToWelcome={match.url} />
        </Route>
        <Route path={`${match.path}/Orders`}>
      <Orders linkToWelcome={match.url} />
        </Route>
        <Route  path={`${match.path}/order-edit/:id`}>
      <OrderAccount linkToWelcome={match.url} />
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
       
        <Route>
          <Welcome />
        </Route>
      </Switch>
    </Spacings.Inset>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
