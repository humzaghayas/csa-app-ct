import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import { COUNTRY } from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import { useHistory, useParams } from 'react-router-dom';
//import { useEmployeeDetailsFetcher } from '../../../../hooks/use-employee-connector/use-employeee-graphql-connector';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {
  CheckboxInput,
  DataTable,
  PrimaryButton,
  RadioField,
  RadioInput,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';
//  import EmployeeAddressDetail from '../employee-address-details';
//  import EmployeeAddAddress from '../employee-add-address';
import { docToFormValues, formValuesToDoc } from './conversions';
import { useCustomerAddressesFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
import { useState } from 'react';

const getCountryOptions = Object.keys(COUNTRY).map((key) => ({
  label: COUNTRY[key],
  value: COUNTRY[key],
}));
const columns = [
  { key: 'id', label: "Id" },
  { key: 'streetName', label: "Street Name" },
  { key: 'streetNumber', label: "Street Number" },
  { key: 'city', label: "City" },
  { key: 'region', label: "Region" },
  { key: 'country', label: "Country" },
  { key: 'state', label: "State" },
]

const getStatesAvailable = [
  {label:"All" , value:""},
  {label:"California" , value:"California"},
  {label:"Texas" , value:"Texas"},
  {label:"Florida" , value:"Florida"},
]

const ShippingAddressForm = (props) => {
  const intl = useIntl();
  const { push } = useHistory();
  const [addressId, setAddressId] = useState("cartAddress");

  const formik = useFormik({
    initialValues: props.initialValues,
    validate,
    enableReinitialize: true,
  });

  const isQuoteRequest = props?.isQuoteRequest;
  const onSubmit = (e) => {
    const updateData = formValuesToDoc(formik?.values);
    console.log("Update data", updateData);
    props.onSubmit(updateData);
  };
  const [address, setAddress] = useState(formik?.values)

  // console.log("Customer Addresses",props?.addresses);
  // console.log("Address Id",addressId);
  // console.log("Selected Address",address);
  // console.log("formik values",formik.values);

  return (
    <form onSubmit={onSubmit}>
      <Spacings.Stack scale="xl">
        <Spacings.Stack scale="l">
          <CollapsiblePanel
            data-testid="address-summary-panel"
            header={
              <CollapsiblePanel.Header>
                {/* {formatMessage(messages.panelTitle)} */}
                {'Shipping Method'}
              </CollapsiblePanel.Header>
            }
            scale="l"
          >
            <Constraints.Horizontal min={13}>
              <Spacings.Inline>
                <TextField
                  name="shippingMethodName"
                  title="Shipping method"
                  value={formik?.values?.shippingMethodName}
                  errors={formik.errors.shippingMethodName}
                  touched={formik.touched.shippingMethodName}
                  onChange={(event) => console.log(event)}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Inline>
            </Constraints.Horizontal>
          </CollapsiblePanel>
        </Spacings.Stack>
        <Spacings.Stack scale='l'>
          <CollapsiblePanel
            header={<CollapsiblePanel.Header>
              {'Addresses'}
            </CollapsiblePanel.Header>}
          >
            <RadioField
              title="Addresses"
              name="fruits"
              value={addressId}
              onChange={(event) => {
                setAddressId(event.target.value);
                if (event.target.value == "cartAddress") {
                  formik.setValues(props.initialValues);
                } else {
                  console.log("Update on change")
                  console.log(props?.addresses.filter(e => e.id == event.target.value)[0])
                  const customerAddress = props?.addresses.filter(e => e.id == event.target.value)[0];
                  formik.setValues(docToFormValues(customerAddress, null));
                }
              }
              }
            >
              <RadioInput.Option value="cartAddress">{'Cart Address'}</RadioInput.Option>
              {props?.addresses?.map((item, index) => {
                return <RadioInput.Option value={item.id}>{'Customer Address ' + index + 1}</RadioInput.Option>
              })}
            </RadioField>
          </CollapsiblePanel>
        </Spacings.Stack>

        <Spacings.Stack scale="l">
          <CollapsiblePanel
            data-testid="address-summary-panel"
            header={
              <CollapsiblePanel.Header>
                {/* {formatMessage(messages.panelTitle)} */}
                {'Shipping Details'}
              </CollapsiblePanel.Header>
            }
            scale="l"
          >
            <Constraints.Horizontal min={13}>
              <Spacings.Inline>
                <TextField
                  id="streetNumber"
                  name="streetNumber"
                  title="Street Number"
                  value={formik?.values?.streetNumber}
                  errors={formik.errors.streetNumber}
                  touched={formik.touched.streetNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
                <TextField
                  id="streetName"
                  name="streetName"
                  title="Street Name"
                  value={formik?.values?.streetName}
                  errors={formik.errors.streetName}
                  touched={formik.touched.streetName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Inline>
              <Spacings.Inline>
                <TextField
                  id="apartment"
                  name="apartment"
                  title="Apartment/Suite"
                  value={formik?.values?.apartment}
                  errors={formik.errors.apartment}
                  touched={formik.touched.apartment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Inline>
              <Spacings.Inline>
                <TextField
                  id="building"
                  name="building"
                  title="Building"
                  value={formik?.values?.building}
                  errors={formik.errors.building}
                  touched={formik.touched.building}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Inline>
              <Spacings.Inline>
                <TextField
                  id="pobox"
                  name="pobox"
                  title="PO Box"
                  value={formik?.values?.pobox}
                  errors={formik.errors.pobox}
                  touched={formik.touched.pobox}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Inline>
              <Spacings.Inline>
                <TextField
                  id="city"
                  name="city"
                  title="City"
                  value={formik?.values?.city}
                  errors={formik.errors.city}
                  touched={formik.touched.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Inline>
              <Spacings.Inline>
                <TextField
                  id="postalCode"
                  name="postalCode"
                  title="Postal code"
                  value={formik?.values?.postalCode}
                  errors={formik.errors.postalCode}
                  touched={formik.touched.postalCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Inline>
              <Spacings.Inline>
                <TextField
                  id="region"
                  name="region"
                  title="Region"
                  value={formik?.values?.region}
                  errors={formik.errors.region}
                  touched={formik.touched.region}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Inline>
              <Spacings.Inline>
                  <SelectField
                      name="state"
                      title="State"
                      value={formik.values.state}
                      errors={formik.errors.state}
                      touched={formik.touched.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      options={getStatesAvailable}
                      horizontalConstraint={13}
                    />  
              </Spacings.Inline>
              <Spacings.Inline>
                <TextField
                  id="country"
                  name="country"
                  title="Country"
                  value={formik?.values?.country}
                  errors={formik.errors.country}
                  touched={formik.touched.country}
                  // options={getCountryOptions}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isReadOnly={props.isReadOnly}
                  horizontalConstraint={13}
                //isRequired
                />
              </Spacings.Inline>
              <Spacings.Inline>
                <TextField
                  id="additionalStreetInfo"
                  name="additionalStreetInfo"
                  title="Additional street info"
                  value={formik?.values?.additionalStreetInfo}
                  errors={formik.errors.additionalStreetInfo}
                  touched={formik.touched.additionalStreetInfo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Inline>
              <Spacings.Inline>
                <TextField
                  id="additionalAddressInfo"
                  name="additionalAddressInfo"
                  title="Additional address info"
                  value={formik?.values?.additionalAddressInfo}
                  errors={formik.errors.additionalAddressInfo}
                  touched={formik.touched.additionalAddressInfo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  horizontalConstraint={13}
                />
              </Spacings.Inline>
            </Constraints.Horizontal>
            <Spacings.Stack>
              <Spacings.Inline>
                <SecondaryButton label="Cancel" onClick={props?.onClose} />
                <PrimaryButton
                  //type="submit"
                  label="Submit"
                  //onClick={formik.handleSubmit}
                  onSubmit={onSubmit}
                  onClick={onSubmit}
                  isDisabled={false}
                />
              </Spacings.Inline>
            </Spacings.Stack>
          </CollapsiblePanel>
          <Spacings.Stack scale="s">
            <Spacings.Inline>

              {!isQuoteRequest && 
                <PrimaryButton
                  label="Next"
                  //onClick={onSubmit}
                  onClick={() => push(`place-order`)}
                  //onSubmit={onSubmit}
                  isDisabled={false}
                />
              }
              {isQuoteRequest && 
                <PrimaryButton
                      label="Next"
                      //onClick={onSubmit}
                      onClick={() => push(`place-quote-request`)}
                      //onSubmit={onSubmit}
                      isDisabled={false}
                    />
              }    
            </Spacings.Inline>
          </Spacings.Stack>
        </Spacings.Stack>
      </Spacings.Stack>
    </form>
  );
};
ShippingAddressForm.displayName = 'ShippingAddressForm';
ShippingAddressForm.propType = {
  initialValues: PropTypes.object.isRequired,
};

export default ShippingAddressForm;
