import { useIntl } from 'react-intl';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';

import { CloseIcon, CollapsiblePanel, Constraints, DataTable, ExternalLinkIcon, IconButton, Label, MailIcon, SecondaryButton, Spacings, Text, UserLinearIcon } from '@commercetools-frontend/ui-kit';
import { useCallback } from 'react';
import { useShowApiErrorNotification, useShowNotification } from '@commercetools-frontend/actions-global';
import { useFetchPaymentById } from '../../../../hooks/use-payments-connector/use-payments-connector';
import { columns, dummyRows } from './constants';
import { itemRenderer } from './helper';

const OrderPaymentsDetails = (props) =>{
    const intl = useIntl();
    const [reducerValue, forceUpdate] = useReducer(x => x+1,0);
    const { push } = useHistory();
    const match = useRouteMatch();

    const {payment,loading,error} = useFetchPaymentById(match?.params?.id);
    console.log("Payment"+payment);

    const onSubmit = useCallback(async (e)=>{
        console.log("handleSubmit",e);
    })

    return(
    <>
       <CollapsiblePanel
            headerControls={
                <Spacings.Inline scale='s' alignItems='flex-end'>
                <IconButton
                    icon={<CloseIcon/>}
                    onClick={()=>{
                        props?.onClose();
                    }}
                    label='Close'
                />
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
                {"Payment"}
                </Spacings.Inline>
            </CollapsiblePanel.Header>}
            secondaryHeader={payment?.id}
            description={<Spacings.Inline>
                <Constraints.Horizontal>
                  <Spacings.Inline>
                  <Spacings.Stack scale='l'>
                {"Date created: "+payment?.createdAt}
                </Spacings.Stack>
                <Spacings.Stack scale='l' alignItems='flex-end'>
                {"Date Modified: "+payment?.lastModifiedAt}
                </Spacings.Stack>
                  </Spacings.Inline>
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
                   {payment?.paymentMethodInfo?.name}
                </Spacings.Stack>
             </Spacings.Inline>
             <Spacings.Inline>
                <Spacings.Stack scale='l'>
                   <Label isBold={true}>
                       Payment method:   
                   </Label>
                </Spacings.Stack>
                <Spacings.Stack scale='s' alignItems='center'>
                   {payment?.paymentMethodInfo?.method}
                </Spacings.Stack>
             </Spacings.Inline>
             <Spacings.Inline>
                <Spacings.Stack scale='l'>
                   <Label isBold={true}>
                   Payment service provider (PSP):   
                   </Label>
                </Spacings.Stack>
                <Spacings.Stack scale='s' alignItems='center'>
                   {payment?.paymentMethodInfo?.paymentInterface}
                </Spacings.Stack>
             </Spacings.Inline>
             <Spacings.Inline>
                <Spacings.Stack scale='l'>
                   <Label isBold={true}>
                   Payment provider ID:   
                   </Label>
                </Spacings.Stack>
                <Spacings.Stack scale='s' alignItems='center'>
                {payment?.interfaceId}
                </Spacings.Stack>
             </Spacings.Inline>
             <Spacings.Inline>
                <Spacings.Stack scale='l'>
                   <Label isBold={true}>
                   Amount planned:   
                   </Label>
                </Spacings.Stack>
                <Spacings.Stack scale='s' alignItems='center'>
                {"$"+payment?.amountPlanned?.centAmount/100+".00"}
                </Spacings.Stack>
             </Spacings.Inline>


             {payment?
               <DataTable
                  columns={columns}
                  rows={payment?.transactions}
                  itemRenderer={itemRenderer}
               /> 
            :null}

             </Spacings.Stack>
            </Constraints.Horizontal>
        </CollapsiblePanel>
    </>
    )
}

OrderPaymentsDetails.displayName = 'OrderPaymentsDetails';
OrderPaymentsDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
};
export default OrderPaymentsDetails;
