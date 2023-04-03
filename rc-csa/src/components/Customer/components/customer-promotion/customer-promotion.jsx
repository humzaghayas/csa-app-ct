import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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
  showNotification,
  showApiErrorNotification,
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
import { useCustomerPromotionFetcher, useCustomerPromotionsAdder, 
   usePromotionSearchByKey, useFetchPromotionsList } from '../../../../hooks/use-customers-connector/use-customers-connector';
import { CheckActiveIcon, CheckInactiveIcon, CloseIcon } from '@commercetools-uikit/icons';
import { CreatableSelectField, IconButton, PrimaryButton, SearchSelectField, SearchSelectInput, SecondaryButton, TextField, ToggleInput } from '@commercetools-frontend/ui-kit';
import { useFormik } from 'formik';
import { objectToOptions, promotionRemove, promotionUpdateActions } from './conversion';
import { transformErrors } from './transform-errors';

const columns = [

  { key: 'key', label: 'Key' },
  { key: 'name', label: 'Name' },
  { key: 'value', label: 'Discount' },
  {key: 'type', label: 'Type'},
  { key: 'isActive', label: 'Active' },
  {key: 'requiresDiscountCode', label: 'Discount Code Required'},
  {key: 'validFrom', label: 'Valid From'},
  {key: 'validUntil', label: 'Valid Until'},
  {key:'delete',labael:'Remove'}
];

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
  const isMulti = true;
  const { page, perPage } = usePaginationState();
  const params = useParams();
  const {execute} = useCustomerPromotionsAdder();
  const customer = useCustomerPromotionFetcher(params.id);
  const promotions = useFetchPromotionsList();
  const [isEditable,setIsEditable] = useState(false);

  rows = customer?.customer?.custom?.customFieldsRaw?.filter(e=>e?.name=="promotions")[0]?.referencedResourceSet;
  const options = objectToOptions(promotions?.promotions,rows);
  
  const formik = useFormik({
    initialValues: {promotion: isMulti ? [] : undefined},
    // validate:(values) => {
    //   const errors = { promotion: {} };
    //   if (isMulti ? values.promotion.length === 0 : !values.promotion)
    //     errors.promotion.missing = true;
    //   return errors;
    // },
    onSubmit:(values, formik) => {
      console.log("On Submit",values);
      if(values?.promotion?.length>0 && customer?.customer?.version){
        const updateActionList = {
          id : params.id,
          version: parseInt(customer?.customer?.version),
          actions: [
            {
              setCustomType: {
              typeKey: "promotionsList"
              }
            },
            {
              setCustomField: {
                name: "promotions",
                value: JSON.stringify(promotionUpdateActions(values?.promotion,rows))
              }
            }
          ]
        }
        console.log(updateActionList);
        try{
          const updateResults = execute(updateActionList);
          console.log(updateResults);
          window.location.reload();
          // showNotification({
          //   kind: 'success',
          //   domain: DOMAINS.SIDE,
          //   text: intl.formatMessage(messages.PromotionUpdate),
          // }); 
          // formik.resetForm();
        }catch(error){
          if (transformErrors?.unmappedErrors?.length > 0) {
            showApiErrorNotification({
              errors: graphQLErrors.message,
            });
          }
        }
        finally{
          formik.resetForm();
        }
      }  
    }
  });

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
        case 'delete':
          return <Spacings.Stack scale='s'>
            <IconButton
              icon={<CloseIcon/>}
              isDisabled={!isEditable}
              onClick={()=>{
                // alert(item?.id);
                rows = rows?.filter(e=>e?.id!=item?.id);
                const updateActionList = {
                  id : params.id,
                  version: parseInt(customer?.customer?.version),
                  actions: [
                    {
                      setCustomType: {
                      typeKey: "promotionsList"
                      }
                    },
                    {
                      setCustomField: {
                        name: "promotions",
                        value: JSON.stringify(promotionRemove(rows))
                      }
                    }
                  ]
                }
                console.log(updateActionList);
                try{
                  const updateResults = execute(updateActionList); 
                  window.location.reload();
                }catch(error){
                  if (transformErrors?.unmappedErrors?.length > 0) {
                    showApiErrorNotification({
                      errors: graphQLErrors.message,
                    });
                  }
                }
                finally{
                  
                }
              }}
              title='Remove'
            />
          </Spacings.Stack>
        default:
            return item[column.key];
    }
}

  return (
    <Spacings.Stack scale="xl">
    <Spacings.Stack scale='l'>
      <CreatableSelectField
        horizontalConstraint={8}
        errors={formik.errors.promotion}
        isRequired={true}
        touched={formik.touched.promotion}
        name="promotion"
        value={formik.values.promotion}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isDisabled={formik.isSubmitting}
        isMulti={isMulti}
        hasWarning={false}
        options={options}
        title="Promotion"
        description="Assign promotions to customers"
        isClearable={true}
      />

      <Spacings.Inline>
        <SecondaryButton
          onClick={formik.handleReset}
          isDisabled={formik.isSubmitting}
          label="Reset"
        />
        <PrimaryButton
          onClick={formik.handleSubmit}
          isDisabled={formik.isSubmitting || !formik.dirty}
          label="Submit"
        />
      </Spacings.Inline>

    </Spacings.Stack>
      {/* <Text.Subheadline title="List of Promotions"/> */}
      {rows?.length>0 ?
        <Spacings.Stack scale="l">
         <ToggleInput
          isDisabled={false}
          isChecked={isEditable}
          onChange={(event) => {
            setIsEditable(event.target.checked);
          }}
          size="small"
        />
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
      :null}
      {/* ) : null} */}
    </Spacings.Stack>
  );
};
CustomerPromotion.displayName = 'CustomerDetails';
CustomerPromotion.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default CustomerPromotion;