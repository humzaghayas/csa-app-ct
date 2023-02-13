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
import { getCustomer, loginATG } from '../../api';
import { useEffect, useState } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useAsyncDispatch } from '@commercetools-frontend/sdk';
import { useGetATGCustomerDetail, useGetATGCustomers } from '../../../../hooks/use-atg-conector/use-atg-connector';

const LoginCred = {
  login: 'mary',
  password: 'test123',
};
const QUERY = {};

const AtgCustomerDetail = (props) => {


  const { page, perPage } = usePaginationState();
  const [rows, setRows] = useState([{userId:"Loading..."}]);
  const [isCustomerFetched, setIsCustomerFetched] = useState(false);

  const {execute} = useGetATGCustomerDetail()

  const match = useRouteMatch();

  console.log('humza');

  useEffect(async () => {

    if(!isCustomerFetched){
      const headers = {
        'Content-Type': 'application/json',
      }
      const customer = await execute(headers,match.params.id);
      setRows([customer]);
      setIsCustomerFetched(true);

      console.log('humza');
    }
  });

  //atgCustomers;

  const columns = [
    { key: 'userId', label: 'User Id' },
    { key: 'login', label: 'Login' },
    { key: 'firstName', label: 'First Name' },
    { key: 'middleName', label: 'Middle Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' }
  ];

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
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
AtgCustomerDetail.displayName = 'AtgCustomerDetail';
AtgCustomerDetail.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default AtgCustomerDetail;
