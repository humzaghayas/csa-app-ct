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
import { useGetActiveCartByCustomer ,useGetOrdersByCustomer} from '../../../../hooks/use-cart-connector';


const CustomerAccount = (props) => {
  const match = useRouteMatch();
  const history = useHistory();
  const params = useParams();
  const { customer, error, loading } = useCustomerDetailsFetcher(params.id);
  const [ticket, setTicket] = useState(null);
  const [customerSummary, setCustomerSummary] = useState({
    ticketsCount:0,
    activeCartCount:0,
    orderCount:0,
    salesCount:0
  });

  const{execute} = useGetTicketByCustomerEmail();
  const{execute:executeCartService} = useGetActiveCartByCustomer();
  const{execute:executeOrderService} = useGetOrdersByCustomer();

  useEffect(async() => {
    console.log('ticket 12121');
      const d = await execute(customer?.email);
      const c = await executeCartService(params.id);
      const o = await executeOrderService(params.id
            ,"\""+CONSTANTS.OPEN_STATUS+"\"");
      const s = await executeOrderService(params.id
              ,"\""+CONSTANTS.CONFIRMED_STATUS+"\"");
      setTicket(d?.data);
      
      setCustomerSummary({ticketsCount :d?.data?.customObjects?.total,
          activeCartCount:c?.data?.carts?.total,
          orderCount:o.data?.orders?.total,
          salesCount:s.data?.orders?.total
        } )
      console.log('ticket',d?.data);
      console.log('cart: ',c);
  }, [customer?.email,customer?.id]);


  return (
    <TabularDetailPage
     title=" "
         onPreviousPathClick={() => history.push(`/csa_project/csa-customer-tickets/Customers`)}
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
              <TabHeader to={`${match.url}/Customers-summary`} label="Summary"  />
              <TabHeader to={`${match.url}/Customers-profile`} label="Profile" />
              <TabHeader to={`${match.url}/Customers-Address`} label="Addresses" />
               <TabHeader to={`${match.url}/Customers-orders`} label="Orders" />
               <TabHeader to={`${match.url}/Customers-payments`} label="Payments"/>
               <TabHeader to={`${match.url}/Customers-returns`}label="Returns"/>
              <TabHeader to={`${match.url}/Customers-tickets`} label="Tickets" />
              <TabHeader to={`${match.url}/Customers-password`} label="Password" />
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
        <Route path={`${match.path}/Customers-orders`}>
          <CustomerOrder customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-returns`}>
          <CustomerReturn customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-password`}>
           <CustomerPassword />
        </Route>
        <Route path={`${match.path}/Customers-Address`}>
          <CustomerList customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-sumary`}>
          <CustomerPassword />
        </Route>
        <Route path={`${match.path}/Customers-tickets`}>
          <CustomerTickets customer={customer} ticket={ticket}/>
        </Route>
        <Route  path={`${match.path}/customer-address-create`}>
           <CustomerAddressCreate customer={customer} />
           </Route>
        <Route path={`${match.path}/Customers-payments`}>
          <CustomerPayment />
        </Route>
        <Route path={`${match.path}/Customers-sumary`}>
           <CustomerPassword />
        </Route>
      </Switch>
    </TabularDetailPage>
  );
};
CustomerAccount.displayName = 'Companies';
CustomerAccount.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default CustomerAccount;
