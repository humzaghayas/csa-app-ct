import { loginATG } from "../../components/ATG-Poc/api";
import { useAsyncDispatch } from '@commercetools-frontend/sdk';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { actions } from '@commercetools-frontend/sdk';

export const useLoginAtg =() => {

  const dispatch = useAsyncDispatch();
  const atgPublicURL = useApplicationContext(
    (context) => context.environment.atgPublicURL
  );
  

  const apiUrl = `${atgPublicURL}/rest/repository/atg/userprofiling/ProfileAdapterRepository/user`;
  const payload ={
      "login":"mary",
      "password":"test123"
  };
  const header= {
    'Content-Type': 'application/json',
  }

  const execute = async () => {
    // const data= loginATG(apiUrl,headers, payload ,dispatch );

    const data =await dispatch(
      actions.forwardTo.get({
        uri: apiUrl,
        headers: {
          'ngrok-skip-browser-warning': 'bar',
          ...header
        },
      })
    );
    console.log('Response ATG',data);
    return data;
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

