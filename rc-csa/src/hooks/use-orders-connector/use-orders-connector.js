import {
    useMcQuery,
    useMcLazyQuery
    // useMcMutation,
  } from '@commercetools-frontend/application-shell';
  import { gql } from '@apollo/client';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {FETCH_ORDERS,FETCH_ORDER_BY_ID} from 'ct-tickets-helper-api';

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
export const useFetchOrderById = (orderId)=>{
  const { data, error, loading } =  useMcQuery(gql`${FETCH_ORDER_BY_ID}`, {
    variables: {
      id:orderId
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
    fetchPolicy:"network-only"
  });

  return {
    order: data?.order,
    error,
    loading,
  };
}
