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
// import OrderDetails from '../Order-details/Order-details';
// import OrderRules from '../Order-rules/Order-rules';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { PlusBoldIcon, ExportIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import { lazy, useState, useEffect } from 'react';
import CartView from '../cart-view/cart-view';
import ShippingAddress from '../create-order/add-shipping-address';
import PlaceOrder from '../place-order/place-order ';
import OrderCreate from '../../../Orders/components/order-create/order-create';

const CartAccount = (props) => {
  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();
  const { push } = useHistory();
  const [carts, setData] = useState();

  //const apiUrl ="http://localhost:4456";
  const apiUrl = 'https://ms-Order-f4b4o225iq-ue.a.run.app';
  const OrderId = params.id;
  // const cartNumber = params.id;
  // useEffect(() => {
  //   getOrder({ url: apiUrl, id: OrderId }).then((res) => setData(res));
  // }, [apiUrl, OrderId]);

  return (
    <TabularDetailPage
      title=" "
      //  onPreviousPathClick={() => history.push(`Order-list`)}
      onPreviousPathClick={() =>
        history.push(`/csa-project-2/csa-customer-tickets/Cart`)
      }
      previousPathLabel="Go to View cart"
      tabControls={
        <>
          <Spacings.Stack scale="xl">
            <Spacings.Inline>
              <TabHeader to={`${match.url}/cart-general`} label="General" />
              {/* <TabHeader
                to={`${match.url}/orders-shipping`}
                label="Shipping & Delivery"
              /> */}
            </Spacings.Inline>
          </Spacings.Stack>
        </>
      }
    >
      <Switch>
        <Route path={`${match.path}/cart-general`}>
          <CartView />
        </Route>
        <Route path={`${match.path}/place-order`}>
          <PlaceOrder />
        </Route>
        {/* <Route path={`${match.path}/cart-line-items`}>
          <CartLineItems onClose={() => push(`${match.url}`)} />
        </Route> */}
        <Route path={`${match.path}/shipping-address`}>
          <ShippingAddress />
        </Route>
        <Route path={`${match.path}/orders-general`}>
          <OrderCreate />
        </Route>
      </Switch>
    </TabularDetailPage>
  );
};
CartAccount.displayName = 'Companies';
CartAccount.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
  
};
export default CartAccount;
