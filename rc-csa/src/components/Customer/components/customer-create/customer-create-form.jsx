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
import { BackIcon, Card, Constraints, FlatButton, Label } from '@commercetools-frontend/ui-kit';

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
import { ListWithSearchIcon } from '@commercetools-uikit/icons';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

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

  const { projectKey } =useApplicationContext((context) => ({
    projectKey:context.project.key
  }));

  const formElements = (
    <Spacings.Stack scale="xxl">
      <FlatButton
        as={RouterLink}
        to={`/${projectKey}/customers/${props?.customer?.id}/general/change-history`}
        label={"Open change history"}
        icon={<ListWithSearchIcon />}
        // onClick={() => {
        //   const win = window.open(`/${projectKey}/customers/${props?.customer?.id}/general/change-history`, "_blank");
        //   win.focus();
          
        //   // push(`/${projectKey}/orders/quotes/${row.id}`)
        // }}
      />
      <Spacings.Stack scale="l">
        <Card constraint="xl" theme="light" insetScale="l">

          <Spacings.Inline>

              <Constraints.Horizontal constraint="xl">
                <Card constraint="xl" theme="light" insetScale="l">
                  <Text.Subheadline as="h4" isBold={true} >{'Name'}</Text.Subheadline>
                  <Text.Subheadline as="h3"  > {props.customer?.firstName}</Text.Subheadline>

                </Card>
              </Constraints.Horizontal>


              <Constraints.Horizontal constraint="xl">
                <Card constraint="xl" theme="light" insetScale="l">
                  <Text.Subheadline as="h4" isBold={true} >{'Customer Number'}</Text.Subheadline>
                  <Text.Subheadline as="h3" > {props.customer?.customerNumber}</Text.Subheadline>

                </Card>
              </Constraints.Horizontal>

              <Constraints.Horizontal constraint="xl">
                <Card constraint="xl" theme="light" insetScale="l">
                  <Text.Subheadline as="h4" isBold={true} >{'External Id'}</Text.Subheadline>
                  <Text.Subheadline as="h3" > {props.customer?.externalId}</Text.Subheadline>

                </Card>
              </Constraints.Horizontal>


          </Spacings.Inline>
        </Card>
      </Spacings.Stack>
      <br />
      <br />
      <Spacings.Stack scale="xl">

        <Constraints.Horizontal constraint="l">
          <Card constraint="xl"  >
            <Text.Subheadline as="h3" isBold={true} >{'Aggregates'}</Text.Subheadline>
            <br />
            <Spacings.Inline>
                <Constraints.Horizontal >
                  <Card constraint="xl" theme="light" insetScale="l">
                    <Text.Subheadline as="h4" isBold={true} >{'Order'}</Text.Subheadline>
                    <Text.Subheadline as="h3" >{props.customerSummary?.orderCount}</Text.Subheadline>
                  </Card>
                </Constraints.Horizontal>
                <Constraints.Horizontal >
                  <Card constraint="xl" theme="light" insetScale="l">
                    <Text.Subheadline as="h4" isBold={true} >{'Sales'}</Text.Subheadline>
                    <Text.Subheadline as="h3" >{props.customerSummary?.salesCount}</Text.Subheadline>
                  </Card>
                </Constraints.Horizontal>
                <Constraints.Horizontal >
                  <Card constraint="xl" theme="light" insetScale="l">
                    <Text.Subheadline as="h4" isBold={true} >{'Tickets'}</Text.Subheadline>
                    <Text.Subheadline as="h3" >{props.customerSummary?.ticketsCount}</Text.Subheadline>
                  </Card>
                </Constraints.Horizontal>
                <Constraints.Horizontal min={13}>
                  <Card constraint="xl" insetScale="l" theme="light">
                    <Text.Subheadline as="h4" isBold={true} >{'Saved Carts'}</Text.Subheadline>
                    <Text.Subheadline as="h3" >{props.customerSummary?.activeCartCount}</Text.Subheadline>

                  </Card>
                </Constraints.Horizontal>
            </Spacings.Inline>
          </Card>
        </Constraints.Horizontal>


      </Spacings.Stack>
      <Spacings.Stack scale="l">
        <div className={styles.dateTable}>
          <Spacings.Inline>
                <Constraints.Horizontal constraint="xl">
                  <Card constraint="xl" theme="light" insetScale="xl">
                    <Text.Subheadline as="h2" isBold={true} >{'Shipping Address'}</Text.Subheadline>
                    <br/>

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
                <Constraints.Horizontal constraint="xl">
                  <Card constraint="xl" theme="light" insetScale="xl">
                    <Text.Subheadline as="h2" isBold={true} >{'Billing Address'}</Text.Subheadline>
                    <br/>
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
