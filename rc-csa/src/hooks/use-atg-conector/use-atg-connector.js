import { loginATG } from "../../components/ATG-Poc/api";
import { useAsyncDispatch , actions } from '@commercetools-frontend/sdk';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

import axios from 'axios';
import createHttpUserAgent from '@commercetools/http-user-agent';
import {
  buildApiUrl,
  executeHttpClientRequest,
} from '@commercetools-frontend/application-shell';

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
  

  const apiUrl = `${atgPublicURL}/rest/model/atg/commerce/custom/order/MyOrderLookupActor/details`;


  const execute = async (orderId) => {
    // const data= loginATG(apiUrl,headers, payload ,dispatch );

    const payload ={
      orderId
    };
    const header= {
      'Content-Type': 'application/json',
    };

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
    if(data && data?.order){
       return {isOrder:true,order:data.order};
    }

    return {isOrder:false};
  }

  return {execute};
};


///////////////////

export const useUpdateCustomerInfo =(userId) => {

  const atgPublicURL = useApplicationContext(
    (context) => context.environment.atgPublicURL
  );
  

  const userAgent = createHttpUserAgent({
    name: 'axios-client',
    version: '1.0.0',
    libraryName: window.app.applicationName,
    contactEmail: 'support@my-company.com',
  });

  const url = `${atgPublicURL}/rest/repository/atg/userprofiling/ProfileAdapterRepository/user/${userId}?atg-rest-user-input=MyMessageId`;


  const execute = async ( config = {},payload) => {
    const data = await executeHttpClientRequest(
      async (options) => {
        const res = await axios(buildApiUrl('/proxy/forward-to'), {
          ...config,
          headers: {
            ...options.headers,
            "Content-Type":"application/json"
          },
          withCredentials: options.credentials === 'include',
          method:"PUT",
          data:payload
        });
        const data = res;
        return {
          data: res.data,
          statusCode: res.status,
          getHeader: (key) => res.headers[key],
        };
      },
      { 
        userAgent, 
        headers: config.headers,
        forwardToConfig: {
          uri: url
        }
       }
    );
    return data;
  };

  return {execute};
};