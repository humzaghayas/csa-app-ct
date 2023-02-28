import { useIntl } from 'react-intl';
import PropTypes, { bool } from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import React, { useCallback, useState, useEffect } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { docToFormValues, formValuesToDoc } from './conversions';
import PlaceOrderForm from './place-order-form ';
import { transformErrors } from './transform-errors';
import messages from './messages';
import validate from './validate';
import {
  usePlaceOrderFromCart,
  useFetchCartById,
} from '../../../../hooks/use-cart-connector/use-cart-connector';
import './custom-popup.module.css';
//import { sendOrderMail } from '../../api';
import { useAsyncDispatch } from '@commercetools-frontend/sdk';
import OrderMail from './order-mail';
import { useSendOrderMail } from '../../../../hooks/use-sendmail-connector';
const PlaceOrder = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { cart, error, loading } = useFetchCartById(params.id);
  // const { order, data } = useFetchOrderById(params.id);
  const [isShown, setIsShown] = useState(false);
  const [id, setId] = useState(null);
  const [result, setData] = useState(null);
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));

  const showNotification = useShowNotification();

  const showApiErrorNotification = useShowApiErrorNotification();
  const placeOrderFromCart = usePlaceOrderFromCart();
  //const [QUERY] = useState(QUERY);

  // const [result, setData] = useState();
  // const data =
  //   '{"notificationType":"Message","projectKey":"rc-b2b-shop","id":"4930ed85-f4ee-45a3-b9a5-e5848ae370f8","version":1,"sequenceNumber":1,"resource":{"typeId":"order","id":"583c1428-e9c7-408e-b90d-c371632607bc"},"resourceVersion":1,"resourceUserProvidedIdentifiers":{},"type":"OrderCreated","order":{"type":"Order","id":"583c1428-e9c7-408e-b90d-c371632607bc","version":1,"versionModifiedAt":"2022-11-30T09:01:01.787Z","lastMessageSequenceNumber":1,"createdAt":"2022-11-30T09:01:01.739Z","lastModifiedAt":"2022-11-30T09:01:01.739Z","lastModifiedBy":{"clientId":"gQrFGyuelbQDsk8sDKKxH74v","isPlatformClient":false,"customer":{"typeId":"customer","id":"38cee8d9-01c6-4458-a43c-f3d2f6596488"}},"createdBy":{"clientId":"gQrFGyuelbQDsk8sDKKxH74v","isPlatformClient":false,"customer":{"typeId":"customer","id":"38cee8d9-01c6-4458-a43c-f3d2f6596488"}},"customerId":"38cee8d9-01c6-4458-a43c-f3d2f6596488","customerEmail":"niroshan.r@royalcyber.com","customerGroup":{"typeId":"customer-group","id":"8ee40b6a-7a6b-452c-b50f-253adcbde05f"},"totalPrice":{"type":"centPrecision","currencyCode":"USD","centAmount":76800,"fractionDigits":2},"taxedPrice":{"totalNet":{"type":"centPrecision","currencyCode":"USD","centAmount":76800,"fractionDigits":2},"totalGross":{"type":"centPrecision","currencyCode":"USD","centAmount":76800,"fractionDigits":2},"taxPortions":[{"rate":0.0,"amount":{"type":"centPrecision","currencyCode":"USD","centAmount":0,"fractionDigits":2},"name":"Notaxrate"}],"totalTax":{"type":"centPrecision","currencyCode":"USD","centAmount":0,"fractionDigits":2}},"orderState":"Open","syncInfo":[],"returnInfo":[],"taxMode":"Platform","inventoryMode":"None","taxRoundingMode":"HalfEven","taxCalculationMode":"LineItemLevel","origin":"Customer","shippingMode":"Single","shippingAddress":{"firstName":"John","lastName":"Doe","streetName":"NYCStreet","streetNumber":"365","postalCode":"147","city":"NYC","state":"California","country":"US","phone":"+41785236985"},"shipping":[],"lineItems":[{"id":"04778d3a-46cd-4ce1-becf-190eca1373dd","productId":"fc6dd2d7-3756-45e5-bfb6-936daef9d450","productKey":"asus-rog-strix-1000","name":{"en":"ASUSROGSTRIXGeForceRTX2060Overclocked6GGDDR6HDMIDP1.4GamingGraphicsCard(ROG-STRIX-RTX-2060-O6G)","en-US":"ASUSROGSTRIXGeForceRTX2060Overclocked6GGDDR6HDMIDP1.4GamingGraphicsCard(ROG-STRIX-RTX-2060-O6G)"},"productType":{"typeId":"product-type","id":"e67b79d9-a9d2-46e5-8e69-f28c53c04f6e","version":7},"variant":{"id":1,"sku":"sku_asus-rog-1000","key":"sku_asus-rog-1000","prices":[{"id":"dfa048f0-0593-43cd-9b97-aa97323cc568","value":{"type":"centPrecision","currencyCode":"USD","centAmount":36600,"fractionDigits":2},"customerGroup":{"typeId":"customer-group","id":"8ee40b6a-7a6b-452c-b50f-253adcbde05f"}},{"id":"f0b67662-dc60-4216-bc7c-9b2397cf5568","value":{"type":"centPrecision","currencyCode":"USD","centAmount":452000,"fractionDigits":2},"country":"US","channel":{"typeId":"channel","id":"30da3307-93c0-49e5-8dd4-6e3dffc88ed1"}},{"id":"2eff77a6-f6e9-43f0-97b6-582c28964ff3","value":{"type":"centPrecision","currencyCode":"USD","centAmount":25600,"fractionDigits":2},"country":"US","channel":{"typeId":"channel","id":"0b48837c-5a69-4048-97bf-b0596a3634be"}}],"images":[{"url":"https://92ea10ac7cff543b7464-fc7872d7588b19d5890656b773baa811.ssl.cf1.rackcdn.com/tuf-rtx3070-2-indust-ztHlkAeP.jpg","dimensions":{"w":400,"h":400}}],"attributes":[{"name":"graphics-coprocessor","value":"GeForceRTX2060"},{"name":"Brand","value":"ASUS"},{"name":"graphics-ram","value":"6GB"},{"name":"gpu-clock-speed","value":"186MHz"},{"name":"video-output-interface","value":"DisplayPort,HDMI"}],"assets":[],"availability":{"isOnStock":true,"availableQuantity":66,"version":1,"id":"155c9bc3-b03e-4256-8214-eb517cbd8930"}},"price":{"id":"bf158ab7-a240-4af6-9d3f-91bc8e4e8eda","value":{"type":"centPrecision","currencyCode":"USD","centAmount":25600,"fractionDigits":2}},"quantity":3,"discountedPricePerQuantity":[],"taxRate":{"name":"Notaxrate","amount":0.0,"includedInPrice":false,"country":"US","state":"California","id":"-ba7X43k","subRates":[]},"perMethodTaxRate":[],"addedAt":"2022-11-30T08:59:19.439Z","lastModifiedAt":"2022-11-30T08:59:19.439Z","state":[{"quantity":3,"state":{"typeId":"state","id":"c98e70b2-3054-48a0-9bc6-fe2156594bd8"}}],"priceMode":"ExternalPrice","lineItemMode":"Standard","totalPrice":{"type":"centPrecision","currencyCode":"USD","centAmount":76800,"fractionDigits":2},"taxedPrice":{"totalNet":{"type":"centPrecision","currencyCode":"USD","centAmount":76800,"fractionDigits":2},"totalGross":{"type":"centPrecision","currencyCode":"USD","centAmount":76800,"fractionDigits":2},"totalTax":{"type":"centPrecision","currencyCode":"USD","centAmount":0,"fractionDigits":2}},"taxedPricePortions":[],"custom":{"type":{"typeId":"type","id":"d932b3cb-acee-43b0-b21a-1127b7f7cef5"},"fields":{"offer_id":"2090"}}}],"customLineItems":[],"transactionFee":true,"discountCodes":[],"directDiscounts":[],"cart":{"typeId":"cart","id":"bcca56a3-6269-445e-a7ad-9f1a36426c8c"},"custom":{"type":{"typeId":"type","id":"bc7b2dd6-fa3c-4596-a0c9-3747bab41010"},"fields":{"isQuote":true,"quoteNumber":"0000000006","quoteState":"approved"}},"billingAddress":{"firstName":"John","lastName":"Doe","streetName":"Warsawska","streetNumber":"24","postalCode":"26-620","city":"PaloAlto","state":"California","country":"US","apartment":"193A","phone":"+48560123456"},"itemShippingAddresses":[],"refusedGifts":[],"store":{"typeId":"store","key":"c153fbb0-6f8a-11ed-bd35-2f1eed4954a4"}},"createdAt":"2022-11-30T09:01:01.787Z","lastModifiedAt":"2022-11-30T09:01:01.787Z"}';
  // const QUERY = {
  //   message: {
  //     data,
  //   },
  // };
  // const apiUrl = `http://localhost:8080/sendgrid-order-confirmation`;

  // // const dispatch = useAsyncDispatch();
  // useEffect(() => {
  //   if (!result) {
  //     sendOrderMail({ url: apiUrl, payload: QUERY }).then((res) =>
  //       setData(res)
  //     );
  //   }
  // }, [apiUrl, QUERY]);

  // const [isOrderCreated, setIsOrderCreated] = useState(false);
  // const [rows, setRows] = useState(null);
  // const { push } = useHistory();

  const { execute } = useSendOrderMail();

  //const [result, setData] = useState();

  // useEffect(async () => {
  //   if (!isOrderCreated) {
  //     const headers = {
  //       'Content-Type': 'application/json',
  //     };
  //     const order = await execute(headers);
  //     setRows(order);
  //     setIsOrderCreated(props.isOrderCreated);

  //     console.log('Mail sent');
  //   }
  // }, []);

  const handleSubmit = useCallback(
    async (formikValues, formikHelpers) => {
      const data = formValuesToDoc(formikValues);
      try {
        const response = await placeOrderFromCart.execute({
          originalDraft: cart,
          //draft: order,
          nextDraft: data,
        });
        //bool window.confirm([messages.OrderPlaced]);
        setId(response.data.createOrderFromCart.cart.id);
        setIsShown((current) => !current);
        console.log('response', response);

         if (response?.data?.createOrderFromCart?.cart.id) {
            const headers = {
              'Content-Type': 'application/json',
            };
              const order = await execute(headers);
              console.log("niroshan");
          }
              //setData();
      } catch (graphQLErrors) {
        const transformedErrors = transformErrors(graphQLErrors);
        if (transformedErrors.unmappedErrors.length > 0) {
          showApiErrorNotification({
            errors: transformedErrors.unmappedErrors,
          });
        }

        //  formikHelpers.setErrors(transformedErrors.formErrors);
      }
    },

    [
      placeOrderFromCart,
      dataLocale,
      intl,
      projectLanguages,
      showApiErrorNotification,
      showNotification,
    ]
  );

  return (
    <PlaceOrderForm
      initialValues={docToFormValues(cart, projectLanguages)}
      onSubmit={handleSubmit}
      isShown={isShown}
      id={id}
      result={result}
      //isReadOnly={!canManage}
      dataLocale={dataLocale}
    >
      {(formProps) => {
        return (
          // <React.Fragment>{formProps.formElements}</React.Fragment>
          <div>
            <FormModalPage
              title={intl.formatMessage(messages.modalTitle)}
              subtitle={intl.formatMessage(messages.subTitle)}
              isOpen
              onClose={props.onClose}
              onPrimaryButtonClick={handleSubmit}

              // labelPrimaryButton=" "
              // labelPrimaryButton={FormModalPage.Intl.save}
              // labelSecondaryButton={FormModalPage.Intl.cancel}
            >
              {formProps.formElements}
            </FormModalPage>
            {/* {isShown && <ChannelDeletion />} */}
            {/* <CustomPopup
              onClose={popupCloseHandler}
              show={isShown}
              title="Order Placed"
            >
              <h1>Hello This is Popup Content Area</h1>
              <h2>This is my lorem ipsum text here!</h2>
            </CustomPopup> */}
          </div>
        );
      }}
    </PlaceOrderForm>
  );
};
PlaceOrder.displayName = 'PlaceOrder';

export default PlaceOrder;
