import { useIntl } from 'react-intl';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import { SecondaryButton } from '@commercetools-uikit/buttons';
import {BidirectionalArrowIcon} from '@commercetools-uikit/icons';
import { CollapsiblePanel, Constraints, DataTable, Spacings, Text } from '@commercetools-frontend/ui-kit';
import { useCallback } from 'react';
import { columns, dummyrows } from './constants';
import { itemRenderer } from './helper';


const OrderReturns = (props) =>{

    const { push } = useHistory();
    const match = useRouteMatch();


    const onClickCreateReturn = useCallback(()=>{
        console.log("Clicked Create Returns");
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
            </Constraints.Horizontal>
            <Spacings.Stack scale='xl'>
            <CollapsiblePanel
                        header={
                            <CollapsiblePanel.Header>
                                {'Return: 01'}
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
                                    {"Tracking Id comes here"} 
                                </Text.Subheadline>
                            </Text.Wrap>
                            <Spacings.Stack scale='m'>
                                <Text.Wrap>
                                    <Text.Subheadline as='h4' isBold={true} tone='positive'> 
                                        {"Return Date"} 
                                    </Text.Subheadline>
                                    <Text.Subheadline as='h5' isBold={false} tone='positive'> 
                                        {"Return Date comes here"} 
                                    </Text.Subheadline>
                                </Text.Wrap> 
                            </Spacings.Stack>
                        </Spacings.Inline>
                        <DataTable
                        columns={columns}
                        rows={dummyrows}
                        itemRenderer={itemRenderer}
                        ></DataTable>
                     </Spacings.Stack>
                    </Constraints.Horizontal>
                    </CollapsiblePanel>
            </Spacings.Stack>
        </Spacings.Stack>
    )

}

OrderReturns.displayName = 'OrderReturns';
OrderReturns.propTypes = {
    onClose: PropTypes.func.isRequired,
};
export default OrderReturns;
