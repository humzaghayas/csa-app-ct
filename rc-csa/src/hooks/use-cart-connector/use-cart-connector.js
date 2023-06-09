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
  UPDATE_CART_BY_ID,
  CONSTANTS,
  FETCH_ACTIVE_CART_COUNT,
  FETCH_ORDER_COUNT,
  FETCH_CART_DISCOUNT_CODES,
  FETCH_SHIPPING_ADDRESS_BY_CART,
  FETCH_SHIPPING_METHODS,
} from 'ct-tickets-helper-api';
import {
  convertToActionData,
  extractErrorFromGraphQlResponse,
} from '../../helpers';

export const useCartsFetcher = ({ page, perPage, tableSorting }) => {
  const { data, error, loading, refetch } = useMcQuery(
    gql`
      ${FETCH_CARTS}
    `,
    {
      variables: {
        where: 'cartState in ("Active","Merged")',

        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        sort: [`${tableSorting.key} ${tableSorting.order}`],
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
    refetch
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
export const useCartUpdateById = () => {
  const [updateCartByID, { loading }] = useMcMutation(
    gql`
      ${UPDATE_CART_BY_ID}
    `
  );

  const executeUpdateCart = async ({ version, actions, cartId }) => {
    console.log('cart hooks');
    console.log(version);
    console.log(actions);
    console.log(cartId);
    return await updateCartByID({
      variables: {
        id: cartId,
        version: version,
        actions: actions,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    });
  };

  return {
    executeUpdateCart,
    loading,
  };
};

export const useGetActiveCartByCustomer = () => {
  const [carts, { loading }] = useMcLazyQuery(
    gql`
      ${FETCH_ACTIVE_CART_COUNT}
    `
  );

  const execute = async (id) => {
    console.log('testetetetette');
    try {
      return await carts({
        variables: {
          [CONSTANTS.WHERE]:
            'cartState="' +
            CONSTANTS.ACTIVE_STATUS +
            '" and customerId="' +
            id +
            '"',
        },
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
      });
    } catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  };
  return {
    execute,
  };
};

export const useGetOrdersByCustomer = () => {
  const [carts, { loading }] = useMcLazyQuery(
    gql`
      ${FETCH_ORDER_COUNT}
    `
  );

  const execute = async (id, statuses) => {
    console.log('testetetetette');
    try {
      return await carts({
        variables: {
          [CONSTANTS.WHERE]:
            'orderState in (' + statuses + ') and customerId="' + id + '"',
        },
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
      });
    } catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  };
  return {
    execute,
  };
};

export const useFetchCartDiscountCodes = () => {
  const { data, loading, error } = useMcQuery(
    gql`
      ${FETCH_CART_DISCOUNT_CODES}
    `,
    {
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      fetchPolicy: 'network-only',
    }
  );

  return {
    discountCodes: data?.discountCodes?.results,
    // discountCodes: data?.cartDiscounts?.results,
    loading,
    error,
  };
};

export const useFetchAddressByCartId = (cartId) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_SHIPPING_ADDRESS_BY_CART}
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

export const useFetchCartShippingMethods = () => {
  const { data, loading, error } = useMcQuery(
    gql`
      ${FETCH_SHIPPING_METHODS}
    `,
    {
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      fetchPolicy: 'network-only',
    }
  );

  return {
    shippingMethods: data?.shippingMethods?.results,
    loading,
    error,
  };
};
