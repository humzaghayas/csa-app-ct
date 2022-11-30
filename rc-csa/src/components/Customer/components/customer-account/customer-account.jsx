import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
  useHistory,
  useParams
} from 'react-router-dom';
import {
  TabularModalPage,
  useModalState,
  TabHeader,
  TabularMainPage,
  TabularDetailPage,
} from '@commercetools-frontend/application-components';
import PropTypes from 'prop-types';
// import CustomerDetails from '../Customer-details/Customer-details';
// import CustomerRules from '../Customer-rules/Customer-rules';

import Spacings from '@commercetools-uikit/spacings';
import { Fragment } from 'react';
import styles from './customer-account-module.css';
import Avatar from '@commercetools-uikit/avatar';
// import RequiredApproval from '../required-approval';
// import AddBudget from '../add-budget';
// import AddNewRule from '../add-new-rule';
// import EmployeeCreate from '../../../employees/components/employee-create';
// import CustomerEmployees from '../Customer-employees/Customer-employees';
// import { getCustomer } from '../../api';
import { lazy, useState, useEffect } from 'react';
import CustomerCreateForm from '../customer-create/customer-create-form';
import CustomerCreate from '../customer-create/customer-create';
import CustomerPassword from '../customer-password/customer-password';
import CustomerProfile from '../customer-profile';
import CustomerOrder from '../customer-orders/customer-order';
import CustomerAddress from '../customer-address/customer-address'
import Text from '@commercetools-uikit/text';
import NoImageIcon from '@commercetools-frontend/assets/images/camera.svg';
import CustomerTickets from '../customer-Tickets/customer-tickets';

import { useCustomerDetailsFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
import CustomerPayment from '../customer-payment/customer-payment';


const CustomerAccount = (props) => {
  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();
  const { push } = useHistory();
 // const [Customer, setData] = useState();

  const {customer, error, loading } = useCustomerDetailsFetcher(params.id);

   console.log("customer",customer);
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
 
         {/* <div className={styles.customerName}> */}
         <Spacings.Stack scale="xs">
         <Spacings.Stack scale="xl">
        </Spacings.Stack>
                    <h1>{customer?.firstName} 360° view</h1>
           <h4>{customer?.email}</h4>
         {/* <Text.Subheadline as="h2" isBold="true">{customer?.firstName} 360 view</Text.Subheadline>;
         <Text.Subheadline as="h3" isBold="true">{customer?.email}</Text.Subheadline>; */}
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
                to={`${match.url}/Customers-orders`}
                label="Orders"
              />
               <TabHeader
                to={`${match.url}/Customers-payments`}
                label="Payments"
              />
               <TabHeader
                to={`${match.url}/Customers-Address`}
                label="Addresses"
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
           <CustomerOrder />
        </Route>
        <Route path={`${match.path}/Customers-password`}>
           <CustomerPassword />
        </Route>
        <Route path={`${match.path}/Customers-Address`}>
          <CustomerAddress />
        </Route>
        <Route path={`${match.path}/Customers-sumary`}>
           <CustomerPassword />
        </Route>
        <Route path={`${match.path}/Customers-tickets`}>
          <CustomerTickets />
        </Route>
        <Route path={`${match.path}/Customers-payments`}>
          <CustomerPayment />
        </Route>
        <Route path={`${match.path}/Customers-sumary`}>
           <CustomerPassword />
        </Route>
        <Route path={`${match.path}/Customers-sumary`}>
           <CustomerPassword />
        </Route>
        
        {/* <Route path={`${match.path}/Customer-administration`}>
        <CustomerCreateForm />
        </Route> */}
        {/* <Route path={`${match.path}/employee-create`}>
           <EmployeeCreate />
          </Route>
        <Route path={`${match.path}/required-approval`}>
           <RequiredApproval/>
          </Route> */}
          

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
