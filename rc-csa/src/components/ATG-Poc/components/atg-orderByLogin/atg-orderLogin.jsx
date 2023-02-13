import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Pagination } from '@commercetools-uikit/pagination';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import DataTable from '@commercetools-uikit/data-table';
import Spacings from '@commercetools-uikit/spacings';
import { orderLoginId } from '../../api';
import { formValuesToDoc } from './conversions';
import { useAsyncDispatch } from '@commercetools-frontend/sdk';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

// const orderFirst = JSON.parse({
//   id: 'o190002',
//   state: 'SUBMITTED',
//   transient: 'false',
//   profileId: 'mp400004',
//   organizationId: 'mporg3004',
//   creationDate: '2023-02-06 01:26:29.0',
//   lastModifiedDate: '2023-02-06 01:43:36.0',
//   submittedDate: '2023-02-06 01:43:36.0',
// });

const AtgOrderLogin = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const params = useParams();

  const atgPublicURL = useApplicationContext(
    (context) => context.environment.atgPublicURL
  );
  // const OrderId = params.id;

  const id = params.id;
  const QUERY = {
    arg1: id,
  };
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState('id desc');

  const [data, setData] = useState(null);

  // const id = formValuesToDoc(formValues);
  // console.log('id', id);
  // // //const apiUrl ="http://localhost:4456";
  const apiUrl = `${atgPublicURL}/rest/bean/atg/commerce/order/OrderManager/getOrdersForProfile`;

  const dispatch = useAsyncDispatch();
  useEffect(() => {
    if (!data) {
      orderLoginId({ url: apiUrl, payload: QUERY }, dispatch).then((res) =>
        setData(res)
      );
    }
  }, [apiUrl, QUERY]);

  let i = data?.atgResponse[0].indexOf('id:') + 3;
  let s = data?.atgResponse[0].indexOf(';', 0);
  let orderid = data?.atgResponse[0].substr(i, s - i);
  let i2 = data?.atgResponse[1].indexOf('id:') + 3;
  let s2 = data?.atgResponse[1].indexOf(';', 0);
  let orderid2 = data?.atgResponse[1].substr(i, s - i);
  // const orderSecond = JSON.parse(data?.atgResponse.replace('Order[', '['));

  console.log('orderid', orderid);
  const rows = [
    // {
    //   id: orderFirst.id,
    //   state: orderFirst.state,
    //   organizationId: orderFirst.organizationId,
    //   creationDate: orderFirst.creationDate,
    // },
    {
      id: orderid,
    },
    {
      id: orderid2,
    },
    // {
    //   id: data?.childCategories[2].id,
    //   displayName: data?.childCategories[2].displayName,
    //   description: data?.childCategories[2].description,
    // },
  ];

  const columns = [
    { key: 'id', label: 'Order ID' },
    // { key: 'state', label: 'State' },
    // { key: 'organizationId', label: 'Organization ID' },
    // { key: 'creationDate', label: 'Creation Date' },
    // { key: 'displayName', label: 'Display Name' },
    // { key: 'description', label: 'Description' },
  ];

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="l">
        <DataTable
          isCondensed
          columns={columns}
          rows={rows}
          maxHeight={600}
          // onRowClick={(row) => push(`${row.id}/atg-products`)}
        />

        <Pagination
          page={page.value}
          onPageChange={page.onChange}
          perPage={perPage.value}
          onPerPageChange={perPage.onChange}
          // totalItems={data.total}
        />
      </Spacings.Stack>
    </Spacings.Stack>
  );
};
AtgOrderLogin.displayName = 'AtgOrderLogin';
AtgOrderLogin.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default AtgOrderLogin;
