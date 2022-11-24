import { gql } from '@apollo/client';
import {
  useMcQuery,
  useMcMutation,
  useMcLazyQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import{getForKey,CONSTANTS,FETCH_USERS_INFO,CREATE_CUSTOMOBJECT_MUTATION,FETCH_USERS_LIST,FETCH_TICKETS_BY_ID} from 'ct-tickets-helper-api'
import { getCreateTicketDraft, getTicketFromCustomObject } from 'ct-tickets-helper-api';
import { extractErrorFromGraphQlResponse } from '../../helpers';

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


  const [createOrUpdateCustomObject, {  loading }] = useMcMutation(gql`${CREATE_CUSTOMOBJECT_MUTATION}`);

  const execute = async (data) => {
    console.log("createTicket");

    const ticketDraft = await getCreateTicketDraft(data);
    try {
      return await createOrUpdateCustomObject({ variables: {
        draft: ticketDraft,
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


export const useUserListFetcher = () => {

  const { data, error, loading } = useMcQuery(gql`${FETCH_USERS_LIST}`, {
    variables: {
      container:CONSTANTS.USER_CONTAINER
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });


  console.log('assign to ',data)
  const getUsersToAssignTo = data?.customObjects?.results?.map((userInfo) => ( {
    label: userInfo.value.email,
    value: userInfo.value.email,
  }));

  return {getUsersToAssignTo}
}


export const useGetTicketById = (id) => {
  const { data, error, loading } = useMcQuery(gql`${FETCH_TICKETS_BY_ID}`, {
    variables: {
      id
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  const ticket = getTicketFromCustomObject(data);

  return{
    ticket
  }
}