import PropTypes from 'prop-types';
import { lazy,useState,useEffect} from 'react';
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
// import toggleFeature from '@commercetools-frontend/application-shell/node_modules/@flopflip/react-broadcast/dist/declarations/src/components/toggle-feature';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { FilterIcon } from '@commercetools-uikit/icons';
import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch , SearchBox, Hits, Highlight } from 'react-instantsearch-hooks-web';

import { useHits } from 'react-instantsearch-hooks-web';



import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import {
  // BinLinearIcon,
  // IconButton,
  // LoadingSpinner,
  // Text,
  // SecondaryButton,
  PlusBoldIcon,
} from '@commercetools-uikit/icons';

import ProductAccount from '../product-account/product-account';
import SearchSelectField from '@commercetools-uikit/async-select-field';
import SelectField from '@commercetools-uikit/select-field';
import SearchSelectInput from '@commercetools-uikit/search-select-input';
import MoneyField from '@commercetools-uikit/money-field';
import './product-list-module.css';
import RadioField from '@commercetools-uikit/radio-field';
import RadioInput from '@commercetools-uikit/radio-input';
//import Constraints from '@commercetools-uikit/constraints';
import { current } from '@reduxjs/toolkit';
// import { getCompanies } from '../../api';
// import { useEffect } from 'react';

// import NoImageIcon from '@commercetools-frontend/assets/images/camera.svg';
// import TicketAccount from '../Ticket-account';

// const QUERY = {
//   perPage: 20,
//   page: 1,
//   sortBy: 'createdAt',
//   sortDirection: 'desc',
// };


const rows = [
  { id: 'parasite', ProductName:'iPhone', ProductType: 'Electronics' ,ProductKey:'iphone',Status:'Published',createdAt:'jun 14, 2022,2:54:47...',lastModifiedAt:'Aug 14, 2022,2:54:47...'},
  { id: 'parasite', ProductName:'iPhone', ProductType: 'Electronics' ,ProductKey:'iphone',Status:'Published',createdAt:'jun 14, 2022,2:54:47...',lastModifiedAt:'Aug 14, 2022,2:54:47...'},  
  { id: 'parasite', ProductName:'iPhone', ProductType: 'Electronics' ,ProductKey:'iphone',Status:'Published',createdAt:'jun 14, 2022,2:54:47...',lastModifiedAt:'Aug 14, 2022,2:54:47...'},
];
const columns = [
  { key: 'ProductName', label: 'Product Name' },
  { key: 'ProductType', label: 'Product Type' },
  { key: 'ProductKey', label: 'Product Key' },
  { key: 'Status', label: 'Status' },
    { key: 'createdAt', label: 'Created' },
  { key: 'lastModifiedAt', label: 'Modified' },
 
];

const searchClient = algoliasearch( 'latency',
'6be0576ff61c053d5f9a3225e2a90f76');

// function CustomHits(props) {
//   const { hits, results, sendEvent } = useHits(props);

//   return (
//     <div>
//       {props}
//     </div>
//   );
// }


function Hit({ hit }) {
  const rowss = [
    { ProductName:'' ,shortDescription:''},
    
  ];
  const columnss = [
    { key: 'ProductName', label: 'Product Name' ,renderItem: (row) => (
      <div>
       {hit.name}
    </div>)},
    { key: 'shortDescription', label: 'short Description' ,renderItem: (row) => (
      <div>
       {hit.shortDescription}
    </div>)},
   
   
  ];
  return (
    <div>
      {/* <p>{hit.name}</p> */}
      {/* <img src={hit.image} alt={hit.name} />
      <p>{hit.categories[0]}</p>
      <h1>{hit.name}</h1>
      <p>${hit.price}</p> */}
    
       <DataTable
            isCondensed
            columns={columnss}
            rows={rowss}
         
            maxHeight={600}
          
           
            
          />
    </div>
  );
}

