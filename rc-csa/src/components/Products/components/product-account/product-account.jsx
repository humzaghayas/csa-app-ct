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
import { entryPointUriPath } from '../../../../constants';
import { lazy, useState, useEffect } from 'react';

import Products from '../product-list/product-list';
import ProductListSearch from '../product-list/product-list-search';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

const ProductAccount = (props) => {
  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();
  const { push } = useHistory();
  const [Order, setData] = useState();
  const apiUrl = 'https://ms-Order-f4b4o225iq-ue.a.run.app';
  const OrderId = params.id;

  const { projectKey } = useApplicationContext((context) => ({
    projectKey: context.project.key,
  }));

  return (
    <TabularDetailPage
      title=" "
      onPreviousPathClick={() =>
        history.push(`/${projectKey}/${entryPointUriPath}`)
      }
      previousPathLabel="Back to Welcome page"
      tabControls={
        <>
          <Spacings.Stack scale="xl">
            <Spacings.Inline>

              <TabHeader
                to={`${match.url}/productsList-search`}
                label="Product Search"
              />
              <TabHeader
                to={`${match.url}/productsList-general`}
                label="Product List"
              />

            </Spacings.Inline>
          </Spacings.Stack>
        </>
      }
    >
      <Switch>
        <Route path={`${match.path}/productsList-general`}>
          <Products linkToWelcome="" />
        </Route>
        <Route path={`${match.path}/productsList-search`}>
          <ProductListSearch />
        </Route>
      </Switch>
    </TabularDetailPage>
  );
};
ProductAccount.displayName = 'ProductAccount';
// ProductAccount.propTypes = {
//   linkToWelcome: PropTypes.string.isRequired,
// };
export default ProductAccount;
