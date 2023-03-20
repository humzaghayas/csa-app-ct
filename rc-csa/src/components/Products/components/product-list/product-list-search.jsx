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
  Configure,
  RefinementList,
  Pagination 
} from 'react-instantsearch-hooks-web';
import './product-list-module.css';


const columns = [{ key: 'title', label: 'Title' }];

const searchClient = algoliasearch(
  '9KFLY67CI7',
  '843cd3bdec93b819a55bf8aca0dbe4c8'
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
        <InstantSearch indexName="rc-ct-csa" searchClient={searchClient}>
       
        <Configure hitsPerPage={7} />
        <div className="refinement-list-search">
          <div>
            <div>
            <div className="refinement-list-category">Category</div>
        <RefinementList attribute="categories"
        />
        </div>
        <div>
            <div className="refinement-list-brand">Color</div>
        <RefinementList attribute="color" />
        </div>
        <div>
        <div className="refinement-list-price">Ingredients</div>
        <RefinementList attribute="ingredients" />
        </div>
        </div>
          <Constraints.Horizontal max={10}>
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
                            src={hit.images}
                            alt=""
                            width="100%"
                            height="100%"
                            class="search-result-image"
                          />
                          </div>
                          <div class="search-result-details-right">
                          <div class="search-result-category" id="category-value">{hit.categories}</div>
                          <div class="search-result-name">{hit.title}</div>
                          <div class="search-result-price">${hit.prices_usd/100}</div>
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

          </Constraints.Horizontal>
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
