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
import { useEffect, useState } from 'react';
import Text from '@commercetools-uikit/text';
import { useGetATGCustomerDetail, useGetAtgOrders,useUpdateCustomerInfo } from '../../../../hooks/use-atg-conector';
import { PrimaryButton, TextField } from '@commercetools-frontend/ui-kit';
import { useFormik } from 'formik';

const AtgCustomerDetail = (props) => {


  const { page, perPage } = usePaginationState();
  const [rows, setRows] = useState([{userId:"Loading..."}]);
  const [rowsOrders, setRowsOrders] = useState([{orderId:"Loading..."}]);
  const [isCustomerFetched, setIsCustomerFetched] = useState(false);
  const { push } = useHistory();

  const {execute} = useGetATGCustomerDetail();
  const {execute:execOrders} = useGetAtgOrders();
  const match = useRouteMatch();

  const {execute:execUpdateCustomer} = useUpdateCustomerInfo(match.params.id);

  console.log('humza');

  useEffect(async () => {

    if(!isCustomerFetched){
      const headers = {
        'Content-Type': 'application/json',
      }
      const customer = await execute(headers,match.params.id);
      const orders = await execOrders(match.params.id);
      setRows([customer]);
      setRowsOrders(orders);

      console.log('order',orders);
      setIsCustomerFetched(true);

      console.log('humza');
    }
  },[]);


  const getInitialValues=(customerInfo)=>{
    return {
      userId: customerInfo?.userId ?? '',
      login: customerInfo?.login ?? '',
      firstName: customerInfo?.firstName ?? '',
      middleName: customerInfo?.middleName ?? '',
      lastName: customerInfo?.lastName ?? '',
      email: customerInfo?.email ?? '',
    }
  }

  const formik = useFormik({
    // Pass initial values from the parent component.
    initialValues: getInitialValues(rows[0]),
    // Handle form submission in the parent component.
    onSubmit: props.onSubmit,
    enableReinitialize: true,
  });

  //atgCustomers;

  const updateUserInfo = async (e)=>{
  
    const data = await execUpdateCustomer({"Content-Type":"application/json"},{"middleName":formik.values.middleName})

    if(data && data['atg-rest-response'] && data['atg-rest-response']?.atgResponse){
      alert('Updates Successfully!')
    }else{
      alert('Failed to Update!')
    }
  }

  const columns = [
    { key: 'userId', label: 'User Id' },
    { key: 'login', label: 'Login' },
    { key: 'firstName', label: 'First Name' },
    { key: 'middleName', label: 'Middle Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' }
  ];

  const columnsOrders = [
    { key: 'orderId', label: 'Order Id' }
  ];

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
      <Text.Headline as="h2">ATG Customer Info:</Text.Headline>

      <Spacings.Inline alignItems="flex-end">
      <TextField
            name="login"
            title="Login ID"
            value={formik.values.login}
            isReadOnly={true}
            horizontalConstraint={13}
            errors={formik.errors.login}
            touched={formik.touched.login}
            onBlur={formik.handleBlur}
          />
        <TextField
            name="userId"
            title="User Id"
            value={formik.values.userId}
            isReadOnly={true}
            horizontalConstraint={13}
            errors={formik.errors.userId}
            touched={formik.touched.userId}
            onBlur={formik.handleBlur}
          />
        </Spacings.Inline>
      
      <Spacings.Inline alignItems="flex-end">
      <TextField
            name="firstName"
            title="First Name"
            value={formik.values.firstName}
            horizontalConstraint={13}
            isReadOnly={true}
          />
        <TextField
            name="lastName"
            title="Last Name"
            value={formik.values.lastName}
            horizontalConstraint={13}
            isReadOnly={true}
          />
        </Spacings.Inline>
      <Spacings.Inline alignItems="flex-end">
        <TextField
            name="middleName"
            title="Middle Name"
            value={formik.values.middleName}
            horizontalConstraint={13}
            onChange={formik.handleChange}
            errors={formik.errors.middleName}
            touched={formik.touched.middleName}
            onBlur={formik.handleBlur}            
          />
        <TextField
            name="email"
            title="Email"
            value={formik.values.email}
            horizontalConstraint={13}
            isReadOnly={true}
          />
        </Spacings.Inline>
        <Spacings.Inline alignItems="flex-end">
        <PrimaryButton
                type="submit"
                label="Submit"
                onClick={updateUserInfo}
                isDisabled={formik.isSubmitting}
                // isDisabled={disableSubmitButton }
              />        
          </Spacings.Inline>
      </Spacings.Stack>

      <Spacings.Stack scale="xs">
      <Text.Headline as="h2">ATG Orders For Customer:</Text.Headline>
      <Spacings.Stack scale="l">
          <DataTable
            isCondensed
            columns={columnsOrders}
            rows={rowsOrders}
            maxHeight={600}
            onRowClick={(row) => push(`${row.orderId}/atg-order-detail`) }
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
          />
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
