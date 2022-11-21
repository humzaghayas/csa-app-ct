import { useQuery } from '@apollo/client/react';
import FetchQuoteQuery from './fetch-quote.ctp.graphql';
import queryQuote from './FetchQuote.graphql';
import UpdateQuoteCreateMutation from './update-quote-details.ctp.graphql';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { createSyncChannels,createSyncCustomers } from '@commercetools/sync-actions';

import UpdateQuote from './UpdateQuote.graphql';

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

export const useQuoteFetcher = ({ page, perPage, tableSorting }) => {
  const { data, error, loading } = useMcQuery(FetchQuoteQuery, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      //uri: 'http://localhost:4459/graphql',
      uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
    },
  });

  return {
    channelsPaginatedResult: data?.quotes,
    error,
    loading,
  };
};

export const useQuoteCreateFetcher = (id) => {
  const { data, error, loading } = useMcQuery(queryQuote, {
    variables: {
      id,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
     // uri: 'http://localhost:4459/graphql',
    },
  });
  return {
    quote: data?.quote,
    error,
    loading,
  };
};


export const useQuoteStateUpdater = () => {
  const [updateQuoteState, { loading }] = useMcMutation(
    UpdateQuote
  );

  const execute = async ({ state, quote }) => {
    try {
      return await updateQuoteState({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
         // uri: 'http://localhost:4459/graphql',
         uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
        },
        variables: {
          id: quote.id,
          version: quote.version,
          actions: [
            {
              changeState: {
                state,
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


export const useUpdateQuoteItems = () => {
  const [updateQuoteItems, { loading }] = useMcMutation(
    UpdateQuote
  );

  const execute = async ({ quote,lineItems }) => {
    try {
      return await updateQuoteItems({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
         // uri: 'http://localhost:4459/graphql',
         uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
        },
        variables: {
          version: quote.version,
          id: quote.id,
          actions: lineItems.map(lineItem => ({
            setLineItemPrice: {
              lineItemId: lineItem.id,
              externalPrice: {
                centPrecision: {
                  currencyCode: lineItem.price.value.currencyCode,
                  centAmount: lineItem.price.value.centAmount,
                },
              },
            },
          })),
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


export const useUpdateAmountDiscount = () => {
  const [updateAmountDiscount, { loading }] = useMcMutation(
    UpdateQuote
  );

  const execute = async ({ quote,currencyCode, centAmount }) => {
    try {
      return await updateAmountDiscount({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
         // uri: 'http://localhost:4459/graphql',
         uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
        },
        variables: {
          version: quote.version,
          id: quote.id,
          actions: [
            {
              setAmountDiscount: {
                amountDiscount: { currencyCode, centAmount },
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


export const useUpdatePercenatgeDiscount = () => {
  const [updatePercentageDiscount, { loading }] = useMcMutation(
    UpdateQuote
  );

  const execute = async ({ quote,percentage }) => {
    try {
      return await updatePercentageDiscount({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
          uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
         // uri: 'http://localhost:4459/graphql',
        },
        variables: {
          version: quote.version,
          id: quote.id,
          actions: [
            {
              setPercentageDiscount: {
                percentage,
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