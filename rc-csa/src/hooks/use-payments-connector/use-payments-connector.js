import {
    useMcQuery,
    useMcMutation,
    useMcLazyQuery
  } from '@commercetools-frontend/application-shell';
  import { useAsyncDispatch, actions } from '@commercetools-frontend/sdk';
  import { MC_API_PROXY_TARGETS , GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
  import { gql } from '@apollo/client';
  
  import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
  import {FETCH_PAYMENT_BY_ID,UPDATE_PAYMENT_BY_ID} from 'ct-tickets-helper-api';
import { extractErrorFromGraphQlResponse } from '../../helpers';
  const Stripe = require('stripe');
  const stripe = Stripe("sk_test_51KwJWlH3EbZLIKcwo2qfo4KkDfiUfa7ekvddWW6n72tz6VdHk5sVFqQiucQ9xwh29LZMpLwKOsLS7iGROZJIwWAJ00mrbWW1df");
  
  
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

  export const useFetchCheckoutSessionById =  async (sessionId) =>{
    let session = null;
    try{
      session = await stripe.checkout.sessions.retrieve(
        sessionId
      );
    }catch(e){
      switch(e?.type){
        case 'StripeConnectionError':
          console.log("Stripe Connection Error");
          console.log(e)
          break;
        default:
          console.log("Stripe Error");
          console.log(e);
      }
    }
     
    return {
      session
    };
  }

  export const usePaymentUpdater = () => {
    const [updatePaymentById, { loading }] = useMcMutation(
      gql`${UPDATE_PAYMENT_BY_ID}`
    );
  
    const execute = async ({id,version,actions}) => {
      try {
        return await updatePaymentById({
          context: {
            target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
          },
          variables: {
            id:id,
            version: version,
            actions: actions
          },
        });
      } catch (graphQlResponse) {
        throw extractErrorFromGraphQlResponse(graphQlResponse);
      }
    };
  
    return {
      loading,
      execute,
    };
  };