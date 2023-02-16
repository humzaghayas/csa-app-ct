import PropTypes from 'prop-types';
import { lazy, useState, useEffect ,useCallback} from 'react';
import { useIntl } from 'react-intl';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
  useHistory,
  useParams
} from 'react-router-dom';
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
import { ContentNotification } from '@commercetools-uikit/notifications';
//import { Pagination } from '@commercetools-uikit/pagination';
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
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure,
  RefinementList,
  Pagination 
} from 'react-instantsearch-hooks-web';
import { useHits } from 'react-instantsearch-hooks-web';
import { getSearchItemsRows } from './productSearchRows';
import TextInput from '@commercetools-uikit/text-input';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import ProductAccount from '../product-account/product-account';
import './product-list-module.css';


const columns = [{ key: 'title', label: 'Title' }];

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

function Hit({ hit }) {
  const rowss = [
    { ProductName: `${hit.name}`, shortDescription: `${hit.shortDescription}` },
  ];
  const columnss = [
    { key: 'ProductName', label: 'Product Name' },
    { key: 'shortDescription', label: 'short Description' },
  ];
  return (
    <div>
      <DataTable isCondensed columns={columnss} rows={rowss} maxHeight={600} />
    </div>
  );
}
// function Search({ cartItems }) {
//   const transformItems = useCallback(
//     (items) =>
//       items.map((item) => ({
//         ...item,
//         isInCart: Boolean(
//           cartItems.find((cartItem) => cartItem.objectID === item.objectID)
//         ),
//       })),
//     [cartItems]
//   );
//   const { hits } = useHits({ transformItems });

//   return <>{/* Your JSX */}</>;
// }


const ProductListSearch = (props) => {
  const[searchData , setSearchData] = useState({})
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();

  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="s">
        <InstantSearch indexName="bestbuy" searchClient={searchClient}>
       
        <Configure hitsPerPage={7} />
        <div className="refinement-list-search">
          <div>
            <div>
            <div className="refinement-list-category">Category</div>
        <RefinementList attribute="category" />
        </div>
        <div>
            <div className="refinement-list-brand">Brand</div>
        <RefinementList attribute="manufacturer" />
        </div>
        <div>
        <div className="refinement-list-price">Price</div>
        <RefinementList attribute="salePrice_range" />
        </div>
        </div>
        <div className="searchbox-items">
          <SearchBox placeholder="Search for products..." />
          
          {/* <button type="button" onClick={() => push(`products-search-items`)}>search</button> */}
          <Hits
            hitComponent={({ hit }) => {
              setSearchData(hit)
              return (
                <div className="search-results-list">
                  <div className="search-results">
                    {hit ? (
                   
                      <Spacings.Stack scale="l">
                        {/* <div>{JSON.stringify(hit)}</div>  */}
                        <div className="search-product-results">
                        
                          <div className="search-result-details-left">
                        <img
                            src={hit.thumbnailImage}
                            alt=""
                            width="100%"
                            height="100%"
                            class="search-result-image"
                          />
                          </div>
                          <div class="search-result-details-right">
                          <div class="search-result-category" id="category-value">{hit.category}</div>
                          <div class="search-result-name">{hit.name}</div>
                          <div class="search-result-price">${hit.salePrice}</div>
                          </div>
                        </div>
                       
                       
                      </Spacings.Stack>
                    ) : null}
                  </div>
                </div>
              );
            }}
          />
          </div>
          </div>
          <Pagination />
        </InstantSearch>
      </Spacings.Stack>
   
    </Spacings.Stack>
  );
};
ProductListSearch.displayName = 'Products';
ProductListSearch.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default ProductListSearch;
