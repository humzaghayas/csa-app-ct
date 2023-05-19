import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useParams,
  Link,

} from 'react-router-dom';
import {
  useModalState,
  TabHeader,
  TabularDetailPage,
} from '@commercetools-frontend/application-components';
import PropTypes from 'prop-types';

import Spacings from '@commercetools-uikit/spacings';
import Avatar from '@commercetools-uikit/avatar';
import { useAsyncDispatch } from '@commercetools-frontend/sdk';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useEffect, useState } from 'react';
import { entryPointUriPath } from '../../../../constants';
import FaqList from '../knowledgebase-faqlist/faq-list';
import Troubleshoots from '../knowledgebase-troubleshoot/troubleshoot';

const KnowledgebaseAccount = (props) => {

  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();
  const [data, setData] = useState(null);

  const { projectKey } = useApplicationContext((context) => ({
    projectKey: context.project.key
  }));


  return (
    <TabularDetailPage
      title=" "
      onPreviousPathClick={() =>
        history.push(`/${projectKey}//${entryPointUriPath}`)
      }
      previousPathLabel="Back to Welcome page"
      tabControls={
        <>
          <Spacings.Stack scale="xxl">
            <Spacings.Inline>
              <Spacings.Stack scale="xs">
                <Spacings.Stack scale="xl"></Spacings.Stack>
                <h1> Knowledgebase </h1>

              </Spacings.Stack>
            </Spacings.Inline>
          </Spacings.Stack>
          <Spacings.Stack scale="xl">
            <Spacings.Inline>
              <TabHeader
                //onClick={() => history.push(`/faq-list`)}
                to={`${match.url}/faq-list`}
                label="FAQ"
              />
              <TabHeader
                //onClick={() => history.push(`/`)}
                to={`${match.url}/troubleshoots`}
                label="Troubleshoots"
              />
            </Spacings.Inline>
          </Spacings.Stack>
        </>
      }
    >
      <Switch>
        <Route path={`${match.path}/faq-list`}>
          <FaqList />
        </Route>
        <Route path={`${match.path}/troubleshoots`}>
          <Troubleshoots />
        </Route>
      </Switch>
    </TabularDetailPage>
  );
};
KnowledgebaseAccount.displayName = 'KnowledgebaseAccount';
KnowledgebaseAccount.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,

};
export default KnowledgebaseAccount;
