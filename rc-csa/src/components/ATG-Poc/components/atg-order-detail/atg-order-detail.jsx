import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Spacings from '@commercetools-uikit/spacings';
import { useEffect, useState } from 'react';
import Text from '@commercetools-uikit/text';
import { useGetAtgOrdersDetails } from '../../../../hooks/use-atg-conector';
import { DataTable } from '@commercetools-frontend/ui-kit';

const AtgOrderDetail = (props) => {

  const [isCustomerFetched, setIsCustomerFetched] = useState(false);
  const [order, setOrder] = useState(null);
  const [rows, setRows] = useState([{productId:"Loading..."}]);
  const {execute} = useGetAtgOrdersDetails();

  const match = useRouteMatch();

  useEffect(async () => {

    if(!isCustomerFetched){
      const headers = {
        'Content-Type': 'application/json',
      }
      const order = await execute(match.params.id);
      setOrder(order);


      const r = order?.order?.commerceItems?.map(c =>{
        return {
          productId:c.id,
          productDisplayName:c.productDisplayName,
          quantity:c.quantity,
          price:`${c.priceInfo.amount} - ${c.priceInfo.currencyCode}`
        }
      });
      setRows(r);
      console.log('order',order);
      setIsCustomerFetched(true);

      console.log('humza');
    }
  },[]);

  const columns = [
    { key: 'productId', label: 'Product Id' },
    { key: 'productDisplayName', label: 'Product Name' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'price', label: 'Price' }
  ];

  return (
    <div>
      {order?.isOrder ?(
        <Spacings.Stack scale="l">
        <Spacings.Stack scale="s">
          <Text.Headline as="h2">Order ID</Text.Headline>
          <Text.Body>{order?.order?.id}</Text.Body>
              <Spacings.Stack scale="xs">
 
              <div>
                {order?.order?.commerceItems ?
                  <>
                  <Text.Headline as="h2">Products</Text.Headline>
                    <Spacings.Stack scale="l">
                      <DataTable
                        isCondensed
                        columns={columns}
                        rows={rows}
                        maxHeight={600}
                      />
                    </Spacings.Stack>
   
                  </>:"No Products"
                } 
              </div>
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
