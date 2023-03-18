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
import { getProductItemsRows } from './productrows';
//import { ProductListItems as productSearchResults } from './productsearchdata';
import TextInput from '@commercetools-uikit/text-input';
import ProductAccount from '../product-account/product-account';
import './product-list-module.css';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useProductProjectionSearchByText } from '../../../../hooks/use-product-search-connector';
import { getSearchProductRows } from '../../../Cart/components/cart-view/conversions';
import { CheckboxInput, PrimaryButton } from '@commercetools-frontend/ui-kit';


const columns = [
  { key: 'itemName', label: 'Product Name' },
  { key: 'productType', label: 'Product Type' },
  { key: 'id', label: 'Product Key' },
  {key:'unitPrice',label:'Price'},
  { key: 'status', label: 'Status' },
    { key: 'created', label: 'Created' },
  { key: 'modified', label: 'Modified' },
 
];







 
const Products =  (props) => {
 
  const[searchInputValue,setSearchInputValue] = useState('')
  
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));

  console.log('projectLanguages',projectLanguages);
  console.log('dataLocale',dataLocale);

  const {executeSearch} =useProductProjectionSearchByText();
  
  
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
      await search("");
    },[])


    const search = async (text,queryFilter) =>{
      const {data} =await executeSearch(text,dataLocale,["variants.attributes.color.key"],queryFilter)

      refreshResults({productProjectionSearch:data?.productProjectionSearch,dataLocale,currencyCode:"USD"});
      // getFacets({facetsFromSearch:data?.productProjectionSearch?.facets});

      if(data?.productProjectionSearch?.facets){
        setWidthSearch("85%");
      }

      const facetsResults = data?.productProjectionSearch?.facets;
      if(facetsResults){
        let cBoxes = facetsCheckboxes;

        for (const f of facetsResults){

          switch (f.facet) {
            case 'variants.attributes.color.key':
              
                const terms = f.value.terms; 
                let cb;
                if( !facetsCheckboxes['Color'] ){
                  cb = terms.map(t => {return {value:t.term,checked:false};});
                }else{
                  cb = facetsCheckboxes['Color'].terms;
                  cb = terms.map(t => {
                    const cbFindChecked = cb.filter(c => c.checked);

                      if(cbFindChecked.some(c => t.term === c.value)){
                        return {value:t.term,checked:true};
                      }
                      return {value:t.term,checked:false};
                    });
                  }
                  cBoxes['Color'] ={key:"variants.attributes.color.key",terms:cb};
                break;
        
            default:
                break;
          }
          
        }
        setFacetsCheckboxes({
          ...facetsCheckboxes
        });
        console.log('cBoxes111',cBoxes);
      }
      console.log('cBoxes',facetsCheckboxes);
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
    
           
           <Constraints.Horizontal min={13} max={13}>
                <TextInput placeholder="Search for any Product...." value={searchInputValue}  onChange={(e) => { setSearchInputValue(e.target.value) }} />
          </Constraints.Horizontal>
          <PrimaryButton type="submit" label="Search"
                  onClick={() => {search(searchInputValue)}}
                  isDisabled={searchInputValue === ''}/>
            
     
     
      </Spacings.Inline>
      {productSearchResults?(

        <table>

          <tr>

            {facetsCheckboxes ?(
                <td width="15%" valign='top'>

                  
                  {Object.keys(facetsCheckboxes).map(function (k) {
                    return (<>
                          <div>
                            <div>
                              {k}
                            </div>
                            <div>
                                {facetsCheckboxes[k].terms.map(function (t){

                                  return (<>
                                   <CheckboxInput
                                        value={t.value}
                                        onChange={(event) => {
                                            let facetChk = facetsCheckboxes;
                                            let c = facetsCheckboxes[k].terms.find(f => f.value === t.value);

                                            c.checked = !c.checked;
                                            setFacetsCheckboxes(
                                              {
                                                ...facetsCheckboxes,
                                              }
                                            );
                                          
                                            var queryFilter={};
                                            queryFilter.values=facetsCheckboxes[k].terms.filter(t => t.checked)
                                            .map(t1 =>`\"${t1.value}\"`).join(",");
                                            queryFilter.key = facetsCheckboxes[k].key;
                                            
                                            console.log('queryFilter',queryFilter);
                                            search(searchInputValue,queryFilter);

                                          }}
                                        isChecked={t.checked}>
                                          {t.value}
                                        </CheckboxInput>
                                  </>
                                  )

                                  }
                                )}
                            </div>
                          </div>
                    </>)
                  })}

                </td>
            ):null}
            <td width={widthSearch}>
            <Spacings.Stack scale="l">
          
            
            <DataTable
                isCondensed
                rows={productSearchResults}
                columns={columns}
                maxHeight={600}
            />
                
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
        </table>):null }
     
      
    </Spacings.Stack>
  );
};
Products.displayName = 'Products';
Products.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Products;
