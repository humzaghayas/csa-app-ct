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

import ProductDetails from '../product-details/product-details';
import Products from './product-list';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { entryPointUriPath } from '../../../../constants';
import messages from './messages';

const ProductsAccount = (props) => {
  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();
  const { push } = useHistory();
  const [Order, setData] = useState();
  const apiUrl = 'https://ms-Order-f4b4o225iq-ue.a.run.app';
  const orderId = params.id;
  

  const { projectKey } =useApplicationContext((context) => ({
    projectKey:context.project.key
  }));

  return (
    <TabularDetailPage
      title=" "
      //title={`${props.productName}`}
      onPreviousPathClick={() =>
        history.push(`/${projectKey}/${entryPointUriPath}/Products/productsList-general`)
      }
      previousPathLabel="Go to View ProductsList"
      tabControls={
        <>
          <Spacings.Stack scale="xl">
            
            <Spacings.Inline>
              <TabHeader
                to={`${match.url}/product-details`}
                label="General"
              />
               
            </Spacings.Inline>
          </Spacings.Stack>
        </>
      }
    >
      <Route path={`${match.path}/productsList-general`}>
          <Products />
        </Route>
      <Switch>
        <Route path={`${match.path}/product-details`}>
          <ProductDetails />
        </Route>
        
      </Switch>
    </TabularDetailPage>
  );
};
ProductsAccount.displayName = 'ProductsAccount';
ProductsAccount.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
  
};
export default ProductsAccount;
