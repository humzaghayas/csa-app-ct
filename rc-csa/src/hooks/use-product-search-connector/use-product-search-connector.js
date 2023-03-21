  import { gql } from '@apollo/client';
  import {
    PRODUCT_SEARCH_QUERY,FETCH_PRODUCT_LIST,PRODUCT_PROJECTION_SEARCH,FETCH_CATEGORIES_INFO,FETCH_PRODUCT_BY_ID} from 'ct-tickets-helper-api';

 import{ useMcQuery,
  useMcMutation,
  useMcLazyQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';


export const useProductsFetcher = ({ page, perPage, tableSorting }) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_PRODUCT_LIST}
    `,
    {
      variables: {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        sort: ['createdAt desc', 'id'],
        //where:[publi]
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );
  return {
    ProductListItems: data?.products?.results,
    error,
    loading,
  };
};

export const useProductSearchByText = () => {
  const [productSearch, { loading }] = useMcLazyQuery(
    gql`
      ${PRODUCT_SEARCH_QUERY}
    `
  );

  const executeProductSearch = async (text) => {
    return await productSearch({
      variables: {
        locale: 'en-US',
        text: text,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      fetchPolicy: 'network-only',
    });
  };

  return {
    executeProductSearch,
    loading,
  };
};

export const useProductProjectionSearchByText = () =>{
  const [projectionSearch,{loading}] =  useMcLazyQuery(gql`${PRODUCT_PROJECTION_SEARCH}`);
  
  const executeSearch = async(text,locale,facetsAttr,queryFiltersA) =>{

    let facets=[];
    if(facetsAttr){
      facets = facetsAttr.map(f => {
        return {"string":f}
      })
    }
    let queryFilters;
    if(queryFiltersA){
      queryFilters= queryFiltersA.map(qf =>({ "string":`${qf.key}:${qf.values}`}));
     }
    
    return await projectionSearch(
      {
        variables: {
          locale,
          text,
          facets,
          queryFilters,
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

export const useGetCategoriesMap = () =>{
  const [categories,{loading}] =  useMcLazyQuery(gql`${FETCH_CATEGORIES_INFO}`);
  
  const executeGetCategories = async(locale) =>{

    const categoriesValues= await categories({
      variables: {
          locale,
        },
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        fetchPolicy:"network-only"
      } 
    );

    let catValues =[];
    console.log('categoriesValues',categoriesValues)

    for(const c of categoriesValues?.data?.categories?.results){

      await getTicketCategories(c,catValues);
    }

    return catValues;
  }


  const getTicketCategories= async (cat,catValues) =>{

    catValues.push({id:cat.id,name:cat.name});

    if(cat.children && cat.children.length > 0){
      for(const c of cat.children){
      await getTicketCategories(c,catValues);
      }
    }
  }
  
  return {
    executeGetCategories,
      loading,
  };
}