const Products =  (props) => {
  const[isClosed , setIsClosed] = useState(false)
  const[searchValue, setSearchValue] = useState('')
  const[filterValue, setFilterValue] = useState('Search by Product Name')
  const[searchArray, setSearchArray] = useState([{name : ''}]);
  const[newArray,setNewArray]=useState([])
  
 
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  
  const colourOptions = [
    {
      label:
        'This is label is very long and the reason that it is very long is to test how it is displayed in the dropdown or when it is select.',
      value: 'ocean',
      id: '1',
    },
    { label: 'Blue', value: 'blue', key: 'blue', id: '2' },
    { label: 'Purple', value: 'purple', key: 'purple', id: '3' },
    { label: 'Red', value: 'red', key: 'red', id: '4' },
    { label: 'Orange', value: 'orange', key: 'orange', id: '5' },
    { label: 'Yellow', value: 'yellow', key: 'yellow', id: '6' },
    { label: 'Green', value: 'green', key: 'green', id: '7' },
    { label: 'Forest', value: 'forest', key: 'forest', id: '8' },
    { label: 'Slate', value: 'slate', key: 'slate', id: '9' },
    { label: 'Silver', value: 'silver', key: 'silver', id: '10' },
  ];
  useEffect(() => {
  
    console.log("filtervalueeeeuseeffecttttttt",filterValue);
   },[filterValue])
  const changeFilter = (e) =>{
   setFilterValue(e.target.value)
  
   }
   const  handleFilter = () =>{

    setSearchArray([...searchArray,{name: `${filterValue}`}])
    
  
    console.log("ArrayyyyyyAfterrrrrrr",searchArray);
   
    }
  const handleChangeSearch = event => {
    setSearchValue(...searchValue,event.target.value.value)
    // setSearchValue({...searchValue, [event.target.value.name]:event.target.value.value})
  }
  const filterColors = (inputValue) =>
    colourOptions.filter(
      (colourOption) =>
        colourOption.label === inputValue || colourOption.id === inputValue
    );
  
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const loadOptions = (inputValue) =>
    delay(500).then(() => filterColors(inputValue));
 
  // const { ProductsPaginatedResult, error, loading } =  useProductsFetcher({
  //   page,
  //   perPage,
  //   tableSorting,
  // });

  // console.log(ProductsPaginatedResult);
  // const orderRows = ;
  // console.log(orderRows);

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
        
      
      </Spacings.Stack>
      <Spacings.Stack scale='s'>
        {/* <Spacings.Inline alignItems="flex-end"> */}
        {/* <InstantSearch searchClient={searchClient} indexName="microprocessor" >
        <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch> */}
{/*    
     <InstantSearch
    indexName="bestbuy"
    searchClient={searchClient}
  >
    <SearchBox />
   
   
    <Hits hitComponent={({ hit }) =>
  { const rowss = [
      { ProductName:'' ,shortDescription:''},
      
    ];
    const columnss = [
      { key: 'ProductName', label: 'Product Name' ,renderItem: (row) => (
        <div>
         {hit.name}
      </div>)},
      { key: 'shortDescription', label: 'short Description' ,renderItem: (row) => (
        <div>
         {hit.shortDescription}
      </div>)},
     
     
    ];
  
 return(
  <div className="search-results-list">
    <div className="search-results">
      <p className="search-results-name">{hit.name}</p>
      <p className="search-results-desc">{hit.shortDescription}</p>
    </div>
 
</div>
 ) 
  
  }} />
    
  </InstantSearch> */}
    
   {/* <SearchSelectInput
      id="customers"
      name="customers"
      horizontalConstraint={7}
      optionType="single-lined"
      isAutofocussed={false}
      backspaceRemovesValue={true}
      isClearable={true}
      isDisabled={false}
      isReadOnly={false}
      isMulti={true}
      noOptionsMessage="No exact match found"
      loadingMessage="loading exact matches"
      placeholder="Select customers"
     
      loadOptions={loadOptions}
      cacheOptions={false}
      onChange={
        (event) => { handleChangeSearch(event)
           console.log('searchhhh',searchValue)
        }
      
    }
    /> */}
   {/* <SearchSelectField
    title=" "
    id="customer"
    name="customer"
    isRequired={false}
    horizontalConstraint={13}
    optionType="single-lined"
    isAutofocussed={false}
    backspaceRemovesValue={true}
    isClearable={true}
    isDisabled={false}
    isReadOnly={false}
    isMulti={false}
    onChange={
      (event) => { handleChangeSearch(event)
         console.log('searchhhh',searchValue)
      }
    
  }
      value={searchValue}
    
    placeholder="Search for Product by using product attributes/variants"
    loadOptions={loadOptions}
    renderError={(key) => {
      
      switch (key) {
        case 'missing':
          return 'This field is required.';
        case 'duplicate':
          return 'This customer is already attached to the store. Customers must be unique.';
        case 'customError':
          return 'A custom error.';
        default:
          return null;
      }
    }}
    cacheOptions={false}
  /> */}
      
       {/* <SecondaryButton iconLeft={<FilterIcon />} label="Add Filter" onClick={handleFilter} size="big"/>  */}
        {/* </Spacings.Inline> */}
      </Spacings.Stack>
  
      {/* {ProductsPaginatedResult?( */}
      <Spacings.Stack  scale="s">
      <Spacings.Inline>
        {/* <Spacings.Inline> */}
        {/* <div className="search-results-drop"> */}
      <SelectField
    title=" "
    value={filterValue}
    options={[
      { value: 'Search by Product Name', label: 'Product Name' },
      { value: 'Search by SKU', label: 'SKU' },
      { value: 'Search by Product Key', label: 'Product Key' },
      { value: 'Search by Product Type', label: 'Product Type' },
    ]}
    onChange={(e) =>{
       changeFilter(e)
    }
     
  //     (event) => {
  //     alert(event.target.value)
  //     console.log('filter value beforeeeeeeeee',event.target.value)
  //     console.log('filter value before',filterValue)
  //   setFilterValue(event.target.value)
  //   setAfterFilterValue(event.target.value)
  //   console.log('filter value after',filterValue)
  // }
    }
    horizontalConstraint={5}
  />
   <Constraints.Horizontal min={13}>
         <SearchSelectInput
      id="customers"
      name="customers"
      horizontalConstraint={13}
      optionType="single-lined"
      isAutofocussed={false}
      backspaceRemovesValue={true}
      isClearable={true}
      isDisabled={false}
      isReadOnly={false}
      isMulti={true}
      noOptionsMessage="No exact match found"
      loadingMessage="loading exact matches"
      placeholder={filterValue}
     
      loadOptions={loadOptions}
      cacheOptions={false}
      onChange={
        (event) => { handleChangeSearch(event)
           console.log('searchhhh',searchValue)
        }
      
    }
    className="select-input-search"
    />
   </Constraints.Horizontal>
    {/* <Spacings.Inline> */}
    <div className="filter-button">
     <SecondaryButton iconLeft={<FilterIcon />} label="Add Filter" onClick={handleFilter} size="big"/> 
     </div>
     {/* </Spacings.Inline> */}
     </Spacings.Inline>
    {/* </div> */}
    {/* </Spacings.Inline> */}
      </Spacings.Stack>
        <Spacings.Stack scale="l">
         <Spacings.Stack scale="s">
          <DataTable
            
            columns={columns}
            rows={rows}
         
            maxHeight={600}
          
            onRowClick={(row) => push(`product-edit/${row.id}/products-general`)}
            
          />
          </Spacings.Stack>
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
           // totalItems={ProductsPaginatedResult.total}
          />
           <Switch>
           
            <SuspendedRoute path={`${match.path}/:id`}>
             <ProductAccount onClose={() => push(`${match.url}`)} />
            </SuspendedRoute>
          
        
          </Switch> 
        </Spacings.Stack>
     
        {/* <div>
        <CollapsibleMotion>
    {({ isOpen, toggle, containerStyles, registerContentNode }) => (
      <div>
          <SecondaryButton iconLeft={<FilterIcon />} label="filter" onClick={toggle} size="big"/>
      
        <div data-testid="container-node" style={containerStyles}>
          <div data-testid="content-node" ref={registerContentNode}>
          <div className="product-list-filter">
                      <div className="product-list-filter-container">
                        <div className="product-list-filter-header-items">
                         
                          <RadioField
    title="Combine Filters By:"
    name="fruits"
    value="and"
    onChange={(event) => alert(event.target.value)}
  >
    <RadioInput.Option value="and">{'AND'}</RadioInput.Option>
    <RadioInput.Option value="or">{'OR'}</RadioInput.Option>
  </RadioField>
);
                        </div>
                      </div>
                      </div>
          </div>
        </div>
      </div>
    )}
  </CollapsibleMotion>

        </div> */}
      {/* ):null} */}
      {/* {isClosed? 
     (  <div className="products-search-filter">
        <div>
        <RadioField
    title="Combine Filters By:"
    name="fruits"
    value="and"
    onChange={(event) => alert(event.target.value)}
  >
    <RadioInput.Option value="and">{'AND'}</RadioInput.Option>
    <RadioInput.Option value="or">{'OR'}</RadioInput.Option>
  </RadioField>
        </div>
      </div>
      ):null}  */}
    </Spacings.Stack>
  );
};
Products.displayName = 'Products';
Products.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Products;
