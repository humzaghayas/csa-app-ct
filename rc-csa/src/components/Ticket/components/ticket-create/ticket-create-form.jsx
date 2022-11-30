import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import{getTicketCategories,getTicketPriorityValues,getTicketContactTypes} from 'ct-tickets-helper-api';
import { ChainIcon, CollapsibleMotion, MultilineTextField, PrimaryButton, SecondaryButton,
  AngleUpDownIcon, 
  SecondaryIconButton,
  Text} from '@commercetools-frontend/ui-kit';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useState } from 'react';
import{CONSTANTS} from 'ct-tickets-helper-api'
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';
//import {  useUserListFetcher } from '../../../../hooks/use-order-connector/use-order-service-connector';
import { useFileDeleteService, useFileUploadService } from '../../../../hooks/use-file-upload-connector';
import { useFindCustomerService } from '../../../../hooks/use-customer-connector';
import { docToFormValuesCustomer } from './conversions';
import { TICKET_STATUS, TICKET_WORKFLOW } from 'ct-tickets-helper-api/lib/constants';
import Tickets from '../Ticket-list/ticket-list';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useUserListFetcher } from '../../../../hooks/use-register-user-connector';
import { useOrderService } from '../../../../hooks/use-order-connector';


// const getEmployeeRoleOptions = Object.keys(EMPLOYEE_ROLES).map((key) => ({
//   label: EMPLOYEE_ROLES[key],
//   value: EMPLOYEE_ROLES[key],
// }));

// const getCustomerGroupsOptions = Object.keys(CUSTOMER_GROUPS).map((key) => ({
//   label: key,
//   value: CUSTOMER_GROUPS[key],
// }));

const ticketCategories = getTicketCategories();
const ticketPriorityVal =getTicketPriorityValues();
const getTicketContactTypesVals = getTicketContactTypes();
const getTicketPriorityOptions = Object.keys(ticketPriorityVal).map((key) => ({
  label: ticketPriorityVal[key],
  value: key,
}));

const getTicketCategoriesOpts = Object.keys(ticketCategories).map((key) => ({
  label: ticketCategories[key],
  value: key,
}));

const getTicketContactTypesOpt= Object.keys(getTicketContactTypesVals).map((key) => ({
  label: getTicketContactTypesVals[key],
  value: key,
})); 


const TicketCreateForm = (props) => {
  //const dataLocale = useApplicationContext((context) => context.dataLocale);

  const { dataLocale, entryPointUriPath,projectKey } =useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    entryPointUriPath:context.environment.entryPointUriPath,
    projectKey:context.project.key
  }));

  const formik = useFormik({
    // Pass initial values from the parent component.
    initialValues: props.initialValues,
    // Handle form submission in the parent component.
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });

  const{getUsersToAssignTo} =useUserListFetcher();

  const [customerFound, setCustomerFound] = useState(formik.values.isEdit);
  const [files, setFiles] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [disableSubmitButton, setDisableSubmitButton] = useState(!canManage || !customerFound);
  
  const [workflowStatusses, setWorkflowStatusses] = useState([]);   

  useEffect(()=>{
        if(formik?.values?.status && workflowStatusses.length == 0){
          let workfolwArray = [TICKET_STATUS[formik?.values?.status]];
          workfolwArray = workfolwArray.concat (TICKET_WORKFLOW[formik?.values?.status]);

          console.log('TICKET_WORKFLOW[formik?.values?.status]',TICKET_WORKFLOW[formik?.values?.status])
      
          const displayWF = workfolwArray.map((wf) => ({
            label: wf.label,
            value: wf.name,
          }));

          setWorkflowStatusses(displayWF);
          console.log('232323 status effect 2323  ',displayWF);
      }
 
 
    console.log('status effect 134343',formik.values.status);
  },[formik?.values?.status]);

  const [progresspercent, setProgresspercent] = useState(0);

  const getCustomerData=useCallback(
    async () => {
      const customerObj = await getCustomerByEmail(formik.values.email);

      await customerInfoSetter(customerObj,formik);
  });


