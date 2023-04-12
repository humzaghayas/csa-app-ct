import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
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

const columns = [

  { key: 'customer', label: 'Customer' },
  { key: 'totalPrice', label: 'Total' },
  { key: 'quoteState', label: 'Status' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'lastModifiedAt', label: 'Last Modified' },
  { key: 'validTo', label: 'Valid Until' }
];

const itemRenderer = (item,column) => {
    switch(column.key){
        case 'validTo':
            return item?.validTo ? item?.validTo : '--'
        case 'customer':
            return item?.customer?.email;
        case 'totalPrice' :
            return item?.totalPrice?.centAmount/100+'$';
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
  const params = useParams();
  const tableSorting = useDataTableSortingState('createdAt desc');
  const customerId = params.id;

  const {entryPointUriPath,projectKey} = useApplicationContext(
    (context) => ({
      entryPointUriPath:context.environment.entryPointUriPath,
      projectKey:context.project.key
  }));


  const { quotes, error, loading } = useCustomersQuotesFetcher({
    page,
    perPage,
    tableSorting,
    customerId  
  });

  console.log('params.id',params.id);
  console.log('Quotes',quotes);


  return (
    <Spacings.Stack scale="xl">
    <Spacings.Stack scale="l">
         
         {quotes ? <>
         <DataTable
           isCondensed
           columns={columns}
           rows={quotes?.results ? quotes?.results : []}
           itemRenderer={itemRenderer}
           maxHeight={600}
           onRowClick={(row) => {
            
            const win = window.open(`/${projectKey}/orders/quotes/${row.id}`, "_blank");
            win.focus();
            
            // push(`/${projectKey}/orders/quotes/${row.id}`)
          }}
         />
         <Pagination
           page={page.value}
           onPageChange={page.onChange}
           perPage={perPage.value}
           onPerPageChange={perPage.onChange}
           totalItems={quotes?.total}
         />
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