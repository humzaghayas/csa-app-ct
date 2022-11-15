import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import Text from '@commercetools-uikit/text';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';


import { EMPLOYEE_ROLES,CUSTOMER_GROUPS,CUSTOMER_PRIORITY} from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import {
  
  Card,
  Constraints,
  Label
  
} from '@commercetools-frontend/ui-kit';

import styles from './customer-create.module.css';
import { Pagination } from '@commercetools-uikit/pagination';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import DataTable from '@commercetools-uikit/data-table';


const rows = [
  { TYPE: 'Cart',ID:'00000001',CREATED:'Apr 11, 2022,2:54:47...',STATUS:'--',UPDATED:'Apr 11, 2022,2:54:47...'},
  { TYPE: 'Saved Cart',ID:'00000001',CREATED:'Apr 11, 2022,2:54:47...',STATUS:'--',UPDATED:'Apr 11, 2022,2:54:47...'},
  { TYPE: 'Order',ID:'00000001',CREATED:'Apr 11, 2022,2:54:47...',STATUS:'COMPLETED',UPDATED:'Apr 11, 2022,2:54:47...'},
  { TYPE: 'Ticket',ID:'00012875',CREATED:'jun 14, 2022,2:54:47...',STATUS:'COMPLETED',UPDATED:'Aug 14, 2022,2:54:47...'},
];

const columns = [

  { key: 'TYPE', label: 'TYPE' },
  { key: 'ID', label: 'ID' },
  { key: 'STATUS', label: 'STATUS' },
  { key: 'CREATED', label: 'CREATED' },
  { key: 'UPDATED', label: 'UPDATED' },
];

const CustomerCreateForm = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  const formElements = (
    <Spacings.Stack scale="xxl">
      <Spacings.Stack scale="l">
      <Spacings.Inline>
        <Spacings.Stack scale="m">
        <div className={styles.amountCard}>
          <Constraints.Horizontal constraint="xl">
                  <Card  constraint="xl">
                     <div className={styles.imageContainer}>
                       <Label isBold={true} as='h1' >
                       <div className={styles.FieldLabel}> 
                       {'Name'}
                       </div>
                      </Label>
                      <Text.Body  >
                    <div className={styles.changePricesLabel}> 
                      {'Lahari'}
                    </div>
                     </Text.Body>
                    </div>
                  </Card>
        </Constraints.Horizontal>
        </div>
       
        </Spacings.Stack>
        <Spacings.Stack scale="m">
        <div className={styles.amountCard}>
        <Constraints.Horizontal constraint="xl">
                  <Card  constraint="xl">
                     <div className={styles.imageContainer}>
                       <Label isBold={true} as='h1' >
                       <div className={styles.FieldLabel}> 
                       {'Customer Id'}
                       </div>
                      </Label>
                      <Text.Body  >
                    <div className={styles.changePricesLabel}> 
                      {'00000081'}
                    </div>
                     </Text.Body>
                    </div>
                  </Card>
        </Constraints.Horizontal>
        </div>
          {/* <h2 >Customer Id</h2>
          <h3>00000081</h3> */}
        </Spacings.Stack>
        <Spacings.Stack scale="m">
        <div className={styles.amountCard}>
        <Constraints.Horizontal constraint="xl">
                  <Card  constraint="xl">
                     <div className={styles.imageContainer}>
                       <Label isBold={true} as='h1' >
                       <div className={styles.FieldLabel}> 
                       {'Original Id'}
                       </div>
                      </Label>
                      <Text.Body  >
                    <div className={styles.changePricesLabel}> 
                      {'10010781'}
                    </div>
                     </Text.Body>
                    </div>
                  </Card>
        </Constraints.Horizontal>
          </div>
        </Spacings.Stack>
          </Spacings.Inline>
          </Spacings.Stack>
          <Spacings.Stack scale="l">
         <div className={styles.dateTable}>
          <DataTable
            isCondensed
            columns={columns}
            rows={rows}
         
            maxHeight={600}
          
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            // totalItems={data.total}
          />
          </div>
        </Spacings.Stack>
        <Spacings.Stack scale="l">
        <div className={styles.dateTable}>
      <Spacings.Inline>
        <Spacings.Stack scale="m">
        <div className={styles.amountCard}>
          <Constraints.Horizontal constraint="xl">
                  <Card  constraint="xl">
                     <div className={styles.imageContainer}>
                       <Label isBold={true} as='h1' >
                       <div className={styles.FieldLabel}> 
                       {'Delivery Address'}
                       </div>
                      </Label>
                      <Text.Body  >
                      <div className={styles.changePricesLabel}> 
                      {'Munchins Strasse'}
                    </div>
                    <div className={styles.changePricesLabel}> 
                      {'Belgium'}
                    </div>
                     </Text.Body>
                    </div>
                  </Card>
        </Constraints.Horizontal>
        </div>
       
        </Spacings.Stack>
        <Spacings.Stack scale="m">
        <div className={styles.amountCard}>
        <Constraints.Horizontal constraint="xl">
                  <Card  constraint="xl">
                     <div className={styles.imageContainer}>
                       <Label isBold={true} as='h1' >
                       <div className={styles.FieldLabel}> 
                       {'Billing Address'}
                       </div>
                      </Label>
                      <Text.Body  >
                      <div className={styles.changePricesLabel}> 
                      {'Munchins Strasse'}
                    </div>
                    <div className={styles.changePricesLabel}> 
                      {'Belgium'}
                    </div>
                     </Text.Body>
                    </div>
                  </Card>
        </Constraints.Horizontal>
        </div>
          {/* <h2 >Customer Id</h2>
          <h3>00000081</h3> */}
        </Spacings.Stack>
      
          </Spacings.Inline>
          </div>
         
          </Spacings.Stack>
{/*      
    <CollapsiblePanel
         data-testid="quote-summary-panel"
         header={
           <CollapsiblePanel.Header>
             {/* {formatMessage(messages.panelTitle)} 
             {'Essentials'}
           </CollapsiblePanel.Header>
         }
         scale="l">
           <Constraints.Horizontal >
            <Spacings.Stack scale="m">
            <Spacings.Stack scale="s">
       <TextField
         name="Name"
         title="Name"
         value="Lahari"
        //  value={formik.values.title}
         errors={formik.errors.title}
         touched={formik.touched.title}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         horizontalConstraint={13}
       />
       </Spacings.Stack>
       <Spacings.Stack scale="s">
         <TextField
         name="Id"
         title="Id"
         value="10010781"
        //  value={formik.values.firstName}
         errors={formik.errors.firstName}
         touched={formik.touched.firstName}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         horizontalConstraint={13}
       />
    
    </Spacings.Stack>
    <Spacings.Stack scale="s">
       <TextField
         name="Original Id"
         title="Original Id"
         value="10010781"
        //  value={formik.values.middleName}
         errors={formik.errors.middleName}
         touched={formik.touched.middleName}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         horizontalConstraint={13}
       />
       </Spacings.Stack>
       <Spacings.Stack scale="s">
       <TextField
         name="Customer Id"
         title="Customer Id"
         value="0000081"
        //  value={formik.values.lastName}
         errors={formik.errors.lastName}
         touched={formik.touched.lastName}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         horizontalConstraint={13}
       />
    </Spacings.Stack>
   
       </Spacings.Stack>
       </Constraints.Horizontal>
  
    </CollapsiblePanel> */}
   </Spacings.Stack>
  );

  return props.children({
    formElements,
    values: formik.values,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    handleReset: formik.handleReset,
  });
};
CustomerCreateForm.displayName = 'CustomerCreateForm';
CustomerCreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default CustomerCreateForm;
