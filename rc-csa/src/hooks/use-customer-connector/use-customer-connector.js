import { gql } from '@apollo/client';
import { useMcLazyQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {isEmailValid,FETCH_CUSTOMERS} from 'ct-tickets-helper-api';

export const useFindCustomerService = () => {
  

  const [customers,{ data, error, loading }] = useMcLazyQuery(gql`${FETCH_CUSTOMERS}`);
  const getCustomerByEmail = (email,formik,setCustomerFound) =>{
     //const email=formik.values.email;
  
      if(isEmailValid(email)){
        //setCustomerFound(true);
       customers( {
          variables:{
            where:`email=\"${email}\"`
          },
          context: {
            target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
          }
        }).then((resp)=>{
  
          if(resp?.data?.customers?.count > 0){
            formik.values.customerId =  resp?.data?.customers.results[0].id;
            setCustomerFound(true);
          }else{
            setCustomerFound(false);
          }
        }).catch((error)=>{
  
          setCustomerFound(false);
          console.error('error',error);
        });
    }else{
      setCustomerFound(false);
    }
  }
  return {
    getCustomerByEmail
  };
};
