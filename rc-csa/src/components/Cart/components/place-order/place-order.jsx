import { useIntl } from 'react-intl';
import PropTypes, { bool } from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import React, { useCallback, useEffect, useState } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
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
  useCartsFetcher,
  useShippingAddressCreator,
  usePlaceOrderFromCart,
  useFetchCartById,
} from '../../../../hooks/use-cart-connector/use-cart-connector';
//import ChannelDeletion from './place-order-popup';
//import CustomPopup from './CustomPopup';
import './custom-popup.module.css';
import { useSendOrderMail } from '../../../../hooks/use-order-sendmail-connector';
import { useCustomerDetailsFetcher, useCustomerDetailsFetcherLazy, useApiFetchPostRequest } from '../../../../hooks/use-customers-connector/use-customers-connector';
import { PrimaryButton, Spacings } from '@commercetools-frontend/ui-kit';
import { useSendEmailConfig } from '../../../../hooks/use-customer-password-connector';
import Text from '@commercetools-uikit/text';
import TextField from '@commercetools-uikit/text-field';

const PlaceOrder = (props) => {
  const intl = useIntl();
  const params = useParams();
 // const { cart, error, loading } = useFetchCartById(params.id);

 const[cart,setCart] = useState(null);
  // const { order, data } = useFetchOrderById(params.id);
  const [isShown, setIsShown] = useState(false);
  const [id, setId] = useState(null);
  const { dataLocale, projectLanguages,
    ctCsaBackendURL,projectKey } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
    ctCsaBackendURL:context.environment.CT_CSA_BACKEND,
    ctPaymentURL:context.environment.CT_PAYMENT_URL,
    projectKey:context.project.key
  }));
  // const canManage = useIsAuthorized({
  //   demandedPermissions: [PERMISSIONS.Manage],
  // });

  const showNotification = useShowNotification();
  const {execute} = useApiFetchPostRequest();

  const showApiErrorNotification = useShowApiErrorNotification();
  const placeOrderFromCart = usePlaceOrderFromCart();
  const{execute:fetchByUrl,loading}= useApiFetchPostRequest();

  const cartApiUrl=`${ctCsaBackendURL}/cart-by-id`;
  const custApiUrl = `${ctCsaBackendURL}/customer-by-cartid`

  const [customer,setCustomer] = useState(null);
  const[altEmailAddress,setAltEmailAddress] = useState("");

  useEffect(async()=>{
    if(cart === null){
      if(!isQuoteRequest){
        const c = await fetchByUrl(cartApiUrl,{cartId:params.id,isQuoteRequest:false})

        console.log('cart: ',c);
        if(c.payment){
          setCart(c.data.cart);
        }else{
          const cust =await fetchByUrl(custApiUrl,{cartId:params.id});

          console.log('cart Cust',cust);
          setCustomer(cust);

          setAltEmailAddress(cust.email);
        }
      }else{
        const c = await fetchByUrl(cartApiUrl,{cartId:params.id,isQuoteRequest:true})
        setCart(c.data);
      }
    }
  },[])

  const isQuoteRequest = props?.isQuoteRequest ?? false; 
  let title="";
  let subtitle="";
  let createMessage= "";

  if(isQuoteRequest){
    title=intl.formatMessage(messages.modalTitleQuote);
    subtitle=intl.formatMessage(messages.subTitleQuote);
    createMessage= "Quote Request Created"
  }else{
    title=intl.formatMessage(messages.modalTitle);
    subtitle=intl.formatMessage(messages.subTitle);
    createMessage= "Order Created"
  }

  const {execute:execSendEmail} = useSendEmailConfig();

  const[paymentLinkEnabled,setPaymentLinkEnabled] = useState(true);


  const sendPaymenyLink = async () => {

    setPaymentLinkEnabled(false);
    const e = await execSendEmail({},{
      to:`${customer.email},${altEmailAddress}`,
      subject:"Payment Link",html:null,
      orderSummary:true,cartId:params.id,locale:dataLocale,projectKey
    });

    showNotification({
      kind: 'success',
      domain: DOMAINS.SIDE,
      text: intl.formatMessage(messages.PaymentLinkSent),
    });
  }

   const apiUrl = `${ctCsaBackendURL}/create-customer-quote`;

  const handleSubmit = useCallback(
    async (formikValues, formikHelpers) => {
      const data = formValuesToDoc(formikValues);
      let response = {};
      
      if(!isQuoteRequest){
        response = await placeOrderFromCart.execute({
          originalDraft: cart,
          //draft: order,
          nextDraft: data,
        });
        //bool window.confirm([messages.OrderPlaced]);
        setId(response.data.createOrderFromCart.id);
        setIsShown((current) => !current);
        console.log('response', response);
        const orderId = response?.data?.createOrderFromCart?.id;
    }else{

      const payload = {
          cart:{
              id:cart?.id
            },
          cartVersion: cart?.version,
          comment:" Creating Quote"
      }
      response = await execute(apiUrl,payload);

      console.log('response Quote', response);
      setId(response?.id);
      setIsShown((current) => !current);
      console.log('response Quote', response);
      const quoteId = response?.id;
    }
        
        
      // console.log('response', response);
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
    <>
    {!loading && <>
        {cart ?
          <PlaceOrderForm
            initialValues={docToFormValues(cart,{}, projectLanguages,isQuoteRequest)}
            onSubmit={handleSubmit}
            isShown={isShown}
            id={id}
            message={createMessage}
            isQuoteRequest={isQuoteRequest}
            //isReadOnly={!canManage}
            dataLocale={dataLocale}
          >
            {(formProps) => {
              return (
                // <React.Fragment>{formProps.formElements}</React.Fragment>
                <div>
                  <FormModalPage
                    title={title}
                    subtitle={subtitle}
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
          :<>
              <Spacings.Stack scale="l">

                <Spacings.Stack scale="s">
                    <Text.Headline as="h2" intlMessage={messages.PaymentLinkMessage} />
                    <TextField name="altEmail"
                      title="Alternate Email"
                      value={altEmailAddress}
                      horizontalConstraint={13}
                      onChange={(e) => {
                        setAltEmailAddress(e.target.value)
                      }}/>
                  </Spacings.Stack>
                  <div>
                    
                    <PrimaryButton
                      label="Send payment remider!"
                      onClick={sendPaymenyLink}
                      size="small"
                      isDisabled={!paymentLinkEnabled}
                    />
                  </div>
              </Spacings.Stack>
          </>
        }</>
      }
      </>
  );
};
PlaceOrder.displayName = 'PlaceOrder';

export default PlaceOrder;
