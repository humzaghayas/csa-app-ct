import { gql } from '@apollo/client';
import {
  useMcQuery,
  useMcMutation,
  useMcLazyQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import{getForKey,CONSTANTS,FETCH_ORDER_INFO_BY_ORDERNUMBER, getCreateTicketDraft, getTicketFromCustomObject } from 'ct-tickets-helper-api'

import { extractErrorFromGraphQlResponse } from '../../helpers';

export const useOrderService = ()=>{


  const [order, {  loading }] = useMcLazyQuery(gql`${FETCH_ORDER_INFO_BY_ORDERNUMBER}`);

  const execute = async (orderNumber) => {
    console.log("Fetch Order");

    try {
      return await order({ variables: {
        orderNumber,
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
