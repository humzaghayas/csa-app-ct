import React,{useState} from 'react';
import { useFormik } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import { Constraints, NumberField } from '@commercetools-frontend/ui-kit';
import DataTable from '@commercetools-uikit/data-table';
import SearchSelectInput from '@commercetools-uikit/search-select-input';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import { useRouteMatch ,useHistory} from 'react-router-dom';
import { Products } from './searchdata';
import { getLineItemsRows } from './rows';
import TextInput from '@commercetools-uikit/text-input';




const rows = [
    {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
    {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
    {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
  ];
  
  const columns = [
    {key: 'itemName', label: 'item Name' },
    { key:'unitPrice', label: 'unit Price' },
  ];
  
  


const OrderLineItemsForm = (props) => {
  const match = useRouteMatch();
  const history = useHistory();
  const[searchInputValue,setSearchInputValue] = useState('')
  const noOptionsMessage ='No options message'
  const dataLocale = useApplicationContext((context) => context.dataLocale);
  const formik = useFormik({
    // Pass initial values from the parent component.
    initialValues: props.initialValues,
    // Handle form submission in the parent component.
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true
  });

  const onSubmit = (e) =>{
    e.orderItem ={
      orderId : props?.orderId,
      lineItemId : formik?.values?.id,
      quantity : formik?.values?.quantity,
      comment : formik?.values?.comment,
      isQuantityUpdated : formik?.values?.quantity===props?.initialValues?.quantity,
    }
    props.onSubmit(e);
  }

  // const colourOptions = [
  //   {label:'Iphone' , value:'iphone' , key:'iphone' , id:'iphone'},
  //   {label:'Android' , value:'android' , key:'android' , id:'android'}
    
  // ];
  
  const filterColors = (inputValue) =>
    Products.filter(
      (colourOption) =>
        colourOption.label === inputValue || colourOption.id === inputValue
    );
  
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const loadOptions = (inputValue) =>
    delay(500).then(() => filterColors(inputValue));
  
    
  
 //const formElements = (
   return(
    <Spacings.Stack scale="xl">
      
         <Spacings.Stack scale="l">
           
           <Constraints.Horizontal min={13} max={13}>
           <TextInput placeholder="Search By...." value={searchInputValue}  onChange={(e) => { setSearchInputValue(e.target.value) }} />
         {/* <SearchSelectInput
      id="customers"
      name="customers"
      horizontalConstraint={13}
      value={searchInputValue}
      optionType="single-lined"
      isAutofocussed={false}
      backspaceRemovesValue={true}
      isClearable={true}
      isDisabled={false}
      isReadOnly={false}
      isMulti={true}
      noOptionsMessage={() => noOptionsMessage}
      loadingMessage="loading exact matches"
      placeholder="Search By..."
     
      loadOptions={loadOptions}
      cacheOptions={false}
      onChange={
        (e) => {setSearchInputValue(e.target.value)
        console.log('searchvalueeeee',searchInputValue)}
        
      
    }
    className="select-input-search"
    /> */}
   </Constraints.Horizontal>
          </Spacings.Stack>
          {Products?(
          <Spacings.Stack scale='l'>
       <DataTable
       rows={getLineItemsRows(Products,searchInputValue)}
       columns={columns}
       />
          </Spacings.Stack>):null }
          <Spacings.Stack scale='l'>
            <Spacings.Inline>
          <SecondaryButton
          label="Go Back"
          data-track-event="click"
          onClick={() => history.push(`/csa-project-2/csa-customer-tickets/order-edit/13d130e7-ebc8-41c4-838e-316e6a94202b/orders-general`)}
         
          size="medium"
        />
        </Spacings.Inline>
          </Spacings.Stack> 
      
    </Spacings.Stack>
  );

  return props.children({
    formElements,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: onSubmit,
    handleCancel: formik.handleReset,
  });
}

export default OrderLineItemsForm;