import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';


import Spacings from '@commercetools-uikit/spacings';
import { CheckActiveIcon, CheckInactiveIcon, CloseIcon, MinimizeIcon } from '@commercetools-uikit/icons';
import { AsyncSelectInput, CollapsiblePanel, Constraints, CreatableSelectField, DataTable, IconButton, PrimaryButton, SearchSelectField, SearchSelectInput, SecondaryButton, TextField, ToggleInput } from '@commercetools-frontend/ui-kit';
import { useFormik } from 'formik';
import { useFetchDiscountCodes } from '../../../../hooks/use-orders-connector/use-orders-connector';
import { discountCodeOptions } from './conversions';

const columns = [
  {key:'code',label:'Discount Code'},
  {key:'name',label:'Discount Name'},
  {key:'value',label:'Discount Amount'}
]


const OrderDiscountCode = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const isMulti = true;
  const {discountCodes,error,loading}  = useFetchDiscountCodes();
  const options = discountCodeOptions(discountCodes,props?.discountCodes);
  
  console.log("discount Codes",discountCodes);
  console.log("Props ",props);
   
  const formik = useFormik({
    initialValues: {discount: isMulti ? [] : undefined},
    onSubmit:(value, formik) => {
      console.log("On Submit",value);
      
      if(value?.discount?.label){
        const e={
          stagedActions : {
            addDiscountCode:{
              code:value?.discount?.label
            }
          }
        };
      props.onSubmit(e);
      formik.resetForm();
      
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
               {'Add discount codes'}
             </CollapsiblePanel.Header>
           }
           scale="l"
      >
      <Spacings.Stack scale="xl">
      <Spacings.Stack scale='l'>
        <AsyncSelectInput
          horizontalConstraint={13}
          errors={formik.errors.discount}
          isRequired={true}
          touched={formik.touched.discount}
          name="discount"
          value={formik.values.discount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isDisabled={formik.isSubmitting}
          isMulti={false}
          hasWarning={false}
          defaultOptions={options}
          title="Discount codes"
          description="Add discount to orders"
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

    {props?.discountCodes?.length>0? 
    <CollapsiblePanel
    data-testid="quote-summary-panel"
       header={
         <CollapsiblePanel.Header>
           {/* {formatMessage(messages.panelTitle)} */}
           {'Discount codes'}
         </CollapsiblePanel.Header>
       }
       scale="l"
  >
  <Constraints.Horizontal >
          <Spacings.Stack scale="m">
         <Spacings.Stack scale="s">
        <DataTable
        rows={props?.discountCodes}
        columns={columns}
        />
          </Spacings.Stack>
        </Spacings.Stack>
    </Constraints.Horizontal>

  </CollapsiblePanel>: null}

    </Spacings.Stack>
  );
};
OrderDiscountCode.displayName = 'CustomerDetails';
OrderDiscountCode.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default OrderDiscountCode;