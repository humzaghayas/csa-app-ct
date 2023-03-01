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
// import {
//   useCustomerDetailsCreator,
// } from '../../../../hooks/use-Customer-connector/use-Customere-graphql-connector';
import { docToFormValues, formValuesToDoc } from './conversions';

import { transformErrors } from './transform-errors';
import messages from './messages';
import Spacings from '@commercetools-uikit/spacings';
import { useGetPaymentsByCustomer } from '../../../../hooks/use-paymment-connector';

const columns = [

  { key: 'orderNumber', label: 'Order number' },
 
  { key: 'paymentDate', label: 'Payment Date' },
  { key: 'paymentMethod', label: 'Payment Method' },
  { key: 'status', label: 'Status' },
  {key: 'CancelledDate', label: 'Cancelled Date'}
];

let rows = null;

const CustomerPayment = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const params = useParams();

  const payments = useGetPaymentsByCustomer(params.id)

  console.log('params.id',params.id);
  console.log('payments',payments);

  rows = payments?.paymentList;

  return (
    <Spacings.Stack scale="xl">
    
      {rows ?
        <Spacings.Stack scale="l">
         
          <DataTable
            isCondensed
            columns={columns}
            rows={rows}
         
            maxHeight={600}
          
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={payments?.total}
          />
          
        </Spacings.Stack>
      :<p>Loading...</p>}
      {/* ) : null} */}
    </Spacings.Stack>
  );
};
CustomerPayment.displayName = 'CustomerDetails';
CustomerPayment.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default CustomerPayment;
