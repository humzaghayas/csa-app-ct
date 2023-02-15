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
import { getById } from '../../api';
import { formValuesToDoc } from './conversions';
import { useAsyncDispatch } from '@commercetools-frontend/sdk';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

const AtgProducts = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const params = useParams();

  const atgPublicURL = useApplicationContext(
    (context) => context.environment.atgPublicURL
  );
  // const OrderId = params.id;

  const id = params.id;
  const QUERY = {
    categoryId: id,
  };
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState('id desc');

  const [data, setData] = useState(null);

  // const id = formValuesToDoc(formValues);
  // console.log('id', id);
  // // //const apiUrl ="http://localhost:4456";
  const apiUrl = `${atgPublicURL}/rest/model/atg/commerce/catalog/ProductCatalogActor/getCategory`;

  const dispatch = useAsyncDispatch();
  useEffect(() => {
    if (!data) {
      getById({ url: apiUrl, payload: QUERY }, dispatch).then((res) =>
        setData(res)
      );
    }
  }, [apiUrl, QUERY]);

  // console.log('data', data);
  const rows = [
    {
      repositoryId: data?.childProducts[0].repositoryId,
      displayName: data?.childProducts[0].displayName,
      description: data?.childProducts[0].description,
      largeImageUrl: data?.childProducts[0].largeImageUrl,
      longDescription: data?.childProducts[0].longDescription,
    },
    {
      repositoryId: data?.childProducts[1].repositoryId,
      displayName: data?.childProducts[1].displayName,
      description: data?.childProducts[1].description,
      largeImageUrl: data?.childProducts[1].largeImageUrl,
      longDescription: data?.childProducts[1].longDescription,
    },

    {
      repositoryId: data?.childProducts[2].repositoryId,
      displayName: data?.childProducts[2].displayName,
      description: data?.childProducts[2].description,
      largeImageUrl: data?.childProducts[2].largeImageUrl,
      longDescription: data?.childProducts[2].longDescription,
    },
    {
      repositoryId: data?.childProducts[3].repositoryId,
      displayName: data?.childProducts[3].displayName,
      description: data?.childProducts[3].description,
      largeImageUrl: data?.childProducts[3].largeImageUrl,
      longDescription: data?.childProducts[3].longDescription,
    },
  ];

  const columns = [
    { key: 'repositoryId', label: 'Product ID' },
    { key: 'displayName', label: 'Display Name' },
    { key: 'description', label: 'Description' },
    // { key: 'largeImageUrl', label: 'Image URL' },
    { key: 'longDescription', label: 'Detailed Description' },
  ];

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="l">
        <DataTable
          isCondensed
          columns={columns}
          rows={rows}
          maxHeight={600}
          // onRowClick={(row) => push(`/csa-project-2/csa-customer-tickets/ATG/${row.id}/category`)}
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
AtgProducts.displayName = 'AtgProducts';
AtgProducts.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default AtgProducts;
