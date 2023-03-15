import PropTypes from 'prop-types';
import { lazy, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
// import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import { BackIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable from '@commercetools-uikit/data-table';
// import AccessibleButton from '@commercetools-uikit/accessible-button';
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
import { FilterIcon } from '@commercetools-uikit/icons';
import React from 'react';
import { getProductItemsRows } from './rows';
//import { ProductListItems } from './productsearchdata';
import { useProductsFetcher } from '../../../../hooks/use-product-search-connector/use-product-search-connector';
import TextInput from '@commercetools-uikit/text-input';
import ProductsAccount from '../product-account/product-account';
import './product-list-module.css';
import ProductAccount from './product-account';

const columns = [
  { key: 'itemName', label: 'Product Name' },
  { key: 'productType', label: 'Product Type' },
  { key: 'key', label: 'Product Key' },
  // { key: 'sku', label: 'SKU' },
  { key: 'status', label: 'Status' },
  { key: 'created', label: 'Created' },
  { key: 'modified', label: 'Modified' },
];

const Products = (props) => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  const { ProductListItems } = useProductsFetcher({
    page,
    perPage,
    tableSorting,
  });
  //console.log(ProductListItems);

  return (
    <Spacings.Stack scale="l">
      <Spacings.Stack scale="xs">
        <FlatButton
          as={RouterLink}
          to={props.linkToWelcome}
          label={intl.formatMessage(messages.backToWelcome)}
          icon={<BackIcon />}
        />
        <Text.Headline as="h2" intlMessage={messages.title} />
      </Spacings.Stack>

      <Spacings.Stack scale="s">
        <Constraints.Horizontal min={13} max={13}>
          <TextInput
            placeholder="Search for any Product...."
            value={searchInputValue}
            onChange={(e) => {
              setSearchInputValue(e.target.value);
            }}
          />
        </Constraints.Horizontal>
      </Spacings.Stack>
      {ProductListItems ? (
        <Spacings.Stack scale="l">
          <DataTable
            isCondensed
            rows={getProductItemsRows(ProductListItems, searchInputValue)}
            //rows={ProductListItems.results}
            onRowClick={(row) => push(`/csa-project-3/csa-customer-tickets/product-edit/${row.id}/product-details`)}
            columns={columns}
            maxHeight={600}
          />

          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={ProductListItems.total}
          />
          <Switch>
            <SuspendedRoute path={`${match.path}/:id`}>
              <ProductsAccount onClose={() => push(`${match.url}`)} />
            </SuspendedRoute>
            <SuspendedRoute path={`${match.path}/:id`}>
              <ProductAccount onClose={() => push(`${match.url}`)} />
            </SuspendedRoute>
          </Switch>
        </Spacings.Stack>
      ) : null}
    </Spacings.Stack>
  );
};
Products.displayName = 'Products';
Products.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Products;
