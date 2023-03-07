import { useMcQuery } from '@commercetools-frontend/application-shell';
import { FETCH_TICKETS } from 'ct-tickets-helper-api';
import { CONSTANTS } from 'ct-tickets-helper-api/lib/constants';

export const TicketDetails = async () => {
  function fetchTickets() {
    const { response, error, loading, refetch } = useMcQuery(
      gql`
        ${FETCH_TICKETS}
      `,
      {
        variables: {
          container: CONSTANTS.containerKey,
          limit: perPage.value,
          offset: (page.value - 1) * perPage.value,
          sort: ['id desc'],
        },
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        fetchPolicy: 'network-only',
      }
    );
    console.log(response);
  }
  return fetchTickets;
  //   console.log('data', response);

  //   const responseObj = JSON.parse(response);

  //   const desiredStatus = 'new';

  //   const count = responseObj.data.customObjects.results.filter(
  //     (result) => result.value.status === desiredStatus
  //   ).length;

  //   console.log(`${desiredStatus}: ${count}`);
};
