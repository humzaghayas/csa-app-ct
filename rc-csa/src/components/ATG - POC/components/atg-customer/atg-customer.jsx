import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useHistory, useRouteMatch } from 'react-router-dom';
// import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import DataTable from '@commercetools-uikit/data-table';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import {
  useDataTableSortingState,
  usePaginationState,
} from '@commercetools-uikit/hooks';
import { getCustomer } from '../../api';
import { useEffect, useState } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

// import CustomerCreate from '../customer-create/customer-create';

// import { getCompanies } from '../../api';
// import { useEffect } from 'react';

// import NoImageIcon from '@commercetools-frontend/assets/images/camera.svg';
// import CustomerAccount from '../Customer-account';

// const QUERY = {
//   perPage: 20,
//   page: 1,
//   sortBy: 'createdAt',
//   sortDirection: 'desc',
// };

const QUERY = {};

const AtgCustomer = (props) => {
  const atgPublicURL = useApplicationContext(
    (context) => context.environment.atgPublicURL
  );
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState('login desc');
  const [data, setData] = useState();

  //const apiUrl ="http://localhost:4456";
  const apiUrl = `${atgPublicURL}/rest/model/atg/userprofiling/ProfileActor/detailed`;
  // 'http://192.168.16.201:8080/rest/model/atg/userprofiling/ProfileActor/detailed';
  useEffect(() => {
    getCustomer({ url: apiUrl, query }).then((res) => setData(res));
  }, [apiUrl, query]);
  console.log('data', data);

  // const rows = [
  //   {
  //     fullName: data?.profile.firstName + ' ' + data?.profile.lastName,
  //     login: data?.profile.login,
  //     email: data?.profile.email,
  //     address: data?.profile.homeAddress.address1 + ' ' + data?.profile.homeAddress.address2,
  //     phone: data?.profile.homeAddress.phoneNumber,
  //     country: data?.profile.homeAddress.country,
  //   },
  // ];

  const rows = [
    {
      fullName: 'John Paul',
      login: 'joesph834',
      email: 'john@test.com',
      address: '111 Main Street Suite 100',
      phone: '9374854868',
      country: 'USA',
    },
  ];

  const columns = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'login', label: 'Login ID' },
    { key: 'email', label: 'Email Address' },
    { key: 'address', label: 'Address' },
    { key: 'phone', label: 'Contact No' },
    { key: 'country', label: 'Country' },
    // { key: 'CustomerGroup', label: 'Customer Group' },
  ];

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
        {/* <FlatButton
          as={RouterLink}
          to={props.linkToWelcome}
          label={intl.formatMessage(messages.backToWelcome)}
          icon={<BackIcon />}
        /> */}
        {/* <Text.Headline as="h2" intlMessage={messages.title} /> */}
      </Spacings.Stack>
      {/* {loading && <LoadingSpinner />} */}
      {/* <Spacings.Inline>
        <SecondaryButton
          label="Add Customer"
          data-track-event="click"
          onClick={() => push(`Customer-create`)}
          iconLeft={<PlusBoldIcon />}
          size="medium"
        />
      </Spacings.Inline> */}
      <Spacings.Stack scale="l">
        <Spacings.Stack scale="l">
          <DataTable
            isCondensed
            columns={columns}
            rows={rows}
            maxHeight={600}
            // onRowClick={(row) => push(`customer-account/${row.id}/Customers-summary`) }
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            // totalItems={customersPaginatedResult.total}
          />
          {/* <Switch>
              <SuspendedRoute path={`${match.path}/:id`}>
                <CustomerAccount onClose={() => push(`${match.url}`)} />
              </SuspendedRoute>
            </Switch> */}
        </Spacings.Stack>
      </Spacings.Stack>
    </Spacings.Stack>
  );
};
AtgCustomer.displayName = 'AtgCustomer';
AtgCustomer.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default AtgCustomer;
