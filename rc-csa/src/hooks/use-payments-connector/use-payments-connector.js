import {
    useMcQuery,
    useMcMutation,
    useMcLazyQuery
  } from '@commercetools-frontend/application-shell';
  import { useAsyncDispatch, actions } from '@commercetools-frontend/sdk';
  import { MC_API_PROXY_TARGETS , GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
  import { gql } from '@apollo/client';
  
  import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
  import {FETCH_PAYMENT_BY_ID} from 'ct-tickets-helper-api';

  export const useFetchPaymentById =  (paymentId) =>{

    const { data, error, loading } =  useMcQuery(gql`${FETCH_PAYMENT_BY_ID}`, {
      variables: {
        id:paymentId
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      fetchPolicy:"network-only"
    });
  
    let payment =data?.payment;
  
    return {
      payment,
      loading,
      error
    };
  }