import {
  useMcQuery,
  useMcMutation,
  useMcLazyQuery
} from '@commercetools-frontend/application-shell';
import { gql } from '@apollo/client';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {FETCH_ORDERS,FETCH_ORDER_BY_ID,UPDATE_ORDER_BY_ID} from 'ct-tickets-helper-api';

export const useOrdersFetcher = ({ page, perPage, tableSorting }) => {

  const { data, error, loading } =  useMcQuery(gql`${FETCH_ORDERS}`, {
    variables: {
      limit: perPage.value,
      offset: (page.value-1)*perPage.value,
      sort: ["orderNumber asc","createdAt desc"],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    ordersPaginatedResult: data?.orders,
    error,
    loading,
  };
};
export const useFetchOrderById = () =>{
const [usefetchOrderByIdQuery,{loading}] =  useMcLazyQuery(gql`${FETCH_ORDER_BY_ID}`);

const executeFetchOrder = async(orderId) =>{
  return await usefetchOrderByIdQuery(
    {
      variables: {
        id:orderId
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      fetchPolicy:"network-only"
    } 
  )
}

return {
  executeFetchOrder,
  loading,
};
}
export const useOrderUpdateById = () =>{

  const [updateOrderByID,{loading}] = useMcMutation(gql`${UPDATE_ORDER_BY_ID}`);
  
   const executeUpdateOrder = async({version,actions,orderId}) =>{
    console.log("order hooks")
    console.log(version)
    console.log(actions)
    console.log(orderId);
    return await updateOrderByID(
      {
        variables: {
          id:orderId,
          version:version,
          actions:actions
        },
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        }
      }
    )
  }
  
  return {
    executeUpdateOrder,
    loading
  };

}
