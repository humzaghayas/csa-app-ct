import { useIntl } from 'react-intl';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';

import { CollapsiblePanel, Constraints, DataTable, ExternalLinkIcon, IconButton, Label, MailIcon, SecondaryButton, Spacings, Text, UserLinearIcon } from '@commercetools-frontend/ui-kit';
import { useCallback } from 'react';
import { useShowApiErrorNotification, useShowNotification } from '@commercetools-frontend/actions-global';
import { useFetchPaymentById } from '../../../../hooks/use-payments-connector/use-payments-connector';
import { columns, dummyRows } from './constants';
import { useFetchOrderPaymentsById } from '../../../../hooks/use-orders-connector/use-orders-connector';
import { itemRenderer } from './helper';

const OrderPayments = (props) =>{
    const intl = useIntl();
    const [reducerValue, forceUpdate] = useReducer(x => x+1,0);
    const { push } = useHistory();
    const match = useRouteMatch();

    const {order,loading,error} = useFetchOrderPaymentsById(match.params.id);
    const payments = order?.paymentInfo?.payments;

    const onSubmit = useCallback(async (e)=>{
        console.log("handleSubmit",e);
    })

    return(
    <>
        {payments?.length>0?payments?.map((payment,index)=>{
            const i = index+1;
            return  <CollapsiblePanel
            headerControls={
                <Spacings.Inline scale='s' alignItems='flex-end'>
                <IconButton
                    icon={<UserLinearIcon/>}
                    onClick={()=>{
                        push('/csa-project-2/csa-customer-tickets/customer-account/'+payment?.customer?.id+'/Customers-summary')
                    }}
                    label='Customer'
                />
                <IconButton
                    icon={<MailIcon/>}
                    onClick={()=>{
                        alert('Send Link')
                        console.log("Send Payment Link");
                    }}
                />
                </Spacings.Inline>
            }

            header={<CollapsiblePanel.Header>
                <Spacings.Inline>
                {"Payment #"+i+" "}
                </Spacings.Inline>
            </CollapsiblePanel.Header>}
            secondaryHeader={payment?.id}
            description={<Spacings.Inline>
                <Constraints.Horizontal>
                <Spacings.Stack scale='l'>
                {"Date created: "+payment?.createdAt}
                </Spacings.Stack>
                <Spacings.Stack scale='l' alignItems='flex-end'>
                {"Date Modified: "+payment?.lastModifiedAt}
                </Spacings.Stack>
                </Constraints.Horizontal>
            </Spacings.Inline>}
            >
            <Constraints.Horizontal>
        
            <Spacings.Stack  scale='xl'>
             <Spacings.Inline>
                <Spacings.Stack scale='l'>
                   <Label isBold={true}>
                       Payment method name:   
                   </Label>
                </Spacings.Stack>
                <Spacings.Stack scale='s' alignItems='center'>
                   <Label>
                   {payment?.paymentMethodInfo?.name}
                   </Label>
                </Spacings.Stack>
             </Spacings.Inline>
             <Spacings.Inline>
                <Spacings.Stack scale='l'>
                   <Label isBold={true}>
                       Payment method:   
                   </Label>
                </Spacings.Stack>
                <Spacings.Stack scale='s' alignItems='center'>
                   <Label>
                   {payment?.paymentMethodInfo?.method}
                   </Label>
                </Spacings.Stack>
             </Spacings.Inline>
             <Spacings.Inline>
                <Spacings.Stack scale='l'>
                   <Label isBold={true}>
                   Payment service provider (PSP):   
                   </Label>
                </Spacings.Stack>
                <Spacings.Stack scale='s' alignItems='center'>
                   <Label>
                   {payment?.paymentMethodInfo?.paymentInterface}
                   </Label>
                </Spacings.Stack>
             </Spacings.Inline>
             <Spacings.Inline>
                <Spacings.Stack scale='l'>
                   <Label isBold={true}>
                   Payment provider ID:   
                   </Label>
                </Spacings.Stack>
                <Spacings.Stack scale='s' alignItems='center'>
                   <Label>
                   {payment?.interfaceId}
                   </Label>
                </Spacings.Stack>
             </Spacings.Inline>
             <Spacings.Inline>
                <Spacings.Stack scale='l'>
                   <Label isBold={true}>
                   Payment state:   
                   </Label>
                </Spacings.Stack>
                <Spacings.Stack scale='s' alignItems='center'>
                   <Label>
                   {payment?.paymentStatus?.interfaceCode?payment?.paymentStatus?.interfaceCode:"-"}
                   </Label>
                </Spacings.Stack>
             </Spacings.Inline>
             <Spacings.Inline>
                <Spacings.Stack scale='l'>
                   <Label isBold={true}>
                   Amount planned:   
                   </Label>
                </Spacings.Stack>
                <Spacings.Stack scale='s' alignItems='center'>
                   <Label>
                   {"$"+payment?.amountPlanned?.centAmount/100+".00"}
                   </Label>
                </Spacings.Stack>
             </Spacings.Inline>
             <Spacings.Inline>
                <Spacings.Stack scale='l'>
                   <Label isBold={true}>
                   PSP Status Code:   
                   </Label>
                </Spacings.Stack>
                <Spacings.Stack scale='s' alignItems='center'>
                   <Label>
                   {"-"}
                   </Label>
                </Spacings.Stack>
             </Spacings.Inline>
             <Spacings.Inline>
                <Spacings.Stack scale='l'>
                   <Label isBold={true}>
                   Description:   
                   </Label>
                </Spacings.Stack>
                <Spacings.Stack scale='s' alignItems='center'>
                   <Label>
                   {"-"}
                   </Label>
                </Spacings.Stack>
             </Spacings.Inline>

             <DataTable
             columns={columns}
             rows={payment?.transactions}
             itemRenderer={itemRenderer}
            />

             </Spacings.Stack>
            </Constraints.Horizontal>
        </CollapsiblePanel>              
        }):"No payments found"}
    </>
    )
}

OrderPayments.displayName = 'OrderPayments';
OrderPayments.propTypes = {
    onClose: PropTypes.func.isRequired,
};
export default OrderPayments;
