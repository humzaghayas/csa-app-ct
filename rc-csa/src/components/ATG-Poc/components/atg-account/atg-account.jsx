import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useParams,
} from 'react-router-dom';
import {
  useModalState,
  TabHeader,
  TabularDetailPage,
} from '@commercetools-frontend/application-components';
import PropTypes from 'prop-types';

import Spacings from '@commercetools-uikit/spacings';
import Avatar from '@commercetools-uikit/avatar';
import AtgCategories from '../atg-categories/atg-categories';
import AtgCategory from '../atg-category/atg-category';
import AtgCustomer from '../atg-customer/atg-customer';
import AtgProducts from '../atg-products/atg-products';
import { useAsyncDispatch } from '@commercetools-frontend/sdk';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import AtgOrders from '../atg-orders/atg-orders';
import AtgOrderLogin from '../atg-orderByLogin/atg-orderLogin';
import { useLoginAtg } from '../../../../hooks/use-atg-conector';
import { useEffect, useState } from 'react';
import AtgCustomerDetail from '../atg-customer-detail/atg-customer-detail';
import AtgOrderDetail from '../atg-order-detail/atg-order-detail';
import { entryPointUriPath } from '../../../../constants';
// import CustomerAddress from '../customer-address/customer-address';

const LoginCred = {
  login: 'joesph834',
  password: 'tempPassword',
};

const AtgAccount = (props) => {

  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();
  const [data, setData] = useState(null);

  const { projectKey } =useApplicationContext((context) => ({
    projectKey:context.project.key
  }));


  return (
    <TabularDetailPage
      title=" "
      onPreviousPathClick={() =>
        history.push(`/${projectKey}//${entryPointUriPath}`)
      }
      previousPathLabel="Back to Welcome page"
      tabControls={
        <>
          <Spacings.Stack scale="xxl">
            <Spacings.Inline>
              <Avatar
                gravatarHash="20c9c1b252b46ab49d6f7a4cee9c3e68"
                firstName="R"
                lastName="C"
                size="l"
              />

              <Spacings.Stack scale="xs">
                <Spacings.Stack scale="xl"></Spacings.Stack>
                <h1> ATG Motorprise</h1>
                <h4>Browse Motorprise Catalog</h4>
              </Spacings.Stack>

              {/* </div> */}
            </Spacings.Inline>
          </Spacings.Stack>
          <Spacings.Stack scale="xl">
            <Spacings.Inline>
              {/* <TabHeader to={`${match.url}/atg-login`} label="Login" /> */}
              <TabHeader
                to={`${match.url}/atg-categories`}
                label="Categories"
              />
              <TabHeader
                onClick={() => history.push(`/atg-customer`)}
                to={`${match.url}/atg-customer`}
                label="Customer"
              />
              {/* <TabHeader to={`${match.url}/atg-orders`} label="Orders" /> */}

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
        <Route path={`${match.path}/atg-customer`}>
          <AtgCustomer />
        </Route>
        <Route path={`${match.path}/:id/atg-customer-detail`}>
          <AtgCustomerDetail />
        </Route>
        <Route path={`${match.path}/:customerId/:id/atg-order-detail`}>
          <AtgOrderDetail />
        </Route>
        <Route path={`${match.path}/atg-categories`}>
          <AtgCategories />
        </Route>
        <Route path={`${match.path}/:id/atg-category`}>
          <AtgCategory />
        </Route>
        <Route path={`${match.path}/:id/atg-products`}>
          <AtgProducts />
        </Route>
        <Route path={`${match.path}/atg-orders`}>
          <AtgOrders />
        </Route>
        <Route path={`${match.path}/:id/atg-orderLogin`}>
          <AtgOrderLogin />
        </Route>
        {/* <Route path={`${match.path}/Customers-password`}>
          <CustomerPassword />
        </Route> */}
      </Switch>
    </TabularDetailPage>
  );
};
AtgAccount.displayName = 'AtgAccount';
AtgAccount.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
  
};
export default AtgAccount;
