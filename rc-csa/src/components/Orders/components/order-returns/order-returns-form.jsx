import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
// import validate from './validate';
import {  DataTable, DataTableManager, DateField, FieldLabel, SelectField } from '@commercetools-frontend/ui-kit';
import { SHIPMENT_STATUS, columnsCreateOrderReturns, dummyCreateReturnOrderRows } from './constants';
import {itemRendererNewOrderReturns} from './helper';

const getShipmentStates = Object.keys(SHIPMENT_STATUS).map(
  (key) => ({
    label: key,
    value: SHIPMENT_STATUS[key],
}));


const OrderReturnsForm = (props) => {
  const dataLocale = useApplicationContext((context) => context.dataLocale);
  const formik = useFormik({
    // Pass initial values from the parent component.
    initialValues: props.initialValues,
    // Handle form submission in the parent component.
    onSubmit: props.onSubmit,
    // validate,
    enableReinitialize: true
  });

  console.log("Order returns Modal form",formik?.values)

  const onSubmit = (e) =>{
    props.onSubmit(e);
  }

  // Only contains the form elements, no buttons.
  const formElements = (
    <form onSubmit={onSubmit}>
          <Spacings.Stack scale="xl">
          <Spacings.Stack scale='l'>
          <TextField
            id='returnTrackingid'
            name="returnTrackingid"
            title="Return Tracking Id"
            onChange={formik.handleChange}
            value={formik?.values?.returnTrackingid}
            horizontalConstraint={6}
          />
          </Spacings.Stack>
          <Spacings.Stack scale='l'>
          <DateField
            id='returnDate'
            name='returnDate'
            title="Return Date"
            value={formik?.values?.returnDate}
            onChange={formik.handleChange}
            horizontalConstraint={6}
          />
          </Spacings.Stack>

          <Spacings.Stack scale='l'>
          <SelectField
                name="shipmentState"
                title="Shipment State"
                value={formik.values.shipmentState}
                errors={formik.errors.shipmentState}
                touched={formik.touched.shipmentState}
                onChange={formik.handleChange}
                options={getShipmentStates}
                onBlur={formik.handleBlur}
                horizontalConstraint={6}
                isRequired
              />
          </Spacings.Stack>

          <Spacings.Stack scale='l'>
            <FieldLabel
              title="Orderd items"
            />
          </Spacings.Stack>

          {formik?.values?.orderInfo?.lineItem?
            <DataTableManager
              topBar={"Select the items that should be grouped together in one return. All return items must be selected before saving the return. It is not possible to add or edit return items after saving a return."}
              columns={columnsCreateOrderReturns}
            >
              <DataTable
                // columns={columnsCreateOrderReturns}
                rows={formik?.values?.orderInfo?.lineItem}
                itemRenderer={itemRendererNewOrderReturns}
              />
            </DataTableManager>
            :null}

      
    </Spacings.Stack>
    </form>
  );

  return props.children({
    formElements,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: onSubmit,
    handleCancel: formik.handleReset,
  });
}

export default OrderReturnsForm;