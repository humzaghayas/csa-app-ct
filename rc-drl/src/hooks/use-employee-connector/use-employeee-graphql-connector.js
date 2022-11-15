import { useQuery } from '@apollo/client/react';
import FetchEmployeeQuery from './fetch-employee.ctp.graphql';
import FetchChannelDetailsQuery from './fetch-employee-details.ctp.graphql';
import UpdateEmployeeMutation from './update-employee-details.ctp.graphql';
import CreateEmployeeMutation from './create-employee-details.ctp.graphql';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {
  createSyncChannels,
  createSyncCustomers,
} from '@commercetools/sync-actions';

import {
  createGraphQlUpdateActions,
  extractErrorFromGraphQlResponse,
  convertToActionData,
} from '../../helpers';

import {
  createApolloContextForProxyForwardTo,
  useMcQuery,
  useMcMutation,
} from '@commercetools-frontend/application-shell';

export const useEmployeeFetcher = ({ page, perPage, tableSorting }) => {
  const { data, error, loading } = useMcQuery(FetchEmployeeQuery, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
     // uri: 'http://localhost:4459/graphql',
      uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
    },
  });
  return {
    employeePaginatedResult: data?.employees,
    error,
    loading,
  };
};

export const useCompanyEmployeeFetcher = ({ page, perPage, tableSorting ,companyId}) => {
  const { data, error, loading } = useMcQuery(FetchEmployeeQuery, {
    variables: {
      where: `customerGroup(id="${companyId}")`,
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
     // uri: 'http://localhost:4459/graphql',
      uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
    },
  });
  return {
    employeePaginatedResult: data?.employees,
    error,
    loading,
  };
};

export const useEmployeeDetailsFetcher = (id) => {
  const { data, error, loading } = useMcQuery(FetchChannelDetailsQuery, {
    variables: {
      id,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      //uri: 'http://localhost:4459/graphql',
      uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
    },
  });
  return {
    employee: data?.employee,
    error,
    loading,
  };
};

export const useEmployeeDetailsUpdater = () => {
  const [updateEmployeeDetails, { loading }] = useMcMutation(
    UpdateEmployeeMutation
  );

  const sync = createSyncCustomers();
  const execute = async ({ originalDraft, nextDraft }) => {
    const actions1 = sync.buildActions(
      nextDraft,
      convertToActionData(originalDraft)
    );
    try {
      return await updateEmployeeDetails({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
          //uri: 'http://localhost:4459/graphql',
          uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
        },
        variables: {
          id: originalDraft.id,
          version: originalDraft.version,
          storeKey: originalDraft.key,
          actions: createGraphQlUpdateActions(actions1),
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


export const useEmployeeDetailsCreator = () => {
  const [CreateEmployee, { loading }] = useMcMutation(
    CreateEmployeeMutation
  );

  //  const syncStores = createSyncChannels();
    const execute = async ({ nextDraft }) => {
    try {
      return await CreateEmployee({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
          //uri: 'http://localhost:4459/graphql',
          uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
        },
        variables: {
          draft: nextDraft,
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