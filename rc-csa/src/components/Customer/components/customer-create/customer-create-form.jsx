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

import {
  EMPLOYEE_ROLES,
  CUSTOMER_GROUPS,
  CUSTOMER_PRIORITY,
} from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import { Card, Constraints, Label } from '@commercetools-frontend/ui-kit';

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
  {
    TYPE: 'Cart',
    ID: '00000001',
    CREATED: 'Apr 11, 2022,2:54:47...',
    STATUS: '--',
    UPDATED: 'Apr 11, 2022,2:54:47...',
  },
  {
    TYPE: 'Saved Cart',
    ID: '00000001',
    CREATED: 'Apr 11, 2022,2:54:47...',
    STATUS: '--',
    UPDATED: 'Apr 11, 2022,2:54:47...',
  },
  {
    TYPE: 'Order',
    ID: '00000001',
    CREATED: 'Apr 11, 2022,2:54:47...',
    STATUS: 'COMPLETED',
    UPDATED: 'Apr 11, 2022,2:54:47...',
  },
  {
    TYPE: 'Ticket',
    ID: '00012875',
    CREATED: 'jun 14, 2022,2:54:47...',
    STATUS: 'COMPLETED',
    UPDATED: 'Aug 14, 2022,2:54:47...',
  },
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
          
              <Constraints.Horizontal constraint="xl">
                <Card constraint="xl" theme="dark" insetScale="l">
                <Text.Subheadline as="h4" isBold={true} tone="information">{'Name'}</Text.Subheadline>
                <Text.Subheadline as="h3"  > {props.customer?.firstName}</Text.Subheadline>
                 
                </Card>
              </Constraints.Horizontal>
            
          </Spacings.Stack>
          <Spacings.Stack scale="m">
           
              <Constraints.Horizontal constraint="xl">
                <Card constraint="xl" theme="dark" insetScale="l">
                <Text.Subheadline as="h4" isBold={true} tone="information">{'Customer Number'}</Text.Subheadline>
                <Text.Subheadline as="h3" > {props.customer?.customerNumber}</Text.Subheadline>
                 
                </Card>
              </Constraints.Horizontal>
          
            
          </Spacings.Stack>
          <Spacings.Stack scale="m">
           
              <Constraints.Horizontal constraint="xl">
                <Card constraint="xl" theme="dark" insetScale="l">
                <Text.Subheadline as="h4" isBold={true} tone="information">{'External Id'}</Text.Subheadline>
                <Text.Subheadline as="h3" > {props.customer?.externalId}</Text.Subheadline>
                
                </Card>
              </Constraints.Horizontal>
            
          </Spacings.Stack>
        </Spacings.Inline>
      </Spacings.Stack>
      <br />
      <br />
      <Spacings.Stack scale="xl">
       
          <Constraints.Horizontal constraint="l">
            <Card constraint="xl" min={23} max={27} >
            <Text.Subheadline as="h4" isBold={true} tone="positive">{'Aggregates'}</Text.Subheadline>
           <br />
              <Spacings.Inline>
                <Spacings.Stack scale="l">
                  <Constraints.Horizontal >
                    <Card constraint="xl" theme="dark" insetScale="l">
                    <Text.Subheadline as="h4" isBold={true} tone="information">{'Order'}</Text.Subheadline>
                <Text.Subheadline as="h3" >  5</Text.Subheadline>
                     
                    </Card>
                  </Constraints.Horizontal>
                </Spacings.Stack>
                <Spacings.Stack scale="l">
                <Constraints.Horizontal >
                    <Card constraint="xl" theme="dark" insetScale="l">
                    <Text.Subheadline as="h4" isBold={true} tone="information">{'Sales'}</Text.Subheadline>
                <Text.Subheadline as="h3" >125</Text.Subheadline>
                     
                    </Card>
                  </Constraints.Horizontal>
                </Spacings.Stack>
                <Spacings.Stack scale="l">
                <Constraints.Horizontal >
                    <Card constraint="xl" theme="dark" insetScale="l">
                    <Text.Subheadline as="h4" isBold={true} tone="information">{'Tickets'}</Text.Subheadline>
                <Text.Subheadline as="h3" >10</Text.Subheadline>
                      
                    </Card>
                  </Constraints.Horizontal>
                </Spacings.Stack>
                <br/>
                <Spacings.Stack scale="l">
                <Constraints.Horizontal min={13}>
                <Card constraint="xl" insetScale="l" theme="dark">
                    <Text.Subheadline as="h4" isBold={true} tone="information">{'Saved Cart'}</Text.Subheadline>
                <Text.Subheadline as="h3" >1</Text.Subheadline>
                     
                    </Card>
                  </Constraints.Horizontal>
                </Spacings.Stack>
              </Spacings.Inline>
            </Card>
          </Constraints.Horizontal>
       
     
      </Spacings.Stack>
      <Spacings.Stack scale="l">
        <div className={styles.dateTable}>
          <Spacings.Inline>
            <Spacings.Stack scale="m">
              <div className={styles.amountCard}>
                <Constraints.Horizontal constraint="xl">
                <Card constraint="xl" theme="dark" insetScale="xl">
                    <Text.Subheadline as="h4" isBold={true} tone="information">{'Shipping Address'}</Text.Subheadline>
                <Text.Subheadline as="h3" >
                {props.customer?.defaultShippingAddress?.firstName}{' '}
                          {props.customer?.defaultShippingAddress?.lastName}
                          <br />
                          {props.customer?.defaultShippingAddress?.streetNumber}
                          ,{props.customer?.defaultShippingAddress?.apartment},
                          {props.customer?.defaultShippingAddress?.building}
                          <br />
                          {props.customer?.defaultShippingAddress?.city}
                          <br />
                          {props.customer?.defaultShippingAddress?.region}
                          <br />
                          {props.customer?.defaultShippingAddress?.state}
                          <br />
                          {props.customer?.defaultShippingAddress?.country}
                          <br />
                          {props.customer?.defaultShippingAddress?.postalCode}
                </Text.Subheadline>
                  
                  </Card>
                </Constraints.Horizontal>
              </div>
            </Spacings.Stack>
            <Spacings.Stack scale="m">
              <div className={styles.amountCard}>
                <Constraints.Horizontal constraint="xl">
                <Card constraint="xl" theme="dark" insetScale="xl">
                    <Text.Subheadline as="h4" isBold={true} tone="information">{'Shipping Address'}</Text.Subheadline>
                <Text.Subheadline as="h3" >
                {props.customer?.defaultBillingAddress?.firstName}{' '}
                          {props.customer?.defaultBillingAddress?.lastName}
                          <br />
                          {props.customer?.defaultBillingAddress?.streetNumber},
                          {props.customer?.defaultBillingAddress?.apartment},
                          {props.customer?.defaultBillingAddress?.building}
                          <br />
                          {props.customer?.defaultBillingAddress?.city}
                          <br />
                          {props.customer?.defaultBillingAddress?.region}
                          <br />
                          {props.customer?.defaultBillingAddress?.state}
                          <br />
                          {props.customer?.defaultBillingAddress?.country}
                          <br />
                          {props.customer?.defaultBillingAddress?.postalCode}
                          </Text.Subheadline>
                 
                  </Card>
                </Constraints.Horizontal>
              </div>
             
            </Spacings.Stack>
          </Spacings.Inline>
        </div>
      </Spacings.Stack>
    
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
