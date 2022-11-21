import {
    createApolloContextForProxyForwardTo,
    useMcQuery,
    useMcMutation,
  } from '@commercetools-frontend/application-shell';
  
  import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
  import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
  import { createSyncQuote } from '@commercetools/sync-actions';
  import {
    createGraphQlUpdateActions,
    extractErrorFromGraphQlResponse,
    convertToActionData,
  } from '../../helpers';
  import FetchQuoteQuery from './fetch-quote.ctp.graphql';
  import FetchQuoteDetailsQuery from './fetch-quote.ctp.graphql';
  import UpdateQuoteDetailsMutation from './update-quote-details.ctp.graphql';
  
  import { useAsyncDispatch, actions } from '@commercetools-frontend/sdk';
  import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';
  import { useState,useEffect } from 'react';
  
  
  export const useQuoteFetcher = ({ page, perPage, tableSorting }) => {
  
    const dispatch = useAsyncDispatch();
    const [res, setRes] = useState()
  
    useEffect(() => {
      async function execute() {
        try {
          const variables ={"limit":20,"offset":0,"sort":["key asc"]}
    
          const payload =
          {"operationName":"FetchQuoteQuery","variables":{"limit":20,"offset":0,"sort":["key asc"]},"query":"query FetchQuoteQuery($where: String, $limit: Int, $offset: Int, $sort: [String!]) {\n  quotes(where: $where, limit: $limit, offset: $offset, sort: $sort) {\n    total\n    count\n    offset\n    results {\n      ...QuoteListFragment\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment QuoteListFragment on QuoteItem {\n  id\n  version\n  createdAt\n  lastModifiedAt\n  quoteNumber\n  externalId\n  firstName\n  lastName\n  companyName\n  email\n  customerGroup {\n    id\n    version\n    name\n    key\n    __typename\n  }\n  createdAt\n  lastModifiedAt\n  middleName\n  vatId\n  dateOfBirth\n  roles\n  amountExpended {\n    currencyCode\n    centAmount\n    __typename\n  }\n  stores {\n    key\n    nameAllLocales {\n      locale\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}"}
          const result = await dispatch(
            // actions.get({
            //   mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
            //   service: 'channels',
            // })
  
            actions.forwardTo.get({
              uri: 'https://ms-company-f4b4o225iq-ue.a.run.app/?page=1&perPage=20&sortDirection=asc',
              payload: { variables: JSON.stringify(variables), query:FetchQuoteQuery },
            })
            
          );
  
          if(!res) throw new Error("NO Result ")
          setRes(result)
  
          // Update state with `result`
        } catch (error) {
          // Update state with `error`
          console.log("errorLogged+++"+error)
        }
      }
      execute();
    }, [dispatch])
  
  
    return {
      quotePaginatedResult: res?.quote,
      undefined,undefined
    };
  };
  
  export const useQuoteCreateFetcher = (quoteId) => {
    const { data, error, loading } = useMcQuery(FetchQuoteDetailsQuery, {
      variables: {
        quoteId,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
    });
  
    return {
      quote: data?.quote,
      error,
      loading,
    };
  };
  
  export const useQuoteCreateUpdater = () => {
    const [updateQuoteCreate, { loading }] = useMcMutation(
      UpdateQuoteCreateMutation
    );
  
    const syncStores = createSyncQuote();
    const execute = async ({ originalDraft, nextDraft }) => {
      const actions = syncStores.buildActions(
        nextDraft,
        convertToActionData(originalDraft)
      );
      try {
        return await updateQuoteCreate({
          context: {
            target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
          },
          variables: {
            quoteId: originalDraft.id,
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
  