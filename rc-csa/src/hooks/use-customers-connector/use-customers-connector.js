import {
  useMcQuery,
  useMcMutation,
  useMcLazyQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

import { createSyncCustomers } from '@commercetools/sync-actions';
import {
  createGraphQlUpdateActions,
  extractErrorFromGraphQlResponse,
  convertToActionData,
} from '../../helpers';
import { useAsyncDispatch , actions } from '@commercetools-frontend/sdk';
import {
  FETCH_CUSTOMERS_GRAPHQL,
  FETCH_CUSTOMERS_ADDRESS_DETAILS,
  FETCH_CUSTOMERS_DETAILS,
  FETCH_CUSTOMERS_ORDERS,
  UPDATE_CUSTOMERS_ADDRESS_DETAILS,
  UPDATE_CUSTOMERS_DETAILS,
  FETCH_CUSTOMER_PAYMENTS,
  FETCH_CUSTOMER_CARTS,
  FETCH_CUSTOMER_ADDRESSES,
  FETCH_CUSTOMER_PROMOTIONS,
  FETCH_CUSTOMER_PROMOTIONS_LIST,
  UPDATE_CUSTOMER_PROMOTIONS,
  FETCH_PROMOTIONS_LIST,
  FETCH_CUSTOMERS_WISHLIST,
  FETCH_CUSTOMERS_SHOPPINGLIST,
  FETCH_QUOTES_LIST
} from 'ct-tickets-helper-api';

import { gql } from '@apollo/client';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

export const useCustomersFetcher = ({ page, perPage, tableSorting }) => {
  const { data, error, loading,refetch } = useMcQuery(
    gql`
      ${FETCH_CUSTOMERS_GRAPHQL}
    `,
    {
      variables: {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );

  return {
    customersPaginatedResult: data?.customers,
    error,
    loading,
    refetch
  };
};

export const useCustomerDetailsFetcher = (id) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_CUSTOMERS_DETAILS}
    `,
    {
      variables: {
        id,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );

  return {
    customer: data?.customer,
    error,
    loading,
  };
};

export const useCustomerDetailsUpdater = () => {
  const [updateCustomerDetails, { loading }] = useMcMutation(
    gql`
      ${UPDATE_CUSTOMERS_DETAILS}
    `
  );

  const syncStores = createSyncCustomers();
  const execute = async ({ originalDraft, nextDraft }) => {
    const actions = syncStores.buildActions(
      nextDraft,
      convertToActionData(originalDraft)
    );
    try {
      return await updateCustomerDetails({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          id: originalDraft.id,
          version: originalDraft.version,
          actions: createGraphQlUpdateActions(actions),
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

export const useCustomerAddressDetailsFetcher = (id) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_CUSTOMERS_ADDRESS_DETAILS}
    `,
    {
      variables: {
        id,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );

  return {
    customerAddress: data?.customer,
    error,
    loading,
  };
};

export const useCustomerAddressDetailsUpdater = () => {
  const [updateCustomerDetails, { loading }] = useMcMutation(
    gql`
      ${UPDATE_CUSTOMERS_ADDRESS_DETAILS}
    `
  );

  const syncStores = createSyncCustomers();
  const execute = async ({ originalDraft, nextDraft, addressId }) => {
    const actions = syncStores.buildActions(
      nextDraft,
      convertToActionData(originalDraft)
    );
    console.log('actions', actions);
    const address = nextDraft;

    try {
      return await updateCustomerDetails({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          customerId: originalDraft.id,
          version: originalDraft.version,
          actions: [
            {
              changeAddress: {
                addressId: addressId,
                address,
              },
            },
          ],
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

export const useCustomerAddressDetailsCreator = () => {
  const [CreateCustomerAddress, { loading }] = useMcMutation(
    gql`
      ${UPDATE_CUSTOMERS_ADDRESS_DETAILS}
    `
  );
  console.log(
    '===========================customer address update ====================='
  );
  const syncStores = createSyncCustomers();
  const execute = async ({ originalDraft, nextDraft }) => {
    const actions1 = syncStores.buildActions(
      nextDraft,
      convertToActionData(originalDraft)
    );
    const address = nextDraft;
    try {
      return await CreateCustomerAddress({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        // variables: {
        //   id: originalDraft.id,
        //   draft: nextDraft,
        //   actions: createGraphQlUpdateActions(actions),
        // },
        variables: {
          customerId: originalDraft.id,
          version: originalDraft.version,
          actions: [
            {
              addAddress: {
                address,
              },
            },
          ],
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

export const useCustomersOrdersFetcher = ({
  page,
  perPage,
  tableSorting,
  customerId,
}) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_CUSTOMERS_ORDERS}
    `,
    {
      variables: {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
        where: 'customerId=' + '"' + customerId + '"',
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );

  return {
    customersOrderPaginatedResult: data?.orders,
    error,
    loading,
  };
};

export const useCustomersPaymentsFetcher = ({
  page,
  perPage,
  tableSorting,
  customerId,
}) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_CUSTOMER_PAYMENTS}
    `,
    {
      variables: {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
        where: 'customer(id="' + customerId + '")',
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );

  return {
    customersPaymentsPaginatedResult: data?.payments,
    error,
    loading,
  };
};

export const useCustomerDetailsFetcherLazy = () => {
  const [customer, { loading }] = useMcLazyQuery(
    gql`
      ${FETCH_CUSTOMERS_DETAILS}
    `
  );

  const getCustomerById = async (id) => {
    try {
      return await customer({
        variables: {
          id,
        },
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
      });
    } catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  };

  return { getCustomerById };
};

export const useCustomersCartsFetcher = ({
  page,
  perPage,
  tableSorting,
  customerId,
}) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_CUSTOMER_CARTS}
    `,
    {
      variables: {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
        where: 'customerId=' + '"' + customerId + '"',
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );

  return {
    customersCartPaginatedResult: data?.carts,
    error,
    loading,
  };
};

export const useCustomerAddressesFetcher = (id) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_CUSTOMER_ADDRESSES}
    `,
    {
      variables: {
        id,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );

  return {
    customer: data?.customer,
    error,
    loading,
  };
};

export const useCustomersWishlistFetcher = ({
  page,
  perPage,
  tableSorting,
  customerId,
}) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_CUSTOMERS_WISHLIST}
    `,
    {
      variables: {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
        where: 'customer(id="' + customerId + '") and custom is defined',
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );

  return {
    customersWishlistPaginatedResult: data?.shoppingLists,
    error,
    loading,
  };
};

export const useCustomersShoppinglistFetcher = ({
  page,
  perPage,
  tableSorting,
  customerId,
}) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_CUSTOMERS_SHOPPINGLIST}
    `,
    {
      variables: {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
        where: 'customer(id="' + customerId + '") and custom is not defined',
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );

  return {
    customersWishlistPaginatedResult: data?.shoppingLists,
    error,
    loading,
  };
};

export const useCustomerPromotionFetcher = (id) => {
  const { data, error, loading } = useMcQuery(
    gql`
      ${FETCH_CUSTOMER_PROMOTIONS}
    `,
    {
      variables: {
        id,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );

  return {
    customer: data?.customer,
    error,
    loading,
  };
};

export const usePromotionSearchByKey = () => {
  const [promotionSearch, { loading }] = useMcLazyQuery(
    gql`
      ${FETCH_CUSTOMER_PROMOTIONS_LIST}
    `
  );

  const executePromotionSearch = async (key) => {
    return await promotionSearch({
      variables: {
        sort: [`createdAt`],
        where: `key=\"${key}\"`,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      fetchPolicy: 'network-only',
    });
  };

  return {
    executePromotionSearch,
    loading,
  };
};

export const useCustomerPromotionsAdder = () => {
  const [updateCustomerPromotion, { loading }] = useMcMutation(
    gql`
      ${UPDATE_CUSTOMER_PROMOTIONS}
    `
  );

  const execute = async ({ id, version, actions }) => {
    try {
      console.log(id, version, actions);
      return await updateCustomerPromotion({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          id: id,
          verison: version,
          actions: actions,
        },
      });
    } catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  };

  return {
    execute,
    loading,
  };
};

export const useFetchPromotionsList = () => {
  const { data, error, loading } = useMcQuery(gql`${FETCH_PROMOTIONS_LIST}`,
    {
      variables: {
        sort: [`createdAt`],
        where: `isActive=\"true\"`,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    }
  );

  return {
    promotions: data?.cartDiscounts?.results,
    error,
    loading,
  };
};

export const useCustomersQuotesFetcher =() => {

  const dispatch = useAsyncDispatch();
  const atgPublicURL = useApplicationContext(
    (context) => context.environment.atgPublicURL
  );
  

 const execute = async (customerId,apiUrl) => {
    // const data= loginATG(apiUrl,headers, payload ,dispatch );

    const header= {
      'Content-Type': 'application/json',
    }

    const payload ={
      "page":1,
      "perPage":10,
      customerId
    }

    const data =await dispatch(
      actions.forwardTo.post({
        uri: apiUrl,
        payload,
        headers: {
          ...header
        },
      })
    );


    return data;
  }

  return {execute};
};