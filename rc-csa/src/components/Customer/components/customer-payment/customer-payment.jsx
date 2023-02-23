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
import { useCustomersPaymentsFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
import { Text } from '@commercetools-frontend/ui-kit';
const rows = [
  { Ordernumber: '00000001',PaymentDate:'Apr 11, 2022,2:54:47...',PaymentMethod:'COD',Status:'Ready',CancelledDate:'--'},
  { Ordernumber: '00000002',PaymentDate:'Apr 11, 2022,2:54:47...',PaymentMethod:'COD',Status:'Ready',CancelledDate:'--'},
  { Ordernumber: '00000003',PaymentDate:'Apr 11, 2022,2:54:47...',PaymentMethod:'COD',Status:'Ready',CancelledDate:'--'},
];



const columns = [
  { key: 'id', label: 'Id' },
  { key: 'key', label: 'Key' },
  { key: 'interfaceId', label: 'InterfaceId' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'paymentMethodInfo', label: 'Payment Method' },
];

const itemRenderer = (item, column) => {
  switch (column.key) {
    case 'paymentMethodInfo':
      return <div>
                <Spacings.Stack scale='s'>
                  <Spacings.Inline>
                    <Spacings.Stack scale='s'>
                      {item?.paymentMethodInfo?.method}
                      {/* <div>{item?.paymentInterface}</div> */}
                      {/* <div>PAYMENT INTERFACE: {item?.paymentMethodInfo?.paymentInterface}</div>
                      <div>Method: {item?.paymentMethodInfo?.method}</div>
                      <div>Name: {item?.paymentMethodInfo?.name}</div> */}
                    </Spacings.Stack>
                  </Spacings.Inline>
                </Spacings.Stack>
              </div>;
    default:
      return item[column.key];
  }
}



const CustomerPayment = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const customerId = match?.params?.id;
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState('createdAt desc');
  const { customersPaymentsPaginatedResult, error, loading } = useCustomersPaymentsFetcher({
    page,
    perPage,
    tableSorting,
    customerId,
  });

  console.log(customersPaymentsPaginatedResult);
  
  return (
    <Spacings.Stack scale="xl">
        <Spacings.Stack scale="l">
         {customersPaymentsPaginatedResult?.results?           
         <>
         <DataTable
            isCondensed
            columns={columns}
            rows={customersPaymentsPaginatedResult?.results}
            itemRenderer={itemRenderer}
            maxHeight={600}
            
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={customersPaymentsPaginatedResult?.total}
          />
         </>
         :null}
      
          
        </Spacings.Stack>
    </Spacings.Stack>
  );
};
CustomerPayment.displayName = 'CustomerDetails';
CustomerPayment.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default CustomerPayment;
