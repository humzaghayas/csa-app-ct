import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
// import validate from './validate';
import {  CheckboxInput, DataTable, DataTableManager, DateField, FieldLabel, MultilineTextField, NumberInput, SelectField, useRowSelection, useSorting } from '@commercetools-frontend/ui-kit';
import { SHIPMENT_STATUS, columnsCreateOrderReturns, dummyCreateReturnOrderRows } from './constants';
import{CONSTANTS} from 'ct-tickets-helper-api'

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

  const [selectedRows,setSelectedRows] = useState();
  const [shipmentState,setShipmentState] = useState("");
  const[ch,setCh]=useState(false);

  useEffect(()=>{

    if(selectedRows == null){
      const lineItems = formik?.values?.orderInfo?.lineItem;

      const li = lineItems?.map(l => {
        return {
          lineItemId:l.id,
          isChecked:false,
          quantity:l.quantity,
          maxAllowed:l.quantity
        }
      });
      console.log('li',li);

      setSelectedRows(li);
    }

  });

  const updateRowItem = (field) =>{
    const rows = selectedRows.filter(l => l.lineItemId !== field.id);
    const r = selectedRows.find(sr => sr.lineItemId  === field.id);
    const row  = {
      lineItemId:r.lineItemId,
      maxAllowed : r.maxAllowed
    };

    console.log('r',r);

    switch (field.name) {
      case CONSTANTS.IS_CHECKED:
        row.isChecked = !r.isChecked;
        row.quantity = r.quantity;

        break;
      
      case CONSTANTS.QUANTITY:


        if(field.value <= r.maxAllowed){
          row.quantity = field.value;
        }else{
          row.quantity = r.quantity;
        }
        row.isChecked =r.isChecked;
        break;
    
      default:
        break;
    }

    console.log('row',row);
    rows.push(row);
    setSelectedRows(rows);
  }

  const itemRendererNewOrderReturns = (item, column) => {
    switch (column.key) {
      case 'product':
        return <div>
                  <Spacings.Stack scale='s'>
                    <Spacings.Inline>
                      <img src={item?.product?.image} height={65} width={65}/>
                      <Spacings.Stack scale='s'>
                        <div>{item?.product?.name}</div>
                        <div>SKU: {item?.product?.sku}</div>
                        <div>Key: {item?.product?.key}</div>
                      </Spacings.Stack>
                    </Spacings.Inline>
                  </Spacings.Stack>
                </div>;
      case 'returnQuantity':
        return <div>
                  <Spacings.Stack scale="s">
                    <NumberInput
                      id="returnQuantity"
                      value={selectedRows?.find(row=>row?.lineItemId==item?.id)?.quantity}
                      min="1"
                      onChange={(e)=>{

                        updateRowItem({
                          id:item?.id,
                          name:CONSTANTS.QUANTITY,
                          value:e?.target?.value
                        });
                      }}
                      horizontalConstraint={3}
                      isRequired
                      isDisabled={!selectedRows?.find(row=>row?.lineItemId==item?.id)?.isChecked}
                    />
                  </Spacings.Stack>
              </div>
      case 'comment':
        return <div>
                  <Spacings.Stack scale="s">
                    <MultilineTextField
                      name="comment"
                      id="comment"
                      title=""
                      value=" "
                      onChange={(event) => {}}
                      isDisabled={!selectedRows?.find(row=>row?.lineItemId==item?.id)?.isChecked}
                      horizontalConstraint={13}
                    />
                  </Spacings.Stack>
              </div>
      case 'checkBox':
        return <div>
                  <Spacings.Stack scale="s">

                  {selectedRows  &&
                      
                        <CheckboxInput
                          value="is-row-value-checked"
                          onChange={(e)=>{

                              updateRowItem({
                                id:item?.id,
                                name:CONSTANTS.IS_CHECKED
                              });
                            }
                          }
                          isChecked={  selectedRows.find(sr => sr.lineItemId  == item.id).isChecked}
                        /> 
                    }
                                    
                  </Spacings.Stack>
              </div>
      default:
        return item[column.key];
    }
}

  console.log("selectedRows",selectedRows);
  console.log("Order returns Modal form",formik?.values)

  const onSubmit = (e) =>{

    const selectedValues = selectedRows.filter(s => s.isChecked);

    if(selectedValues.length == 0){
      alert('No Items selected!');
      return;
    }

    const addReturnInfo ={
      returnDate: formik?.values?.returnDate,
      returnTrackingId:formik?.values?.returnTrackingid,
      items: [
       ...selectedValues
      ]
    }

    e.addReturnInfo= addReturnInfo;


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