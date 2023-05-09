import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  DOMAINS,
  GRAPHQL_TARGETS,
  NO_VALUE_FALLBACK,
} from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../../../constants';
// import {
//   useCustomerDetailsCreator,
// } from '../../../../hooks/use-Customer-connector/use-Customere-graphql-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import DashboardDisplayForm from './dashboard-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { gql } from '@apollo/client';
import { FETCH_TICKETS } from 'ct-tickets-helper-api/lib/graphql-queries';
import { CONSTANTS } from 'ct-tickets-helper-api/lib/constants';
import {
  useDataTableSortingState,
  usePaginationState,
} from '@commercetools-uikit/hooks';
import { useOrdersFetcher } from '../../../../hooks/use-orders-connector';
import { useCartsFetcher } from '../../../../hooks/use-cart-connector/use-cart-connector';
import { useCustomersFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
import { useProductsFetcher } from '../../../../hooks/use-product-search-connector/use-product-search-connector';
import {
  useCreateEntry,
  useFetchTicketsList,
  useUserFetcher,
} from '../../../../hooks/use-register-user-connector';
import { getTicketRows } from 'ct-tickets-helper-api/lib/helper-methods';

const DashboardDisplay = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.ManageCsaTickets],
  });
  const { page, perPage } = usePaginationState();
  const [rowsTick, setRows] = useState(null);
  const [resData, setResData] = useState(null);
  const { user } = useApplicationContext((context) => ({
    user: context.user ?? '',
  }));
  const { projectKey } = useApplicationContext((context) => ({
    projectKey: context.project.key,
  }));
  const { foundUser } = useUserFetcher(user.email);
  const { execute } = useCreateEntry(user.email);
  const { execute: fetchTickets } = useFetchTicketsList();

  useEffect(async () => {
    if (canManage && foundUser == false) {
      await execute();
    }

    if (!rowsTick) {
      const data = await fetchTickets(projectKey, {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        sort: { lastModifiedAt: -1 },
      });

      const r = await getTicketRows(data);
      setRows(r);
      setResData(data);
    }
  }, [foundUser]);

  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  const orderData = useOrdersFetcher({
    page,
    perPage,
    tableSorting,
  });
  const cartData = useCartsFetcher({
    page,
    perPage,
    tableSorting,
  });

  const customerData = useCustomersFetcher({
    page,
    perPage,
    tableSorting,
  });

  const productData = useProductsFetcher({
    page,
    perPage,
    tableSorting,
  });

  const handleSubmit = useCallback();

  return (
    <DashboardDisplayForm
      initialValues={docToFormValues(
        orderData,
        cartData,
        rowsTick,
        customerData,
        productData,
        null,
        projectLanguages
      )}
      onSubmit={handleSubmit}
      ticket={rowsTick}
      order={orderData}
      cart={cartData}
      customer={customerData}
      product={productData}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
    >
      {(formProps) => {
        return (
          <React.Fragment>{formProps.formElements}</React.Fragment>
          // <FormModalPage
          //   title={intl.formatMessage(messages.modalTitle)}
          //   isOpen
          //   onClose={props.onClose}
          //   isPrimaryButtonDisabled={
          //     formProps.isSubmitting || !formProps.isDirty || !canManage
          //   }
          //   isSecondaryButtonDisabled={!formProps.isDirty}
          //   onSecondaryButtonClick={formProps.handleReset}
          //   onPrimaryButtonClick={formProps.submitForm}
          //   labelPrimaryButton={FormModalPage.Intl.save}
          //   labelSecondaryButton={FormModalPage.Intl.revert}
          // >
          //   {formProps.formElements}
          // </FormModalPage>
        );
      }}
    </DashboardDisplayForm>
  );
};
DashboardDisplay.displayName = 'DashboardDisplay';

export default DashboardDisplay;
