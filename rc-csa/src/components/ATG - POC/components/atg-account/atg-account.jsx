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
import AtgLogin from '../atg-login/atg-login';
import AtgCategories from '../atg-categories/atg-categories';
import AtgCategory from '../atg-category/atg-category';
import AtgCustomer from '../atg-customer/atg-customer';
import { useEffect, useState } from 'react';
import { getById } from '../../api';
import AtgProducts from '../atg-products/atg-products';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
// import CustomerAddress from '../customer-address/customer-address';

const QUERY = {
  login: 'joe783',
  password: 'tempPassword',
};

const AtgAccount = (props) => {
  const atgPublicURL = useApplicationContext(
    (context) => context.environment.atgPublicURL
  );
  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();

  // console.log("params.id",params.id);
  const [data, setData] = useState();
  const apiUrl = `${atgPublicURL}/rest/model/atg/userprofiling/ProfileActor/login`;
  // 'http://192.168.16.201:8080/rest/model/atg/userprofiling/ProfileActor/login';
  useEffect(() => {
    getById({ url: apiUrl, payload: QUERY }).then((res) => setData(res));
  }, [apiUrl, QUERY]);

  // console.log('data', data);
  return (
    <TabularDetailPage
      title=" "
      onPreviousPathClick={() =>
        history.push(`/csa_project/csa-customer-tickets`)
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
              <TabHeader to={`${match.url}/atg-customer`} label="Customer" />
              {/* <TabHeader
                to={`${match.url}/Customers-Address`}
                label="Addresses"
              />
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
        <Route path={`${match.path}/atg-categories`}>
          <AtgCategories />
        </Route>
        <Route path={`${match.path}/:id/atg-category`}>
          <AtgCategory />
        </Route>
        <Route path={`${match.path}/:id/atg-products`}>
          <AtgProducts />
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
  onClose: PropTypes.func.isRequired,
};
export default AtgAccount;
