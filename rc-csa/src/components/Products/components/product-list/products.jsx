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
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { PlusBoldIcon, ExportIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';

import { lazy, useState, useEffect } from 'react';

import Products from './product-list';
import ProductListSearch from './product-list-search';

const ProductsList = (props) => {
  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();
  const { push } = useHistory();
  const [Order, setData] = useState();
  const apiUrl = 'https://ms-Order-f4b4o225iq-ue.a.run.app';
  const OrderId = params.id;

  return (
    <TabularDetailPage
      title=" "
      onPreviousPathClick={() =>
        history.push(`/csa-project-2/csa-customer-tickets/Products`)
      }
      previousPathLabel="Go to View ProductsList"
      tabControls={
        <>
          <Spacings.Stack scale="xl">
            <Spacings.Inline>
              <TabHeader
                to={`${match.url}/ProductsList-search`}
                label="Product Search"
              />
               <TabHeader
                to={`${match.url}/ProductsList-general`}
                label="Product List"
              />
            </Spacings.Inline>
          </Spacings.Stack>
        </>
      }
    >
      <Switch>
        <Route path={`${match.path}/ProductsList-general`}>
          <Products />
        </Route>
        <Route path={`${match.path}/ProductsList-search`}>
          <ProductListSearch />
        </Route>
      </Switch>
    </TabularDetailPage>
  );
};
ProductsList.displayName = 'Companies';
ProductsList.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
  
};
export default ProductsList;
