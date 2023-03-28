import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
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
import TicketDisplayForm from './ticket-details-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { gql } from '@apollo/client';
import { FETCH_TICKETS } from 'ct-tickets-helper-api/lib/graphql-queries';
import { CONSTANTS } from 'ct-tickets-helper-api/lib/constants';
import { useDataTableSortingState, usePaginationState } from '@commercetools-uikit/hooks';
import { useOrdersFetcher } from '../../../../hooks/use-orders-connector';
import { useCartsFetcher } from '../../../../hooks/use-cart-connector/use-cart-connector';

const TicketDisplay = (props) => {
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
  const { data, error, loading, refetch } = useMcQuery(
    gql`
      ${FETCH_TICKETS}
    `,
    {
      variables: {
        container: CONSTANTS.containerKey,
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        sort: ['createdAt desc'],
      },
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      fetchPolicy: 'network-only',
    }
  );
  console.log('test');

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

  const handleSubmit = useCallback();

  return (
    <TicketDisplayForm
      initialValues={docToFormValues(
        orderData, cartData, data,
        null, projectLanguages)}
      onSubmit={handleSubmit}
      ticket={data}
      order={orderData}
      cart={cartData}
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
    </TicketDisplayForm>
  );
};
TicketDisplay.displayName = 'TicketDisplay';
// TicketDisplay.propTypes = {
//   onClose: PropTypes.func.isRequired,
// };
export default TicketDisplay;
