import {
  useMcQuery,
  useMcMutation,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

import { createSyncCustomers } from '@commercetools/sync-actions';
import {
  createGraphQlUpdateActions,
  extractErrorFromGraphQlResponse,
  convertToActionData,
} from '../../helpers';


import FetchCustomersQuery from './fetch-customers.ctp.graphql';
import FetchCustomerDetailsQuery from './fetch-customers-details.ctp.graphql';
import UpdateCustomerDetailsMutation from './update-customers-details.ctp.graphql';

import FetchCustomerAddressDetailsQuery from './fetch-customers-address-details.ctp.graphql';
import UpdateCustomerAddressDetailsMutation from './update-customers-address-details.ctp.graphql';

import FectchCustomerOrdersListQuery from './fetch-customers-orders.ctp.graphql';

export const useCustomersFetcher = ({ page, perPage, tableSorting }) => {
  const { data, error, loading } = useMcQuery(FetchCustomersQuery, {
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
  const { data, error, loading } = useMcQuery(FetchCustomerDetailsQuery, {
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
    UpdateCustomerDetailsMutation
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
  const { data, error, loading } = useMcQuery(FetchCustomerAddressDetailsQuery, {
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
    UpdateCustomerAddressDetailsMutation
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
    UpdateCustomerAddressDetailsMutation
  );

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
  const { data, error, loading } = useMcQuery(FectchCustomerOrdersListQuery, {
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