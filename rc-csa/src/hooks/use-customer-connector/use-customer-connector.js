import { gql } from '@apollo/client';
import { useMcLazyQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {isEmailValid,FETCH_CUSTOMERS} from 'ct-tickets-helper-api';
import { extractErrorFromGraphQlResponse } from '../../helpers';

export const useFindCustomerService = () => {
  

  const [customers,{ loading }] = useMcLazyQuery(gql`${FETCH_CUSTOMERS}`);
  const getCustomerByEmail = async(email) =>{
  
      if(isEmailValid(email)){
        try {
          return await customers( {
              variables:{
                where:`email=\"${email}\"`
              },
              context: {
                target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
              }
            });
        }catch(graphQlResponse){
          throw extractErrorFromGraphQlResponse(graphQlResponse);
        }
      }
      return null;
  }
  return {
    getCustomerByEmail
  };
};