const customerInfoSetter =async (customerObj,formik) =>{

  if(customerObj?.data?.customers?.count > 0){
    formik.values.customerId =  customerObj?.data?.customers.results[0].id;
    setCustomer(customerObj?.data?.customers?.results[0]);
    setCustomerFound(true);
    setDisableSubmitButton(false);
    console.log('customer',customer);
    console.log('customer[0]',customerObj?.data?.customers.results[0]);
  }else{
    setCustomerFound(false);
  }
}

const {getCustomerByEmail} = useFindCustomerService();

const onChangeEmail=(evt)=>{
  setCustomerFound(false);
  setDisableSubmitButton(true);
  formik.handleChange(evt);
}


const inputRef = useRef(null);
const [fileDeleteUrl,setFileDeleteUrl] = useState('');
const [fileDeleteName,setFileDeleteName] = useState('');

useEffect(() => {
  // Update the document title using the browser API
  if(files.length ==0 && formik?.values?.files?.length > 0){
    let f =[];
    if(!formik.values.files){
      formik.values.files = [];
    }
    formik.values.files.map((fileInfo)=>{
      f.push(
        <div key={fileInfo.name} id={`id-${fileInfo.name}`}>
          <input type="radio" value={fileInfo.url} onClick={()=>{setFileDeleteName(fileInfo.name);setFileDeleteUrl(fileInfo.url);}} name="fileDeleteRadio" />&nbsp;&nbsp;<a  href={fileInfo.url}>{fileInfo.name}</a><br/>
        </div>);
    });

    setFiles(f);
    // renderOnce= false; 
    console.log('render once');
  }
  console.log('render once12');
});

useEffect(async() => {
 if(formik?.values?.email &&formik?.values?.isEdit && customer === null){
    const customerObj = await getCustomerByEmail(formik.values.email);
    await customerInfoSetter(customerObj,formik);


    console.log('customer use effect ',customerObj);
 }

  console.log('use effect 1',formik.values.emai);
},[formik?.values?.email]);


const [orderId,setOrderId]=useState(null);
const{execute:execOrderService} = useOrderService();
useEffect(async() => {
  if(formik?.values?.orderNumber &&formik?.values?.isEdit && orderId === null){
     const order = await execOrderService(formik?.values?.orderNumber);
     setOrderId(order?.data?.order?.id);
 
     console.log('Order use effect ',order);
  }
 },[formik?.values?.orderNumber]);


const{execute} = useFileUploadService();
const {deleteFileHandle} = useFileDeleteService();
const deleteFileFromStorage=(e)=>{

  e.preventDefault()
  deleteFileHandle(formik,fileDeleteUrl,fileDeleteName);

  return false;
}

const handleClick = (e) => {
  e.preventDefault()
  // 👇️ open file input box on click of other element
  inputRef.current.click();

  return false;
};


const uploadFile = (e) => {

  e.preventDefault();

  if(formik.values.files && formik.values.files.length  >= 5){
    alert("Limit Reached , Can't Upload more!");
  }
  const file = e.target.files && e.target.files[0];

  if (!file) {
    console.log('File Not Found!');
    return;
  }

  execute(formik,file,files,setFiles,setProgresspercent
        ,setFileDeleteName,setFileDeleteUrl);
  console.log('file uploaded');
  return false;
}


const handleTicketCategory=(e)=>{

  console.log('formik.values.category',e);
  if(e.target.value === CONSTANTS.TICKET_TYPE_REQUEST){
    //docToFormValuesCustomer(formik.values,customer);
   }else{

    if(!formik.values.message){
      formik.values.message = '';
    }
    if(!formik.values.files){
      formik.values.files =[];
    }
  }
  formik.handleChange(e);
}

