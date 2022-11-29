import PropTypes from 'prop-types';
import { lazy } from 'react';
import { useIntl } from 'react-intl';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
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

import { useTicketEmployeeFetcher } from '../../../../hooks/use-employee-connector/use-employeee-graphql-connector';

import { getErrorMessage } from '../../../../helpers';

import SecondaryButton from '@commercetools-uikit/secondary-button';

import {
  // BinLinearIcon,
  // IconButton,
  // LoadingSpinner,
  // Text,
  // SecondaryButton,
  PlusBoldIcon,
} from '@commercetools-uikit/icons';

//const EmployeeDetails = lazy(() => import('../employee-details'));

//const EmployeeAccount = lazy(() => import('../employee-account'));

const columns = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'TicketName', label: 'Ticket Name' },
  { key: 'email', label: 'Email' },
  { key: 'roles', label: 'Roles' },
  { key: 'createdAt', label: 'createdAt', isSortable: true },
];

const itemRenderer = (item, column) => {
  switch (column.key) {
    case 'email':
      return item.email;
    case 'firstName':
      return item.firstName;
    case 'lastName':
      return item.lastName;
    case 'TicketName':
      return item.customerGroup.name;
    case 'createdAt':
      return item.createdAt;
    default:
      return item[column.key];
  }
};

const Employees = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project.languages,
  }));
  const TicketId = props.Ticket?.customerGroup.id;
  const { employeePaginatedResult, error, loading } = useTicketEmployeeFetcher({
    page,
    perPage,
    tableSorting,
    TicketId
  });

  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }

  return (
    <Spacings.Stack scale="xl">
      {loading && <LoadingSpinner />}
      <Spacings.Inline>
      <SecondaryButton
        label="Add Employee"
        data-track-event="click" 
        onClick={() => push(`employee-create`)}
        iconLeft={<PlusBoldIcon />}
        size="medium"
      />
      </Spacings.Inline>
      {employeePaginatedResult ? (
        <Spacings.Stack scale="l">
          <DataTable
            isCondensed
            columns={columns}
            rows={employeePaginatedResult.results}
            itemRenderer={(item, column) => itemRenderer(item, column)}
            maxHeight={600}
            sortedBy={tableSorting.value.key}
            sortDirection={tableSorting.value.order}
            onSortChange={tableSorting.onChange}
            onRowClick={(row) => push(`employee-account/${row.id}/budget`)}
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={employeePaginatedResult.total}
          />
          <Switch>
            <SuspendedRoute path={`${match.path}/:id`}>
              {/* <EmployeeAccount onClose={() => push(`${match.url}`)} /> */}
            </SuspendedRoute>
          </Switch>
        </Spacings.Stack>
      ) : null}
    </Spacings.Stack>
  );
};
Employees.displayName = 'Employees';
Employees.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Employees;
