import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import { useEmailSender } from '../../../../hooks/use-email-sender';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import { DataTable } from '@commercetools-frontend/ui-kit';
import {
  MoneyField,
  //SearchSelectInput
} from '@commercetools-frontend/ui-kit';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { checkStockAndSendEmail } from './function';

const rows = [
  {
    variantId: 1,
    sku: 'CHO',
    key: 'CHO',
  },
];
const columns = [
  { key: 'id', label: 'Variant ID' },
  { key: 'sku', label: 'SKU' },
  { key: 'key', label: 'Key' },
  { key: 'images', label: 'Images' },
  { key: 'unitPrice', label: 'Pricing from' },
  { key: 'quantity', label: 'Inventory: Quantity (Channel)' },
  { key: 'attributes', label: 'Attributes' },
];

const itemRenderer = (item, column) => {
  switch (column.key) {
    case 'images':
      return (
        <div>
          <Spacings.Stack scale="s">
            <Spacings.Inline>
              <img src={item?.images} height={80} width={80} />
            </Spacings.Inline>
          </Spacings.Stack>
        </div>
      );

    // case 'variantId':
    //   return(item?.variantId);
    default:
      return item[column.key];
  }
};

const ProductStockForm = (props) => {
  const intl = useIntl();
  const { push } = useHistory();
  const match = useRouteMatch();
  const [category, setCategory] = useState();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    //onChange: props.onChange,
    validate,
    enableReinitialize: true,
  });
  const { products, setProduct } = useState(props.setId);
  //console.log('intialvaluessssssss', props.initialValues);
  console.log('formik', formik?.values?.allVariants?.[0]?.isOnStock ?? '--');
  console.log('props', props);
  //console.log(formik?.values?.allVariants?.prices[0]?.value)
  // console.log(products);
  //const { product } = useFetchProductById(match.params.id);
  const onStock = formik?.values?.allVariants?.[0]?.isOnStock ?? '--';
  const [email, setEmail] = useState('');

  const { execSendEmail } = useEmailSender();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can now use the "email" variable for further processing or store it in a database.
    console.log(email);
    checkStockAndSendEmail(email, props?.initialValues, onStock);
  };
  function checkStockAndSendEmail(email, product, onStock) {
    //   const onStock = product?.allVariants?.[0]?.isOnStock;
    // const emailId =email;
    console.log('Hi', email);
    if (!onStock) {
      const intervalId = setInterval(() => {
        if (onStock) {
          clearInterval(intervalId);
          const response = execSendEmail(
            {},
            {
              to: email,
              subject: `The item - "${product?.productName}" is now available.`,
              html: `<p>Hello, <br/>
                      We're happy to inform that we have restock the product you're looking for.</p> 
                    <br/>
                    <h4> Item Name: ${product?.productName} </h4>
                    <h4> Description: ${product?.description}</h4>
                    <p>Please visit our website to place the order. Feel free to contact us in the future.</p>
                    <p>Have a great day!</p>
                    `,
            }
          );
          console.log('Email send response', response);
          [execSendEmail];
        }
      }, 10 * 60 * 1000); // Check every 10 minutes (adjust the interval as needed)
    } else {
      const response = execSendEmail(
        {},
        {
          to: email,
          subject: `The item - "${product?.productName}" is now available.`,
          html: `<p>Hello, <br/>
                  We're happy to inform that we have restock the product you're looking for.</p> 
                <h4> Item Name: ${product?.productName} </h4>
                <h4> Description: ${product?.description}</h4>
                <p>Please visit our website to place the order. Feel free to contact us in the future.</p>
                <p>Have a great day!</p>
                `,
        }
      );
      console.log('Email send response', response);
      [execSendEmail];
    }
  }

  const formElements = (
    <Spacings.Stack scale="l">
      <Spacings.Stack scale="m">
        <CollapsiblePanel
          data-testid="product-summary-panel"
          header={
            <CollapsiblePanel.Header>
              {/* {formatMessage(messages.panelTitle)} */}
              {'General Information'}
            </CollapsiblePanel.Header>
          }
          scale="l"
        >
          <Constraints.Horizontal>
            <Spacings.Stack scale="m">
              <Spacings.Stack scale="xs">
                <TextField
                  name="productName"
                  title="Product name"
                  value={formik.values.productName}
                  //errors={formik.errors.cart_ordernumber}
                  //touched={formik.touched.cart_ordernumber}
                  onChange={(event) => console.log(event)}
                  //onChange={(event) => console.log(event)}
                  //onBlur={formik.handleBlur}
                  isReadOnly={props.isReadOnly}
                  horizontalConstraint={13}
                  isRequired
                />
              </Spacings.Stack>
              <Spacings.Stack scale="xs">
                <TextField
                  name="description"
                  title="Product description"
                  value={formik.values.description}
                  onChange={(event) => console.log(event)}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Stack>
              <Spacings.Stack scale="xs">
                <TextField
                  name="key"
                  title="Product key"
                  value={formik.values.key}
                  // errors={formik.errors.roles}
                  // touched={formik.touched.roles}
                  onChange={(event) => console.log(event)}
                  onBlur={formik.handleBlur}
                  // isReadOnly={props.isReadOnly}
                  // isRequired
                  horizontalConstraint={13}
                />
              </Spacings.Stack>
              <Spacings.Stack scale="s">
                <TextField
                  name="category"
                  title="Price"
                  value={formik?.values?.allVariants?.[0]?.unitPrice ?? '--'}
                  // errors={formik.errors.category}
                  // touched={formik.touched.category}
                  onChange={(event) => console.log(event)}
                  // value={category}
                  // onChange={e => setCategory(e.target.value)}
                  onBlur={formik.handleBlur}
                  //isReadOnly={props.isReadOnly}
                  //onChange={formik.handleChange}
                  // isRequired
                  horizontalConstraint={13}
                />
              </Spacings.Stack>
              <Spacings.Stack scale="xs">
                <TextField
                  name="priceMode"
                  title="Product Available"
                  value={formik?.values?.allVariants?.[0]?.isOnStock ?? '--'}
                  onChange={(event) => console.log(event)}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Stack>
              {/* <Spacings.Stack scale="xs">
                <TextField
                  name="taxCategory"
                  title="Tax category"
                  value={formik.values.taxCategory}
                  onChange={(event) => console.log(event)}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Stack> */}
            </Spacings.Stack>
          </Constraints.Horizontal>
        </CollapsiblePanel>
      </Spacings.Stack>

      <Spacings.Stack scale="m">
        <CollapsiblePanel
          data-testid="quote-summary-panel"
          header={
            <CollapsiblePanel.Header>{'Variants'}</CollapsiblePanel.Header>
          }
          scale="l"
        >
          <Constraints.Horizontal min={13}>
            <form onSubmit={handleSubmit}>
              <Spacings.Stack>
                {/* {formik?.values?.allVariants ? (
                <Spacings.Stack>
                  <DataTable
                    rows={formik.values.allVariants}
                    //rows={getVariants(products)}
                    //rows={rows}
                    columns={columns}
                    itemRenderer={itemRenderer}
                    //itemRenderer={(item, column) => itemRenderer(item, column)}
                  />
                </Spacings.Stack>
              ) : (
                <div></div>
              )} */}
                <TextField
                  name="email"
                  title="Email Address"
                  value={email}
                  // errors={""}
                  // touched={""}
                  onChange={handleEmailChange}
                  // onBlur={""}
                  horizontalConstraint={13}
                />
                <Spacings.Stack>
                  <Spacings.Inline>
                    <PrimaryButton
                      type="submit"
                      label="Submit"
                      // onClick={formik.handleSubmit}
                      isDisabled={!email}
                    />
                  </Spacings.Inline>
                </Spacings.Stack>
              </Spacings.Stack>
            </form>
          </Constraints.Horizontal>
        </CollapsiblePanel>
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
ProductStockForm.displayName = 'ProductStockForm';
ProductStockForm.propTypes = {
  //onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default ProductStockForm;
