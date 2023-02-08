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
  CREATE_EDIT_CART_BY_ID,
  CREATE_SHIPPING_BILLING_ADDRESS,
  FETCH_ORDER_BY_ID,
  CREATE_ADD_LINEITEM,
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
// export const useCreateCartEditById = () => {
//   const [createCartEdit, { loading }] = useMcMutation(
//     gql`
//       ${CREATE_EDIT_CART_BY_ID}
//     `
//   );

//   const executeCreateCartEdit = async (draft) => {
//     // console.log("In use orders connectors")
//     // console.log(draft);
//     return await createCartEdit({
//       variables: {
//         draft,
//       },
//       context: {
//         target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
//       },
//     });
//   };

//   return {
//     executeCreateCartEdit,
//     loading,
//   };
// };
export const useCartEditApply = () => {
  const { projectKey } = useApplicationContext((context) => ({
    projectKey: context.project.key,
  }));

  const dispatch = useAsyncDispatch();
  const executeCartEditApply = async (payload, cartEditId) => {
    const result = await dispatch(
      actions.post({
        mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
        uri: projectKey + '/cart/edits/' + cartEditId + '/apply',
        payload,
      })
    );
    return result;
  };

  return {
    executeCartEditApply,
  };
};

// export const useAddLineItem = (cart)=>{
//   const { data, error, loading } =  useMcMutation(gql`${CREATE_ADD_LINEITEM}`, {
//     variables: {
//       version: cart.version,
//       actions:[
//         {
//           addLineItem:{
//             lineItem,
//           }
//         }
//       ]
//     },
//     context: {
//       target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
//     },
//     fetchPolicy:"network-only"
//   });

//   return {
//    // cart: data?.cart,
//     data,
//     error,
//     loading,
//   };
//   };

// export const useShippingAddressCreator = () => {
//   const [shippingAddress , { loading }] = useMcMutation(
//     gql`${CREATE_SHIPPING_BILLING_ADDRESS}`,
//   );

//     const sync = createSyncChannels();
//     const execute = async ({ originalDraft, nextDraft, cart }) => {
//       const actions1 = sync.buildActions(
//         nextDraft,
//         convertToActionData(originalDraft)
//       );
//       const address = nextDraft;
//     try {
//       return await shippingAddress({
//         context: {
//           target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
//           //uri: 'http://localhost:4459/graphql',
//           //uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
//         },
//         variables: {
//           // id: originalDraft.id,
//           //id: "242099f8-09e4-4958-8f44-ef05e1087e49",
//           version: 9,
//           // actions: [{
//           //   CartUpdateAction}]
//           actions: [{
//             setShippingAddress:{
//               address,
//            },

//         }],

//       },
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
