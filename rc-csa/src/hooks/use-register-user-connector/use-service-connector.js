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

  const execute = async (data,operation) => {
    console.log("createTicket");

    let ticketDraft = await getCreateTicketDraft(data);

    await createTicketHistory(data,ticketDraft,operation);
    try {
      return await createOrUpdateCustomObject({ variables: {
        draft: ticketDraft,
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      } });
    }catch (graphQlResponse) {

      console.error(graphQlResponse);
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
    fetchPolicy:"network-only"
  });

  const ticket = getTicketFromCustomObject(data);

  return{
    ticket
  }
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