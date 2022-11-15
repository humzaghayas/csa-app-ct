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
import { BackIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable from '@commercetools-uikit/data-table';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { SuspendedRoute, useMcQuery } from '@commercetools-frontend/application-shell';
import {
  formatLocalizedString,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
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
import TicketDetails from '../Ticket-details/ticket-details';
import TicketCreate from '../ticket-create/ticket-create';
import TicketAccount from '../ticket-account/ticket-account';
import { actions,useAsyncDispatch } from '@commercetools-frontend/sdk';
import{FETCH_TICKETS,getTicketRows} from 'ct-tickets-helper-api'
import { gql } from '@apollo/client';

// import { getCompanies } from '../../api';
// import { useEffect } from 'react';

// import NoImageIcon from '@commercetools-frontend/assets/images/camera.svg';
// import TicketAccount from '../Ticket-account';

// const QUERY = {
//   perPage: 20,
//   page: 1,
//   sortBy: 'createdAt',
//   sortDirection: 'desc',
// };

let rows = null;

const columns = [

  { key: 'id', label: 'id' },
  { key:'Customer', label: 'Customer' },
  { key: 'Created', label: 'Created' },
  { key: 'Modified', label: 'Modified' },
  { key: 'Source', label: 'Source' },
  { key: 'Status', label: 'Status' },
  { key: 'Priority', label: 'Priority' },
  { key: 'Category', label: 'Category' },
  { key: 'Subject', label: 'Subject' },
];


const Tickets = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();


  //const dispatch = useAsyncDispatch();
  // useEffect(() => {
  //   async function execute() {
  //     try {

  //       console.log('here');
  //       const result =  await dispatch(
  //           actions.forwardTo.get({
  //             uri:'https://us-central1-commerce-tools-b2b-services.cloudfunctions.net/getTickets',
  //             includeUserPermissions: true,}));
  //       // Update state with `result`
  //       console.log("result :: " +result);
  //     } catch (error) {
  //       // Update state with `error`

  //       console.log("error : "+JSON.stringify(error));
  //     }
  //   }
  //   execute();
  // }, [])

  // rows[0].Customer =


  const { data, error, loading } = useMcQuery(gql`${FETCH_TICKETS}`, {
    variables: {
      container:"ticket-container",
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
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
      <Spacings.Inline>
      <SecondaryButton
        label="Add Ticket"
         data-track-event="click" 
         onClick={() => push(`ticket-create`)}
        iconLeft={<PlusBoldIcon />}
        size="medium"
      />
      </Spacings.Inline>
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
            onRowClick={(row) => push(`ticket-edit/${row.id}/ticket-general`)}
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
          
          {/* <SuspendedRoute path={`${match.path}/ticket-create`}>
            <TicketCreate  onClose={() => push(`${match.url}`)} />
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
