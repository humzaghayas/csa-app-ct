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
  Text,
  DataTable,
  NumberInput,
  FieldLabel} from '@commercetools-frontend/ui-kit';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useState } from 'react';
import{CONSTANTS} from 'ct-tickets-helper-api'
//import {  useUserListFetcher } from '../../../../hooks/use-order-connector/use-order-service-connector';
import { useFileDeleteService, useFileUploadService } from '../../../../hooks/use-file-upload-connector';
import { useFindCustomerService } from '../../../../hooks/use-customer-connector';
import { docToFormValuesCustomer } from './conversions';
import { TICKET_STATUS, TICKET_WORKFLOW } from 'ct-tickets-helper-api/lib/constants';
import Tickets from '../Ticket-list/ticket-list';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useUserListFetcher } from '../../../../hooks/use-register-user-connector';
import { useOrderService } from '../../../../hooks/use-order-connector';
import { getPermission } from '../../../../utils';


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

const columns = [
  { key:'comment', label: 'Worklog' },
  { key: 'createdAt', label: 'Created' },
  { key: 'status', label: 'Status' },
];


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

  const canManage = getPermission('ManageCsaTickets');

  const{getUsersToAssignTo} =useUserListFetcher();
  
  const [customerFound, setCustomerFound] = useState(formik.values.isEdit);
  const [files, setFiles] = useState([]);
  const [commentsList, setCommentsList] = useState(formik.values.comments);
  const [imgUploaded, setImgUploaded] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [disableSubmitButton, setDisableSubmitButton] = useState(!canManage || !customerFound);
  const [isClosedCommentsPanel, setIsClosedCommentsPanel] = useState(true);
  const [timeSpentOnTicket , setTimeSpentOnTicket] = useState(0)//useState(formik.values.timeSpentOnTicket)

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

