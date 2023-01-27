import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Pagination } from '@commercetools-uikit/pagination';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import DataTable from '@commercetools-uikit/data-table';
import Spacings from '@commercetools-uikit/spacings';
import { getCategories } from '../../api';
import {  useAsyncDispatch } from '@commercetools-frontend/sdk';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

const QUERY = {
  perPage: 20,
  page: 1,
  sortBy: 'id',
  sortDirection: 'desc',
};

const AtgCategories = (props) => {

  const atgPublicURL = useApplicationContext(
    context => context.environment.atgPublicURL
  );
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const params = useParams();

  // const OrderId = params.id;

  const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState('id desc');

  const [data, setData] = useState();

  const dispatch = useAsyncDispatch();

  //const apiUrl ="http://localhost:4456";
  const apiUrl =`${atgPublicURL}/rest/model/atg/commerce/catalog/ProductCatalogActor/getCurrentCatalogRootCategories`;
    //'https://192.168.16.201:8443/rest/model/atg/commerce/catalog/ProductCatalogActor/getCurrentCatalogRootCategories';
  useEffect(() => {
    getCategories({ url: apiUrl, query },dispatch).then((res) => setData(res));
  }, [apiUrl, query]);

  console.log('data', data);
  const rows = [
    {
      id: data?.rootCategories[0].id,
      displayName: data?.rootCategories[0].displayName,
      description: 'Apr 11, 2022,2:54:47...',
      type: 'Standard Delivery',
      defaultParentCategory: data?.rootCategories[0].defaultParentCategory,
    },
    {
      id: data?.rootCategories[1].id,
      displayName: data?.rootCategories[1].displayName,
      description: 'Apr 11, 2022,2:54:47...',
      type: 'Standard Delivery',
      defaultParentCategory: data?.rootCategories[1].defaultParentCategory,
    },

    {
      id: data?.rootCategories[2].id,
      displayName: data?.rootCategories[2].displayName,
      description: 'Apr 11, 2022,2:54:47...',
      type: 'Standard Delivery',
      defaultParentCategory: data?.rootCategories[2].defaultParentCategory,
    },
    {
      id: data?.rootCategories[3].id,
      displayName: data?.rootCategories[3].displayName,
      description: 'Apr 11, 2022,2:54:47...',
      type: 'Standard Delivery',
      defaultParentCategory: data?.rootCategories[3].defaultParentCategory,
    },
    {
      id: data?.rootCategories[4].id,
      displayName: data?.rootCategories[4].displayName,
      description: 'Apr 11, 2022,2:54:47...',
      type: 'Standard Delivery',
      defaultParentCategory: data?.rootCategories[4].defaultParentCategory,
    },
    {
      id: data?.rootCategories[5].id,
      displayName: data?.rootCategories[5].displayName,
      description: 'Apr 11, 2022,2:54:47...',
      type: 'Standard Delivery',
      defaultParentCategory: data?.rootCategories[5].defaultParentCategory,
    },
    {
      id: data?.rootCategories[6].id,
      displayName: data?.rootCategories[6].displayName,
      description: 'Apr 11, 2022,2:54:47...',
      type: 'Standard Delivery',
      defaultParentCategory: data?.rootCategories[6].defaultParentCategory,
    },
    {
      id: data?.rootCategories[7].id,
      displayName: data?.rootCategories[7].displayName,
      description: 'Apr 11, 2022,2:54:47...',
      type: 'Standard Delivery',
      defaultParentCategory: data?.rootCategories[7].defaultParentCategory,
    },
    {
      id: data?.rootCategories[8].id,
      displayName: data?.rootCategories[8].displayName,
      description: 'Apr 11, 2022,2:54:47...',
      type: 'Standard Delivery',
      defaultParentCategory: data?.rootCategories[8].defaultParentCategory,
    },
  ];
  // const { push } = useHistory();
  // const columns = [

  //   { key: 'id', label: 'Order number'  },
  //   { key: 'displayName', label: 'Customer' },
  //   { key: 'description', label: 'Date Created' },
  //   { key: 'type', label: 'Delivery Mode',renderItem: (row) => (
  //     <SecondaryButton label={row.type} onClick={() => alert('Button clicked')} />) },
  //   { key: 'defaultParentCategory', label: 'defaultParentCategory',renderItem: (row) => (
  //     <div>
  //       <p>Ordered</p>
  //     <IconButton
  //     icon={<MailIcon />}
  //     // label={row.defaultParentCategory}
  //     onClick={() => push(`/csa_project/csa-customer-tickets/${OrderId}/customer-order-messages`)
  //   />
  //   </div>)},
  // ];

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'displayName', label: 'Display Name' },
    // { key: 'description', label: 'Description' },
    // { key: 'type', label: 'Type' },
    // { key: 'defaultParentCategory', label: 'DefaultParentCategory' },
  ];

  // const itemRenderer = (item, column) => {
  //   switch (column.key) {
  //     case 'id':
  //       return 'item.id';
  //     case 'customerEmail':
  //       return 'item.customerEmail';
  //     case 'createdAt':
  //       return 'item.createdAt';
  //     case 'shipmentState':
  //       return 'Standard Delivery';
  //     case 'orderState':
  //       return 'item.orderState';
  //     default:
  //       return 'item[column.key]';
  //   }
  // };

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="l">
        <DataTable
          isCondensed
          columns={columns}
          rows={rows}
          maxHeight={600}
          // onRowClick={(row) => push(`atg-subcategory/${row.id}/atg-category`)}
          // onRowClick={(row) => push(`${row.id}/atg-category`)}
          onRowClick={(row) => push(`${row.id}/atg-category`)}
        />

        <Pagination
          page={page.value}
          onPageChange={page.onChange}
          perPage={perPage.value}
          onPerPageChange={perPage.onChange}
          // totalItems={data.total}
        />

        {/* <Switch>
          {/* <SuspendedRoute path={`${match.path}/atg-subcategory/:id`}>
            <AtgSubcategory onClose={() => push(`${match.url}`)} />
          </SuspendedRoute> */}
        {/* <Route path={`${match.path}/:id/atg-category`}>
            <AtgCategory />
          </Route>
        </Switch> */}
        {/* <DataTable
            isCondensed
            columns={columns}
            rows={customersOrderPaginatedResult.results}
            // itemRenderer={(item, column) => itemRenderer(item, column)}
            maxHeight={600}
            // onRowClick={(row) => push(`orders/${row.id}/general`)}
          /> */}
        {/* <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={customersOrderPaginatedResult.total}
          /> */}
      </Spacings.Stack>
    </Spacings.Stack>
  );
};
AtgCategories.displayName = 'AtgCategories';
AtgCategories.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default AtgCategories;
