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
import { useAsyncDispatch } from '@commercetools-frontend/sdk';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { getCategoriesRows } from './rows';

const QUERY = {
  perPage: 20,
  page: 1,
  sortBy: 'id',
  sortDirection: 'desc',
};

const AtgOrders = (props) => {
  const atgPublicURL = useApplicationContext(
    (context) => context.environment.atgPublicURL
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
  const apiUrl = `${atgPublicURL}/rest/model/atg/commerce/catalog/ProductCatalogActor/getCurrentCatalogRootCategories`;
  // 'https://192.168.16.201:8443/rest/model/atg/commerce/catalog/ProductCatalogActor/getCurrentCatalogRootCategories';
  useEffect(() => {
    getCategories({ url: apiUrl, query }, dispatch).then((res) => setData(res));
  }, [apiUrl, query]);

  console.log('data', data);
  const rows = [
    {
      id: 'data?.rootCategories[0].id',
      displayName: 'data?.rootCategories[0].displayName',
    },
    {
      id: 'data?.rootCategories[1].id',
      displayName: 'data?.rootCategories[1].displayName',
    },
    // {
    //   id: data?.rootCategories[2].id,
    //   displayName: data?.rootCategories[2].displayName,
    // },
    // {
    //   id: data?.rootCategories[3].id,
    //   displayName: data?.rootCategories[3].displayName,
    // },
    // {
    //   id: data?.rootCategories[4].id,
    //   displayName: data?.rootCategories[4].displayName,
    // },
    // {
    //   id: data?.rootCategories[5].id,
    //   displayName: data?.rootCategories[5].displayName,
    // },
    // {
    //   id: data?.rootCategories[6].id,
    //   displayName: data?.rootCategories[6].displayName,
    // },
    // {
    //   id: data?.rootCategories[7].id,
    //   displayName: data?.rootCategories[7].displayName,
    // },
    // {
    //   id: data?.rootCategories[8].id,
    //   displayName: data?.rootCategories[8].displayName,
    // },
  ];
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'displayName', label: 'Display Name' },
  ];

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="l">
        <DataTable
          isCondensed
          columns={columns}
          rows={rows}
          // rows={getCategoriesRows(data)}
          maxHeight={600}
          // onRowClick={(row) => push(`${row.id}/atg-category`)}
        />

        <Pagination
          page={page.value}
          onPageChange={page.onChange}
          perPage={perPage.value}
          onPerPageChange={perPage.onChange}
          // totalItems={data.total}
        />
      </Spacings.Stack>
    </Spacings.Stack>
  );
};
AtgOrders.displayName = 'AtgOrders';
AtgOrders.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default AtgOrders;
