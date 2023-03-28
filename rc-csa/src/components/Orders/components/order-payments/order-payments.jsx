import { useIntl } from 'react-intl';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';

import { CollapsiblePanel, Constraints, DataTable, ExternalLinkIcon, IconButton, Label, MailIcon, SecondaryButton, Spacings, Text, UserLinearIcon } from '@commercetools-frontend/ui-kit';
import { useCallback } from 'react';
import { useShowApiErrorNotification, useShowNotification } from '@commercetools-frontend/actions-global';
import { useFetchPaymentById } from '../../../../hooks/use-payments-connector/use-payments-connector';
import { columns, dummyRows, paymentColumns } from './constants';
import { useFetchOrderPaymentsById } from '../../../../hooks/use-orders-connector/use-orders-connector';
import { itemRenderer, itemRendererPayments } from './helper';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import OrderPaymentsDetails from './order-payments-details';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';

const OrderPayments = (props) =>{
    const intl = useIntl();
    const [reducerValue, forceUpdate] = useReducer(x => x+1,0);
    const { push } = useHistory();
    const match = useRouteMatch();

    const canManage = useIsAuthorized({
        demandedPermissions: [PERMISSIONS.ManageCustomerOrders],
    });

    const {order,loading,error} = useFetchOrderPaymentsById(match.params.id);
    const payments = order?.paymentInfo?.payments;

    const onSubmit = useCallback(async (e)=>{
        console.log("handleSubmit",e);
    })

    return(
    <>
        {payments?.length>0?
        <DataTable
        rows={payments}
        columns={paymentColumns}
        itemRenderer={itemRendererPayments}
        onRowClick={(row)=>{
            push(`${match.url}/${row.id}/details`)
        }}
        />
        :"There are no payments associated with this order."}
        <Switch>
            <SuspendedRoute path={`${match.path}/:id/details`}>
              <OrderPaymentsDetails 
              customerEmail = {order?.customerEmail}
              customerId = {order?.customerId} 
              onClose={() => push(`${match.url}`)}
              canManage={canManage} 
              />
            </SuspendedRoute>
        </Switch>
    </>
    )
}

OrderPayments.displayName = 'OrderPayments';
OrderPayments.propTypes = {
    onClose: PropTypes.func.isRequired,
};
export default OrderPayments;
