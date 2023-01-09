import {
  createApolloContextForProxyForwardTo,
  useMcQuery,
  useMcMutation,
} from '@commercetools-frontend/application-shell';

import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { createSyncEmployee } from '@commercetools/sync-actions';
import {
  createGraphQlUpdateActions,
  extractErrorFromGraphQlResponse,
  convertToActionData,
} from '../../helpers';
import FetchMyquoteQuery from './fetch-myquote.ctp.graphql';
import FetchMyquoteDetailsQuery from './fetch-myquote.ctp.graphql';
import UpdateMyquoteDetailsMutation from './update-myquote-details.ctp.graphql';

import { useAsyncDispatch, actions } from '@commercetools-frontend/sdk';
import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';
import { useState,useEffect } from 'react';


export const useMyquoteFetcher = ({ page, perPage, tableSorting }) => {

  const dispatch = useAsyncDispatch();
  const [res, setRes] = useState()

  useEffect(() => {
    async function execute() {
      try {
        const variables ={"limit":20,"offset":0,"sort":["key asc"]}
  
        const payload =
        {"operationName":"FetchMyquoteQuery","variables":{"limit":20,"offset":0,"sort":["key asc"]},"query":"query FetchMyquoteQuery($where: String, $limit: Int, $offset: Int, $sort: [String!]) {\n  employees(where: $where, limit: $limit, offset: $offset, sort: $sort) {\n    total\n    count\n    offset\n    results {\n      ...MyquoteListFragment\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment MyquoteListFragment on MyquoteItem {\n  id\n  version\n  createdAt\n  lastModifiedAt\n  employeeNumber\n  externalId\n  firstName\n  lastName\n  companyName\n  email\n  customerGroup {\n    id\n    version\n    name\n    key\n    __typename\n  }\n  createdAt\n  lastModifiedAt\n  middleName\n  vatId\n  dateOfBirth\n  roles\n  amountExpended {\n    currencyCode\n    centAmount\n    __typename\n  }\n  stores {\n    key\n    nameAllLocales {\n      locale\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}"}
        const result = await dispatch(
          // actions.get({
          //   mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
          //   service: 'channels',
          // })

          actions.forwardTo.get({
            uri: 'https://ms-company-f4b4o225iq-ue.a.run.app/?page=1&perPage=20&sortDirection=asc',
            payload: { variables: JSON.stringify(variables), query:FetchMyquoteQuery },
          })
          
          // actions.forwardTo.post({
          //   uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
          //   payload:payload,
          //   includeUserPermissions:true,
          //   headers:{
          //     "content-type":"application/json",
          //   }
          // })
 
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


//   const externalApiUrl = useApplicationContext(
//     context => 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql'
//   );
//   const { data, error, loading } = useMcQuery(FetchEmployeeQuery, {
//     variables: {
//       limit: perPage.value,
//       offset: (page.value - 1) * perPage.value,
//       sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
//     },
//     context: createApolloContextForProxyForwardTo({
//       uri: externalApiUrl,
//       includeUserPermissions: false
//     }),
//     // context: {
//     //   target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
//     //   uri:'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
//     // },

//  });

//  if(error){
//   console.error(error)
//  }

  return {
    employeePaginatedResult: res?.employee,
    undefined,undefined
  };
};
// export const useEmployeeFetcher = () => {
//   // Assuming that the `custom-application-config.json` contains the custom value:
//   // `{ additionalEnv: { externalApiUrl: 'https://my-custom-app.com/graphql'} }`
//   const externalApiUrl =  'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql'
//   const { loading, data, error } = useMcQuery(FetchEmployeeQuery, {
//     context: createApolloContextForProxyForwardTo({
//       // The URL to your external API
//       uri: externalApiUrl,
//       // Provide custom HTTP headers (optional)
//       headers: {
//         'method': 'get',
//       },
//       // Set `"X-Forward-To-Audience-Policy"` header in the request with provided value (optional)
//       audiencePolicy: 'forward-url-full-path',
//       // Set `"X-Forward-To-Claims": "permissions"` header in the request (optional)
//       includeUserPermissions: true
//     }),
//   });

//   return {
//     loading,
//     data,
//     error,
//   }
// };

export const useMyquoteDetailsFetcher = (myquoteId) => {
  const { data, error, loading } = useMcQuery(FetchMyquoteDetailsQuery, {
    variables: {
      myquoteId,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    employee: data?.employee,
    error,
    loading,
  };
};

export const useMyquoteDetailsUpdater = () => {
  const [updateMyquoteDetails, { loading }] = useMcMutation(
    UpdateMyquoteDetailsMutation
  );

  const syncStores = createSyncMyquote();
  const execute = async ({ originalDraft, nextDraft }) => {
    const actions = syncStores.buildActions(
      nextDraft,
      convertToActionData(originalDraft)
    );
    try {
      return await updateMyquoteDetails({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          myquoteId: originalDraft.id,
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
