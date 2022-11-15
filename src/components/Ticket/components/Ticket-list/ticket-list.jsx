import PropTypes from 'prop-types';
import { lazy,useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
// import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
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
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
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

import TicketDetails from '../ticket-details/ticket-details';
import TicketAccount from '../ticket-account/ticket-account';

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

const rows = [
  { id: '00012875',Customer:'Lahari',Created:'jun 14, 2022,2:54:47...',Modified:'Aug 14, 2022,2:54:47...',Website:'Electronics Site',Status:'In process',Priority:'Moderate',Category:'Enquiry',Subject:'ticket 2'},
  { id: '00000002',Customer:'women',Created:'Apr 11, 2022,2:54:47...',Modified:'Apr 11, 2022,2:54:47...',Website:'Electronics Site',Status:'In process',Priority:'Low',Category:'Enquiry',Subject:'ticket 2'},
  { id: '00000003',Customer:'women',Created:'Apr 11, 2022,2:54:47...',Modified:'Apr 11, 2022,2:54:47...',Website:'Electronics Site',Status:'In process',Priority:'Low',Category:'Enquiry',Subject:'ticket 2'},
  { id: '00000005',Customer:'RanjithKumar',Created:'Nov 11, 2022,2:54:47...',Modified:'Dec 11, 2022,2:54:47...',Website:'Electronics Site',Status:'In process',Priority:'Low',Category:'Enquiry',Subject:'ticket 2'},
];

const columns = [

  { key: 'id', label: 'id' },
  { key:'Customer', label: 'Customer' },
  { key: 'Created', label: 'Created' },
  { key: 'Modified', label: 'Modified' },
  { key: 'Website', label: 'Website' },
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
            // totalItems={data.total}
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
      {/* ) : null} */}
    </Spacings.Stack>
  );
};
Tickets.displayName = 'Tickets';
Tickets.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Tickets;
