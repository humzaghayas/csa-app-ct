import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
  useHistory,
  useParams
} from 'react-router-dom';
import {
  useModalState,
  TabHeader,
  TabularDetailPage,
} from '@commercetools-frontend/application-components';
import PropTypes from 'prop-types';
import Spacings from '@commercetools-uikit/spacings';

import { lazy, useState, useEffect } from 'react';
// import TicketDetailsForm from '../Ticket-history/ticket-details-form';
import TicketHistory from '../Ticket-history/ticket-history';
import TicketDetailsP from '../ticket-create/tickets-details';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { entryPointUriPath } from '../../../../constants';


const TicketAccount = (props) => {
  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();
  const { push } = useHistory();
  const [Ticket, setData] = useState();

  const { projectKey } =useApplicationContext((context) => ({
    projectKey:context.project.key
  }));

  return (
    <TabularDetailPage
      title="Ticket Details"
      //  onPreviousPathClick={() => history.push(`Ticket-list`)}
      onPreviousPathClick={() => history.push(`/${projectKey}/${entryPointUriPath}/Tickets`)}
      previousPathLabel="Go to View Tickets"
      tabControls={
        <>
          <Spacings.Stack scale="xl">
            <Spacings.Inline>
              <TabHeader
                to={`${match.url}/tickets-general`}
                label="General"
              />
              <TabHeader to={`${match.url}/tickets-history`} label="History" />
            
            </Spacings.Inline>
          </Spacings.Stack>
        </>
      }
    >
      <Switch>
        <Route path={`${match.path}/tickets-general`}>
          {/* <TicketDetails /> */}
         <TicketDetailsP />
        </Route>
         <Route path={`${match.path}/tickets-history`}>
          <TicketHistory />
        </Route>
        {/*
        <Route path={`${match.path}/Ticket-administration`}>
        <TicketDetailsForm />
        </Route> */}
        {/* <Route path={`${match.path}/employee-create`}>
           <EmployeeCreate />
          </Route>
        <Route path={`${match.path}/required-approval`}>
           <RequiredApproval/>
          </Route> */}
          

      </Switch>
    </TabularDetailPage>

  );
};
TicketAccount.displayName = 'Tickets';
// TicketAccount.propTypes = {
//   linkToWelcome: PropTypes.string.isRequired,
  
// };
export default TicketAccount;
