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

import UpdateCustomerDetailsMutation from './update-customers-details.ctp.graphql';

import FetchCustomersQuery from './fetch-customers.ctp.graphql';
import FetchCustomerDetailsQuery from './fetch-customers-details.ctp.graphql';

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