import {
    useMcQuery,
    useMcLazyQuery,
     useMcMutation,
  } from '@commercetools-frontend/application-shell';
  import { gql } from '@apollo/client';
  import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
  import { createSyncChannels } from '@commercetools/sync-actions';
  import {
    FETCH_CARTS,
    FETCH_CART_BY_CARTNUMBER, 
    CREATE_SHIPPING_BILLING_ADDRESS, 
    FETCH_ORDER_BY_ID,
    CREATE_ADD_LINEITEM
  } from 'ct-tickets-helper-api';
import { convertToActionData, extractErrorFromGraphQlResponse } from '../../helpers';
  
  export const useCartsFetcher = ({ page, perPage, tableSorting }) => {
  
    const { data, error, loading } =  useMcQuery(gql`${FETCH_CARTS}`, {
      variables: {
        limit: perPage.value,
        offset: (page.value-1)*perPage.value,
        sort: ["id"],
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    });
  
    return {
      cartPaginatedResult: data?.carts,
      error,
      loading,
    };
  };

  export const useFetchCartById = (cartId)=>{
    const { data, error, loading } =  useMcQuery(gql`${FETCH_CART_BY_CARTNUMBER}`, {
      variables: {
        id:cartId
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      fetchPolicy:"network-only"
    });
    
    return {
      cart: data?.cart,
      error,
      loading,
    };
    };

    export const useAddLineItem = (cart)=>{
      const { data, error, loading } =  useMcMutation(gql`${CREATE_ADD_LINEITEM}`, {
        variables: {
          version: cart.version,
          actions:[
            {
              addLineItem:{
                lineItem,
              }
            }
          ]
        },
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        fetchPolicy:"network-only"
      });
      
      return {
       // cart: data?.cart,
        data, 
        error,
        loading,
      };
      };

    export const useShippingAddressCreator = () => {
      const [shippingAddress , { loading }] = useMcMutation(
        gql`${CREATE_SHIPPING_BILLING_ADDRESS}`,
      );
    
        const sync = createSyncChannels();
        const execute = async ({ originalDraft, nextDraft, cart }) => {
          const actions1 = sync.buildActions(
            nextDraft,
            convertToActionData(originalDraft)
          );
          const address = nextDraft;
        try {
          return await shippingAddress({
            context: {
              target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
              //uri: 'http://localhost:4459/graphql',
              //uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
            },
            variables: {
              // id: originalDraft.id,
              //id: "242099f8-09e4-4958-8f44-ef05e1087e49",
              version: 9,
              // actions: [{
              //   CartUpdateAction}]
              actions: [{
                setShippingAddress:{
                  address,
               },
             
            }],
            
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