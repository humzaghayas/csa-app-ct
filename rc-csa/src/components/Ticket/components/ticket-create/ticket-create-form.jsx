import React, { useCallback, useRef } from 'react';
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
import{getTicketCategories,getTicketPriorityValues,getTicketContactTypes} from 'ct-tickets-helper-api';
import { MultilineTextField, PrimaryButton, SecondaryButton } from '@commercetools-frontend/ui-kit';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useState } from 'react';
import{FETCH_CUSTOMERS,isEmailValid,CONSTANTS, storage,
  ref, getDownloadURL, uploadBytesResumable } from 'ct-tickets-helper-api'
import { useMcLazyQuery, useMcQuery } from '@commercetools-frontend/application-shell';
import { gql, useQuery } from '@apollo/client';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

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

  const [customerFound, setCustomerFound] = useState(formik.values.isEdit);
  const [imgUrl, setImgUrl] = useState(null);

  const [progresspercent, setProgresspercent] = useState(0);

  const custoInfo=useCallback(
    async () => {
      getCustomerByEmail(formik.values.email);  
  });

  const [customers,{ data, error, loading }] = useMcLazyQuery(gql`${FETCH_CUSTOMERS}`);
const getCustomerByEmail = (email) =>{
   //const email=formik.values.email;

   console.log('email',email);
    if(isEmailValid(email)){
      //setCustomerFound(true);
     customers( {
        variables:{
          where:`email=\"${email}\"`
        },
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        }
      }).then((resp)=>{

        console.log("data1",resp);
        if(resp?.data?.customers?.count > 0){
  
          formik.values.customerId =  resp?.data?.customers.results[0].id;
          setCustomerFound(true);
        }
      }).catch((error)=>{

        setCustomerFound(false);
        console.error('error',error);
      });
  }else{
    setCustomerFound(false);
  }
}

const onChangeEmail=(evt)=>{
  setCustomerFound(false);
  formik.handleChange(evt);
}


const inputRef = useRef(null);

const handleClick = (e) => {
  e.preventDefault()
  // 👇️ open file input box on click of other element
  inputRef.current.click();

  return false;
};

const uploadFile = (e) => {

  e.preventDefault()
  const file = e.target.files && e.target.files[0];

  if (!file) {
    console.log('File Not Found!');
    return;
  }

  formik.values.imageURL = null;

  console.log('file found');
  
  const storageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on("state_changed",
    (snapshot) => {
      const progress =
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgresspercent(progress);
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImgUrl(downloadURL)

        formik.values.imageURL = downloadURL;
        console.log('downloadURL',downloadURL);
      });
    }
  );

  console.log('file uploaded');
  return false;
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
                      onClick={custoInfo}
                      isDisabled={formik.values.isEdit}
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
                      isDisabled={formik.values.isEdit}
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
                    isDisabled={!customerFound }
                  />
            </Spacings.Stack>
            <Spacings.Stack scale="s">
            <SelectField
              name="category"
              title="Ticket Category"
              value={formik.values.category}
              errors={formik.errors.category}
              touched={formik.touched.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={getTicketCategoriesOpts}
              isReadOnly={props.isReadOnly}
              isRequired
              horizontalConstraint={13}
              isDisabled={!customerFound  || formik.values.isEdit}
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
              isDisabled={!customerFound }
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
                    isDisabled={!customerFound }/>
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
                  {formik.values.imageURL && !imgUrl &&
                    <img src={formik.values.imageURL} alt='uploaded file' height={500} />
                  }
                    {
                      !imgUrl &&
                      <div className='outerbar'>
                        <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                      </div>
                    }
                    {
                      //!formik.values.imageURL &&
                      imgUrl &&
                      <img src={imgUrl} alt='uploaded file' height={500} />
                    }
                </div>
              </Spacings.Stack>

            )}

          {(formik?.values?.category !== null && 
            (formik?.values?.category === CONSTANTS.TICKET_TYPE_REQUEST )) && (
              <Spacings.Stack scale="s">
                <TextField name="firstName"
                    title="First Name"
                    isRequired
                    value={formik.values.firstName}
                    errors={
                      TextField.toFieldErrors(formik.errors).firstName
                    }
                    touched={formik.touched.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                  <TextField name="lastName"
                    title="Last Name"
                    isRequired
                    value={formik.values.lastName}
                    errors={
                      TextField.toFieldErrors(formik.errors).lastName
                    }
                    touched={formik.touched.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
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
                      onClick={formik.handleSubmit}
                      //isDisabled={formik.isSubmitting}
                      isDisabled={!customerFound }
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