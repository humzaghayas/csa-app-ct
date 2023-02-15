import {
  useMcQuery,
  useMcLazyQuery,
  useMcMutation,
} from '@commercetools-frontend/application-shell';
import { gql } from '@apollo/client';
import { useAsyncDispatch, actions } from '@commercetools-frontend/sdk';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { createSyncChannels } from '@commercetools/sync-actions';
import {
  FETCH_CARTS,
  FETCH_CART_BY_CARTNUMBER,
  CREATE_ORDER_FROMCART,
} from 'ct-tickets-helper-api';
import {
  convertToActionData,
  extractErrorFromGraphQlResponse,
} from '../../helpers';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

export const useCartsFetcher = ({ page, perPage, tableSorting }) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_CARTS}
    `,
    {
      variables: {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        sort: ['id'],
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );

  return {
    cartPaginatedResult: data?.carts,
    error,
    loading,
  };
};

export const useFetchCartById = (cartId) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_CART_BY_CARTNUMBER}
    `,
    {
      variables: {
        id: cartId,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      fetchPolicy: 'network-only',
    }
  );

  return {
    cart: data?.cart,
    error,
    loading,
  };
};

export const usePlaceOrderFromCart = () => {
  const [placeOrder, { loading }] = useMcMutation(
    gql`
      ${CREATE_ORDER_FROMCART}
    `
  );

  const sync = createSyncChannels();
  const execute = async ({ originalDraft, nextDraft, cartId }) => {
    const actions1 = sync.buildActions(
      nextDraft,
      convertToActionData(originalDraft)
    );
    try {
      return await placeOrder({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
          //uri: 'http://localhost:4459/graphql',
          //uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
        },
        variables: {
          id: cartId,
          draft: {
            cart: {
              id: originalDraft.id,
              //id: '3c2b29bd-8c8d-47d3-8975-ff8557d8fe61',
            },
            version: originalDraft.version,
          },
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
