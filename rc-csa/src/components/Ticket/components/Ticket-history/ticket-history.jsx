import { useIntl } from 'react-intl';
import { useParams, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';
import { docToFormValues, formValuesToDoc } from './conversions';
import { transformErrors } from './transform-errors';
// import messages from './messages';
import { useGetTicketById } from '../../../../hooks/use-register-user-connector';
import { CollapsiblePanel, Constraints, DataTable, Spacings } from '@commercetools-frontend/ui-kit';

const columns = [
  { key:'Priority', label: 'Priority' },
  { key: 'Status', label: 'Status' },
  { key: 'Assigned_To', label: 'Assigned To' },
  { key: 'user', label: 'User' },
  { key: 'operationDate', label: 'Operation Date' }
];

const TicketHistory = (props) => {
  const intl = useIntl();
  const params = useParams();
  const match = useRouteMatch();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  
  
  const {ticket} = useGetTicketById(match.params.id);

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
              scale="l">
                <Constraints.Horizontal >
                    <Spacings.Stack scale="m">


                    {ticket.history ? 
                            <Spacings.Stack scale="l">
                            
                              <DataTable
                                isCondensed
                                columns={columns}
                                rows={ticket.history}
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
                          : <p>Loading...</p>}
                    </Spacings.Stack>

                </Constraints.Horizontal>

        </CollapsiblePanel>
    </Spacings.Stack>
  );
};
TicketHistory.displayName = 'Ticket History';
TicketHistory.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default TicketHistory;
