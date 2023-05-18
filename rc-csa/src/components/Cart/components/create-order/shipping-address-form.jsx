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
  CreatableSelectField,
  PrimaryButton,
  RadioField,
  RadioInput,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';
//  import EmployeeAddressDetail from '../employee-address-details';
//  import EmployeeAddAddress from '../employee-add-address';
import { docToFormValues, docToFormValuess, formValuesToDoc, formValuesToDocc } from './conversions';
import { useCallback, useState } from 'react';
import CartDiscounts from '../cart-view/cart-discounts';
import { useFetchCartById } from '../../../../hooks/use-cart-connector/use-cart-connector';
import BillingAddress from './billing-address';


const getCountryOptions = Object.keys(COUNTRY).map((key) => ({
  label: COUNTRY[key],
  value: COUNTRY[key],
}));
const rows = [
]
const columns = [
  { key: 'name', label: 'Discount Name' },
  { key: 'value', label: 'Amount' },
  { key: 'code', label: 'Discount Codes' },

]

const getStatesAvailable = [
  { label: "All", value: "" },
  { label: "California", value: "California" },
  { label: "Texas", value: "Texas" },
  { label: "Florida", value: "Florida" },
]

const ShippingAddressForm = (props) => {
  const intl = useIntl();
  const { push } = useHistory();
  const match = useRouteMatch();
  const [addressId, setAddressId] = useState("cartAddress");
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true);
  //const [isBillingSameAsShipping]
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });
  let { cart } = useFetchCartById(match.params.id);
  const isQuoteRequest = props?.isQuoteRequest;
  const onSubmit = (e) => {
    // if (cart?.shippingAddress) {
    const updateData = formValuesToDoc(formik?.values);
    console.log("Update data", updateData);
    props.onSubmit(updateData);
    // }
    // else {
    //   const updateDataa = formValuesToDocc(formik?.values);
    //   console.log("Update data", updateDataa);
    //   props.onSubmit(updateDataa);
    // }
  };
  const onClickCheckBox = useCallback(
    async (event) => {
      console.log(event)
    }
  );


  const formElements = (
    <form onSubmit={onSubmit}>
      <Spacings.Stack scale="xl">
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
                  console.log(props);
                  console.log(props?.addresses.filter(e => e.id == event.target.value)[0])
                  const customerAddress = props?.addresses.filter(e => e.id == event.target.value)[0];
                  formik.setValues(docToFormValues(customerAddress, null));
                  //console.log(customerAddress);
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
        <Spacings.Stack scale='l'>
          <CollapsiblePanel
            data-testid="address-summary-panel"
            header={
              <CollapsiblePanel.Header>
                {/* {formatMessage(messages.panelTitle)} */}
                {'Shipping Address'}
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
                  id="pOBox"
                  name="pOBox"
                  title="PO Box"
                  value={formik?.values?.pOBox}
                  errors={formik.errors.pOBox}
                  touched={formik.touched.pOBox}
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
                <SecondaryButton
                  label="Cancel"
                  onClick={formik.handleReset}
                //onClick={props?.onClose} 
                />
                <PrimaryButton
                  label="Submit"
                  //onClick={formik.handleSubmit}
                  //onSubmit={onSubmit}
                  onClick={onSubmit}
                  isDisabled={false}
                />
              </Spacings.Inline>
            </Spacings.Stack>
          </CollapsiblePanel>
        </Spacings.Stack>

        {/* <CheckboxInput
                //value="foo-radio-value"
                isDisabled={false}
                // value={isBillingSameAsShipping}
                isChecked={isBillingSameAsShipping}
                //onChange={formik.handleChange}
                onChange={(event) => {
                  setIsBillingSameAsShipping((p) =>
                    !p)
                  //setIsBillingSameAsShipping(p);
                  console.log(isBillingSameAsShipping, event)
                  if (CheckboxInput.isChecked == true) {

                    console.log(props?.initialValues.filter(e => e.id == p)[0])
                    const shippingAddress = props?.initialValues.filter(e => e.id == p)[0];
                    formik.setValues(docToFormValuess(shippingAddress, null));
                  }
                  else {
                    formik.setValues(props.initialValues)
                  }
                  //setIsEditable(event.target.checked);
                  // document.getElementById("checkbox").checked = true;
                  // document.getElementById("checkbox").checked = false;

                  // event.cartId = item.id
                  // onClickCheckBox(event)
                  // setAddressId(event.target.value)
                  // if (CheckboxInput.isChecked == true) {
                  //   formik.setValues(props.initialValues)
                  // }
                }}
              >
                Use this address as billing address
              </CheckboxInput> */}

        {/* <CheckboxInput>
                  id?: string;
                  name?: string;
                  value?: string;
                  isChecked?: boolean;
                  isIndeterminate?: boolean;
                  onChange: ChangeEventHandler<HTMLInputElement>;
                    isHovered?: boolean;
                    isDisabled?: boolean;
                    isReadOnly?: boolean;
                    hasError?: boolean;
                    children?: ReactNode;
                </CheckboxInput> */}




        {/* <Spacings.Stack>
        <CheckboxInput
          //value="foo-radio-value"
          isDisabled={false}
          // value={isBillingSameAsShipping}
          isChecked={isBillingSameAsShipping}
          //onChange={formik.handleChange}
          onChange={(event) => {
            setIsBillingSameAsShipping((p) =>
              !p)
            //setIsBillingSameAsShipping(p);
            // console.log(isBillingSameAsShipping, event)
            // if (props.isChecked == true) {
            //   formik.setValues(docToFormValues(cart?.shippingAddress))
            // }
            // else {
            //   formik.setValues(docToFormValuess(cart?.billingAddress))
            // }

            // if (isBillingSameAsShipping == true) {

            //     console.log(props?.initialValues.filter(e => e.id == p)[0])
            //     const shippingAddress = props?.initialValues.filter(e => e.id == p)[0];
            //     formik.setValues(docToFormValuess(shippingAddress, null));
            // }
            // else {
            //     const billingAddress = props?.initialValues
            //     formik.setValues(docToFormValues(billingAddress, null))
            // }
            //setIsEditable(event.target.checked);
            // document.getElementById("checkbox").checked = true;
            // document.getElementById("checkbox").checked = false;

            // event.cartId = item.id
            // onClickCheckBox(event)
            // setAddressId(event.target.value)
            // if (CheckboxInput.isChecked == true) {
            //   formik.setValues(props.initialValues)
            // }
          }}
        >
          Use this address as billing address
        </CheckboxInput>
      </Spacings.Stack>
      <Spacings.Stack>
        <BillingAddress isChecked={isBillingSameAsShipping} />

      </Spacings.Stack> */}
        {/* <Spacings.Stack scale="s">
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
      </Spacings.Stack> */}
      </Spacings.Stack>

    </form>
  );
  return props.children({
    formElements,
    values: formik.values,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: onSubmit,
    handleReset: formik.handleReset,
  });
};
ShippingAddressForm.displayName = 'ShippingAddressForm';
ShippingAddressForm.propType = {
  initialValues: PropTypes.object.isRequired,
};

export default ShippingAddressForm;
