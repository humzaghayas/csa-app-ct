import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { Pagination } from '@commercetools-uikit/pagination';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import DataTable from '@commercetools-uikit/data-table';
import ToggleInput from '@commercetools-uikit/toggle-input';
// import {
//   useCustomerDetailsCreator,
// } from '../../../../hooks/use-Customer-connector/use-Customere-graphql-connector';

import Spacings from '@commercetools-uikit/spacings';
import { MailIcon } from '@commercetools-uikit/icons';

import { useCustomersOrdersFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
import { docToFormValues, getOrdersReturnInfo } from './conversions';

const CustomerReturn = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const params = useParams();

  const OrderId = params.id;

  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState('createdAt desc');
  const customerId = props.customer?.id;

  const { customersOrderPaginatedResult, error, loading } = useCustomersOrdersFetcher({
    page,
    perPage,
    tableSorting,
    customerId,
  });

  // console.log("customersOrderPaginatedResult",JSON.stringify(customersOrderPaginatedResult));
  console.log("orders with return info",getOrdersReturnInfo(customersOrderPaginatedResult?.results));
  const columns = [
    { key: 'orderNumber', label: 'Order Number' },
    { key: 'customerEmail', label: 'Email' },
    { key: 'createdAt', label: 'Date Created' },
    { key: 'shipmentState', label: 'Delivery Mode' },
    { key: 'orderState', label: 'Status' },
    { key: 'returnInfo', label:""}
  ];

  const columnsReturns = [
    { key: 'returnTrackingId', label: 'Return Tracking Id' },
    { key: 'returnDate', label: 'Return Date' },
    { key: 'lineItemsCount', label:'Items count'}
  ];
  
  const itemRenderer = (item, column) => {
    switch (column.key) {
      case 'orderNumber':
        return item.orderNumber;
      case 'customerEmail':
        return item.customerEmail;
      case 'createdAt':
        return item.createdAt;
      case 'shipmentState':
        return "Standard Delivery";
      case 'orderState':
       return item.orderState;
      case 'returnInfo':
        return <DataTable
            columns={columnsReturns}
            rows={item?.returnInfo}
        />  
      default:
        return item[column.key];
    }
  };

  return (
    <Spacings.Stack scale="xl">
    
      {customersOrderPaginatedResult ? (
        <Spacings.Stack scale="l">
        {/* <ToggleInput
          isDisabled={false}
          isChecked={true}
           onChange={(event) => alert(event.target.checked)}
          size="medium"
        />           */}
      <DataTable    
          isCondensed
          columns={columns}
          rows={docToFormValues(customersOrderPaginatedResult?.results)}
          itemRenderer={(item, column) => itemRenderer(item, column)}
          maxHeight={600}
          onRowClick={(row) => push(`/csa-project-2/csa-customer-tickets/order-edit/${row.id}/orders-returns`)}
        />
        <Pagination
          page={page.value}
          onPageChange={page.onChange}
          perPage={perPage.value}
          onPerPageChange={perPage.onChange}
          totalItems={docToFormValues(customersOrderPaginatedResult?.results)?.length}
        />

        </Spacings.Stack>
      ) : null}
    </Spacings.Stack>
  );
};
CustomerReturn.displayName = 'CustomerReturn';
CustomerReturn.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default CustomerReturn;