useEffect(() => {
  // Update the document title using the browser API
  if(commentsList.length ==0 && formik?.values?.comments?.length > 0){
    if(!formik.values.comments){
      formik.values.comments = [];
    }
    
    setCommentsList(formik?.values?.comments);
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
  setImgUploaded(false);
  execute(formik,file,files,setFiles,setProgresspercent
        ,setFileDeleteName,setFileDeleteUrl,setImgUploaded);
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


const handleChangeOperation=(e)=>{

    console.log('formik.values.category',e);
    if(e.target.name === 'assignedTo'){
      if(formik.values.operation && 
        (formik.values.operation === CONSTANTS.STATUS_OPERATION
          || formik.values.operation === STATUS_ASIGNEE_OPERATION)){
        formik.values.operation = CONSTANTS.STATUS_ASIGNEE_OPERATION;
      }else{
        formik.values.operation = CONSTANTS.ASSIGNEE_OPERATION;
      }
    }else if(e.target.name === 'status'){
      if(formik.values.operation && 
        (formik.values.operation === CONSTANTS.ASSIGNEE_OPERATION 
          || formik.values.operation === CONSTANTS.STATUS_ASIGNEE_OPERATION)){
        formik.values.operation = CONSTANTS.STATUS_ASIGNEE_OPERATION;
      }else{
        formik.values.operation = CONSTANTS.STATUS_OPERATION;
      }
    }else{
      formik.values.operation = CONSTANTS.UPDATE_OPERATION;
    }
  formik.handleChange(e);
}

const match = useRouteMatch();
let history = useHistory();
const saveTicket =async (e)=>{
  formik.handleSubmit(e);

  history.push(`/${projectKey}/${entryPointUriPath}/Tickets`);
}

const [disableWLButton,setDisableWLButton] = useState(false);
const addWorklog =(e) => {

  if(!formik?.values?.commentMessage || formik?.values?.commentMessage == ''){
    return;
  }
  let c= commentsList;
  const cMessage = formik?.values?.commentMessage;

  c=c.concat({"comment":cMessage,"status":"Please Submit To Persist Changes!"});
  setCommentsList(c);

  formik.values.comments = c;

  // if(cMessage){
  //   setDisableWLButton(true);
  // }
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

                  {  formik.values.isEdit ?   
                    <Spacings.Inline alignItems="flex-end">
                      
                      <TextField
                          name="ticketNumber"
                          title="Ticket Number"
                          value={formik.values.ticketNumber}
                          isReadOnly={true}
                          horizontalConstraint={13}
                        />
                    </Spacings.Inline>
                  :""}
                   {formik.values.isEdit && formik.values.category 
                           && 
                      <Spacings.Stack scale="s">
                           <Text.Detail >Customer</Text.Detail>
                           <Link to={`/${projectKey}/${entryPointUriPath}/customer-account/${customer?.id}/Customers-summary`}>
                               <PrimaryButton iconLeft={<ChainIcon />} 
                                  label={formik.values.email}
                                />
                            </Link>

                       </Spacings.Stack>
                    }

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
                    <Link to={`/${projectKey}/${entryPointUriPath}/customer-account/${customer?.id}/Customers-orders`}>
                            <PrimaryButton iconLeft={<ChainIcon />} 
                              label={formik.values.orderNumber}
                            />
                        </Link>
                      }
                          </Spacings.Stack>
                  }
        </Spacings.Inline>

       

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

            <Spacings.Inline scale="s">
                    <SelectField
                          name="assignedTo"
                          title="Assign To"
                          value={formik.values.assignedTo}
                          errors={formik.errors.assignedTo}
                          touched={formik.touched.assignedTo}
                          onChange={handleChangeOperation}
                          onBlur={formik.handleBlur}
                          options={getUsersToAssignTo}
                          isReadOnly={props.isReadOnly}
                          isRequired
                          horizontalConstraint={13}
                          isDisabled={!canManage || !customerFound }
                      />

                    <SelectField
                        name="status"
                        title="Ticket Status"
                        value={formik.values.status}
                        errors={formik.errors.status}
                        touched={formik.touched.status}
                        onBlur={formik.handleBlur}
                        options={workflowStatusses}
                        onChange={handleChangeOperation}
                        horizontalConstraint={13}
                        isDisabled={!formik.values.isEdit}
                      />

                       
            </Spacings.Inline>


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
                    isReadOnly={formik.values.isEdit}
                    isDisabled={!canManage || !customerFound  }
                    touched={formik.touched.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
            
                <Spacings.Inline alignItems="center">
                    <MultilineTextField name="commentMessage"
                        title="Worklog"
                        value={formik.values.commentMessage}
                        isDisabled={!canManage || !customerFound}
                        touched={formik.touched.commentMessage}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>

                    <PrimaryButton
                      label="Add Worklog"
                      onClick={addWorklog}
                      isDisabled={disableWLButton}
                      // isDisabled={disableSubmitButton }
                    />
                </Spacings.Inline>
                {commentsList && commentsList.length > 0 && <>
                  <CollapsiblePanel
                  isClosed={isClosedCommentsPanel}
                  onToggle={()=>{setIsClosedCommentsPanel(!isClosedCommentsPanel);}}
                  header="Show Worklog History" >
                              <div>

                              {commentsList ? 
                                      <Spacings.Stack scale="l">
                                      
                                        <DataTable
                                          isCondensed
                                          columns={columns}
                                          rows={commentsList}
                                          // itemRenderer={(item, column) => itemRenderer(item, column)}
                                          maxHeight={600}
                                          // sortedBy={tableSorting.value.key}
                                          // sortDirection={tableSorting.value.order}
                                          // onSortChange={tableSorting.onChange}
                                          // onRowClick={(row) => push(`ticket-edit/${row.id}/tickets-general`)}
                                          onRowClick={(row) => push(`ticket-edit/${row.id}/tickets-general`)}
                                          // onRowClick={(row) => push(`Ticket-account/${row.id}/companies-general`)}
                                        />
                                      </Spacings.Stack>
                                    : <p>Loading...</p>}
                                      
                                  </div>
                    </CollapsiblePanel>
                  </>
                }

                {canManage && formik.values.isEdit &&

              <div>
                <FieldLabel
                    title={"Enter Time Spent on Ticket"}
                    hasRequiredIndicator={false}
                    horizontalConstraint={7}
                  />
                    <NumberInput
                        id="timeSpentOnTicket"
                        name="timeSpentOnTicket"
                        label="Time Spent On Ticket"
                        // onChange={(e) => {
                        //   if(e.target.value < 0){
                        //     return;
                        //   }
                        //   setTimeSpentOnTicket(e.target.value)
                        //   formik.handleChange();
                        // }}
                        horizontalConstraint={13}
                        value={formik.values.timeSpentOnTicket}
                        touched={formik.touched.timeSpentOnTicket}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                  </div>
                }
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div>
                   <input type='file' id="upload_file" 
                          name="upload_file" 
                          ref={inputRef}
                          onChange={uploadFile}/>
                   {/* <button onClick={handleClick}>Upload</button> */}

                   {!imgUploaded &&
                      <div className='outerbar'>
                        <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                      </div>
                   }
  
                  <br/><br/>
                   {files}
                  <br/>
                  {files?.length>0 && <button onClick={deleteFileFromStorage}>Delete File</button>}
                </div>
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