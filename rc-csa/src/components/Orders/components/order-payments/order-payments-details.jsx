import { useIntl } from 'react-intl';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useReducer, useState } from 'react';

import { CloseIcon, CollapsiblePanel, Constraints, DataTable, DragIcon, ExternalLinkIcon, IconButton, Label, LoadingSpinner, MailIcon, SecondaryButton, Spacings, Text, UserLinearIcon } from '@commercetools-frontend/ui-kit';
import { useCallback } from 'react';
import { useShowApiErrorNotification, useShowNotification } from '@commercetools-frontend/actions-global';
import { useFetchPaymentById } from '../../../../hooks/use-payments-connector/use-payments-connector';
import { columns, dummyRows } from './constants';
import { itemRenderer } from './helper';
import { useFetchCheckoutSessionById, usePaymentUpdater } from '../../../../hooks/use-payments-connector'; 

const OrderPaymentsDetails = (props) =>{
    const intl = useIntl();
    const [reducerValue, forceUpdate] = useReducer(x => x+1,0);
    const { push } = useHistory();
    const match = useRouteMatch();
    const {execute} = usePaymentUpdater();
    const {payment,loading,error} = useFetchPaymentById(match?.params?.id);
    console.log("Payment"+payment);

    const onSubmit = useCallback(async (e)=>{
        console.log("handleSubmit",e);
    })

    return(
    <>
      {payment?       <CollapsiblePanel
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
                    icon={<DragIcon/>}
                    isDisabled={!payment?.transactions[0]?.interactionId}
                    onClick={async()=>{
                        const session = await useFetchCheckoutSessionById(payment?.transactions[0]?.interactionId);
                        // const paymentStatus= await session?.session?.payment_status;
                        if(session?.payment_status!=payment?.custom?.customFieldsRaw.filter(e=>e?.name=="pspPaymentStatus")[0]?.value){
                            const actions = {
                                setCustomField:{
                                    name:"pspPaymentStatus",
                                    value:JSON.stringify(session?.session?.payment_status)
                                }
                            }
                            const draft = {
                                id:payment?.id,
                                version:payment?.version,
                                actions:actions
                            }
                            console.log(draft);
                            console.log(session?.session?.payment_status);
                            execute(draft);
                        }
                    }}
                    label='Get Latest Status'
                />
                <IconButton
                    icon={<UserLinearIcon/>}
                    onClick={()=>{
                        push('/csa-project-2/csa-customer-tickets/customer-account/'+props?.customerId+'/Customers-summary')
                    }}
                    isDisabled={!props?.customerId}
                    label='Customer'
                />
                <IconButton
                    icon={<MailIcon/>}
                    onClick={()=>{
                        alert('Send Link')
                        console.log("Send Payment Link");
                    }}
                />
                {/* <IconButton
                    icon={<MailIcon/>}
                    onClick={()=>{
                        alert('Send Link')
                        console.log("Send Payment Link");
                    }}
                /> */}
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
             <Spacings.Inline>
                <Spacings.Stack scale='l'>
                   <Label isBold={true}>
                   PSP Payment Status:   
                   </Label>
                </Spacings.Stack>
                <Spacings.Stack scale='s' alignItems='center'>
                {payment?.custom?.customFieldsRaw.filter(e=>e?.name=="pspPaymentStatus")[0]?.value}
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
        </CollapsiblePanel>:<LoadingSpinner />}
    </>
    )
}

OrderPaymentsDetails.displayName = 'OrderPaymentsDetails';
OrderPaymentsDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
};
export default OrderPaymentsDetails;
