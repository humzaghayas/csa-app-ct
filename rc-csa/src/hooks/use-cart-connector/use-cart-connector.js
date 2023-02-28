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
        //sort: ['id'],
         sort: ["createdAt desc"]
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

// export const useCartUpdateById = () => {
//   const [updateCartByID, { loading }] = useMcMutation(
//     gql`
//       ${UPDATE_CART_BY_ID}
//     `
//   );

//   const sync = createSyncChannels();
//   const execute = async ({ originalDraft, nextDraft, cartId, lineItems }) => {
//     const actions1 = sync.buildActions(
//       nextDraft,
//       convertToActionData(originalDraft)
//     );

//     try {
//       return await updateCartByID({
//         context: {
//           target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
//         },
//         variables: {
//           id: originalDraft.id,
//           version: originalDraft.version,
//           actions: {
//             // changeLineItemQuantity: {
//             //   lineItemId: '7fec1491-2d46-4ac5-acb7-d4e8434d1fc3',
//             //   //lineItemId: lineItems.id,
//             //   quantity: 5,
//             // },
//             addLineItem: {
//               productId: 'd2087232-7d2a-45bc-9b4a-9ce3fc870ba7',
//               variantId: 1,
//               quantity: 4,
//             },
//           },
//         },
//       });
//     } catch (graphQlResponse) {
//       throw extractErrorFromGraphQlResponse(graphQlResponse);
//     }
//   };

//   return {
//     loading,
//     execute,
//   };
// };
