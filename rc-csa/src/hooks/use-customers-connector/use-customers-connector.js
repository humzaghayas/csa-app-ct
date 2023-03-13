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

import {FETCH_CUSTOMERS_GRAPHQL, FETCH_CUSTOMERS_ADDRESS_DETAILS,
  FETCH_CUSTOMERS_DETAILS, FETCH_CUSTOMERS_ORDERS, UPDATE_CUSTOMERS_ADDRESS_DETAILS,
  UPDATE_CUSTOMERS_DETAILS, FETCH_CUSTOMER_PAYMENTS, FETCH_CUSTOMER_CARTS} from 'ct-tickets-helper-api';
  
import { gql } from '@apollo/client';


export const useCustomersFetcher = ({ page, perPage, tableSorting }) => {
  const { data, error, loading } = useMcQuery(gql`${FETCH_CUSTOMERS_GRAPHQL}`, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    customersPaginatedResult: data?.customers,
    error,
    loading,
  };
};

export const useCustomerDetailsFetcher = (id) => {
  const { data, error, loading } = useMcQuery(gql`${FETCH_CUSTOMERS_DETAILS}`, {
    variables: {
      id,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    customer: data?.customer,
    error,
    loading,
  };
};

export const useCustomerDetailsUpdater = () => {
  const [updateCustomerDetails, { loading }] = useMcMutation(
    gql`${UPDATE_CUSTOMERS_DETAILS}`
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
  const { data, error, loading } = useMcQuery(gql`${FETCH_CUSTOMERS_ADDRESS_DETAILS}`, {
    variables: {
      id,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    customerAddress: data?.customer,
    error,
    loading,
  };
};

export const useCustomerAddressDetailsUpdater = () => {
  const [updateCustomerDetails, { loading }] = useMcMutation(
    gql`${UPDATE_CUSTOMERS_ADDRESS_DETAILS}`
  );

  const syncStores = createSyncCustomers();
  const execute = async ({ originalDraft, nextDraft,addressId }) => {
    const actions = syncStores.buildActions(
      nextDraft,
      convertToActionData(originalDraft)
    );
    console.log("actions",actions);
    const address = nextDraft;
    
    try {
      return await updateCustomerDetails({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          customerId: originalDraft.id,
          version: originalDraft.version,
          actions: [{
            changeAddress:{
              addressId:addressId,
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


export const useCustomerAddressDetailsCreator = () => {
  const [CreateCustomerAddress, { loading }] = useMcMutation(
    gql`${UPDATE_CUSTOMERS_ADDRESS_DETAILS}`
  );
    console.log("===========================customer address update =====================")
  const syncStores = createSyncCustomers();
    const execute = async ({ originalDraft,nextDraft }) => {
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
          actions: [{
            addAddress:{
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

export const useCustomersOrdersFetcher = ({ page, perPage, tableSorting, customerId}) => {
  const { data, error, loading } = useMcQuery(gql`${FETCH_CUSTOMERS_ORDERS}`, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
      where:"customerId="+'"'+customerId+'"',
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    customersOrderPaginatedResult: data?.orders,
    error,
    loading,
  };
};

export const useCustomersPaymentsFetcher = ({ page, perPage, tableSorting, customerId}) => {
  const { data, error, loading } = useMcQuery(gql`${FETCH_CUSTOMER_PAYMENTS}`, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
      where:"customer(id=\""+customerId+"\")",
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    customersPaymentsPaginatedResult: data?.payments,
    error,
    loading,
  };
};


export const useCustomerDetailsFetcherLazy = () => {

  const [customer, {  loading }] = useMcLazyQuery(gql`${FETCH_CUSTOMERS_DETAILS}`);

 const getCustomerById =async (id) =>{
  try {
    return await customer({ 
      variables:  {
        id,
      },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    } });
  }catch (graphQlResponse) {
    throw extractErrorFromGraphQlResponse(graphQlResponse);
  }
 }

 return {getCustomerById}
};

export const useCustomersCartsFetcher = ({ page, perPage, tableSorting, customerId}) => {
  const { data, error, loading } = useMcQuery(gql`${FETCH_CUSTOMER_CARTS}`, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
      where:"customerId="+'"'+customerId+'"',
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    customersCartPaginatedResult: data?.carts,
    error,
    loading,
  };
};