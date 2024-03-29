import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../../../constants';
import { Pagination } from '@commercetools-uikit/pagination';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import DataTable from '@commercetools-uikit/data-table';

import Spacings from '@commercetools-uikit/spacings';
import { useCustomersQuotesFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
import Text from '@commercetools-uikit/text';
import IconButton from '@commercetools-uikit/icon-button';
import { ClipboardIcon } from '@commercetools-uikit/icons';
import { useCreateOrderFromQuote } from '../../../../hooks/use-orders-connector/use-orders-connector';

const columns = [

  { key: 'customer', label: 'Customer' },
  { key: 'totalPrice', label: 'Total' },
  { key: 'quoteState', label: 'Status' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'lastModifiedAt', label: 'Last Modified' },
  { key: 'validTo', label: 'Valid Until' },
  { key: 'createOrder', label: 'Create Order' },
];

const columnsQR = [

  { key: 'customer', label: 'Customer' },
  { key: 'totalPrice', label: 'Total' },
  { key: 'quoteRequestState', label: 'Status' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'lastModifiedAt', label: 'Last Modified' },
  { key: 'validTo', label: 'Valid Until' }
];

const columnsSQ = [

  { key: 'customer', label: 'Customer' },
  { key: 'totalPrice', label: 'Total' },
  { key: 'stagedQuoteState', label: 'Status' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'lastModifiedAt', label: 'Last Modified' },
  { key: 'validTo', label: 'Valid Until' },
];

let createOrderButtonClicked = false;




const itemRendererStaged = (item,column) => {
  switch(column.key){
      case 'validTo':
          return item?.validTo ? item?.validTo : '--'
      case 'customer':
          return item?.customer?.email;
      case 'totalPrice' :
          return item?.quotationCart?.totalPrice?.centAmount/100+'$';
      default:
          return item[column.key];
  }
}


const CustomerQuotes = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();

  const { pageQR, perPageQR } = usePaginationState();
  const params = useParams();
  const tableSorting = useDataTableSortingState('createdAt desc');
  const customerId = params.id;

  const [quotes,setQuotes] = useState(null);
  const [quotesRequests,setQuotesRequests] = useState(null);
  const [quotesStaged,setQuotesStaged] = useState(null);

  const {entryPointUriPath,projectKey} = useApplicationContext(
    (context) => ({
      entryPointUriPath:context.environment.entryPointUriPath,
      projectKey:context.project.key
  }));


  const { execute } = useCustomersQuotesFetcher();
  const { executeCreateOrderFromQuote } = useCreateOrderFromQuote();

  const itemRenderer = (item,column) => {
    switch(column.key){
        case 'validTo':
            return item?.validTo ? item?.validTo : '--'
        case 'customer':
            return item?.customer?.email;
        case 'totalPrice' :
            return item?.totalPrice?.centAmount/100+'$';
        case 'createOrder' :
            return <>
            <IconButton
              icon={<ClipboardIcon/>}
              label='Create Order'
              onClick={async ()=>{
                console.log(item);
                createOrderButtonClicked=true;

                const draft = {
                  quote:{
                    typeId:"quote",
                    id:item?.id
                  },
                  version:item?.version ? item?.version : 1  
                }

                try{
                  const data = await executeCreateOrderFromQuote(draft);
                  const orderId = data?.data?.createOrderFromQuote?.id;
                  push(`/${projectKey}/csa-customer-tickets/order-edit/${orderId}/orders-general`)
                }catch(ex){
                  console.log(ex);
                }
              }}
            />
            </>;
        default:
            return item[column.key];
    }
}



  console.log('params.id',customerId);
  const apiUrlQuotes = `https://us-central1-commerce-tools-b2b-services.cloudfunctions.net/tickets/customer-quotes`;
  const apiUrlQuotesReq = `https://us-central1-commerce-tools-b2b-services.cloudfunctions.net/tickets/customer-quotes-requests`;
  const apiUrlQuotesStaged = `https://us-central1-commerce-tools-b2b-services.cloudfunctions.net/tickets/customer-quotes-staged`;  
  useEffect(async ()=>{
      if(quotes == null){
        const q = await execute(customerId,apiUrlQuotes);
        setQuotes(q);

        const qr = await execute(customerId,apiUrlQuotesReq);
        setQuotesRequests(qr);
        console.log('Quotes qqq',qr);

        const sr = await execute(customerId,apiUrlQuotesStaged);
        setQuotesStaged(sr);
        console.log('Quotes qqq',sr);
      }
  } , []);


  return (
    <Spacings.Stack scale="xl">


       <Spacings.Stack scale="l">
          
          {quotesRequests ? <>
            <Text.Headline as="h2"> Quote Requests</Text.Headline>

              <DataTable
                isCondensed
                columns={columnsQR}
                rows={quotesRequests?.results ? quotesRequests?.results : []}
                itemRenderer={itemRenderer}
                maxHeight={600}
                onRowClick={(row) => {
                  
                  // const win = window.open(`/${projectKey}/orders/quotes/${row.id}`, "_blank");
                  // win.focus();
                  
                  push(`/${projectKey}/orders/quotes/requests/${row.id}`)
                }}
              /> 
              {/* <Pagination
                page={pageQR.value}
                onPageChange={pageQR.onChange}
                perPage={perPageQR.value}
                onPerPageChange={perPageQR.onChange}
                totalItems={quotesRequests?.total}
              />  */}
              </>: null }
        </Spacings.Stack> 

        <Spacings.Stack scale="l">
          
          {quotesStaged ? <>
            <Text.Headline as="h2">Staged Quote Requests</Text.Headline>

              <DataTable
                isCondensed
                columns={columnsSQ}
                rows={quotesStaged?.results ? quotesStaged?.results : []}
                itemRenderer={itemRendererStaged}
                maxHeight={600}
                onRowClick={(row) => {
                  
                  // const win = window.open(`/${projectKey}/orders/quotes/${row.id}`, "_blank");
                  // win.focus();
                  
                  push(`/${projectKey}/orders/quotes/drafts/${row.id}`)
                }}
              /> 
              {/* <Pagination
                page={pageQR.value}
                onPageChange={pageQR.onChange}
                perPage={perPageQR.value}
                onPerPageChange={perPageQR.onChange}
                totalItems={quotesRequests?.total}
              />  */}
              </>: null }
        </Spacings.Stack> 

        <Spacings.Stack scale="l">
         
         {quotes ? <>

         <Text.Headline as="h2"> Quotes</Text.Headline>
            <DataTable
              isCondensed
              columns={columns}
              rows={quotes?.results ? quotes?.results : []}
              itemRenderer={itemRenderer}
              maxHeight={600}
              onRowClick={(row) => {
                
                // const win = window.open(`/${projectKey}/orders/quotes/${row.id}`, "_blank");
                // win.focus();
                console.log("On click row",createOrderButtonClicked);
                if(!createOrderButtonClicked){
                  console.log("On click row in condition");
                  push(`/${projectKey}/orders/quotes/${row.id}`)
                }
              }}
            />

            {/* <Pagination
              page={page.value}
              onPageChange={page.onChange}
              perPage={perPage.value}
              onPerPageChange={perPage.onChange}
              totalItems={quotes?.total}
            /> */}
            </>: null}
       </Spacings.Stack>
    </Spacings.Stack>
  );
};
CustomerQuotes.displayName = 'CustomerDetails';
CustomerQuotes.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default CustomerQuotes;