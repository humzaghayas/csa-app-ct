import { useIntl } from 'react-intl';
import { useParams, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';
import { docToFormValues, formValuesToDoc } from './conversions';
import { transformErrors } from './transform-errors';
// import messages from './messages';
import { useGetTicketById } from '../../../../hooks/use-register-user-connector';
import {
  CollapsiblePanel,
  Constraints,
  DataTable,
  Spacings,
} from '@commercetools-frontend/ui-kit';
import SearchSelectInput from '@commercetools-uikit/search-select-input';

const columns = [
  { key: 'ticketNumber', label: 'Ticket Number' },
  { key: 'operationDate', label: 'Ticket Raised' },
  { key: 'reason', label: 'Reason' },
  { key: 'Solution', label: 'Solution' },
  { key: 'Status', label: 'Status' },
  { key: 'Priority', label: 'Priority' },
  { key: 'Assigned_To', label: 'Assigned To' },
  { key: 'TimeSpent', label: 'Time Spent' },
  { key: 'Rating', label: 'Customer Rating' },
  // { key: 'user', label: 'User' },
];

const TicketHistory = (props) => {
  const intl = useIntl();
  const params = useParams();
  const match = useRouteMatch();
  const { projectKey,dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
    projectKey:context.project.key,
  }));

  const [ticketHistory, setTicketHistory] = useState(null);

  const {getTicketById} = useGetTicketById();//();
 
  
  useEffect(async () => {
    if(!ticketHistory){
      console.log('calling execute !');
      const t = await getTicketById(projectKey,match.params.id);

      console.log('ticket',t);

      let tHistory = t?.history;

      tHistory = tHistory.map(h => ({
       ...h,
       ticketNumber:t.ticketNumber,
       operationDate:t.createdAt,
       reason:t.category 
      }));
      setTicketHistory(tHistory);
    }
  },[ticketHistory]);

  return (
    <Spacings.Stack scale="xl">
      <CollapsiblePanel
        data-testid="tickets-history-panel"
        header={
          <CollapsiblePanel.Header>
            {/* {formatMessage(messages.panelTitle)} */}
            {'Ticket History'}
          </CollapsiblePanel.Header>
        }
        scale="l"
      >
        <Constraints.Horizontal>
          <Spacings.Stack scale="m">
            <SearchSelectInput
              id="customers"
              name="customers"
              horizontalConstraint={7}
              optionType="single-lined"
              isAutofocussed={false}
              backspaceRemovesValue={true}
              isClearable={true}
              isDisabled={false}
              isReadOnly={false}
              isMulti={true}
              onChange={() => {}}
              // defaultOptions={[
              //   {
              //     label: 'Animals',
              //     options: [
              //       { value: 'dogs', label: 'Dogs' },
              //       { value: 'whales', label: 'Whales' },
              //       { value: 'antilopes', label: 'Antilopes' },
              //       { value: 'snakes', label: 'Snakes' },
              //     ],
              //   },
              //   {
              //     label: 'Flavours',
              //     options: [
              //       {
              //         value: 'vanilla',
              //         label: 'Vanilla',
              //       },
              //       {
              //         value: 'chocolate',
              //         label: 'Chocolate',
              //       },
              //       {
              //         value: 'strawberry',
              //         label: 'Strawberry',
              //       },
              //       {
              //         value: 'salted-caramel',
              //         label: 'Salted Caramel',
              //       },
              //     ],
              //   },
              // ]}
              //noOptionsMessage="No exact match found"
              //loadingMessage="loading exact matches"
              placeholder="search by Ticket id/Date"
              // eslint-disable-next-line no-undef
              //loadOptions={() => {}}
              cacheOptions={false}
            />

            {ticketHistory ? (
              <Spacings.Stack scale="l">
                <DataTable
                  isCondensed
                  columns={columns}
                  rows={ticketHistory}
                  // itemRenderer={(item, column) => itemRenderer(item, column)}
                  maxHeight={600}
                  // sortedBy={tableSorting.value.key}
                  // sortDirection={tableSorting.value.order}
                  // onSortChange={tableSorting.onChange}
                  // onRowClick={(row) => push(`ticket-edit/${row.id}/tickets-general`)}
                  // onRowClick={(row) => push(`ticket-edit/${row.id}/tickets-general`)}
                  // onRowClick={(row) => push(`Ticket-account/${row.id}/companies-general`)}
                />
              </Spacings.Stack>
            ) : (
              <p>Loading...</p>
            )}
          </Spacings.Stack>
        </Constraints.Horizontal>
      </CollapsiblePanel>
    </Spacings.Stack>
  );
};
TicketHistory.displayName = 'Ticket History';
TicketHistory.propTypes = {
  
};
export default TicketHistory;
