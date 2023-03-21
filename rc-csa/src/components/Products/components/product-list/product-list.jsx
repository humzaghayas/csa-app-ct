import PropTypes from 'prop-types';
import { lazy,useState,useEffect, useReducer} from 'react';
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
import { BackIcon, WarningIcon } from '@commercetools-uikit/icons';
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
import { applyFacetFilter, FACETS_KEY_VALUE_MAP, getFacetsResults, getProductItemsRows } from './productSearchResults';
//import { ProductListItems as productSearchResults } from './productsearchdata';
import TextInput from '@commercetools-uikit/text-input';
import ProductAccount from '../product-account/product-account';
import './product-list-module.css';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useProductProjectionSearchByText } from '../../../../hooks/use-product-search-connector';
import { CheckboxInput, PrimaryButton,FieldLabel } from '@commercetools-frontend/ui-kit';
import { useGetCategoriesMap } from '../../../../hooks/use-product-search-connector/use-product-search-connector';
import SelectableSearchInput from '@commercetools-uikit/selectable-search-input';


const columns = [
  { key: 'itemName', label: 'Product Name' },
  { key: 'productType', label: 'Product Type' },
  { key: 'key', label: 'Product Key' },
  {key:'unitPrice',label:'Price'},
  { key: 'status', label: 'Status' },
  { key: 'created', label: 'Created' },
  { key: 'modified', label: 'Modified' },
 
];

const Products =  (props) => {
 
  const[searchInputValue,setSearchInputValue] = useState("")
  const[categoriesMap,setCategoriesMap] = useState(null)
  
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));

  const {executeSearch} =useProductProjectionSearchByText();
  const {executeGetCategories} = useGetCategoriesMap();
  
  
  const [productSearchResults, refreshResults] = useReducer(getProductItemsRows,null);
  const [facetsCheckboxes,setFacetsCheckboxes] = useState({})

  const [widthSearch,setWidthSearch] = useState("100%")
  
 
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });

  useEffect(
    async () => {
      if(categoriesMap === null){
        const catMap = await executeGetCategories(dataLocale);

        FACETS_KEY_VALUE_MAP.find(f => f.key === "categories.id").values =catMap;
      }
      await search("");
    },[])


    const search = async (text,queryFilter,isReset) =>{
      const {data} =await executeSearch(text,dataLocale,FACETS_KEY_VALUE_MAP.map(f => f.key),queryFilter)

      refreshResults({productProjectionSearch:data?.productProjectionSearch,dataLocale,currencyCode:"USD"});
      // getFacets({facetsFromSearch:data?.productProjectionSearch?.facets});

      if(data?.productProjectionSearch?.facets){
        setWidthSearch("85%");
      }

      const fCheckBoxes = await getFacetsResults(data?.productProjectionSearch?.facets,facetsCheckboxes,isReset)
        setFacetsCheckboxes({
          ...fCheckBoxes
        });
    }

  return (
    <Spacings.Stack scale="l">
     
        <FlatButton
          as={RouterLink}
          to={props.linkToWelcome}
          label={intl.formatMessage(messages.backToWelcome)}
          icon={<BackIcon />}
        />
        <Text.Headline as="h2" intlMessage={messages.title} />
      
      <Spacings.Inline >
    
           
           {/* <Constraints.Horizontal min={13} max={13}>
                <TextInput placeholder="Search for any Product...." value={searchInputValue}  
                  onChange={(e) => { setSearchInputValue(e.target.value) }} />
          </Constraints.Horizontal>
          <PrimaryButton type="submit" label="Search"
                  onClick={() => {search(searchInputValue)}}
                  isDisabled={searchInputValue === ''}/> */}
          <div style={{width:"30%"}}>
             <SelectableSearchInput
                      value={{
                        text: "",
                        option: "allFields",
                      }}
                      showSubmitButton={true}
                      // onChange={(event) => alert(event.target.value)}
                      onSubmit={(val) => { 
                        console.log('val',val);
                        setSearchInputValue(val.text);
                        search(val.text);
                       }}
                      onReset={() => {
                        setSearchInputValue("");
                        search("",null,true);
                      }}
                      options={[
                        { value: 'allFields', label: 'All Fields' }
                      ]}/>
            </div>
            <div  style={{width:"70%"}}></div>
      </Spacings.Inline>
      {productSearchResults?(

        <table>
          <tbody>
          <tr>

            {facetsCheckboxes ?(
                <td width="15%" valign='top'>

                  
                  {Object.keys(facetsCheckboxes).map(function (facetCheckbox) {
                    return (<>
                          <div style={{paddingTop: "25px"}} key={"div_"+facetCheckbox}>
                              <FieldLabel
                                  title={facetCheckbox}
                                  hasRequiredIndicator={true}
                                  onInfoButtonClick={() => {}}
                                  //hintIcon={<WarningIcon />}
                                  htmlFor="sampleInput"
                                  horizontalConstraint={7}
                                  key={"fl_"+facetCheckbox} />
                              
                                {facetsCheckboxes[facetCheckbox].terms.map(function (facetTerm){

                                  return (<>
                                   <CheckboxInput
                                        value={facetTerm.value}
                                        key={facetTerm.value}
                                        onChange={(event) => {

                                            const {fCheckboxes,queryFilters} = applyFacetFilter(facetsCheckboxes,facetTerm);

                                            setFacetsCheckboxes({
                                                ...fCheckboxes
                                              });
                                            search(searchInputValue,queryFilters);

                                          }}
                                        isChecked={facetTerm.checked}>
                                          {facetTerm.label}
                                        </CheckboxInput>
                                  </>
                                  )}
                                )}
                          </div>
                    </>)
                  })}

                </td>
            ):null}
            <td width={widthSearch}>
            <Spacings.Stack scale="l">
          
            
            <DataTable isCondensed 
              rows={productSearchResults} 
              columns={columns} 
              maxHeight={600} key="table"/>
                
                <Pagination
                  page={page.value}
                  onPageChange={page.onChange}
                  perPage={perPage.value}
                  onPerPageChange={perPage.onChange}
                totalItems={productSearchResults.total}
                />
                <Switch>
                
                  <SuspendedRoute path={`${match.path}/:id`}>
                  <ProductAccount onClose={() => push(`${match.url}`)} />
                  </SuspendedRoute>
                
              
                </Switch> 
            </Spacings.Stack>
            </td></tr>
            </tbody>
        </table>):null }
     
      
    </Spacings.Stack>
  );
};
Products.displayName = 'Products';
// Products.propTypes = {
//   linkToWelcome: PropTypes.string.isRequired,
// };

export default Products;
