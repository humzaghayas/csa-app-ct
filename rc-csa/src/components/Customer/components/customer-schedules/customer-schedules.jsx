import { useIntl } from 'react-intl';
import { Route, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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
  showNotification,
  showApiErrorNotification,
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


import Spacings from '@commercetools-uikit/spacings';
import { CheckActiveIcon, CheckInactiveIcon, CloseIcon, MinimizeIcon } from '@commercetools-uikit/icons';
import { useCreateOrUpdateSchedule, useFetchSchedulesList } from '../../../../hooks/use-register-user-connector/use-service-connector';
import CustomerSchedulesDetails from './customer-schedules-details';
import { getScheduleEmptyFormValue, getScheduleFormValue, SAMPLE_RESULTS } from './conversion';
import messages from './messages';
import { transformErrors } from './transform-errors';
import { Constraints, FlatButton, PrimaryButton } from '@commercetools-frontend/ui-kit';
import CustomerSchedulesCreate from './customer-schedules-create';
import { CREATE_OPERATION, UPDATE_OPERATION } from './constants';


const columns = [
  { key: 'id', label: 'Id' },
  { key: 'customerId', label: 'Customer' },
  { key: 'cartId', label: 'Cart' },
  { key: 'repeat', label: 'Repeat' },
  { key: 'isActive', label: 'Status' },
  { key: 'createdBy', label: 'Created By' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'lastModifiedAt', label: 'Modified' },
];

const itemRenderer = (item, column) => {
    switch (column.key) {
        case 'isActive':
            return <Spacings.Stack scale='s'>
                {item?.value?.isActive ? <CheckActiveIcon/> : <CheckInactiveIcon/>}
            </Spacings.Stack>;
        case 'customerId':
            return item?.value?.customerId ?? '--';
        case 'cartId':
            return item?.value?.cartId ?? '--'; 
        case 'repeat':
            return item?.value?.repeat ?? '--';
        case 'createdBy':
            return item?.value?.createdBy ?? '--';
        case 'createdAt':
            return item?.value?.createdAt ?? '--';
        case 'lastModifiedAt':
            return item?.value?.lastModifiedAt ?? '--';
        default:
            return item[column.key];
    }
}

const CustomerSchedules = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const { page, perPage } = usePaginationState();
  const {projectKey,user} = useApplicationContext(
    (context) => ({
      projectKey:context.project.key,
      user:context.user
  }));

  const {execute} = useFetchSchedulesList();
  const {execute:executeUpdate}        = useCreateOrUpdateSchedule();
  const [schedules, setSchedules] = useState();
  const [schedule, setSchedule] = useState();
  const customerId = match?.params?.id;

  useEffect(async () =>{
      if(!schedules){
          setSchedules(
              await execute(
                  projectKey,
                {
                    limit: perPage.value,
                    offset: (page.value - 1) * perPage.value,
                    sort:{"lastModifiedAt": -1},
                    filter:{"customerId":customerId}               
                })
              // SAMPLE_RESULTS
            )
      }
  })

  const onSubmit = useCallback(async (schedule) =>{
    if(!schedule?.customerId && !schedule?.createdBy){
      schedule.customerId = customerId,
      schedule.createdBy = user?.id
    }
    console.log("On Submit Schedule",schedule);
    if(schedule){
      try{
        const updateCreateResult = await executeUpdate(projectKey,schedule);
        console.log(updateCreateResult);

        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: intl.formatMessage(messages.ScheduleUpdate),
        });

        setSchedules(
          await execute(
              projectKey,
            {
                limit: perPage.value,
                offset: (page.value - 1) * perPage.value,
                sort:{"lastModifiedAt": -1},
                filter:{"customerId":customerId}               
            })
          // SAMPLE_RESULTS
        )

      } catch(errors){
        const transformedErrors = transformErrors(errors);
                  if (transformedErrors.unmappedErrors.length > 0) {
                    showApiErrorNotification({
                      errors: transformedErrors.unmappedErrors,
                    });
                  }
      }
      finally{
        push(`${match.url}`);
      }
    }
  });

  console.log("Schedules", schedules)
  console.log("Props", )

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale='l'>
        <Constraints.Horizontal>
          <PrimaryButton
            label="Create schedule"
            onClick={() => {
              push(`${match.url}/create`);
            }}
            isDisabled={false}
          />
          <Switch>
              <Route  path={`${match.path}/create`}>
                  <CustomerSchedulesCreate
                      onClose={() => push(`${match.url}`)}
                      onSubmit = {onSubmit}
                      customerId = {customerId}
                      initialValues = {getScheduleEmptyFormValue()}
                  />
              </Route>
            </Switch>
        </Constraints.Horizontal>
      </Spacings.Stack>
      {schedules?.results?
        <Spacings.Stack scale="l">
          <DataTable
            isCondensed
            columns={columns}
            rows={schedules?.results}
            itemRenderer={itemRenderer}
            maxHeight={600}
            onRowClick={async (row)=>{
                setSchedule(await getScheduleFormValue(schedules?.results?.find(e=>e.id==row?.id)));
                push(`${match.url}/${row?.id}/edit`);
            }}
          />
          <Switch>
                    <Route  path={`${match.path}/:id/edit`}>
                        <CustomerSchedulesDetails
                            onClose={() => push(`${match.url}`)}  
                            initialValues = {schedule}
                            onSubmit = {onSubmit}
                            customerId = {customerId}
                            isUpdate = {true}
                        />
                    </Route>
                </Switch>
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={schedules?.total}
          />
          
        </Spacings.Stack>
      :null}
    </Spacings.Stack>
  );
};
CustomerSchedules.displayName = 'CustomerSchedules';
CustomerSchedules.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default CustomerSchedules;