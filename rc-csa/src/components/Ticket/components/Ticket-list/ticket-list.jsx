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
import DataTableManager, { UPDATE_ACTIONS, useSorting } from '@commercetools-uikit/data-table-manager';
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
import{FETCH_TICKETS,getTicketRows,CONSTANTS, ref} from 'ct-tickets-helper-api'
import {  gql } from '@apollo/client';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';
import { useCreateEntry, useFetchTicketsList, useUserFetcher } from '../../../../hooks/use-register-user-connector';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { SecondaryIconButton, } from '@commercetools-frontend/ui-kit';
import Grid from '@commercetools-uikit/grid';
import SelectableSearchInput from '@commercetools-uikit/selectable-search-input';
import DataTableManagerCustom from '../../../Common/data-table-custom-component';



let columns = [
  { key:'ticketNumber', label: 'Ticket Number',isSortable: true,mapping:"ticketNumber" },
  { key:'Customer', label: 'Customer',isSortable: true , mapping:"email" },
  { key: 'Created', label: 'Created',isSortable: true , mapping:"createdAt" },
  { key: 'Modified', label: 'Modified',isSortable: true , mapping:"lastModifiedAt" },
  { key: 'Source', label: 'Source' },
  { key: 'status', label: 'Status',isSortable: true , mapping:"status"  },
  { key: 'Priority', label: 'Priority',isSortable: true , mapping:"priority" },
  { key: 'Category', label: 'Category' },
  { key: 'Subject', label: 'Subject' },
  { key: 'assignedTo', label: 'Assignee',isSortable: true , mapping:"assignedTo" },
  { key: 'createdBy', label: 'Created By' },
  { key: 'resolutionDate', label: 'Resolution Date',isSortable: true , mapping:"resolutionDate"  },
];

// const visibleColumnKeys = columns.map(({ key }) => key);
const Tickets = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();

  const {projectKey} = useApplicationContext(
    (context) => ({
      projectKey:context.project.key
  }));

  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.ManageCsaTickets],
  });

  const [selectTextInput, setSelectTextInput] = useState({
    text: "",
    option: "ticketNumber",
  })

  const [rows,setRows] = useState(null);
  const [resData,setResData] = useState(null);
  const { user } = useApplicationContext((context) => ({
    user: context.user ?? ''
  }));

  const {foundUser} = useUserFetcher(user.email);
  const {execute} = useCreateEntry(user.email);

  const {execute:fetchTickets}=useFetchTicketsList();

  useEffect(async () => {
    if(canManage && foundUser == false){
      console.log('calling execute !');
      await execute();
    }

    if(!rows){

      const data = await fetchTickets( projectKey,{
            limit: perPage.value,
            offset: (page.value - 1) * perPage.value,
            sort:{"lastModifiedAt": -1},
            // filter:{assignedTo:user?.email}
          });

          console.log('data ti list');
      const r = await getTicketRows(data);
      setRows(r);
      setResData(data);

      console.log('data ti list rrr',r);
    }
    console.log('inside hook !');
  }, [foundUser]);

  const applyFiltersOnTickets =async({option,text,sortColumn,setRowsVar}) =>{
    console.log("Apply filter on tickets",option,text,sortColumn);
    let vars = { 
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort:{"lastModifiedAt": -1},
      filter:{assignedTo:user?.email}};

      if(sortColumn ){
       
        const sortDirCol = columns.filter(c => c.key ===sortColumn )[0];
        let sortDir =sortDirCol.sortDir;

        if(!sortDir){
          sortDir = "asc";
        }
        if(sortDir == 'desc'){
          vars.sort = {[sortDirCol.mapping]:-1}
          sortDirCol.sortDir='asc';
        }else{
          vars.sort = {[sortDirCol.mapping]:1}
          sortDirCol.sortDir='desc';
        }
        
        const ind =columns.findIndex(c => c.key === sortColumn)

        columns[ind] = sortDirCol;
        console.log('columns',columns);
      }

    if(text){
      vars.filter ={[option]:text}
    }
    
    const data = await fetchTickets( projectKey,vars);

    const r = await getTicketRows(data);

    if(setRowsVar){
      setRowsVar(r)
    }else{
      setRows(r);
    }
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

          <Grid gridGap="16px" gridAutoColumns="12fr" gridTemplateColumns="20% 70% 10%">
            <Grid.Item >
              <SecondaryButton
                    label="Add Ticket"
                    data-track-event="click" 
                    onClick={() => push(`ticket-create`)}
                    iconLeft={<PlusBoldIcon />}
                    size="medium"
                  />


            </Grid.Item>
            <Grid.Item>&nbsp;</Grid.Item>
            <Grid.Item>
           
                <SecondaryIconButton
                  label="Refresh"
                  data-track-event="click" 
                  onClick={()=>{applyFiltersOnTickets(selectTextInput)}}
                  icon={<RefreshIcon />}
                  size="medium"/>

            </Grid.Item>
            
          </Grid>

          <Spacings.Stack>
            <Grid gridGap="16px" gridAutoColumns="12fr" gridTemplateColumns="40% 60%">
                <Grid.Item >
                  <SelectableSearchInput
                      menuHorizontalConstraint={4}
                      horizontalConstraint={14}
                      value={selectTextInput}
                      name={'selectTextInput'}
                      showSubmitButton={true}
                      onChange={(event) => {
                        let v = selectTextInput;
                        if (event.target.name.endsWith('.textInput')) {
                          v.text= event.target.value
                        }
                        if (event.target.name.endsWith('.dropdown')) {
                          v.option= event.target.value
                        }
                        setSelectTextInput({
                         ...v
                        });
                      }}
                      onSubmit={(val) => {
                        applyFiltersOnTickets(val);
                      }}
                      onReset={() => {
                        setSelectTextInput({
                          text: "",
                          option: "ticketNumber",
                        });
                        applyFiltersOnTickets({
                          text: "",
                          option: "ticketNumber",
                        });
                      }}
                      options={[
                        { value: 'ticketNumber', label: 'Ticket Number' },
                        { value: 'email', label: 'Customer Email' },
                        { value: 'subject', label: 'Subject' },
                      ]}/>
                  </Grid.Item>
                  <Grid.Item >&nbsp;</Grid.Item>
              </Grid>
          </Spacings.Stack>

      </Spacings.Stack>
      : null}


      {rows ? 
        <Spacings.Stack scale="l">
         
         <DataTableManagerCustom
            rows={rows}
            columns={columns}
            onRowClick={(row) => push(`ticket-edit/${row.id}/tickets-general`)}
            onSortChange={(columnKey,sortDirection) => { 
              applyFiltersOnTickets({
                ...selectTextInput,
                sortColumn:columnKey,
                sortDir:sortDirection,
                setRowsVar:setRows
              }
                )
            }}
         />

          <Pagination
            page={page.value}
            onPageChange={()=>{applyFiltersOnTickets(selectTextInput)}}
            perPage={perPage.value}
            onPerPageChange={()=>{applyFiltersOnTickets(selectTextInput)}}
            totalItems={resData?.total}
            

          />
           <Switch>
                      
            <SuspendedRoute path={`${match.path}/:id`}>
              <TicketAccount onClose={() => push(`${match.url}`)} />
            </SuspendedRoute>
          </Switch> 
        </Spacings.Stack>
      : <p>Loading...</p>}
    </Spacings.Stack>
  );
};
Tickets.displayName = 'Tickets';
// Tickets.propTypes = {
//   linkToWelcome: PropTypes.string.isRequired,
// };

export default Tickets;
