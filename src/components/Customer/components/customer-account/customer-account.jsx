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

const CustomerAccount = (props) => {
  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();
  const { push } = useHistory();
  const [Customer, setData] = useState();

  //const apiUrl ="http://localhost:4456";
  // const apiUrl = 'https://ms-Customer-f4b4o225iq-ue.a.run.app';
  // const CustomerId = params.id;
  // useEffect(() => {
  //   getCustomer({ url: apiUrl, id: CustomerId }).then((res) => setData(res));
  // }, [apiUrl, CustomerId]);

  return (
    <TabularDetailPage
      title="Detail page"
      //  onPreviousPathClick={() => history.push(`Customer-list`)}
      onPreviousPathClick={() => history.push(`${match.url}`)}
      previousPathLabel="Go to View Customers"
     
      tabControls={
        <>
        <Spacings.Stack scale="l">
          <Spacings.Inline>
        <div className={styles.companyLogoBackground}>
        <Fragment>
          {/* <React.Fragment> */}
          <img src={NoImageIcon} alt="logo" width={64} height={64} className={styles.LogoImage}/>
                           
                            </Fragment>
        {/* <img src={NoImageIcon} alt="logo" width={64} height={64} className={styles.customerImage}/> */}
        </div>
         <div className={styles.customerName}>
         {/* <Text size="big" color="primary">Description</Text> */}
         <h1>Lahari 360 view</h1>
           {/* <h3 className={styles.customerName}>Lahari</h3> */}
           <h4>lahari.r@royalcyber.com</h4>
           {/* <div className={styles.customerDetails}>
             <Spacings.Inline>
             <h4>10010781</h4>
             <h4>Software Engineer</h4>
             <h4>Digital Commerce</h4>
             </Spacings.Inline>
           </div> */}
         </div>
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
                to={`${match.url}/Customers-summay`}
                label="Payments"
              />
               <TabHeader
                to={`${match.url}/Customers-Address`}
                label="Addresses"
              />
              <TabHeader to={`${match.url}/Customers-tickets`} label="Tickets" />
              <TabHeader to={`${match.url}/Customers-sumary`} label="Reviews" />
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
         <CustomerCreate />
        </Route>
        <Route path={`${match.path}/Customers-profile`}>
          {/* <CustomerDetails /> */}
        <CustomerProfile />
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
        <Route path={`${match.path}/Customers-sumary`}>
           <CustomerPassword />
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
