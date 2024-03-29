import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import Text from '@commercetools-uikit/text';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import { SHIPMENT_STATUS, PAYMENT_STATUS, ORDER_STATE, ORDER_UPDATE_ACTIONS_LIST } from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import { FlatButton, PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import { BackIcon, ListIcon, ListWithSearchIcon, PlusBoldIcon } from '@commercetools-uikit/icons';
import DataTable from '@commercetools-uikit/data-table';
import OrderItemsForm from './order-items-form';
import {
  useHistory,
  useRouteMatch,
  Switch,
  Route,
  useParams,
  Link as RouterLink,
} from 'react-router-dom';
import OrderItemDetails from './order-items-details';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import OrderLineItems from './order-line-items';
import { NumberInput, SearchSelectInput } from '@commercetools-frontend/ui-kit';
import { useProductSearchByText } from '../../../../hooks/use-product-search-connector/use-product-search-connector';
import { useState } from 'react';
import { getSearchProductRows } from './conversions';
import { TabularDetailPage } from '@commercetools-frontend/application-components';
import styles from './order-create-module.css';
import OrderDiscountCode from './order-discount-code';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { useSendEmailConfigOrder } from '../../../../hooks/use-customer-password-connector';
import { useApiFetchPostRequest } from '../../../../hooks/use-customers-connector/use-customers-connector';
import { DOMAINS } from '@commercetools-frontend/constants';

// let getOrderStates = Object.keys(ORDER_STATE).map((key) => ({
//   label: key,
//   value: ORDER_STATE[key],
// }));

const getPaymentStates = Object.keys(PAYMENT_STATUS).map((key) => ({
  label: key,
  value: PAYMENT_STATUS[key],
}));

const getShipmentStates = Object.keys(SHIPMENT_STATUS).map((key) => ({
  label: key,
  value: SHIPMENT_STATUS[key],
}));

const columns = [
  { key: 'product', label: 'Product' },
  // { key: 'unitPrice', label: 'Original Unit Price' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'quantity', label: 'Qty' },
  { key: 'update', labl: '' },
  // { key: 'lineItemState', label: 'LineItemState' },
  { key: 'subTotalPrice', label: 'Sub Total' },
  { key: 'tax', label: 'Tax' },
  { key: 'totalPrice', label: 'Total Price' },
  { key: 'totalGross', label: 'Total Gross' },
  // { key: 'isEditQuantity', label:'Edit Qty'}
];

const searchColumns = [
  { key: 'product', label: 'Product' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'quantity', label: 'Qty' },
  { key: 'addButton', label: '' }
]

const OrderCreateForm = (props) => {
  const intl = useIntl();
  const { push } = useHistory();
  const match = useRouteMatch();
  const { executeProductSearch } = useProductSearchByText();
  const [lineItems, setLineItems] = useState(null)

  // const [searchProducts,setSearchProducts] = useState([]);
  const [searchProductRows, setSearchProductRows] = useState([]);
  const [orderStateOptions, setOrderStateOptions] = useState([]);
  const [isOrderOpenState, setIsOrderOpenState] = useState(false);

  const { projectKey,ctCsaBackendURL ,dataLocale} =useApplicationContext((context) => ({
    projectKey:context.project.key,
    ctCsaBackendURL:context.environment.CT_CSA_BACKEND,
    dataLocale: context.dataLocale ?? '',
  }));
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    onChange: props.onChange,
    validate,
    enableReinitialize: true,
  });

  const{execute:fetchByUrl,loading}= useApiFetchPostRequest();
  const params = useParams();
  const lineItemId = params.id;
  const [customer,setCustomer] = useState(null);
  const[altEmailAddress,setAltEmailAddress] = useState("");

  useEffect(() => {
    if (lineItems == null) {
      const lItems = formik?.values?.lineItems?.map((li) => {
        return {
          lineItemId: li.id,
          name: li.product.name,
          sku: li.product.sku,
          key: li.product.key,
          image: li.product.image,
          quantity: li.quantity,
          startValue: li.quantity,
          isEditQuantity: li.isEditQuantity,
          unitPrice: li?.unitPrice,
          subTotalPrice: li?.subTotalPrice,
          tax: li?.tax,
          totalPrice: li?.totalPrice,
          totalGross: li?.taxedPrice?.totalGross
        }
      });

      setLineItems(lItems);

      setOrderState(formik?.values?.orderState);

      setIsOrderOpenState(formik?.values?.orderState === 'Open')
    }
  })

  const custApiUrl = `${ctCsaBackendURL}/customer-by-orderid`

  useEffect(async () => {
    if(customer === null){
      const cust =await fetchByUrl(custApiUrl,{orderId:params.id});

      console.log('cart Cust',cust);
      setCustomer(cust);

      setAltEmailAddress(cust.email);
    }
  },[])

  const setOrderState=(value)=>{

    if (value === 'Confirmed') {
      const getOrderStates = Object.keys(ORDER_STATE).map((key) => {

        if (key == 'Confirmed' || key == 'Completed') {

          return {
            label: key,
            value: ORDER_STATE[key]
          }

        } else {
          return null;
        }
      }).filter(o => o !== null);
      setOrderStateOptions(getOrderStates);
      setIsOrderOpenState(value === 'Open')
      return;
    }


    const getOrderStates = Object.keys(ORDER_STATE).map((key) => ({
      label: key,
      value: ORDER_STATE[key],
    }));

    setOrderStateOptions(getOrderStates);

  }

  const showNotification = useShowNotification();
  const[paymentLinkEnabled,setPaymentLinkEnabled] = useState(true);
  const {execute:execSendEmail} = useSendEmailConfigOrder();
  const sendPaymenyLink = async () => {

    setPaymentLinkEnabled(false);
    //to,subject,orderId,locale,projectKey
    const e = await execSendEmail({},{
      to:`${customer.email},${altEmailAddress}`,
      subject:"Payment Link",html:null,
      orderSummary:true,orderId:params.id,locale:dataLocale,projectKey
    });

    showNotification({
      kind: 'success',
      domain: DOMAINS.SIDE,
      text: intl.formatMessage(messages.PaymentLinkSent),
    });
  }

  const itemRenderer = (item, column) => {
    switch (column.key) {
      case 'product':
        return <div>
          <Spacings.Stack scale='s'>
            <Spacings.Inline>
              <img src={item.image} height={65} width={65} />
              <Spacings.Stack scale='s'>
                <div>{item.name}</div>
                <div>SKU: {item.sku}</div>
                <div>Key: {item.key}</div>
              </Spacings.Stack>
            </Spacings.Inline>
          </Spacings.Stack>
        </div>;
      case 'quantity':
        return <div>
          <Spacings.Stack scale='s'>
            <Spacings.Inline>
              <Spacings.Stack scale='s'>
                <NumberInput
                  id='quantity'
                  label='Quantity'
                  value={item.quantity}
                  isDisabled={item.isEditQuantity}
                  onChange={(e) => {

                    const newVal = Number(e.target.value);

                    if (newVal < item.startValue) {
                      return;
                    }

                    const rows = lineItems.filter(l => l.lineItemId !== item.lineItemId);
                    const r = lineItems.find(sr => sr.lineItemId === item.lineItemId);

                    const row = {
                      lineItemId: r.lineItemId,
                      name: r.name,
                      sku: r.sku,
                      key: r.key,
                      startValue: r.startValue,
                      isEditQuantity: r.isEditQuantity,
                      image: r.image,
                      unitPrice: r?.unitPrice,
                      subTotalPrice: r?.subTotalPrice,
                      tax: r?.tax,
                      totalPrice: r?.totalPrice
                    };

                    // rows.push(row);
                    row.quantity = newVal;
                    const index = lineItems.findIndex(sr => sr.lineItemId === item.lineItemId);
                    rows.splice(index, 0, row);

                    setLineItems(rows);
                    console.log("type of", typeof (e.target.value))
                  }}
                />
              </Spacings.Stack>
            </Spacings.Inline>
          </Spacings.Stack>
        </div>;
      case 'isEditQuantity':
        return <div>
          <Spacings.Stack scale='s'>
            <Spacings.Inline>
              <Spacings.Stack scale='s'>
                <PrimaryButton
                  label='Edit Quantity'
                  onClick={() => {
                    item.isEditQuantity = true
                  }}
                />
              </Spacings.Stack>
            </Spacings.Inline>
          </Spacings.Stack>
        </div>;
      case 'update':
        return <div>
          <Spacings.Stack scale='s'>
            <Spacings.Inline>
              <Spacings.Stack scale='s'>
                <PrimaryButton
                  label='Update'
                  onClick={(e) => {

                    const r = lineItems.find(sr => sr.lineItemId === item.lineItemId);
                    e.stagedActions = [{
                      changeLineItemQuantity: {
                        lineItemId: r?.lineItemId,
                        quantity: r?.quantity
                      }
                    }];

                    props.onSubmit(e);
                  }}
                  isDisabled={lineItems.find(sr => sr.lineItemId === item.lineItemId).quantity <= item.startValue}
                />
              </Spacings.Stack>
            </Spacings.Inline>
          </Spacings.Stack>
        </div>
      default:
        return item[column.key];
    }
  }

  const itemRendererSearch = (item, column) => {
    switch (column.key) {
      case 'product':
        return <div>
          <Spacings.Stack scale='s'>
            <Spacings.Inline>
              <img src={item?.image?.url} height={65} width={65} />
              <Spacings.Stack scale='s'>
                <div>{item?.product}</div>
                <div>SKU: {item?.sku}</div>
                <div>Key: {item?.key}</div>
              </Spacings.Stack>
            </Spacings.Inline>
          </Spacings.Stack>
        </div>;
      case 'quantity':
        return <div>
          <Spacings.Stack scale='s'>
            <Spacings.Inline>
              <NumberInput
                value={item.quantity}
                min="1"
                isReadOnly={false}
                onChange={(e) => {
                  const rows = searchProductRows.filter(l => l.productId !== item.productId);
                  const r = searchProductRows.find(sr => sr.productId === item.productId);

                  const row = {
                    productId: r.productId,
                    product: r.product,
                    unitPrice: r.unitPrice,
                    sku: r.sku,
                    key: r.key,
                    variantId: r.variantId,
                    slug: r?.slug,
                    image: {
                      url: r.image?.url,
                    }
                  };

                  row.quantity = Number(e.target.value);
                  const index = searchProductRows.findIndex(sr => sr.productId === item.productId);
                  rows.splice(index, 0, row);

                  setSearchProductRows(rows);
                }}
                horizontalConstraint={2}
              />
            </Spacings.Inline>
          </Spacings.Stack>
        </div>;
      case 'addButton':
        return <div>
          <Spacings.Stack scale='s'>
            <Spacings.Inline>
              <PrimaryButton
                title='Add'
                label='Add'
                type='button'
                onClick={(e) => {
                  console.log("Add Order Item")
                  console.log("item", item);

                  e.stagedActions = [
                    {
                      addLineItem: {
                        productId: item?.productId,
                        variantId: item?.variantId,
                        quantity: searchProductRows.find(sr => sr.productId === item.productId).quantity
                      }
                    }
                  ]
                  props.onSubmit(e);

                }}
              />
            </Spacings.Inline>
          </Spacings.Stack>
        </div>;
      default:
        return item[column.key];
    }
  }

  const onChange = (e) => {
    console.log(e?.target);
    const id = e?.target?.id;
    const value = e?.target?.value;
    const orderId = formik?.values?.id;
    const version = formik?.values?.version;
    const actions = [];
    // eslint-disable-next-line default-case
    switch (id) {
      case 'orderState':
        console.log("Order State")
        console.log(value);
        actions.push({
          "changeOrderState": {
            "orderState": value
          }
        })
        e.payload = {
          actions,
          version: version,
          orderId
        };
        setOrderState(value);
        props.onChange(e);
        break;
      case 'paymentState':
        console.log("Payment State");
        console.log(value);
        actions.push({
          "changePaymentState": {
            "paymentState": value
          }
        })
        e.payload = {
          actions,
          version: version,
          orderId
        }
        props.onChange(e);
        break;
      case 'shipmentState':
        console.log("Shipment State")
        console.log(value)
        actions.push({
          "changeShipmentState": {
            "shipmentState": value
          }
        })
        e.payload = {
          actions,
          version: version,
          orderId
        }
        props.onChange(e);
        break;
    }
  }
  
  const onSubmit = (e) => {
    // console.log("In order create form");
    props.onSubmit(e);
  }

 
  const formElements = (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="l">
        {/* <div className={styles.link}> */}
        <FlatButton
          as={RouterLink}
          to={`/${projectKey}/orders/${formik?.values?.id}/general/change-history`}
          label={"Open change history"}
          icon={<ListWithSearchIcon />}
        // onClick={() => {
        //   const win = window.open(`/${projectKey}/orders/${formik?.values?.id}/general/change-history`, "_blank");
        //   win.focus();

        //   // push(`/${projectKey}/orders/quotes/${row.id}`)
        // }}
        />
        {props.isPaymentPending && 
          <Spacings.Stack scale="s">

                <Text.Headline as="h2" intlMessage={messages.PaymentLinkMessage} />
                <TextField name="altEmail"
                  title="Alternate Email"
                  value={altEmailAddress}
                  horizontalConstraint={13}
                  onChange={(e) => {
                    setAltEmailAddress(e.target.value)
                  }}/>

                <div>       
                  <PrimaryButton
                    label="Send payment remider!"
                    onClick={sendPaymenyLink}
                    size="small"
                    isDisabled={!paymentLinkEnabled}
                  />
                </div>
            </Spacings.Stack>
        }
        <CollapsiblePanel
          data-testid="quote-summary-panel"
          header={
            <CollapsiblePanel.Header>
              {/* {formatMessage(messages.panelTitle)} */}
              {'Order Summary'}
            </CollapsiblePanel.Header>
          }
          scale="l">
          <Constraints.Horizontal min={13}>
            <Spacings.Stack scale="m">

              <Spacings.Stack scale="s">

                <Spacings.Inline>
                  <TextField
                    title="Order Number"
                    value={formik?.values?.orderNumber}
                    onChange={(event) => console.log(event)}
                    horizontalConstraint={13}
                    isReadOnly={true}
                  />
                </Spacings.Inline>


                <SelectField
                  id='orderState'
                  name="orderState"
                  title="Order status"
                  value={formik.values.orderState}
                  // errors={formik.errors.orderState}
                  // touched={formik.touched.orderState}
                  onChange={onChange}
                  onBlur={formik.handleBlur}
                  options={orderStateOptions}
                  // isReadOnly={props.isReadOnly}
                  isDisabled={(formik.values.orderState === 'Complete' 
                            || formik.values.orderState === 'Cancelled') || props.isPaymentPending}
                  horizontalConstraint={13}
                />
              </Spacings.Stack>
              <Spacings.Stack scale="s">

                <SelectField
                  id='paymentState'
                  name="Payment status"
                  title="Payment status"
                  value={formik.values.paymentState}
                  errors={formik.errors.roles}
                  touched={formik.touched.roles}
                  onChange={onChange}
                  onBlur={formik.handleBlur}

                  options={getPaymentStates}
                  isReadOnly={props.isReadOnly}
                  // isRequired
                  horizontalConstraint={13}
                />
              </Spacings.Stack>
              <Spacings.Stack scale="s">

                <SelectField
                  id='shipmentState'
                  name="Shipment status"
                  title="Shipment status"
                  value={formik.values.shipmentState}
                  errors={formik.errors.roles}
                  touched={formik.touched.roles}
                  onChange={onChange}
                  onBlur={formik.handleBlur}
                  options={getShipmentStates}
                  isReadOnly={props.isReadOnly}
                  horizontalConstraint={13}
                />
              </Spacings.Stack>
            </Spacings.Stack>

          </Constraints.Horizontal>
          {/* </Spacings.Inline> */}
        </CollapsiblePanel>
      </Spacings.Stack>
      <Spacings.Stack scale='l'>
        <CollapsiblePanel
          data-testid="quote-summary-panel"
          header={
            <CollapsiblePanel.Header>
              {/* {formatMessage(messages.panelTitle)} */}
              {'Order Items'}
            </CollapsiblePanel.Header>
          }
          scale="l">
          <Constraints.Horizontal >
            <Spacings.Stack scale="m">
              <Spacings.Stack scale="s">

                {lineItems ?
                  <DataTable
                    rows={lineItems}
                    columns={columns}
                    itemRenderer={itemRenderer}
                  /> : null}
              </Spacings.Stack>
            </Spacings.Stack>
        </Constraints.Horizontal>
       
      {/* </Spacings.Inline> */}
     </CollapsiblePanel>
     {isOrderOpenState &&
          <CollapsiblePanel
            data-testid="quote-summary-panel"
            header={
              <CollapsiblePanel.Header>
                {/* {formatMessage(messages.panelTitle)} */}
                {'Add line items'}
              </CollapsiblePanel.Header>
            }
            scale="l"
          >
            <Constraints.Horizontal>
            <Spacings.Stack scale='m'>
              <Spacings.Stack scale='s'>

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
                        onChange={() => { }}
                        placeholder="Search products by name"
                        loadOptions={async (s) => {
                          console.log(s)
                          const result = await executeProductSearch(s);
                          // setSearchProducts(result?.data?.productProjectionSearch?.results);

                          const searchProdRows = getSearchProductRows(result?.data?.productProjectionSearch?.results);
                          setSearchProductRows(searchProdRows);

                        }}
                      // noOptionsMessage="No exact match found"
                      // loadingMessage="loading exact matches"
                      // placeholder="Select customers"
                      // eslint-disable-next-line no-undef
                      // loadOptions={customLoadOptionsFunction}
                      // cacheOptions={false}
                      />

                      {searchProductRows?.length > 0 ? <DataTable
                        rows={searchProductRows}
                        columns={searchColumns}
                        itemRenderer={itemRendererSearch}
                      /> : null}


              </Spacings.Stack>
            </Spacings.Stack>
            </Constraints.Horizontal>
          </CollapsiblePanel>
      }
     </Spacings.Stack>

      <OrderDiscountCode onSubmit={props.onSubmit} discountCodes={formik?.values?.discountCodes} />

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
OrderCreateForm.displayName = 'OrderCreateForm';
OrderCreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default OrderCreateForm;
