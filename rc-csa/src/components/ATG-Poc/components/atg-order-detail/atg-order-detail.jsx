import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Spacings from '@commercetools-uikit/spacings';
import { useEffect, useState } from 'react';
import Text from '@commercetools-uikit/text';
import { useGetAtgOrdersDetails } from '../../../../hooks/use-atg-conector';

const AtgOrderDetail = (props) => {

  const [isCustomerFetched, setIsCustomerFetched] = useState(false);
  const [order, setOrder] = useState(null);
  const {execute} = useGetAtgOrdersDetails();

  const match = useRouteMatch();

  useEffect(async () => {

    if(!isCustomerFetched){
      const headers = {
        'Content-Type': 'application/json',
      }
      const order = await execute(match.params.id);
      setOrder(order);
      console.log('order',order);
      setIsCustomerFetched(true);

      console.log('humza');
    }
  },[]);

  return (
    <div>
      {order?      (
        <Spacings.Stack scale="l">
        <Spacings.Stack scale="s">
          <Text.Headline as="h2">Order ID</Text.Headline>
          <Text.Body>{order?.orderId}</Text.Body>
          <Text.Headline as="h2">Profile ID</Text.Headline>
          <Text.Body>{order?.profileId}</Text.Body>
          <Text.Headline as="h2">State</Text.Headline>
          <Text.Body>{order?.stateAsString}</Text.Body>
            <Spacings.Stack scale="xs">
              <Text.Headline as="h2">Products</Text.Headline>
              <div>
                {order?.products ?
                  <>
                    <Text.Headline as="h3">Products</Text.Headline>

                    {order.products.map((value, index) => {
                      return <div key={index}>{value.productId}</div>
                      })
                    }
                    </>:"No Products"
                } 
              </div>
            </Spacings.Stack>
            <Spacings.Stack scale="xs">
                <Text.Headline as="h2">Price Info</Text.Headline>
                <Spacings.Inline alignItems="flex-end">
                  <div>
                  <Text.Headline as="h4">Amount:</Text.Headline>
                    <Text.Body>
                      {order?.priceInfo?.amount}&nbsp;
                      {order?.priceInfo?.currencyCode}
                    </Text.Body>
                  </div>
                </Spacings.Inline>
            </Spacings.Stack>
            <Spacings.Stack scale="xs">
                <Text.Headline as="h2">Tax Price Info</Text.Headline>
                <Spacings.Inline alignItems="flex-end">
                  
                  <Text.Headline as="h4">Amount:</Text.Headline> 
                  <Text.Body>
                    {order?.taxPriceInfo?.amount}&nbsp;
                    {order?.taxPriceInfo?.currencyCode}
                  </Text.Body>
                </Spacings.Inline>
            </Spacings.Stack>               
        </Spacings.Stack>
      </Spacings.Stack>) : "Loading ..."
    }
    </div>
  );
};
AtgOrderDetail.displayName = 'AtgOrderDetail';
AtgOrderDetail.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default AtgOrderDetail;
