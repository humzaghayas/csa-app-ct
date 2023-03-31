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
import { entryPointUriPath, PERMISSIONS } from '../../../../constants';
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
import ToggleInput from '@commercetools-uikit/toggle-input';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import IconButton from '@commercetools-uikit/icon-button';
// import {
//   useCustomerDetailsCreator,
// } from '../../../../hooks/use-Customer-connector/use-Customere-graphql-connector';
import { docToFormValues, formValuesToDoc } from './conversions';

import { transformErrors } from './transform-errors';
import messages from './messages';
import Spacings from '@commercetools-uikit/spacings';
import { MailIcon } from '@commercetools-uikit/icons';

import { useCustomersOrdersFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';

// function getIcon() {
//   return(
//     <div>
//       <p>lahari</p>
//     </div>
//   )
// }
// const getIcon =   <div>Some Text <a>llll</a></div>

const CustomerOrder = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const params = useParams();

  const OrderId = params.id;

  const { projectKey } = useApplicationContext((context) => ({
    projectKey: context.project.key
  }));

  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState('createdAt desc');
  const customerId = props.customer?.id;
  console.log("params", params);
  console.log("props", props);
  const { customersOrderPaginatedResult, error, loading } = useCustomersOrdersFetcher({
    page,
    perPage,
    tableSorting,
    customerId,
  });

  const columns = [
    { key: 'orderNumber', label: 'Order Number' },
    { key: 'customerEmail', label: 'Email' },
    { key: 'totalPrice', label: 'Order Total' },
    { key: 'lineItems', label: 'No of Order Items ' },
    { key: 'totalItems', label: 'Total Items' },
    { key: 'createdAt', label: 'Date Created' },
    { key: 'shipmentState', label: 'Delivery Mode' },
    { key: 'orderState', label: 'Status' },
  ];

  const itemRenderer = (item, column) => {
    switch (column.key) {
      case 'orderNumber':
        return item.orderNumber;
      case 'customerEmail':
        return item.customerEmail;
      case 'totalPrice':
        return amountCalculator(
          item?.totalPrice?.centAmount,
          item?.totalPrice?.fractionDigits
        );
      case 'lineItems':
        return item?.lineItems?.length;
      case 'totalItems':
        return item?.lineItems.map(item => item.quantity).reduce((a, b) => a + b, 0);
      case 'createdAt':
        return item.createdAt;
      case 'shipmentState':
        return "Standard Delivery";
      case 'orderState':
        return item.orderState;
      default:
        return item[column.key];
    }
  };

  function amountCalculator(centAmount, fractionDigits) {
    centAmount = centAmount / 100;
    centAmount = '$' + centAmount + '.00';
    return centAmount;
  }
  return (
    <Spacings.Stack scale="xl">

      {customersOrderPaginatedResult ? (
        <Spacings.Stack scale="l">
          <ToggleInput
            isDisabled={false}
            isChecked={true}
            onChange={(event) => alert(event.target.checked)}
            size="medium"
          />


          <DataTable
            isCondensed
            columns={columns}
            rows={customersOrderPaginatedResult.results}
            itemRenderer={(item, column) => itemRenderer(item, column)}
            maxHeight={600}

            onRowClick={(row) => push(`/${projectKey}/${entryPointUriPath}/order-edit/${row.id}/orders-general`)}
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={customersOrderPaginatedResult.total}
          />

        </Spacings.Stack>
      ) : "Loading..."}
    </Spacings.Stack>
  );
};
CustomerOrder.displayName = 'CustomerDetails';
CustomerOrder.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default CustomerOrder;
