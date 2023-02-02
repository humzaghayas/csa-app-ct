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
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../../../constants';
// import {
//   useTicketDetailsCreator,
// } from '../../../../hooks/use-Ticket-connector/use-Tickete-graphql-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import CartViewForm from './cart-view-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { useRouteMatch } from 'react-router-dom';
import { useFetchCartById} from '../../../../hooks/use-cart-connector/use-cart-connector';
import Spacings from '@commercetools-uikit/spacings';
import { PlusBoldIcon, SecondaryButton } from '@commercetools-frontend/ui-kit';

const CartView = (props) => {
  const intl = useIntl();
  const params = useParams();
  const match = useRouteMatch();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const {cart} = useFetchCartById(match.params.id);
  // const showNotification = useShowNotification();
  // const showApiErrorNotification = useShowApiErrorNotification();
  // const TicketDetailsCreator = useTicketDetailsCreator();
  const handleSubmit = useCallback(
    
  );

  return (
    <CartViewForm
    initialValues={docToFormValues(cart, projectLanguages)}
    onSubmit={handleSubmit}
    isReadOnly={!canManage}
    dataLocale={dataLocale}
    >
      {(formProps) => {
        return (
          <React.Fragment>
           
          {formProps.formElements}
        </React.Fragment>
        );
      }}
    </CartViewForm>
  );
};
CartView.displayName = 'CartDetails';
CartView.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default CartView;
