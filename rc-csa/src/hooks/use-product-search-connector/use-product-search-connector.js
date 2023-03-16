import {
    useMcQuery,
    useMcMutation,
    useMcLazyQuery
  } from '@commercetools-frontend/application-shell';
  import { gql } from '@apollo/client';
  import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
  import {
    PRODUCT_SEARCH_QUERY,FETCH_PRODUCT_LIST,PRODUCT_PROJECTION_SEARCH} from 'ct-tickets-helper-api';


export const useProductsFetcher = ({ page, perPage, tableSorting }) => {
  const { data, error, loading } =  useMcQuery(gql`${FETCH_PRODUCT_LIST}`, {
    variables: {
      limit: perPage.value,
      offset: (page.value-1)*perPage.value,
      sort: ["createdAt desc"],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });
  return {
    productsPaginationResults: data?.products,
    error,
    loading,
  };
};

export const useProductSearchByText = () =>{
    const [useProductSearch,{loading}] =  useMcLazyQuery(gql`${PRODUCT_SEARCH_QUERY}`);
    
    const executeProductSearch = async(text) =>{
      return await useProductSearch(
        {
          variables: {
            locale:"en-US",
            text:text
          },
          context: {
            target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
          },
          fetchPolicy:"network-only"
        } 
      )
    }
    
    return {
        executeProductSearch,
        loading,
    };
}

export const useProductProjectionSearchByText = () =>{
  const [projectionSearch,{loading}] =  useMcLazyQuery(gql`${PRODUCT_PROJECTION_SEARCH}`);
  
  const executeSearch = async(text,locale,facetsAttr) =>{

    let facets=[];
    if(facetsAttr){
      facets = facetsAttr.map(f => {
        return {"string":f}
      })
    }
    return await projectionSearch(
      {
        variables: {
          locale,
          text,
          facets,
          currency:"USD"
        },
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        fetchPolicy:"network-only"
      } 
    )
  }
  
  return {
    executeSearch,
      loading,
  };
}