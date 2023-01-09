import { useQuery } from '@apollo/client/react';
import FetchQuoteQuery from './fetch-myquote.ctp.graphql';
import FetchChannelDetailsQuery from './fetch-myquote-details.ctp.graphql';
import UpdateMyquoteMutation from './update-myquote-details.ctp.graphql';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

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

export const useMyquoteFetcher = ({ page, perPage, tableSorting }) => {
  const { data, error, loading } = useMcQuery(FetchQuoteQuery, {
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
    channelsPaginatedResult: data?.quotes, 
    error,
    loading,
  };
};