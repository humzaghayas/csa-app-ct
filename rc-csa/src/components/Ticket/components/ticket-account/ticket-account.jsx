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
  TabularModalPage,
  useModalState,
  TabHeader,
  TabularMainPage,
  TabularDetailPage,
} from '@commercetools-frontend/application-components';
import PropTypes from 'prop-types';
// import TicketDetails from '../Ticket-details/Ticket-details';
// import TicketRules from '../Ticket-rules/Ticket-rules';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { PlusBoldIcon, ExportIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';

import styles from './Ticket-account-module.css';
// import RequiredApproval from '../required-approval';
// import AddBudget from '../add-budget';
// import AddNewRule from '../add-new-rule';
// import EmployeeCreate from '../../../employees/components/employee-create';
// import TicketEmployees from '../Ticket-employees/Ticket-employees';
import { getTicket } from '../../api';
import { lazy, useState, useEffect } from 'react';
import TicketDetailsForm from '../ticket-details/ticket-details-form';
import TicketDetails from '../ticket-details/ticket-details';
import TicketDetailsP from '../ticket-create/tickets-details';


const TicketAccount = (props) => {
  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();
  const { push } = useHistory();
  const [Ticket, setData] = useState();

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
      onPreviousPathClick={() => history.push(`/csa_project/csa-customer-tickets/Tickets`)}
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
        {/* <Route path={`${match.path}/tickets-history`}>
        <TicketDetailsForm />
        </Route>
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
  onClose: PropTypes.func.isRequired,
};
export default TicketAccount;
