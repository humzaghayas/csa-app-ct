import { useIntl } from 'react-intl';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';

import { SecondaryButton } from '@commercetools-uikit/buttons';
import {BidirectionalArrowIcon} from '@commercetools-uikit/icons';
import { CollapsiblePanel, Constraints, DataTable, Spacings, Text } from '@commercetools-frontend/ui-kit';
import { useCallback } from 'react';
import { columns, dummyrows } from './constants';
import { itemRenderer } from './helper';
import { useFetchOrderReturnInfoById, useOrderUpdateById } from '../../../../hooks/use-orders-connector';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { docToFormValues } from './conversions';
import OrderReturnsNew from './order-returns-details';
import { transformErrors } from './transform-errors';
import { useShowApiErrorNotification, useShowNotification } from '@commercetools-frontend/actions-global';
import { DOMAINS } from '@commercetools-frontend/constants';
import messages from './messages';

const OrderReturns = (props) =>{
    const intl = useIntl();
    const {executeUpdateOrder} = useOrderUpdateById();
    const showApiErrorNotification = useShowApiErrorNotification();
    const showNotification = useShowNotification();
    const [reducerValue, forceUpdate] = useReducer(x => x+1,0);
    const { push } = useHistory();
    const match = useRouteMatch();
    let {order,loading,error} =  useFetchOrderReturnInfoById(match.params.id);
    const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
        dataLocale: context.dataLocale ?? '',
        projectLanguages: context.project?.languages ?? [],
      }));

    
    const orderReturnInfo = docToFormValues(order?.data?.order,projectLanguages);
    console.log("Order Return Info",orderReturnInfo);
    
    const onClickCreateReturn = useCallback(()=>{
        push(`${match.url}/new`);
        console.log("Clicked Create Returns");
    });
    const onSubmit = useCallback(async (e)=>{
        console.log("handleSubmit",e);
        
        const payload ={
            orderId:orderReturnInfo?.id,
            version:orderReturnInfo?.version,
            actions : {addReturnInfo:e?.addReturnInfo}
        }

        try{
            const result = await executeUpdateOrder(payload);
            forceUpdate();
              showNotification({
              kind: 'success',
              domain: DOMAINS.SIDE,
              text: intl.formatMessage(messages.OrderUpdated),
            }); 
          }catch (graphQLErrors) {
                  console.log(graphQLErrors.message)
                  const transformedErrors = transformErrors(graphQLErrors);
                  if (transformedErrors.unmappedErrors.length > 0) {
                    showApiErrorNotification({
                      errors: transformedErrors.unmappedErrors,
                    });
                  }
          }
        push(`${match.url}`);
    })

    return(
        <Spacings.Stack scale='xl'>
            <Constraints.Horizontal>
            <SecondaryButton
                type='button'
                iconLeft={<BidirectionalArrowIcon/>}
                label='Create Order Returns'
                onClick={onClickCreateReturn}
                />
                <Switch>
                    <Route  path={`${match.path}/new`}>
                        <OrderReturnsNew
                            onClose={() => push(`${match.url}`)} 
                            orderId = {match?.params?.id} 
                            initialValues = {orderReturnInfo}
                            onSubmit = {onSubmit}
                        />
                    </Route>
                </Switch>
            </Constraints.Horizontal>
            <Spacings.Stack scale='xl'>
            {orderReturnInfo?.returnInfo?orderReturnInfo?.returnInfo.map((item,index)=>{
                return <CollapsiblePanel
                    header={
                    <CollapsiblePanel.Header>
                        {'Return:'+index}
                    </CollapsiblePanel.Header>
                }
                scale="l"
                >
                    <Constraints.Horizontal>
                    <Spacings.Stack scale='m'>
                     <Spacings.Inline>
                        <Text.Wrap>
                            <Text.Subheadline as='h4' isBold={true} tone='positive'> 
                                {"Return Tracking Id"} 
                            </Text.Subheadline>
                            <Text.Subheadline as='h5' isBold={false} tone='positive'> 
                                {item?.returnTrackingId} 
                            </Text.Subheadline>
                        </Text.Wrap>
                        <Spacings.Stack scale='m'>
                            <Text.Wrap>
                                    <Text.Subheadline as='h4' isBold={true} tone='positive'> 
                                    {"Return Date"} 
                                    </Text.Subheadline>
                                    <Text.Subheadline as='h5' isBold={false} tone='positive'> 
                                        {item?.returnDate} 
                                    </Text.Subheadline>
                                </Text.Wrap> 
                            </Spacings.Stack>
                    </Spacings.Inline>
                    <DataTable
                    columns={columns}
                    rows={item?.items}
                    itemRenderer={itemRenderer}
                    ></DataTable>
                    </Spacings.Stack>
                    </Constraints.Horizontal>
                </CollapsiblePanel>

            }):null}
            </Spacings.Stack>
        </Spacings.Stack>
    )
}

OrderReturns.displayName = 'OrderReturns';
OrderReturns.propTypes = {
    onClose: PropTypes.func.isRequired,
};
export default OrderReturns;
