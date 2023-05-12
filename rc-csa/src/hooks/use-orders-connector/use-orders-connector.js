import {
  useMcQuery,
  useMcMutation,
  useMcLazyQuery
} from '@commercetools-frontend/application-shell';
import { useAsyncDispatch, actions } from '@commercetools-frontend/sdk';
import { MC_API_PROXY_TARGETS , GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { gql } from '@apollo/client';

import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  FETCH_ORDERS,
  FETCH_ORDER_BY_ID,
  UPDATE_ORDER_BY_ID,
  CREATE_EDIT_ORDER_BY_ID,
  REPLICATE_ORDER,
  FETCH_ORDER_PAYMENTS_BY_ID,
  FETCH_ORDER_RETURNINFO_BY_ID,
  FETCH_DISCOUNT_CODES,
  CREATE_ORDER_FROM_QUOTE} from 'ct-tickets-helper-api';

export const useOrdersFetcher = ({ page, perPage, tableSorting }) => {

  const { data, error, loading } =  useMcQuery(gql`${FETCH_ORDERS}`, {
    variables: {
      limit: perPage.value,
      offset: (page.value-1)*perPage.value,
      sort: ["lastModifiedAt desc"],
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
export const useFetchOrderById =  (orderId) =>{


  const { data, error, loading } =  useMcQuery(gql`${FETCH_ORDER_BY_ID}`, {
    variables: {
      id:orderId
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
    fetchPolicy:"network-only"
  });

  let order ={data};

  return {
    order,
    loading,
    error
  };
}
export const useOrderUpdateById = () =>{

  const [updateOrderByID,{loading}] = useMcMutation(gql`${UPDATE_ORDER_BY_ID}`);
  
   const executeUpdateOrder = async({version,actions,orderId}) =>{
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
export const useCreateOrderEditById = () =>{

  const [createOrderEdit,{loading}] = useMcMutation(gql`${CREATE_EDIT_ORDER_BY_ID}`);
  
   const executeCreateOrderEdit = async(draft) =>{
    // console.log("In use orders connectors")
    // console.log(draft);
    return await createOrderEdit(
      {
        variables: {
          draft
        },
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        }
      }
    )
  }
  
  return {
    executeCreateOrderEdit,
    loading
  };

}
export const useOrderEditApply = () =>{

  const { projectKey } =useApplicationContext((context) => ({
    projectKey:context.project.key
  }));

    const dispatch = useAsyncDispatch();
    const executeOrderEditApply = async(payload,orderEditId) =>{
      const result = await dispatch(
        actions.post({
          mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
          uri : projectKey+"/orders/edits/"+orderEditId+"/apply",
          payload
        })
      )
       return result;
    }
  
  return {
    executeOrderEditApply,
  };
}
export const useReplicateOrderById = () =>{

  const [replicateOrder,{loading}] = useMcMutation(gql`${REPLICATE_ORDER}`);
  
   const executeReplicateOrder = async(reference) =>{

    return await replicateOrder(
      {
        variables: {
          referenceInput:reference
        },
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        }
      }
    )
  }
  
  return {
    executeReplicateOrder,
    loading
  };

}
export const useFetchOrderPaymentsById =  (orderId) =>{


  const { data, error, loading } =  useMcQuery(gql`${FETCH_ORDER_PAYMENTS_BY_ID}`, {
    variables: {
      id:orderId
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
    fetchPolicy:"network-only"
  });

  let order = data?.order ;

  return {
    order,
    loading,
    error
  };
}
export const useFetchOrderReturnInfoById =  (orderId) =>{

  const { data, error, loading } =  useMcQuery(gql`${FETCH_ORDER_RETURNINFO_BY_ID}`, {
    variables: {
      id:orderId
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
    fetchPolicy:"network-only"
  });

  let order ={data};

  return {
    order,
    loading,
    error
  };
}
export const useFetchDiscountCodes = () =>{
  const {data,loading,error}= useMcQuery(gql`${FETCH_DISCOUNT_CODES}`,
  {
    context:{
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM
    },
    fetchPolicy:"network-only"
  })

  return {
    discountCodes : data?.discountCodes?.results,
    loading,
    error
  }

}
export const useCreateOrderFromQuote = () =>{

  const [createOrder,{loading}] = useMcMutation(gql`${CREATE_ORDER_FROM_QUOTE}`);
  
   const executeCreateOrderFromQuote = async(draft) =>{
    // console.log("In use orders connectors")
    // console.log(draft);
    return await createOrder(
      {
        variables: {
          draft
        },
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        }
      }
    )
  }
  
  return {
    executeCreateOrderFromQuote,
    loading
  };

}
export const useOrderSearch = () =>{

  const { projectKey } =useApplicationContext((context) => ({
    projectKey:context.project.key
  }));

    const dispatch = useAsyncDispatch();
    const executeOrderSearch = async(payload) =>{
      const result = await dispatch(
        actions.post({
          mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
          uri : projectKey+"/orders/search",
          payload
        })
      )
       return result;
    }
  
  return {
    executeOrderSearch,
  };
}