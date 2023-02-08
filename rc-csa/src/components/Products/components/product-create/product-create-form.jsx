import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import { SearchIcon } from '@commercetools-uikit/icons';
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
import DataTable from '@commercetools-uikit/data-table';
import { MoneyField } from '@commercetools-frontend/ui-kit';
import Text from '@commercetools-uikit/text';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
  useHistory,
  useParams
} from 'react-router-dom';

const rows = [
  {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
  {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
  {product: '', originalUnitPrice: '$350.00' ,UnitPrice:'$350.00',Qty:'3',LineItemState:'',subTotal:'$1150.00',Tax:"0",Total:'$1150.00'},
];

const columns = [
  { key: 'product', label: 'product' },
  { key: 'unitPrice', label: 'originalUnitPrice' },
  { key: 'unitPrice', label: 'UnitPrice' },
  { key: 'quantity', label: 'Qty' },
  // { key: 'lineItemState', label: 'LineItemState' },
  { key: 'subTotalPrice', label: 'subTotal' },
  { key: 'tax', label: 'Tax' },
  { key: 'totalPrice', label: 'Total' },
];

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


const ProductCreateForm = (props) => {
  const intl = useIntl();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });
  const history = useHistory();
 const { push } = useHistory();

  console.log("Order details LineItems");
  console.log(formik?.values);

  const formElements = (
    <Spacings.Stack scale="l">
     
     <CollapsiblePanel
          data-testid="quote-summary-panel"
          header={
            <CollapsiblePanel.Header>
              {/* {formatMessage(messages.panelTitle)} */}
              {'Product Details'}
            </CollapsiblePanel.Header>
          }
          scale="l">
            <Constraints.Horizontal >
             <Spacings.Stack scale="m">
            
     <Spacings.Stack scale="s">
      
     <LocalizedTextField
    title="Product Name"
    value={{
      en: 'Iphone',
      de: 'Iphone',
    }}
    isRequired
    selectedLanguage="en"
    onChange={(event) => alert(event.target.value)}
  />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
      
        <LocalizedMultilineTextField
    title="Product Description"
    value={{
      en: 'iphone 14 pro 1TB Gold',
      de: 'iphone 14 pro 1TB Gold',
    }}
    selectedLanguage="en"
    onChange={(event) => alert(event.target.value)}
  />
      </Spacings.Stack>
      <Spacings.Stack scale="s">
      
      <LocalizedTextField
    title="Product Key"
    value={{
      en: 'iphone14',
      de: 'iphone14',
    }}
    selectedLanguage="en"
    onChange={(event) => alert(event.target.value)}
  />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
      
      <LocalizedTextField
    title="Product type"
    value={{
      en: 'Electronics',
      de: 'Electronics',
    }}
    selectedLanguage="en"
    onChange={(event) => alert(event.target.value)}
  />
        </Spacings.Stack>
       
        <Spacings.Stack scale="s">
        <Spacings.Inline>
                <SecondaryButton
                  onClick={formik.handleReset}
                  
                  label="Edit"
                />
                <PrimaryButton
                  onClick={formik.handleSubmit}
                  
                  label="Submit"
                />
              </Spacings.Inline>
              </Spacings.Stack>
              </Spacings.Stack>
        </Constraints.Horizontal>
       
     
     </CollapsiblePanel>
  <Spacings.Stack scale="m">
    <Spacings.Inline>
  <Text.Subheadline  as="h4">{'You Can Instantly Search for the Products'}</Text.Subheadline>
  <SecondaryButton iconLeft={<SearchIcon />} label="Search Product" onClick={() => history.push(`/csa-project-2/csa-customer-tickets/product-edit/parasite/products-search`)} />;
  </Spacings.Inline>
  </Spacings.Stack>
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
ProductCreateForm.displayName = 'ProductCreateForm';
ProductCreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default ProductCreateForm;
