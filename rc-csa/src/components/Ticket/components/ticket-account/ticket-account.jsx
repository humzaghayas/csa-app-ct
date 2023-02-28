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

  //const apiUrl ="http://localhost:4456";
  // const apiUrl = 'https://ms-Ticket-f4b4o225iq-ue.a.run.app';
  // const TicketId = params.id;
  // useEffect(() => {
  //   getTicket({ url: apiUrl, id: TicketId }).then((res) => setData(res));
  // }, [apiUrl, TicketId]);

  return (
    <TabularDetailPage
      title="Ticket Details"
      //  onPreviousPathClick={() => history.push(`Ticket-list`)}
      onPreviousPathClick={() => history.push(`/${projectKey}/csa-customer-tickets/Tickets`)}
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
              {/* <TabHeader
                to={`${match.url}/ticket-administration`}
                label="Administration"
              /> */}
               {/* <div className={styles.addEmployeeButton}>
       <SecondaryButton
            label="Add Employee"
            data-track-event="click"
            iconLeft={<PlusBoldIcon />}
            // onClick={() => push(`employee-create`)}
            size="medium"
          
          />
          </div> */}
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
TicketAccount.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
  
};
export default TicketAccount;
