import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import { EMPLOYEE_ROLES,CUSTOMER_GROUPS,TICKET_PRIORITY} from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import { formValuesToDoc, shippingMethodOptions } from './conversions';
import { useCreateOrderEditById, useFetchShippingMethods, useOrderEditApply } from '../../../../hooks/use-orders-connector/use-orders-connector';
import { AsyncSelectInput } from '@commercetools-frontend/ui-kit';
import { useShowApiErrorNotification, useShowNotification } from '@commercetools-frontend/actions-global';
import { transformErrors } from '../order-create/transform-errors';

const OrderShippingMethods = (props) =>{
    const intl = useIntl();
    const {shippingMethods,error,loading} = useFetchShippingMethods();
    const options = shippingMethodOptions(shippingMethods);
    const { executeCreateOrderEdit } = useCreateOrderEditById();
    const { executeOrderEditApply }  = useOrderEditApply();
    const showNotification = useShowNotification();
    const showApiErrorNotification = useShowApiErrorNotification();

    const formik = useFormik({
        initialValues: {shippingMethod:props.initialValues?.shippingMethod},
        enableReinitialize : true,
        onSubmit: async (value, formik) => {
          if(value?.shippingMethod?.label && props?.initialValues?.id){
            const stagedActions = {
                setShippingMethod :{
                    shippingMethod :{
                        id:value?.shippingMethod?.value
                    }
                }
            }
            try{
                const draft = {
                    resource: {
                      id: props?.initialValues?.id,
                      typeId: "order"
                    },
                    stagedActions,
                    comment: "No Comment"
                }
                const result = await executeCreateOrderEdit(draft);

                console.log('result oe', result);
                const data = await result.data.createOrderEdit;
                const orderEditId = data?.id;
                const editVersion = data?.version;
                const orderVersion = props?.initialValues?.version;
                const resulType = data?.result?.type;

                console.log(data)

                if (resulType == "PreviewSuccess") {
                    const payload = {
                      resourceVersion: orderVersion,
                      editVersion: editVersion
                    }
                    console.log(payload);
                    console.log(resulType);
                    console.log(resulType == "PreviewSuccess");
                    console.log("Apply edit");
                    const result2 = await executeOrderEditApply(payload, orderEditId)
                    console.log(result2);
                    console.log(result.data.createOrderEdit);
                    window.location.reload(true);
                }
                if(resulType == "PreviewFailure"){
                    const errors = data?.result?.errors;
                    showApiErrorNotification({
                        errors
                    })

                }

            }catch(graphQLErrors){
                const transformedErrors = transformErrors(graphQLErrors);
                if (transformedErrors.unmappedErrors.length > 0) {
                  showApiErrorNotification({
                    errors: transformedErrors.unmappedErrors,
                  });
                }
            }
          }
        }
      });

      return (
        <Spacings.Stack scale='xl'>
          <CollapsiblePanel
            data-testid="quote-summary-panel"
               header={
                 <CollapsiblePanel.Header>
                   {/* {formatMessage(messages.panelTitle)} */}
                   {'Shipping method'}
                 </CollapsiblePanel.Header>
               }
               scale="l"
          >
          <Spacings.Stack scale="xl">
          <Spacings.Stack scale='l'>
            <AsyncSelectInput
              horizontalConstraint={13}
              errors={formik.errors.shippingMethod}
              isRequired={true}
              touched={formik.touched.shippingMethod}
              name="shippingMethod"
              value={formik.values.shippingMethod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isDisabled={formik.isSubmitting}
              isMulti={false}
              hasWarning={false}
              defaultOptions={options}
              title="Shipping method"
              description="Add shippingMethod to orders"
              isClearable={true}
            />
    
            <Spacings.Inline>
              <SecondaryButton
                onClick={formik.handleReset}
                isDisabled={formik.isSubmitting}
                label="Reset"
              />
              <PrimaryButton
                onClick={formik.handleSubmit}
                isDisabled={formik.isSubmitting || !formik.dirty}
                label="Submit"
              />
            </Spacings.Inline>
        </Spacings.Stack>
          </Spacings.Stack>
       
         </CollapsiblePanel>
    
        </Spacings.Stack>
      );
  


}
OrderShippingMethods.displayName = 'OrderShippingMethods';
OrderShippingMethods.prototype = {
    initialValues: PropTypes.object.isRequired 
}

export default OrderShippingMethods;