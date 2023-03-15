import {
  useMcQuery,
  useMcMutation,
  useMcLazyQuery,
} from '@commercetools-frontend/application-shell';
import { gql } from '@apollo/client';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {
  PRODUCT_SEARCH_QUERY,
  FETCH_PRODUCT_LIST,
  FETCH_PRODUCT_BY_ID
} from 'ct-tickets-helper-api';

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
  const [useProductSearch, { loading }] = useMcLazyQuery(
    gql`
      ${PRODUCT_SEARCH_QUERY}
    `
  );

  const executeProductSearch = async (text) => {
    return await useProductSearch({
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

export const useFetchProductById = (productId) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_PRODUCT_BY_ID}
    `,
    {
      variables: {
        id: productId,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      fetchPolicy: 'network-only',
    }
  );

  return {
    product: data?.product,
    error,
    loading,
  };
};