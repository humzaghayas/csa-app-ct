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
// import OrderDetails from '../Order-details/Order-details';
// import OrderRules from '../Order-rules/Order-rules';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { PlusBoldIcon, ExportIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';

import styles from './Order-account-module.css';
// import RequiredApproval from '../required-approval';
// import AddBudget from '../add-budget';
// import AddNewRule from '../add-new-rule';
// import EmployeeCreate from '../../../employees/components/employee-create';
// import OrderEmployees from '../Order-employees/Order-employees';
// import { getOrder } from '../../api';
import { lazy, useState, useEffect } from 'react';

import OrderCreate from '../order-create/order-create';
import OrderShipping from '../order-shipping/order-shipping';


const OrderAccount = (props) => {
  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();
  const { push } = useHistory();
  const [Order, setData] = useState();

  //const apiUrl ="http://localhost:4456";
  const apiUrl = 'https://ms-Order-f4b4o225iq-ue.a.run.app';
  const OrderId = params.id;
  // useEffect(() => {
  //   getOrder({ url: apiUrl, id: OrderId }).then((res) => setData(res));
  // }, [apiUrl, OrderId]);

  return (
    <TabularDetailPage
      title=" "
      //  onPreviousPathClick={() => history.push(`Order-list`)}
      onPreviousPathClick={() => history.push(`/csa-project-2/csa-customer-tickets/Orders`)}
      previousPathLabel="Go to View orders"
      tabControls={
        <>
          <Spacings.Stack scale="xl">
            <Spacings.Inline>
              <TabHeader
                to={`${match.url}/orders-general`}
                label="General"
              />
            <TabHeader
                to={`${match.url}/orders-shipping`}
                label="Shipping & Delivery"
              />
            </Spacings.Inline>
          </Spacings.Stack>
        </>
      }
    >
      <Switch>
        <Route path={`${match.path}/orders-general`}>
        
         <OrderCreate />
        </Route>
        <Route path={`${match.path}/orders-shipping`}>
        
      <OrderShipping />
       </Route>
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
OrderAccount.displayName = 'Companies';
OrderAccount.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default OrderAccount;
