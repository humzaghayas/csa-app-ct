import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import { Pagination } from '@commercetools-uikit/pagination';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import {usePaginationState} from '@commercetools-uikit/hooks';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { useState } from 'react';
import DataTable from '@commercetools-uikit/data-table';
import { usePasswordGetToken,useResetPassword,useSendEmailConfig } from '../../../../hooks/use-customer-password-connector';
import { createPassword } from 'ct-tickets-helper-api';
import { useFindCustomerService } from '../../../../hooks/use-customer-connector/use-customer-connector';
import { useShowApiErrorNotification, useShowNotification } from '@commercetools-frontend/actions-global';
import { DOMAINS } from '@commercetools-frontend/constants';
import messages from './messages';

const CustomerPassword = (props) => {
  const intl = useIntl();
  const[password , setPassword] = useState(false)
  const { page, perPage } = usePaginationState();

  const {execute} = usePasswordGetToken();
  const {execute:execReserPassword} = useResetPassword();
  const {execute:execSendEmail} = useSendEmailConfig();
  const {getCustomerByEmail} = useFindCustomerService();

  const showNotification = useShowNotification();

  const rows = [
    { externalId: props?.customer?.externalId,customerNumber:props?.customer?.customerNumber,
      externalId: props?.customer?.externalId,Name:'' ,
      firstName:props?.customer?.firstName, middleName:props?.customer?.middleName, 
      lastName:props?.customer?.lastName,
      PasswordRequest:''},

  ];
  // const { push } = useHistory();
  const columns = [
  
    { key: 'externalId', label: 'External ID'  },
    { key: 'customerNumber', label: 'Customer Number' },
    { key: 'Name', label: 'Name',renderItem: (row) => (
      <div>
        {row.firstName} {row.middleName} {row.lastName}   
      </div>) }
    ,
    { key: 'PasswordRequest', label: 'PasswordRequest' ,renderItem: (row) => (
      <div>
         <PrimaryButton
                 label="Change Password"
                onClick={() => resetPassword()}
              isDisabled={false}
                size = "big"
        />
     </div>) }
  ];

  const resetPassword = async()=>{
    const resetPasswordVal = await execute(props?.customer?.email);

    console.log('resetPasswordVal',resetPasswordVal);


    const password = createPassword(10,true,true);


    const c = await getCustomerByEmail(props?.customer?.email);
    console.log('c',c);
    const val =await execReserPassword(c?.data?.customers?.results[0].version,
      resetPasswordVal.data.customerCreatePasswordResetToken.value,
      password);

      console.log('execReserPassword',val);

     
      const e = await execSendEmail({},{
        to:c?.data?.customers?.results[0].email,
        subject:"Password Regenerated.",
        html:`<p>Your new password is Regenerated.</p><p>Your new password is: ${password}</p>`
    });

    showNotification({
      kind: 'success',
      domain: DOMAINS.SIDE,
      text: intl.formatMessage(messages.PsswordChangedSuccessfully),
    });
  }
  return (
    <Spacings.Stack scale="xl">
    
      {/* {data ? ( */}
        <Spacings.Stack scale="l">
      
 
          <DataTable
            isCondensed
            columns={columns}
            rows={rows}
            verticalCellAlignment={'center'}
            horizontalCellAlignment={'center'}
                      maxHeight={600}
          
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            // totalItems={data.total}
          />
          
        </Spacings.Stack>
      {/* ) : null} */}
    </Spacings.Stack>
  );

};
CustomerPassword.displayName = 'CustomerPassword';
CustomerPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default CustomerPassword;
