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
import { useParams } from 'react-router-dom';
//import { useEmployeeDetailsFetcher } from '../../../../hooks/use-employee-connector/use-employeee-graphql-connector';
import { 
  Switch,
  Route,
  useRouteMatch,
 } from 'react-router-dom';
import { CheckboxInput } from '@commercetools-frontend/ui-kit';
//  import EmployeeAddressDetail from '../employee-address-details';
//  import EmployeeAddAddress from '../employee-add-address';

const getCountryOptions =Object.keys(COUNTRY).map((key) => ({
    label: COUNTRY[key],
    value: COUNTRY[key],
  }));

 

const ShippingAddressForm = (props) => {
  const intl = useIntl();
  //const params = useParams();
  const match = useRouteMatch();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  //const { employee } = useEmployeeDetailsFetcher(params.id);

  const formElements = (
    <Spacings.Stack scale="l">
      <Spacings.Stack scale="l"> 
       <CollapsiblePanel
          data-testid="address-summary-panel"
          header={
            <CollapsiblePanel.Header>
              {/* {formatMessage(messages.panelTitle)} */}
              {'Shipping Method'}
            </CollapsiblePanel.Header>
          }
          scale="l">
          <Constraints.Horizontal min={13}>
            
          
      <Spacings.Inline>
        <SelectField
          name="streetNumber"
          title="Shipping method"
          value={formik.values.streetNumber}
          errors={formik.errors.streetNumber}
          touched={formik.touched.streetNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        
        </Spacings.Inline>
        </Constraints.Horizontal>
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
          scale="l">
          <Constraints.Horizontal min={13}>
            
          
      <Spacings.Inline>
        <TextField
          name="streetNumber"
          title="Street Number"
          value={formik.values.streetNumber}
          errors={formik.errors.streetNumber}
          touched={formik.touched.streetNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        <TextField
          name="streetName"
          title="Street Name"
          value={formik.values.streetName}
          errors={formik.errors.streetName}
          touched={formik.touched.streetName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
      </Spacings.Inline>
      <Spacings.Inline>
        <TextField
          name="apartment"
          title="Apartment/Suite"
          value={formik.values.apartment}
          errors={formik.errors.apartment}
          touched={formik.touched.apartment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="building"
          title="Building"
          value={formik.values.building}
          errors={formik.errors.building}
          touched={formik.touched.building}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="pobox"
          title="PO Box"
          value={formik.values.pobox}
          errors={formik.errors.pobox}
          touched={formik.touched.pobox}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="city"
          title="City"
          value={formik.values.city}
          errors={formik.errors.city}
          touched={formik.touched.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="postalCode"
          title="Postal code"
          value={formik.values.postalCode}
          errors={formik.errors.postalCode}
          touched={formik.touched.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="region"
          title="Region"
          value={formik.values.region}
          errors={formik.errors.region}
          touched={formik.touched.region}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="state"
          title="State"
          value={formik.values.state}
          errors={formik.errors.state}
          touched={formik.touched.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <SelectField
          name="country"
          title="Country"
          value={formik.values.country}
          errors={formik.errors.country}
          touched={formik.touched.country}
          options={getCountryOptions}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isReadOnly={props.isReadOnly}
          horizontalConstraint={13}
          isRequired
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="streetInfo"
          title="Additional street info"
          value={formik.values.streetInfo}
          errors={formik.errors.streetInfo}
          touched={formik.touched.streetInfo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="addressInfo"
          title="Additional address info"
          value={formik.values.addressInfo}
          errors={formik.errors.addressInfo}
          touched={formik.touched.addressInfo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
       <CheckboxInput
      value="foo-radio-value"
      onChange={(event) => alert(event.target.value)}
      isChecked={true}
      
    >

    </CheckboxInput>
    </Spacings.Inline>
       </Constraints.Horizontal>
       </CollapsiblePanel>
       </Spacings.Stack>

       <Spacings.Stack scale="l"> 
       <CollapsiblePanel
          data-testid="address-summary-panel"
          header={
            <CollapsiblePanel.Header>
              {/* {formatMessage(messages.panelTitle)} */}
              {'Customer Billing Details'}
            </CollapsiblePanel.Header>
          }
          scale="l">
          <Constraints.Horizontal min={13}>
            
          
      <Spacings.Inline>
        <TextField
          name="streetNumber"
          title="Street Number"
          value={formik.values.streetNumber}
          errors={formik.errors.streetNumber}
          touched={formik.touched.streetNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
        <TextField
          name="streetName"
          title="Street Name"
          value={formik.values.streetName}
          errors={formik.errors.streetName}
          touched={formik.touched.streetName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
      </Spacings.Inline>
      <Spacings.Inline>
        <TextField
          name="apartment"
          title="Apartment/Suite"
          value={formik.values.apartment}
          errors={formik.errors.apartment}
          touched={formik.touched.apartment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="building"
          title="Building"
          value={formik.values.building}
          errors={formik.errors.building}
          touched={formik.touched.building}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="pobox"
          title="PO Box"
          value={formik.values.pobox}
          errors={formik.errors.pobox}
          touched={formik.touched.pobox}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="city"
          title="City"
          value={formik.values.city}
          errors={formik.errors.city}
          touched={formik.touched.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="postalCode"
          title="Postal code"
          value={formik.values.postalCode}
          errors={formik.errors.postalCode}
          touched={formik.touched.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="region"
          title="Region"
          value={formik.values.region}
          errors={formik.errors.region}
          touched={formik.touched.region}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="state"
          title="State"
          value={formik.values.state}
          errors={formik.errors.state}
          touched={formik.touched.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <SelectField
          name="country"
          title="Country"
          value={formik.values.country}
          errors={formik.errors.country}
          touched={formik.touched.country}
          options={getCountryOptions}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isReadOnly={props.isReadOnly}
          horizontalConstraint={13}
          isRequired
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="streetInfo"
          title="Additional street info"
          value={formik.values.streetInfo}
          errors={formik.errors.streetInfo}
          touched={formik.touched.streetInfo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       <Spacings.Inline>
        <TextField
          name="addressInfo"
          title="Additional address info"
          value={formik.values.addressInfo}
          errors={formik.errors.addressInfo}
          touched={formik.touched.addressInfo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          horizontalConstraint={13}
        />
       </Spacings.Inline>
       </Constraints.Horizontal>
       </CollapsiblePanel>
       </Spacings.Stack>
        
      
            

    </Spacings.Stack>
  );

  return props.children({
    formElements,
    values: formik.values,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    handleReset: formik.handleReset,
  });
};
ShippingAddressForm.displayName = 'ShippingAddressForm';
ShippingAddressForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default ShippingAddressForm;
