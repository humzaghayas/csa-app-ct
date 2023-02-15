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
import { useGetATGCustomers } from '../../../../hooks/use-atg-conector/use-atg-connector';
import Text from '@commercetools-uikit/text';

const LoginCred = {
  login: 'mary',
  password: 'test123',
};
const QUERY = {};

const AtgCustomer = (props) => {


  const { page, perPage } = usePaginationState();
  const [rows, setRows] = useState([{userId:"Loading..."}]);
  const [isCustomerFetched, setIsCustomerFetched] = useState(false);
  const { push } = useHistory();

  const {execute} = useGetATGCustomers()

  useEffect(async () => {

    if(!isCustomerFetched){
      const headers = {
        'Content-Type': 'application/json',
      }
      const customers = await execute(headers);
      setRows(customers);
      setIsCustomerFetched(true);

      console.log('fetchihsidhisdhishdf');
    }
  },[]);

  //atgCustomers;

  const columns = [
    { key: 'userId', label: 'User Id' }
  ];

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
      <Text.Headline as="h2">ATG Customers:</Text.Headline>
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
            onRowClick={(row) => push(`${row.userId}/atg-customer-detail`) }
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
