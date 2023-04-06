import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';
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
import { transformErrors } from './transform-errors';
import messages from './messages';
import Spacings from '@commercetools-uikit/spacings';;
import { useCustomersWishlistFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
import { ToggleInput } from '@commercetools-frontend/ui-kit';
import { entryPointUriPath } from '../../../../constants';
//import { getProductItemsRows } from 'ct-tickets-helper-api/lib/helper-methods';
import { getProductItemsRows } from './conversions';
import { FETCH_CUSTOMERS_WISHLIST, CONSTANTS } from 'ct-tickets-helper-api'
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { gql } from '@apollo/client';
import { GRAPHQL_TARGETS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

let rows = null;

const columns = [
  { key: 'wishlistName', label: 'Wishlist Name' },
  { key: 'productName', label: 'Product Name' },
  // { key: 'productId', label: 'Product ID' },
  { key: 'productType', label: 'Product Type' },
  { key: 'variantId', label: 'Variant ID' },
  { key: 'sku', label: 'SKU' },
  { key: 'key', label: 'Key' },
  { key: 'images', label: 'Image' },
  //{ key: 'productKey', label: 'SKU' },
  // { key: 'price', label: 'Price' },
  { key: 'createdAt', label: 'Created' },
  { key: 'lastModifiedAt', label: 'Modified' },
];

const itemRenderer = (item, column) => {
  switch (column.key) {

    case 'wishlistName':
      return item?.custom?.customFieldsRaw?.filter(e => e?.name == "wishlistName")[0]?.value ?? '--';
    case 'productName':
      return item?.lineItems[0]?.name ?? '--';

    case 'productId':
      return item?.lineItems[0]?.productId ?? '--';
    case 'productType':
      return item.lineItems[0]?.productType?.name ?? '--';
    case 'variantId':
      return item?.lineItems[0]?.variantId ?? '--';
    case 'sku':
      return item?.lineItems[0]?.variant?.sku ?? '--';
    case 'key':
      return item?.lineItems[0]?.variant?.key ?? '--';
    // case 'images':
    //   return item?.lineItems[0]?.variant?.images[0]?.url;
    case 'images':
      return (
        <div>
          <Spacings.Stack scale="s">
            <Spacings.Inline>
              <img src={item?.lineItems[0]?.variant?.images[0]?.url ?? '--'} height={80} width={80} />
            </Spacings.Inline>
          </Spacings.Stack>
        </div>
      );
    case 'createdAt':
      return item.createdAt;
    case 'lastModifiedAt':
      return item.lastModifiedAt;

    default:
      return item[column.key];
  }
};

const CustomerWishlist = (props) => {
  const match = useRouteMatch();
  const { push } = useHistory();
  const { page, perPage } = usePaginationState();
  const params = useParams();

  //const [wishlist, setWishlist] = useState(props?.wishlist);

  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });

  const { projectKey } = useApplicationContext((context) => ({
    projectKey: context.project.key
  }));
  const customerId = props.customer?.id;

  const tableSorting = useDataTableSortingState('createdAt desc');
  const { customersWishlistPaginatedResult, error, loading } = useCustomersWishlistFetcher({
    page,
    perPage,
    tableSorting,
    customerId,
  });

  console.log('result', customersWishlistPaginatedResult);
  //console.log(customersWishlistPaginatedResult.results.lineItems[0].productId);

  return (
    <Spacings.Stack scale="xl">

      {customersWishlistPaginatedResult ? (
        <Spacings.Stack scale="l">
          <DataTable
            isCondensed
            columns={columns}
            rows={customersWishlistPaginatedResult?.results}
            //rows={customersWishlistPaginatedResult.results}
            itemRenderer={(item, column) => itemRenderer(item, column)}
            maxHeight={600}
            onRowClick={(row) => push(`/${projectKey}/${entryPointUriPath}/product-details/${row?.lineItems[0]?.productId}`)}

          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            //totalItems={data?.customObjects?.total}
            totalItems={customersWishlistPaginatedResult?.total}
          />

        </Spacings.Stack>
      ) : "Loading..."}
    </Spacings.Stack>
  );
};
CustomerWishlist.displayName = 'CustomerWishlist';
CustomerWishlist.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default CustomerWishlist;
