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
import { DateField, MultilineTextField, PrimaryButton, SecondaryButton } from '@commercetools-frontend/ui-kit';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useState } from 'react';
import{CONSTANTS} from 'ct-tickets-helper-api'
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';
import { useUserListFetcher } from '../../../../hooks/use-register-user-connector/use-service-connector';
import { useFileDeleteService, useFileUploadService } from '../../../../hooks/use-file-upload-connector';
import { useFindCustomerService } from '../../../../hooks/use-customer-connector';
import { docToFormValuesCustomer } from './conversions';

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
  const dataLocale = useApplicationContext((context) => context.dataLocale);

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


  return (
    <form onSubmit={formik.handleSubmit}>
        <Spacings.Stack scale="l">
        
        <CollapsiblePanel
              data-testid="quote-summary-panel"
              header={
                <CollapsiblePanel.Header>
                  {/* {formatMessage(messages.panelTitle)} */}
                  {'Ticket Details'}
                </CollapsiblePanel.Header>
              }
              scale="l">
                <Constraints.Horizontal >
                <Spacings.Stack scale="m">


                <Spacings.Inline>
                    <PrimaryButton
                      label="Search Customer"
                      onClick={getCustomerData}
                      isDisabled={!canManage || formik.values.isEdit}
                    />
                  <TextField
                      name="email"
                      title="Customer Email"
                      value={formik.values.email}
                      errors={formik.errors.email}
                      touched={formik.touched.email}
                      onChange={onChangeEmail}
                      onBlur={formik.handleBlur}
                      isReadOnly={props.isReadOnly}
                      isRequired
                      horizontalConstraint={13}
                      isDisabled={!canManage || formik.values.isEdit}
                    />
               </Spacings.Inline>
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
                    isDisabled={!canManage || !customerFound }
                  />
            </Spacings.Stack>
            <Spacings.Stack scale="s">
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
        
        </Spacings.Stack>
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
                    isDisabled={!canManage || !customerFound }/>
              </Spacings.Stack>


            {(formik?.values?.category !== null && 
            (formik?.values?.category === CONSTANTS.TICKET_TYPE_QUERY || 
              formik?.values?.category == CONSTANTS.TICKET_TYPE_INQUIRY)) && (
              <Spacings.Stack scale="s">
                <MultilineTextField name="message"
                    title="Message"
                    isRequired
                    value={formik.values.message}
                    errors={
                      TextField.toFieldErrors(formik.errors).message
                    }
                    touched={formik.touched.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>

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

            )}

          {(formik?.values?.category !== null && 
            (formik?.values?.category === CONSTANTS.TICKET_TYPE_REQUEST )) && (
              <Spacings.Stack scale="s">
                  <Spacings.Inline scale="s">
                    <TextField name="salutation"
                        title="Salutation"
                        isRequired
                        value={formik.values.salutation}
                        errors={
                          TextField.toFieldErrors(formik.errors).salutation
                        }
                        placeholder={customer?.salutation}
                        touched={formik.touched.salutation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                      <TextField name="title"
                        title="Title"
                        isRequired
                        placeholder={customer?.title}
                        value={formik.values.title}
                        errors={
                          TextField.toFieldErrors(formik.errors).title
                        }
                        touched={formik.touched.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                    </Spacings.Inline>

                  <Spacings.Inline scale="s">
                    <TextField name="firstName"
                        title="First Name"
                        isRequired
                        value={formik.values.firstName}
                        errors={
                          TextField.toFieldErrors(formik.errors).firstName
                        }
                        placeholder={customer?.firstName}
                        touched={formik.touched.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                      <TextField name="middleName"
                        title="Middle Name"
                        isRequired
                        value={formik.values.middleName}
                        errors={
                          TextField.toFieldErrors(formik.errors).middleName
                        }
                        placeholder={customer?.middleName}
                        touched={formik.touched.middleName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                    </Spacings.Inline>

                  <Spacings.Inline scale="s">
                      <TextField name="lastName"
                        title="Last Name"
                        isRequired
                        value={formik.values.lastName}
                        errors={
                          TextField.toFieldErrors(formik.errors).lastName
                        }
                        placeholder={customer?.lastName}
                        touched={formik.touched.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>

                    <DateField name="dateOfBirth"
                        title="Date of birth"
                        isRequired
                        value={formik.values.dateOfBirth}
                        errors={
                          TextField.toFieldErrors(formik.errors).dateOfBirth
                        }
                        placeholder={customer?.dateOfBirth}
                        touched={formik.touched.dateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                    </Spacings.Inline>
                    <Spacings.Inline>
                      <TextField name="companyName"
                          title="Company Name"
                          isRequired
                          value={formik.values.companyName}
                          placeholder={customer?.companyName}
                          errors={
                            TextField.toFieldErrors(formik.errors).companyName
                          }
                          touched={formik.touched.companyName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}/>
                    </Spacings.Inline>
              </Spacings.Stack>
            )}
                  <Spacings.Inline>
                    <SecondaryButton
                      label="Cancel"
                      onClick={formik.handleReset}
                    />
                    <PrimaryButton
                      type="submit"
                      label="Submit"
                      onClick={(e)=>{setDisableSubmitButton(true);formik.handleSubmit(e);}}
                      //isDisabled={formik.isSubmitting}
                      isDisabled={disableSubmitButton }
                    />
                </Spacings.Inline>
            </Spacings.Stack>
            </Constraints.Horizontal>
          {/* </Spacings.Inline> */}
        </CollapsiblePanel>
        </Spacings.Stack>
    </form>
  )}

  export default TicketCreateForm;