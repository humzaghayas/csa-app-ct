import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
// import validate from './validate';
import {  CheckboxInput, DataTable, DataTableManager, DateField, FieldLabel, MultilineTextField, NumberInput, SelectField, useRowSelection, useSorting } from '@commercetools-frontend/ui-kit';
import { SHIPMENT_STATUS, columnsCreateOrderReturns, dummyCreateReturnOrderRows } from './constants';
// import {itemRendererNewOrderReturns} from './helper';

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

  const [selectedRows,setSelectedRows] = useState([]);
  const [shipmentState,setShipmentState] = useState("");

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
                      value={selectedRows.filter(row=>row?.lineItemId==item?.id)[0]?.quantity}
                      onChange={(e)=>{
                        const rows = selectedRows;
                        const index = rows.findIndex(i=>i.lineItemId==item.id); 
                        console.log("index",index)
                        rows.splice(index,1);
                        console.log("Rows after splice",rows);
                        const row = {
                          lineItemId:item?.id,
                          quantity:Number(e?.target?.value),
                          shipmentState:formik?.values?.shipmentState
                        }
                        rows.push(row)
                        setSelectedRows(rows);
                      }}
                      horizontalConstraint={3}
                      isRequired
                      isDisabled={!selectedRows.filter(row=>row?.lineItemId==item?.id)?.length==1}
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
                      isDisabled={!selectedRows.filter(row=>row?.lineItemId==item?.id)?.length==1}
                      horizontalConstraint={13}
                    />
                  </Spacings.Stack>
              </div>
      case 'checkBox':
        return <div>
                  <Spacings.Stack scale="s">
                    <CheckboxInput
                      value="is-row-value-checked"
                      onChange={(e)=>{
                          const row = {
                            lineItemId:item?.id,
                            quantity:1,
                            shipmentState:formik?.values?.shipmentState
                          }
                          console.log("ischecked",e.target.ariaChecked);
                          if(!selectedRows.filter(row=>row?.lineItemId==item?.id)?.length==1){
                            setSelectedRows(selectedRows => [...selectedRows, row])
                          }else{
                            const rows = selectedRows;
                            const index = rows.findIndex(i=>i.id==item.id); 
                            console.log("index",index)
                            rows.splice(index,1);
                            setSelectedRows(rows);
                          }
                        }
                      }
                      isChecked={selectedRows.filter(row=>row?.lineItemId==item?.id)?.length==1}
                    />
                  </Spacings.Stack>
              </div>
      default:
        return item[column.key];
    }
}

  console.log("selectedRows",selectedRows);
  console.log("Order returns Modal form",formik?.values)

  const onSubmit = (e) =>{

    const addReturnInfo ={
      returnDate: formik?.values?.returnDate,
      returnTrackingId:formik?.values?.returnTrackingid,
      items: [
       ...selectedRows
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