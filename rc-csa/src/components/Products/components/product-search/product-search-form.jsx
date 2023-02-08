import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import { SHIPMENT_STATUS,PAYMENT_STATUS,ORDER_STATE} from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import LocalizedMultilineTextField from '@commercetools-uikit/localized-multiline-text-field';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import SearchSelectField from '@commercetools-uikit/async-select-field';
import DataTable from '@commercetools-uikit/data-table';
import { MoneyField } from '@commercetools-frontend/ui-kit';
import AsyncSelectField from '@commercetools-uikit/async-select-field';



const itemRenderer = (item, column) => {
  // switch (column.key) {
  //   case 'product':
  //     return <div>
  //               <Spacings.Stack scale='s'>
  //                 <Spacings.Inline>
  //                   <img src={item.product.image} height={50} width={50}/>
  //                   <div>
  //                   <div>{item.product.name}</div>
  //                   <div>SKU: {item.product.sku}</div>
  //                   <div>Key: {item.product.key}</div>
  //                   </div>
  //                   </Spacings.Inline>
  //               </Spacings.Stack>
  //             </div>;
  //   default:
  //     return item[column.key];
  // }
}


const ProductSearchForm= (props) => {
  const intl = useIntl();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  console.log("Order details LineItems");
  console.log(formik?.values);

  const formElements = (
    <Spacings.Stack scale="l">
     
     <CollapsiblePanel
          data-testid="quote-summary-panel"
          header={
            <CollapsiblePanel.Header>
              {/* {formatMessage(messages.panelTitle)} */}
              {'Product Search'}
            </CollapsiblePanel.Header>
          }
          scale="l">
            <Constraints.Horizontal >
             <Spacings.Stack scale="m">
            
     <Spacings.Stack scale="s">
     <Spacings.Inline>
   <SearchSelectField
    title="Search Product"
    id="customer"
    name="customer"
    isRequired={false}
  
    optionType="single-lined"
    isAutofocussed={false}
    backspaceRemovesValue={true}
    isClearable={true}
    isDisabled={false}
    isReadOnly={false}
    isMulti={false}
    onChange={() => {}}
    // noOptionsMessage="No exact match found"
    // loadingMessage="loading exact matches"
    placeholder="Search for Product by using product attributes/variants"
    loadOptions={() => {}}
    
    cacheOptions={false}
  />
   <AsyncSelectField
    title="Filter Product Attributes"
    value={{ value: 'color', label: 'Color' }
    // { value: 'size', label: 'Size' }
  }
    loadOptions={
      () => {
       
      }
    }
    onChange={(event) => alert(event.target.value)}
    horizontalConstraint={10}
  />
  </Spacings.Inline>
        </Spacings.Stack>
     
       
       
        <Spacings.Stack scale="s">
        <Spacings.Inline>
                {/* <SecondaryButton
                  onClick={formik.handleReset}
                  
                  label="Edit"
                /> */}
                <PrimaryButton
                  onClick={formik.handleSubmit}
                  
                  label="search"
                />
              </Spacings.Inline>
              </Spacings.Stack>
              </Spacings.Stack>
        </Constraints.Horizontal>
       
     
     </CollapsiblePanel>
  
    </Spacings.Stack>
  );

  return props.children({
    formElements,
    values: formik.values,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    handleReset: formik.handleReset,
  });
};
ProductSearchForm.displayName = 'ProductSearchForm';
ProductSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default ProductSearchForm;
