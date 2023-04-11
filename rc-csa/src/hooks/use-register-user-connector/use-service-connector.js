import { gql } from '@apollo/client';
import {
  useMcQuery,
  useMcMutation,
  useMcLazyQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import{getForKey,CONSTANTS,FETCH_USERS_INFO,FETCH_CUSTOMER_TICKETS,
  CREATE_CUSTOMOBJECT_MUTATION,
  FETCH_USERS_LIST,FETCH_TICKETS_BY_ID, getCreateTicketDraft, 
  getTicketFromCustomObject ,createTicketHistory} from 'ct-tickets-helper-api'
import { extractErrorFromGraphQlResponse } from '../../helpers';
import { useAsyncDispatch , actions } from '@commercetools-frontend/sdk';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

export const useUserFetcher = (email) => {
  
  const coKey = getForKey(email);

  const { data, error, loading } = useMcQuery(gql`${FETCH_USERS_INFO}`, {
    variables: {
      container: CONSTANTS.USER_CONTAINER,
      key: coKey,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  const foundUser = data?.customObject !== null ? true:false;
  return {
    foundUser
  };
};


export const useCreateEntry = (email) => {
  
  const [createOrUpdateCustomObject, {  loading }] = useMcMutation(gql`${CREATE_CUSTOMOBJECT_MUTATION}`);
  
  const coKey = getForKey(email);

  const draft = {
    container:CONSTANTS.USER_CONTAINER,
    key:coKey,
    value:`{\"email\":\"${email}\"}`
  }
  const execute = async () => {
    try {
      return await createOrUpdateCustomObject({ variables: {
        draft
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      } });
    }catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  }
  return {
    execute
  };
};


export const useCreateOrUpdateTicket = ()=>{

  const dispatch = useAsyncDispatch();
  const {ctCsaBackendURL} = useApplicationContext(
    (context) => ({
      ctCsaBackendURL:context.environment.CT_CSA_BACKEND,
    })
  );

  const apiUrl = ctCsaBackendURL+'/create-ticket-db';

  const execute = async (projectKey,data,operation) => {
    console.log("createTicket");

    const header= {
      'Content-Type': 'application/json',
    }

    const payload = {
      projectKey,
	    data
    }

    const result =await dispatch(
      actions.forwardTo.post({
        uri: apiUrl,
        payload,
        headers: {
          ...header
        },
      })
    );

    return result;
  }

  return {
    execute
  };
};


export const useUserListFetcher = () => {

  const { data, error, loading } = useMcQuery(gql`${FETCH_USERS_LIST}`, {
    variables: {
      container:CONSTANTS.USER_CONTAINER
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });
  
  const getUsersToAssignTo = data?.customObjects?.results?.map((userInfo) => ( {
    label: userInfo.value.email,
    value: userInfo.value.email,
  }));

  return {getUsersToAssignTo}
}


export const useGetTicketById = () => {
  const dispatch = useAsyncDispatch();
  const {ctCsaBackendURL} = useApplicationContext(
    (context) => ({
      ctCsaBackendURL:context.environment.CT_CSA_BACKEND,
    })
  );

  const apiUrl = ctCsaBackendURL+'/ticket-db';

  const getTicketById = async (id) => {
    const header= {
      'Content-Type': 'application/json',
    };

    const result =await dispatch(
      actions.forwardTo.get({
        uri: `${apiUrl}/${id}`,
        headers: {
          ...header
        },
      })
    );

    console.log('ticket update',result);
    return result;
  }

  return {
    getTicketById
  };
}


export const useGetTicketByCustomerEmail= () => {

  const [customObjects, {  loading }] = useMcLazyQuery(gql`${FETCH_CUSTOMER_TICKETS}`);
  
  const execute = async (email) => {
    try {
      return await customObjects({ 
        variables:  {
          [CONSTANTS.CONTAINER]: CONSTANTS.containerKey,
          [CONSTANTS.WHERE]: "value(email=\""+email+"\")"
        },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      } });
    }catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  }
  return {
    execute
  };

}


export const useFetchTicketsList = ()=>{

  const dispatch = useAsyncDispatch();
  const {ctCsaBackendURL} = useApplicationContext(
    (context) => ({
      ctCsaBackendURL:context.environment.CT_CSA_BACKEND,
    })
  );

  const apiUrl = ctCsaBackendURL+'/tickets-list'

  const execute = async (projectKey,variables) => {

    const header= {
      'Content-Type': 'application/json',
    }

    const payload = {
      projectKey,
	    variables
    }

    console.log('apiUrl',apiUrl);

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

  return {
    execute
  };
};