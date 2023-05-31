import { useIntl } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
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

import { useRouteMatch } from 'react-router-dom';
import { useFetchOrderById, useOrderUpdateById} from '../../../../hooks/use-orders-connector';
import { useEffect } from 'react';
import { useState } from 'react';
import { useReducer } from 'react';
import { Card, CollapsiblePanel, IconButton, MultilineTextInput, PrimaryButton, SecondaryButton, Spacings, Text, TextInput } from '@commercetools-frontend/ui-kit';
import { commentsToUpdate, docToFormValues } from './conversion';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import { useFormik } from 'formik';


const OrderComment = (props) => {
  const params = useParams();
  const match = useRouteMatch();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const { push } = useHistory();

  //const {executeFetchOrder} = useFetchOrderById(match.params.id);
  const {executeUpdateOrder} = useOrderUpdateById();
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
  const [formOrder,setFormOrder] = useState(null);
  const [isAddComment, setIsAddComment] = useState(false);
  const [reducerValue, forceUpdate] = useReducer(x => x+1,0);
  const intl = useIntl();

  let {order} = useFetchOrderById(match.params.id);
  const customFieldsRaw = order?.custom?.customFieldsRaw;//?.filter(e=>e.name='comments');
  const comments = docToFormValues(order?.data?.order);
  console.log("comments",comments)
  useEffect(async()=>{
    if(formOrder == null){
      setFormOrder (order?.data?.order);
    }
  },[order]);
  useEffect(async()=>{
    console.log(isAddComment);
  },[isAddComment])


  const handleSubmit = useCallback(
    async(payload) =>{
      try{
        const result = await executeUpdateOrder(payload);

        console.log('shipping',result);
        forceUpdate();
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: intl.formatMessage(messages.OrderUpdated),
        }); 

        setFormOrder(result?.data?.updateOrder);

      }catch (graphQLErrors) {
              console.log(graphQLErrors.message)
              const transformedErrors = transformErrors(graphQLErrors);
              if (transformedErrors.unmappedErrors.length > 0) {
                showApiErrorNotification({
                  errors: graphQLErrors.message,
                });
              }
      }
    },[executeUpdateOrder]);

    const formik = useFormik({
        initialValues: {comment:""},
        enableReinitialize: true,
        onSubmit: useCallback((value,formik)=>{
            console.log("Submit",value);
            
            const updateActionList = {
                orderId : match.params.id,
                version: parseInt(formOrder?.version),
                actions: [
                  {
                    setCustomType: {
                    typeKey: "customFields"
                    }
                  },
                  {
                    setCustomField: {
                      name: "comments",
                      value: JSON.stringify(commentsToUpdate(value?.comment,comments))
                    }
                  }
                ]
              }
            executeUpdateOrder(updateActionList)
            forceUpdate();
            formik.resetForm();
        },[executeUpdateOrder]) 
      });

  return (
    <>
    <Spacings.Stack scale='xl'>

        {isAddComment? 
            <>
            <Spacings.Stack scale='l'>
                <MultilineTextInput
                    horizontalConstraint={13}
                    errors={formik.errors.comment}
                    isRequired={true}
                    touched={formik.touched.comment}
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isDisabled={formik.isSubmitting}
                    isMulti={false}
                    hasWarning={false}
                    title="Comment"
                    description="Add comment to orders"
                    isClearable={true}
                />
            </Spacings.Stack>
            <Spacings.Inline>
          <SecondaryButton
            onClick={formik.handleReset}
            isDisabled={formik.isSubmitting}
            label="Reset"
          />
          <SecondaryButton
            onClick={()=>{
                setIsAddComment(!isAddComment);
                formik.resetForm();
            }}
            isDisabled={formik.isSubmitting}
            label="Cancel"
          />
          <PrimaryButton
            onClick={formik.handleSubmit}
            isDisabled={formik.isSubmitting || !formik.dirty}
            label="Submit"
          />
        </Spacings.Inline>
            
            </>    
    : <Spacings.Stack scale='l'>
        <Spacings.Inline>
        <PrimaryButton
        onClick={()=>{
            setIsAddComment(!isAddComment);
        }}
        label="Add comment"
        />
        </Spacings.Inline>
        </Spacings.Stack>
    }

        <CollapsiblePanel
            header={<CollapsiblePanel.Header>
            {'Comments'}
            </CollapsiblePanel.Header>}
            // headerControls={
            //     <IconButton
            //      icon={<PlusBoldIcon/>}
            //      onClick={()=>{
            //         setIsAddComment(!isAddComment);
            //         console.log(isAddComment)
            //         // alert("Add comment",isAddComment)
            //      }}
            //     />
            // }
        >
            <Spacings.Stack scale='l'>
            {comments?
                comments?.map(comment=>{
            return <>
            <Spacings.Stack scale='xl'>
                <Spacings.Stack scale='l'>
                    <Card constraint="l">
                        <Text.Subheadline as="h4" isBold={false} >
                            {comment}
                        </Text.Subheadline>
                    </Card>
                </Spacings.Stack>
            </Spacings.Stack>
            <br/>
            </>
        })
    :"There are no commments attached to this order."}
            </Spacings.Stack>
        </CollapsiblePanel>
    </Spacings.Stack>
    </>
  );
};
OrderComment.displayName = 'OrderDetails';
OrderComment.propTypes = {
  
};
export default OrderComment;
