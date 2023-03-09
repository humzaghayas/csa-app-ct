import PropTypes from 'prop-types';
import { lazy,useEffect,useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
// import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { GRAPHQL_TARGETS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import { BackIcon, RefreshIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable from '@commercetools-uikit/data-table';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { SuspendedRoute, useMcQuery } from '@commercetools-frontend/application-shell';
import messages from './messages';

import SecondaryButton from '@commercetools-uikit/secondary-button';

import {
  // BinLinearIcon,
  // IconButton,
  // LoadingSpinner,
  // Text,
  // SecondaryButton,
  PlusBoldIcon,
} from '@commercetools-uikit/icons';

import TicketHistory from '../Ticket-history/ticket-history';
import TicketAccount from '../ticket-account/ticket-account';
import { actions,useAsyncDispatch } from '@commercetools-frontend/sdk';
import{FETCH_TICKETS,getTicketRows,CONSTANTS} from 'ct-tickets-helper-api'
import {  gql } from '@apollo/client';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';
import { useCreateEntry, useUserFetcher } from '../../../../hooks/use-register-user-connector/use-service-connector';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { SecondaryIconButton } from '@commercetools-frontend/ui-kit';
import Grid from '@commercetools-uikit/grid';

let rows = null;

const columns = [
  { key:'Customer', label: 'Customer' },
  { key: 'Created', label: 'Created' },
  { key: 'Modified', label: 'Modified' },
  { key: 'Source', label: 'Source' },
  { key: 'status', label: 'Status' },
  { key: 'Priority', label: 'Priority' },
  { key: 'Category', label: 'Category' },
  { key: 'Subject', label: 'Subject' },
  { key: 'assignedTo', label: 'Assignee' },
  { key: 'createdBy', label: 'Created By' },
];


const Tickets = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();

  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });

  const canView = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.View],
  });

  const { user } = useApplicationContext((context) => ({
    user: context.user ?? ''
  }));

  const {foundUser} = useUserFetcher(user.email);
  const {execute} = useCreateEntry(user.email);

  useEffect(() => {
    if(canManage && foundUser == false){
      console.log('calling execute !');
      execute();
    }
    console.log('inside hook !');
  }, [foundUser]);

  
  const { data, error, loading,refetch } = useMcQuery(gql`${FETCH_TICKETS}`, {
    variables: {
      container:CONSTANTS.containerKey,
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort:["lastModifiedAt desc"]
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
    fetchPolicy:"network-only"
  });

  rows = getTicketRows(data?.customObjects);

  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }


  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
        <FlatButton
          as={RouterLink}
          to={props.linkToWelcome}
          label={intl.formatMessage(messages.backToWelcome)}
          icon={<BackIcon />}
        />

        <Text.Headline as="h2" intlMessage={messages.title} />
      </Spacings.Stack>
      {/* {loading && <LoadingSpinner />} */}

      { canManage  ?
      <Spacings.Stack >

          <Grid gridGap="16px" gridAutoColumns="12fr" gridTemplateColumns="repeat(12, 1fr)">
            <Grid.Item >
              <SecondaryButton
                    label="Add Ticket"
                    data-track-event="click" 
                    onClick={() => push(`ticket-create`)}
                    iconLeft={<PlusBoldIcon />}
                    size="medium"
                  />


            </Grid.Item>
            <Grid.Item></Grid.Item>
            <Grid.Item></Grid.Item>
            <Grid.Item></Grid.Item>
            <Grid.Item></Grid.Item>
            <Grid.Item></Grid.Item>
            <Grid.Item></Grid.Item>
            <Grid.Item></Grid.Item>
            <Grid.Item></Grid.Item>
            <Grid.Item></Grid.Item>
            <Grid.Item></Grid.Item>
            <Grid.Item>
           
            <SecondaryIconButton
              label="Refresh"
              data-track-event="click" 
              onClick={()=>{refetch()}}
              icon={<RefreshIcon />}
              size="medium"
              
          />

            </Grid.Item>
            
          </Grid>




        <Spacings.Inline  >
          
      
        </Spacings.Inline>
      </Spacings.Stack>
      : null}

      {/* {data ? ( */}

      {rows ? 
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
            onRowClick={(row) => push(`ticket-edit/${row.id}/tickets-general`)}
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
      : <p>Loading...</p>}
      {/* ) : null} */}
    </Spacings.Stack>
  );
};
Tickets.displayName = 'Tickets';
Tickets.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Tickets;
