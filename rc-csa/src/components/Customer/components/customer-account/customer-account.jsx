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
import { Fragment } from 'react';
import styles from './customer-account-module.css';
import Avatar from '@commercetools-uikit/avatar';
import { lazy, useState, useEffect } from 'react';
import CustomerCreateForm from '../customer-create/customer-create-form';
import CustomerCreate from '../customer-create/customer-create';
import CustomerPassword from '../customer-password/customer-password';
import CustomerProfile from '../customer-profile';
import CustomerOrder from '../customer-orders/customer-order';
// import CustomerAddress from '../customer-address/customer-address';
import Text from '@commercetools-uikit/text';
import NoImageIcon from '@commercetools-frontend/assets/images/camera.svg';
import CustomerTickets from '../customer-Tickets/customer-tickets';
import CustomerList from '../customer-address/customer-address-list';
import { useCustomerDetailsFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';

import CustomerAddressCreate from '../customer-address/customer-address-create';
import CustomerPayment from '../customer-payment/customer-payment';



const CustomerAccount = (props) => {
  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();
  const { push } = useHistory();
  // const [Customer, setData] = useState();

  const { customer, error, loading } = useCustomerDetailsFetcher(params.id);

  console.log('customer', JSON.stringify(customer));
  // console.log("params.id",params.id);
  return (
    <TabularDetailPage
     title=" "
         onPreviousPathClick={() => history.push(`/csa_project/csa-customer-tickets/Customers`)}
      //  onPreviousPathClick={() => history.push(`${match.url}`)}
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


         {/* </div> */}
     
         </Spacings.Inline>
         </Spacings.Stack>
          <Spacings.Stack scale="xl">
            <Spacings.Inline>
              <TabHeader
                to={`${match.url}/Customers-summary`}
                label="Summary"
              />
              <TabHeader
                to={`${match.url}/Customers-profile`}
                label="Profile"
              />
              <TabHeader
                to={`${match.url}/Customers-Address`}
                label="Addresses"
              />
               <TabHeader
                to={`${match.url}/Customers-orders`}
                label="Orders"
              />
               <TabHeader
                to={`${match.url}/Customers-payments`}
                label="Payments"
              />

              <TabHeader to={`${match.url}/Customers-tickets`} label="Tickets" />
              {/* <TabHeader to={`${match.url}/Customers-sumary`} label="Returns" /> */}
              <TabHeader to={`${match.url}/Customers-password`} label="Password" />
              {/* <div style="margin-left :500px"> */}
           
              {/* </div> */}
              {/* <TabHeader
                to={`${match.url}/Customer-administration`}
                label="Administration"
              /> */}
               {/* <div className={styles.addEmployeeButton}>
       <SecondaryButton
            label="Add Employee"
            data-track-event="click"
            iconLeft={<PlusBoldIcon />}
            // onClick={() => push(`employee-create`)}
            size="medium"
          
          />
          </div> */}
            </Spacings.Inline>
          </Spacings.Stack>
        </>
      }
    >
      <Switch>
        <Route path={`${match.path}/Customers-summary`}>
          {/* <CustomerDetails /> */}
          <CustomerCreate customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-profile`}>
          {/* <CustomerDetails /> */}
          <CustomerProfile customer={customer} />
        </Route>
        <Route path={`${match.path}/Customers-orders`}>
          <CustomerOrder customer={customer} />
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
          <CustomerTickets />
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
