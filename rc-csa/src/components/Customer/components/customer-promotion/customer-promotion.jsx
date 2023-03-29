import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
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


import Spacings from '@commercetools-uikit/spacings';
import { useCustomerPromotionFetcher, useCustomerPromotionsAdder, useCustomersPaymentsFetcher, usePromotionSearchByKey } from '../../../../hooks/use-customers-connector/use-customers-connector';
import { CheckActiveIcon, CheckInactiveIcon } from '@commercetools-uikit/icons';
import { PrimaryButton, SearchSelectField, SearchSelectInput, TextField } from '@commercetools-frontend/ui-kit';

const columns = [

  { key: 'key', label: 'Key' },
  { key: 'name', label: 'Name' },
  { key: 'value', label: 'Discount' },
  {key: 'type', label: 'Type'},
  { key: 'isActive', label: 'Active' },
  {key: 'requiresDiscountCode', label: 'Discount Code Required'},
  {key: 'validFrom', label: 'Valid From'},
  {key: 'validUntil', label: 'Valid Until'},
];

const columnsSearch = [

  { key: 'key', label: 'Key' },
  { key: 'name', label: 'Name' },
  { key: 'value', label: 'Discount' },
  {key: 'type', label: 'Type'},
  { key: 'isActive', label: 'Active' },
  {key: 'requiresDiscountCode', label: 'Discount Code Required'},
  {key: 'validFrom', label: 'Valid From'},
  {key: 'validUntil', label: 'Valid Until'},
  {key: 'add', label: ''},
];

const itemRenderer = (item, column) => {
    switch (column.key) {
        case 'isActive':
            console.log('IsActive')
            return <Spacings.Stack scale='s'>
                {item?.isActive ? <CheckActiveIcon/> : <CheckInactiveIcon/>}
            </Spacings.Stack>;
        case 'requiresDiscountCode':
            return <Spacings.Stack scale='s'>
                {item?.requiresDiscountCode ? 'Yes' : 'No'}
            </Spacings.Stack>
        case 'type':
            return <Spacings.Stack scale='s'>
                {returnType(item?.value?.__typename)}
            </Spacings.Stack>
        case 'value':
            return <Spacings.Stack scale='s'>
                <Spacings.Inline>
                    {returnValue(item?.value?.__typename,item)}
                </Spacings.Inline>
            </Spacings.Stack>
        case 'add': return <div>
          <Spacings.Stack scale='s'>
            <Spacings.Inline>
            <PrimaryButton
              label="Add"
              onClick={() => {
                if(rows.find(e=>e.id==item?.id)){
                  alert("already added")
                }else{
                  // execute({item.version,})
                }
              }
              }
              isDisabled={false}
            />
            </Spacings.Inline>
          </Spacings.Stack>
        </div>
        default:
            return item[column.key];
    }
}

const returnValue = (type,item)=>{
    switch(type){
        case 'RelativeDiscountValue':
            return item?.value?.permyriad/100+'%';
        case 'AbsoluteDiscountValue':
            return item?.value?.money[0]?.centAmount/100+'$';
    }
};

const returnType = (type)=>{
    switch(type){
        case 'RelativeDiscountValue':
            return 'Relative';
        case 'AbsoluteDiscountValue':
            return 'Absolute';
    }
};




let rows = null;

const CustomerPromotion = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const params = useParams();
  const [promotions,setPromotions] = useState([]);
  const {executePromotionSearch} = usePromotionSearchByKey();
  const {execute} = useCustomerPromotionsAdder();
  const customer = useCustomerPromotionFetcher(params.id)

  console.log('params.id',params.id);
  console.log('Customer Promotions',customer);

  rows = customer?.customer?.custom?.customFieldsRaw?.filter(e=>e?.name=="promotions")[0]?.referencedResourceSet;

  console.log("Rows ",rows);

  return (
    <Spacings.Stack scale="xl">
    <Spacings.Stack scale='l'>
      <SearchSelectInput
            id='searchProduct'
            name='searchProduct'
            horizontalConstraint={7}
            optionType="single-lined"
            isAutofocussed={false}
            backspaceRemovesValue={true}
            isClearable={true}
            isDisabled={false}
            isReadOnly={false}
            isMulti={false}
            onChange={()=>{}}
            placeholder="Search promotions by key"
            loadOptions={async (s)=>{
              console.log(s)
              const result = await executePromotionSearch(s);
              const searchPromotionRows= result?.data?.cartDiscounts?.results;
              setPromotions(searchPromotionRows);
              console.log("Promotions",promotions);
              console.log("Result",searchPromotionRows);
            }}
            // noOptionsMessage="No exact match found"
            // loadingMessage="loading exact matches"
            // placeholder="Select customers"
            // eslint-disable-next-line no-undef
            // loadOptions={customLoadOptionsFunction}
            // cacheOptions={false}
        />
      {promotions?.length>0 ? <DataTable
            rows={promotions}
            columns={columnsSearch}
            itemRenderer={itemRenderer}
          />: null}

    </Spacings.Stack>
      {/* <Text.Subheadline title="List of Promotions"/> */}
      {rows ?
        <Spacings.Stack scale="l">
         
          <DataTable
            isCondensed
            columns={columns}
            rows={rows}
            itemRenderer={itemRenderer}
            maxHeight={600}
          
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={rows?.length}
          />
          
        </Spacings.Stack>
      :<p>Loading...</p>}
      {/* ) : null} */}
    </Spacings.Stack>
  );
};
CustomerPromotion.displayName = 'CustomerDetails';
CustomerPromotion.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default CustomerPromotion;