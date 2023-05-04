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


const CustomerPasswordForm = (props) => {
  const intl = useIntl();
  const[password , setPassword] = useState(false)
  const { page, perPage } = usePaginationState();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });
  const rows = [
    { TicketNumber: '00000001',FirstName:'Lahari',PasswordRequest:'',LastUpdated:'Nov 24, 2022,2:54:47...',},
    { TicketNumber: '00000002',FirstName:'Lahari',PasswordRequest:'',LastUpdated:'jun 05, 2022,2:54:47...'},
    { TicketNumber: '00000003',FirstName:'Lahari',PasswordRequest:'',LastUpdated:'May 21, 2022,2:54:47...'},
    { TicketNumber: '00000003',FirstName:'Lahari',PasswordRequest:'',LastUpdated:'Apr 11, 2022,2:54:47...'},
  ];
  // const { push } = useHistory();
  const columns = [
  
    { key: 'TicketNumber', label: 'Ticket Number'  },
    { key: 'FirstName', label: 'Customer' },
    { key: 'PasswordRequest', label: 'Password Request',renderItem: (row) => (
      <div>
         <PrimaryButton
                 label="Change Password"
                //  onClick={() => setPassword(true)}
              isDisabled={false}
                size = "big"
  />
    </div>) },
    { key: 'LastUpdated', label: 'Last Updated'  },
    // { key: 'DeliveryMode', label: 'Delivery Mode',renderItem: (row) => (
    //   <SecondaryButton label={row.DeliveryMode} onClick={() => alert('Button clicked')} />) },
  //   { key: 'Status', label: 'Status',renderItem: (row) => (
  //     <div>
  //        <PrimaryButton
  //                label="Change Password"
  //                onClick={() => setPassword(true)}
  //             isDisabled={false}
  //               // horizontalConstraint={13}
  //               size = "big"
  // />
  //   </div>)},
  ];
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
//   const formElements = (
//     <Spacings.Stack scale="m">
     
            
           
           
            
//              <PasswordField
//     title="My Password"
//     value="s3cr3t"
//     onChange={(event) => alert(event.target.value)}
//     horizontalConstraint={13}
//   />
 

//  <Spacings.Inline>
//                <PrimaryButton
//                 label="Change Password"
//                 onClick={() => setPassword(true)}
//                isDisabled={false}
//                 // horizontalConstraint={13}
//                size = "big"
//   />
//   </Spacings.Inline>
//   {password == true ? <div >
//   <ContentNotification type="info" align="center" >A link send to your mail to reset the password</ContentNotification>
//  </div>: null}
//  {password == true ? <div >
//   <ContentNotification type="success" align="center" >your password has been changed successfully</ContentNotification>
//   </div>: null}
            
       
//     </Spacings.Stack>
//   );

//   return props.children({
//     formElements,
//     values: formik.values,
//     isDirty: formik.dirty,
//     isSubmitting: formik.isSubmitting,
//     submitForm: formik.handleSubmit,
//     handleReset: formik.handleReset,
//   });
};
CustomerPasswordForm.displayName = 'CustomerPasswordForm';
CustomerPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default CustomerPasswordForm;
