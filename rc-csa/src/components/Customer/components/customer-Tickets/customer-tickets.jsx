import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  DOMAINS,
  GRAPHQL_TARGETS,
  NO_VALUE_FALLBACK,
} from '@commercetools-frontend/constants';
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
import {
  useCreateEntry,
  useUserFetcher,
} from '../../../../hooks/use-register-user-connector';
import {
  SuspendedRoute,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { gql } from '@apollo/client';
import { getTicketRows } from 'ct-tickets-helper-api/lib/helper-methods';
import { FETCH_TICKETS, FETCH_CUSTOMER_TICKETS } from 'ct-tickets-helper-api/lib/graphql-queries';
import { CONSTANTS } from 'ct-tickets-helper-api/lib/constants';
import TicketAccount from '../../../Ticket/components/ticket-account/ticket-account';
import { ContentNotification } from '@commercetools-uikit/notifications';

let rows = null;

const columns = [
  { key: 'id', label: 'id' },
  { key: 'Customer', label: 'Customer' },
  { key: 'status', label: 'Status' },
  { key: 'Priority', label: 'Priority' },
  { key: 'Category', label: 'Category' },
  { key: 'Subject', label: 'Subject' },
  { key: 'Created', label: 'Created' },
  { key: 'Modified', label: 'Modified' },
];

const CustomerTickets = (props) => {
  const intl = useIntl();
  const params = useParams();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();

  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });

  const email = props?.customer?.email;

  console.log('customer',email);

  const canView = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.View],
  });

  const { user } = useApplicationContext((context) => ({
    user: context.user ?? '',
  }));

  const { foundUser } = useUserFetcher(user.email);
  const { execute } = useCreateEntry(user.email);

  useEffect(() => {
    if (canManage && foundUser == false) {
      console.log('calling execute !');
      execute();
    }
    console.log('inside hook !');
  }, [foundUser]);
   const id = params.id;
  const { data, error, loading, refetch } = useMcQuery(
    gql`
      ${FETCH_CUSTOMER_TICKETS}
    `,
    {
      variables: {
        "container": "ticket-container",
        "where": "value(email=\""+email+"\")"
        // container: CONSTANTS.containerKey,
        // limit: perPage.value,
        // offset: (page.value - 1) * perPage.value,
        // sort: ['lastModifiedAt desc'],
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      fetchPolicy: 'network-only',
    }
  );

  rows = getTicketRows(data?.customObjects);

  console.log('data?.customObjects',data?.customObjects);

  // if (error) {
  //   return (
  //     <ContentNotification type="error">
  //       <Text.Body>{getErrorMessage(error)}</Text.Body>
  //     </ContentNotification>
  //   );
  // }
  return (
    <Spacings.Stack scale="xl">
      {/* {data ? ( */}
      <Spacings.Stack scale="l">
        {rows ? (
          <Spacings.Stack scale="l">
            <DataTable
              isCondensed
              columns={columns}
              rows={rows}
              // itemRenderer={(item, column) => itemRenderer(item, column)}
              maxHeight={600}
              // sortedBy={tableSorting.value.key}
              // sortDirection={tableSorting.value.order}
              // onSortChange={tableSorting.onChange}
              // onRowClick={(row) => push(`ticket-edit/${row.id}/tickets-general`)}
              //onRowClick={(row) => push(`ticket-edit/${row.id}/tickets-general`)}
              // onRowClick={(row) => push(`Ticket-account/${row.id}/companies-general`)}
            />
            <Pagination
              page={page.value}
              onPageChange={page.onChange}
              perPage={perPage.value}
              onPerPageChange={perPage.onChange}
              totalItems={data?.customObjects?.total}
            />
            <Switch>
              {/* <SuspendedRoute path={`${match.path}/:id`}>
                <TicketAccount onClose={() => push(`${match.url}`)} />  
            </SuspendedRoute> */}

              <SuspendedRoute path={`${match.path}/:id`}>
                <TicketAccount onClose={() => push(`${match.url}`)} />
              </SuspendedRoute>

              {/* <SuspendedRoute path={`${match.path}/ticket-details`}>
            <TicketDetails  onClose={() => push(`${match.url}`)} />
            </SuspendedRoute> */}
            </Switch>
          </Spacings.Stack>
        ) : (
          <p>Loading...</p>
        )}
      </Spacings.Stack>
      {/* ) : null} */}
    </Spacings.Stack>
  );
};
CustomerTickets.displayName = 'CustomerDetails';
CustomerTickets.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default CustomerTickets;
