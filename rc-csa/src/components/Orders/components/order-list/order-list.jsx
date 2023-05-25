import PropTypes from 'prop-types';
import { lazy, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import { BackIcon, CopyIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable from '@commercetools-uikit/data-table';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import {
  formatLocalizedString,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import messages from './messages';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { useOrderSearch, useOrdersFetcher, useReplicateOrderById } from '../../../../hooks/use-orders-connector/use-orders-connector';

import './order-list-module.css';
import OrderAccount from '../order-account/order-account';
import { getOrderRows } from './rows';
import { IconButton, TextField } from '@commercetools-frontend/ui-kit';
import { useCallback } from 'react';
import SelectableSearchInput from '@commercetools-uikit/selectable-search-input';
import { getOrderIds, orderSearchOptions, queryBuilderHelper } from './helper';
import DataTableManagerCustom from '../../../Common/data-table-custom-component';


let columns = [
  { key: 'orderNumber', label: 'Order Number', isSortable:true, mapping:'orderNumber' },
  { key: 'customer', label: 'Customer' },
  { key: 'totalPrice', label: 'Order Total'},
  { key: 'noOforderItems', label: 'No.of order Items'},
  { key: 'totalItems', label: 'Total Items'},
  { key: 'orderState', label: 'Order Status', isSortable:true },
  { key: 'shipmentStatus', label: 'Shipment Status' },
  { key: 'paymentStatus', label: 'Payment Status' },
  { key: 'createdAt', label: 'Created', isSortable:true },
  { key: 'lastModifiedAt', label: 'Modified',isSortable:true },
  { key: 'duplicate', label: 'Duplicate', shouldIgnoreRowClick: true }
];





const Orders = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const { executeReplicateOrder } = useReplicateOrderById();
  const { page, perPage } = usePaginationState();
  const tableSorting = { key: 'id', order: 'asc' };
  const { ordersPaginatedResult, error, loading ,refetch} = useOrdersFetcher({
    page,
    perPage,
    tableSorting,
  });

  const {executeOrderSearch} = useOrderSearch();

  const [dropdownValue, setDropdownValue] = useState("all");
  const [textInputValue, setTextInputValue] = useState();
  const [orders, setOrders] = useState();

  useEffect(
    ()=>{
      console.log("Set orders")
      if(!orders){
        setOrders(getOrderRows(ordersPaginatedResult));
      }
    }
  );
  
  const value = {
      text: textInputValue,
      option: dropdownValue,
  };
  
  const onSearchButtonReset = useCallback(
    async () =>{
      setOrders(getOrderRows(ordersPaginatedResult))
    }
  )
  const onSubmitOrdersSerach = useCallback(
    async (val) =>{

      const payload = {
        query:queryBuilderHelper(value.option,value.text),
        sort:[
          {
            "field":"createdAt",
            "order":"asc"
          }
        ],
        limit: perPage.value,
        offset: (page.value-1)*perPage.value,
      }

      console.log(JSON.stringify(payload));

      try{
        const searchResults =  await executeOrderSearch(payload);
        const orderHits = searchResults?.hits;
        const orderIds = getOrderIds(orderHits);
        setOrders(orders?.filter(order=>orderIds?.includes(order?.id)))
        console.log(orderIds); 
      }catch(e){
        console.log(e?.message)
      }      
    },
    [executeOrderSearch]
  );
  

  const onClickDuplicateButton = useCallback(
    async (e) => {

      console.log(e, "Duplicate")
      const reference = {
        typeId: "order",
        id: e?.orderId
      }
      const result = await executeReplicateOrder(reference);
      const cartId = await result?.data?.replicateCart?.id;
      console.log(result);
      if (cartId) {
        push(`cart-edit/${cartId}/cart-general`)
      }
    });

  const itemRenderer = (item, column) => {
    switch (column.key) {
      case 'duplicate':
        return <div>
          <Spacings.Stack scale='s'>
            <Spacings.Inline>
              <IconButton
                icon={<CopyIcon />}
                onClick={(e) => {
                  e.orderId = item.id
                  onClickDuplicateButton(e)
                }
                }
                label='Copy Order'
              />
            </Spacings.Inline>
          </Spacings.Stack>
        </div>
      default:
        return item[column.key];
    }
  }

  console.log("Orders List : ",orders);

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
        <FlatButton
          as={RouterLink}
          to={props.linkToWelcome}
          label={intl.formatMessage(messages.backToWelcome)}
          icon={<BackIcon />}
        />
        <Text.Headline as="h2" intlMessage={messages.title} />
        {/* order search */}
        <SelectableSearchInput
          value={value}
          placeholder='Search by e.g. customer email address, first name, last name, order number, sku, store, city etc.'
          onChange={(event) => {
            if (event.target.id.endsWith('.textInput')) {
              setTextInputValue(event.target.value);
            }
            if (event.target.id.endsWith('.dropdown')) {
              setDropdownValue(event.target.value);
            }
          }}
          onSubmit={onSubmitOrdersSerach}
          onReset={onSearchButtonReset}
          horizontalConstraint={13}
          options={orderSearchOptions}
        />

      </Spacings.Stack>
      {orders?.length>0 ? (
        <Spacings.Stack scale="l">

          <DataTableManagerCustom
            columns={columns}
            rows={orders}
            itemRenderer={itemRenderer}
            onRowClick={(row) => {push(`order-edit/${row.id}/orders-general`)}}
            onSortChange={ async (columnKey,sortDirection)=>{

              let ind = columns.findIndex(c => c.key ==columnKey );

              console.log('ind',ind);
              console.log('ind',columns);
              if(!columns[ind].sortDir || columns[ind].sortDir == 'desc'){
                columns[ind].sortDir = 'asc'
              }else{
                columns[ind].sortDir = 'desc'
              }

              await refetch(
                  {
                    limit: perPage.value,
                    offset: (page.value-1)*perPage.value,
                    where:'version>0',
                    sort: [`${columnKey} ${columns[ind].sortDir}`],
                  });
                  setOrders(getOrderRows(ordersPaginatedResult));
            }
          }
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={ordersPaginatedResult?.total}
          />
          <Switch>
            <SuspendedRoute path={`${match.path}/:id`}>
              <OrderAccount onClose={() => push(`${match.url}`)} />
            </SuspendedRoute>
          </Switch>
        </Spacings.Stack>
      ) : 
        <Spacings.Stack scale='l'>
          <Text.Subheadline tone='secondary' as='h3' isBold={true}>{'There are no orders that match your search query.'}</Text.Subheadline>
          <Text.Body as='h3'>{'Suggestions:'} </Text.Body>
          <Text.Body as='h3'>{'    Check the spelling.'} </Text.Body>
          <Text.Body as='h3'>{'    Make sure that the values are correct.'} </Text.Body>
        </Spacings.Stack>
        }
    </Spacings.Stack>
  );
};
Orders.displayName = 'Orders';
Orders.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Orders;
