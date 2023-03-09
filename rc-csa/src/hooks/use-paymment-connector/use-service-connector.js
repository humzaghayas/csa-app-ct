import { gql } from '@apollo/client';
import {
   useMcQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import{CONSTANTS,FETCH_PAYMENTS_TO_DISPLAY,getPaymentList} from 'ct-tickets-helper-api'
import { extractErrorFromGraphQlResponse } from '../../helpers';


export const useGetPaymentsByCustomer= (customerId,offset,limit) => {

  const {data, error, loading,refetch} = useMcQuery(gql`${FETCH_PAYMENTS_TO_DISPLAY}`,{ 
        variables:  {
          [CONSTANTS.WHERE]: "customerId=\""+customerId+"\" and paymentInfo is defined",
          [CONSTANTS.OFFSET]: 0,
          [CONSTANTS.LIMIT]: 10,

        },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      } });

      const paymentList =getPaymentList(data?.orders);

      console.log('Payemtns:',paymentList);
      const total = data?.orders? data?.orders.total:0;
  return {
    paymentList,
    total,
    refetch
  };

}