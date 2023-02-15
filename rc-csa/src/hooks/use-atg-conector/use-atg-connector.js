import { loginATG } from "../../components/ATG-Poc/api";
import { useAsyncDispatch } from '@commercetools-frontend/sdk';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { actions } from '@commercetools-frontend/sdk';

export const useGetAtgOrders =() => {

  const dispatch = useAsyncDispatch();
  const atgPublicURL = useApplicationContext(
    (context) => context.environment.atgPublicURL
  );
  

  const apiUrl = `${atgPublicURL}/rest/bean/atg/commerce/order/OrderQueries/getOrderIdsForProfile`;


  const execute = async (userId) => {
    // const data= loginATG(apiUrl,headers, payload ,dispatch );

    const payload ={
      "arg1":userId
    } ;
    const header= {
      'Content-Type': 'application/json',
    }

    const data =await dispatch(
      actions.forwardTo.post({
        uri: apiUrl,
        payload,
        headers: {
          'ngrok-skip-browser-warning': 'bar',
          ...header
        },
      })
    );

    console.log('dataaaaa',data);
    if(data.atgResponse && data.atgResponse.length > 0){

      const orders = data.atgResponse.map(ordId =>{
        return {orderId:ordId};
      })

      console.log('Response Orders',orders);
      return orders;
    }

    return [{orderId:"Not Found"}];
  }

  return {execute};
};


export const useGetATGCustomers =() => {

  const dispatch = useAsyncDispatch();

  const atgPublicURL = useApplicationContext(
    (context) => context.environment.atgPublicURL
  );
  const getCustomerwsURL = `${atgPublicURL}/rest/repository/atg/userprofiling/ProfileAdapterRepository/user`;
  const userString = '/user/'

  const execute = async (header) => {
    // const data= loginATG(apiUrl,headers, payload ,dispatch );

    const data =await dispatch(
      actions.forwardTo.get({
        uri: getCustomerwsURL,
        headers: {
          'ngrok-skip-browser-warning': 'bar',
          ...header
        },
      })
    );
    console.log('ATG Customers',data);

    if(data){

      const customers = data?.user?.map(u => {
        const ind = u.indexOf(userString) + userString.length;
        const userId = u.substr(ind);

        return {userId};
      });

      console.log('1231223 Customers',customers);
      return customers;
    }
    return null;
  }

  return {
    execute
  };

}

export const useGetATGCustomerDetail =() => {

  const dispatch = useAsyncDispatch();

  const atgPublicURL = useApplicationContext(
    (context) => context.environment.atgPublicURL
  );
  const getCustomerwsURL = `${atgPublicURL}/rest/repository/atg/userprofiling/ProfileAdapterRepository/user`;
  const userString = '/user/'

  const execute = async (header,userId) => {
    // const data= loginATG(apiUrl,headers, payload ,dispatch );

    const data =await dispatch(
      actions.forwardTo.get({
        uri: `${getCustomerwsURL}/${userId}`,
        headers: {
          'ngrok-skip-browser-warning': 'bar',
          ...header
        },
      })
    );
    console.log('ATG Customers',data);

    if(data){

      const customer = {
        userId:data?.id,
        firstName:data?.firstName,
        lastName:data?.lastName,
        middleName:data?.middleName,
        login:data?.login,
        email:data?.email,
      }

      console.log('1231223 Customers',customer);
      return customer;
    }
    return null;
  }

  return {
    execute
  };

}




///////////////////////

export const useGetAtgOrdersDetails =() => {

  const dispatch = useAsyncDispatch();
  const atgPublicURL = useApplicationContext(
    (context) => context.environment.atgPublicURL
  );
  

  const apiUrl = `${atgPublicURL}/rest/bean/atg/commerce/order/OrderManager/loadOrder`;


  const execute = async (orderId) => {
    // const data= loginATG(apiUrl,headers, payload ,dispatch );

    const payload ={
      "arg1":orderId
    } ;
    const header= {
      'Content-Type': 'application/json',
    }

    const data =await dispatch(
      actions.forwardTo.post({
        uri: apiUrl,
        payload,
        headers: {
          'ngrok-skip-browser-warning': 'bar',
          ...header
        },
      })
    );

    console.log('order details',data);
    const id = "id:";
    const semiColon = ";";
    const catalogRefId="catalogRefId:"
    if(data){

      const profileId = data.profileId;
      const orderId = data.id;
      const shippingGroups = data.shippingGroups;
      const stateAsString = data.stateAsString;


      const CurrencyCode="CurrencyCode:";
      const Amount="Amount:";
      const Discounted="Discounted:";
      let currencyCode=extractInfo(data.priceInfo,CurrencyCode,semiColon);
      let amount=extractInfo(data.priceInfo,Amount,semiColon);
      let isDiscounted=extractInfo(data.priceInfo,Discounted,semiColon);

      const priceInfo = {currencyCode,amount,isDiscounted};


      currencyCode=extractInfo(data.taxPriceInfo,CurrencyCode,semiColon);
      amount=extractInfo(data.taxPriceInfo,Amount,semiColon);
      const taxPriceInfo = {currencyCode,amount};

      const products = data.commerceItems.map(c => {
        const ProductId="productId:";

        let productId =extractInfo(c,ProductId,semiColon);

        return {productId}
      });

            //   id:ci3000003; catalogRefId:mp600141; catalogKey:en_US; 
      //quantity:5; quantityWithFraction:0.0; state:INITIAL;
      // AuxiliaryData[productId:mpprod110101;

      return {orderId,profileId,products,stateAsString,priceInfo,taxPriceInfo,shippingGroups};
    }

    return {profileId:"Not Found"};
  }

  return {execute};
};

const extractInfo = (sourceString,stringToSearch,endDelim) =>{
  let startInd = sourceString.indexOf(stringToSearch)+ stringToSearch.length;
  let numbOfChars = sourceString.indexOf(endDelim,startInd) -startInd;
  return sourceString.substr(startInd,numbOfChars);
}