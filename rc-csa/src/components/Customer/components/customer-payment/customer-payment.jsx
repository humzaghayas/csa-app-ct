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
const rows = [
  { Ordernumber: '00000001',PaymentDate:'Apr 11, 2022,2:54:47...',PaymentMethod:'COD',Status:'Ready',CancelledDate:'--'},
  { Ordernumber: '00000002',PaymentDate:'Apr 11, 2022,2:54:47...',PaymentMethod:'COD',Status:'Ready',CancelledDate:'--'},
  { Ordernumber: '00000003',PaymentDate:'Apr 11, 2022,2:54:47...',PaymentMethod:'COD',Status:'Ready',CancelledDate:'--'},
];

const columns = [

  { key: 'Ordernumber', label: 'Order number' },
 
  { key: 'PaymentDate', label: 'Payment Date' },
  { key: 'PaymentMethod', label: 'Payment Method' },
  { key: 'Status', label: 'Status' },
  {key: 'CancelledDate', label: 'Cancelled Date'}
];
const CustomerPayment = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();

  return (
    <Spacings.Stack scale="xl">
    
      {/* {data ? ( */}
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
            // totalItems={data.total}
          />
          
        </Spacings.Stack>
      {/* ) : null} */}
    </Spacings.Stack>
  );
};
CustomerPayment.displayName = 'CustomerDetails';
CustomerPayment.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default CustomerPayment;