const match = useRouteMatch();
let history = useHistory();
const saveTicket =async (e)=>{
  formik.handleSubmit(e);

  history.push(`/${projectKey}/${entryPointUriPath}/Tickets`);
}


  return (<>
    <form onSubmit={formik.handleSubmit}>
        <Spacings.Stack scale="l">
        
        <CollapsiblePanel
              data-testid="tickets-summary-panel"
              header={
                <CollapsiblePanel.Header>
                  {/* {formatMessage(messages.panelTitle)} */}
                  {'Ticket Details'}
                </CollapsiblePanel.Header>
              }
              scale="l">
                <Constraints.Horizontal >
                <Spacings.Stack scale="m">


                <Spacings.Inline alignItems="flex-end">
                   
                  <TextField
                      name="email"
                      title="Customer Email"
                      value={formik.values.email}
                      errors={formik.errors.email}
                      touched={formik.touched.email}
                      onChange={onChangeEmail}
                      onBlur={formik.handleBlur}
                      
                      horizontalConstraint={13}
                      isDisabled={!canManage || formik.values.isEdit}
                    />
                  <PrimaryButton
                      label="Search Customer"
                      onClick={getCustomerData}
                      isDisabled={!canManage || formik.values.isEdit}
                    />
               </Spacings.Inline>


               <Spacings.Stack scale="s">
                        <Spacings.Inline scale="s">
                          <TextField name="c_salutation"
                              title="Salutation"
                              isReadOnly={true}
                              
                              value={customer?.salutation}
                              />
                            <TextField name="c_title"
                              title="Title"
                              
                              isReadOnly={true}
                              value={customer?.title}/>
                           <TextField name="c_firstName"
                              title="First Name"
                              
                              isReadOnly={true}
                              value={customer?.firstName}
                             />
                          </Spacings.Inline>
                          <Spacings.Inline scale="s">
                            <TextField name="c_middleName"
                              title="Middle Name"
                              
                              isReadOnly={true}
                              value={customer?.middleName}/>

                            <TextField name="c_lastName"
                              title="Last Name"
                              
                              isReadOnly={true}
                              value={customer?.lastName}
                             />

                          <TextField name="c_dateOfBirth"
                              title="Date of birth"
                              
                              isReadOnly={true}
                              value={customer?.dateOfBirth}
                              />
                          </Spacings.Inline>
                          <Spacings.Inline>
                            <TextField name="c_companyName"
                                title="Company Name"
                                isReadOnly={true}
                                value={customer?.companyName}
                               />
                          </Spacings.Inline>
                    </Spacings.Stack>


                <Spacings.Stack scale="s">
                <SelectField
                    name="contactType"
                    title="Contact Type"
                    value={formik.values.contactType}
                    errors={formik.errors.contactType}
                    touched={formik.touched.contactType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    options={getTicketContactTypesOpt}
                    isReadOnly={props.isReadOnly}
                    isRequired
                    horizontalConstraint={13}
                    isDisabled={!canManage || (!customerFound  || formik.values.isEdit) }
                  />
            </Spacings.Stack>
            <Spacings.Inline scale="s">
            <SelectField
              name="category"
              title="Ticket Category"
              value={formik.values.category}
              errors={formik.errors.category}
              touched={formik.touched.category}
              onChange={handleTicketCategory}
              onBlur={formik.handleBlur}
              options={getTicketCategoriesOpts}
              isReadOnly={props.isReadOnly}
              isRequired
              horizontalConstraint={13}
              isDisabled={!canManage || (!customerFound  || formik.values.isEdit)}
            />

        {formik.values.category && (formik.values.category== CONSTANTS.TICKET_TYPE_ORDER_INQUIRY
                      || formik.values.category== CONSTANTS.TICKET_TYPE_PAYMENT_METHODS
                      || formik.values.category==CONSTANTS.TICKET_TYPE_RETURNS)
               && 
               <Spacings.Stack scale="s">
                  <TextField name="orderNumber"
                          title="Order Number"
                          isRequired
                          value={formik.values.orderNumber}
                          errors={formik.errors.orderNumber}
                          touched={formik.touched.orderNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isDisabled={!canManage || (!customerFound  || formik.values.isEdit) }/>

                  {orderId &&
                    <Link to={`/${projectKey}/${entryPointUriPath}/Orders`}>
                            <SecondaryButton iconLeft={<ChainIcon />} 
                              label={formik.values.orderNumber}
                            />
                        </Link>
                      }
                          </Spacings.Stack>
                  }
        </Spacings.Inline>

        {formik.values.isEdit && formik.values.category 
               && 
          <Spacings.Stack scale="s">
               <Link to={`/${projectKey}/${entryPointUriPath}/customer-account/${customer?.id}/Customers-summary`}>
                   <SecondaryButton iconLeft={<ChainIcon />} 
                      label={formik.values.email}
                    />
                </Link>

           </Spacings.Stack>
        }

        <Spacings.Stack scale="s">
        <SelectField
              name="priority"
              title="Ticket Priority"
              value={formik.values.priority}
              errors={formik.errors.priority}
              touched={formik.touched.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={getTicketPriorityOptions}
              isReadOnly={props.isReadOnly}
              isRequired
              horizontalConstraint={13}
              isDisabled={!canManage || !customerFound }
            />
            </Spacings.Stack>

            <Spacings.Stack scale="s">
        <SelectField
              name="assignedTo"
              title="Assign To"
              value={formik.values.assignedTo}
              errors={formik.errors.assignedTo}
              touched={formik.touched.assignedTo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={getUsersToAssignTo}
              isReadOnly={props.isReadOnly}
              isRequired
              horizontalConstraint={13}
              isDisabled={!canManage || !customerFound }
            />
            </Spacings.Stack>


            <Spacings.Stack scale="s">
                <TextField name="subject"
                    title="Subject"
                    isRequired
                    value={formik.values.subject}
                    errors={
                      TextField.toFieldErrors(formik.errors).subject
                    }
                    touched={formik.touched.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isDisabled={!canManage || (!customerFound  || formik.values.isEdit) }/>
              </Spacings.Stack>


               <Spacings.Stack scale="s">
                <MultilineTextField name="message"
                    title="Message"
                    isRequired
                    value={formik.values.message}
                    errors={
                      TextField.toFieldErrors(formik.errors).message
                    }
                    isDisabled={!canManage || (!customerFound  || formik.values.isEdit)}
                    touched={formik.touched.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>

                <MultilineTextField name="commentMessage"
                    title="Add Comments"
                    value={formik.values.commentMessage}
                     isDisabled={!canManage || !customerFound}
                    touched={formik.touched.commentMessage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>

                {formik?.values?.comments && formik?.values?.comments.length > 0 && <>
                  <CollapsibleMotion>
                            {({ isOpen, toggle, containerStyles, registerContentNode }) => (
                              <div>

                              <SecondaryIconButton icon={<AngleUpDownIcon />} 
                                                    label=""
                                                    onClick={toggle}
                                                  />
                                {/* <button data-testid="button" onClick={toggle}>
                                  {isOpen ? 'Close' : 'Open'}
                                </button> */}
                                <div data-testid="container-node" style={containerStyles}>
                                  <div data-testid="content-node" ref={registerContentNode}>
                                  {formik?.values?.comments?.map(function(cmt, index){
                                    //return (<Text.Detail>{cmt.comment}</Text.Detail>)

                                    return (<>
                                    <CollapsiblePanel
                                        header="Comment"
                                      >
                                        <Text.Detail>{cmt.comment}</Text.Detail>
                                      </CollapsiblePanel>
                                    </>)
                                  })}
                                      
                                  </div>
                                </div>
                              </div>
                            )}
                  </CollapsibleMotion>
                  </>
                }
                <div>
                   <input type='file' id="upload_file" 
                          name="upload_file" 
                          ref={inputRef}
                          onChange={uploadFile}/>
                   <button onClick={handleClick}>Upload</button>
  
                  <br/><br/>
                   {files}
                  <br/>
                  {files?.length>0 && <button onClick={deleteFileFromStorage}>Delete File</button>}
                </div>
              </Spacings.Stack>
              <Spacings.Stack>
                    <SelectField
                        name="status"
                        title="Ticket Status"
                        value={formik.values.status}
                        errors={formik.errors.status}
                        touched={formik.touched.status}
                        onBlur={formik.handleBlur}
                        options={workflowStatusses}
                        onChange={formik.handleChange}
                        horizontalConstraint={13}
                        isDisabled={!formik.values.isEdit}
                      />

                       
              </Spacings.Stack>

                  <Spacings.Inline>
                    <SecondaryButton
                      label="Cancel"
                      onClick={formik.handleReset}
                    />
                    <PrimaryButton
                      type="submit"
                      label="Submit"
                      onClick={saveTicket}
                      isDisabled={formik.isSubmitting}
                      // isDisabled={disableSubmitButton }
                    />
                </Spacings.Inline>
            </Spacings.Stack>
            </Constraints.Horizontal>
          {/* </Spacings.Inline> */}
        </CollapsiblePanel>
        </Spacings.Stack>
    </form>

</>
  )}

  export default TicketCreateForm;