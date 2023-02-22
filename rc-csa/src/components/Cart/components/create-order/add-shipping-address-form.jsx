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
  PrimaryButton,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';
//  import EmployeeAddressDetail from '../employee-address-details';
//  import EmployeeAddAddress from '../employee-add-address';
import { formValuesToDoc } from './conversions';

const getCountryOptions = Object.keys(COUNTRY).map((key) => ({
  label: COUNTRY[key],
  value: COUNTRY[key],
}));

const ShippingAddressForm = (props) => {
  const intl = useIntl();
  const { push } = useHistory();
  //const params = useParams();
  // const match = useRouteMatch();
  const formik = useFormik({
    initialValues: props.initialValues,
    validate,
    enableReinitialize: true,
  });
  const onSubmit = (e) => {
    const updateData = formValuesToDoc(formik?.values);
    props.onSubmit(updateData);
  };

  //const { employee } = useEmployeeDetailsFetcher(params.id);

  return (
    <form onSubmit={onSubmit}>
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
            scale="l"
          >
            <Constraints.Horizontal min={13}>
              <Spacings.Inline>
                <TextField
                  name="shippingMethodName"
                  title="Shipping method"
                  value={formik.values.shippingMethodName}
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
                  value={formik.values.streetNumber}
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
                  id="apartment"
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
                  id="building"
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
                  id="pobox"
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
                  id="city"
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
                  id="postalCode"
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
                  id="region"
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
                  id="state"
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
                <TextField
                  id="country"
                  name="country"
                  title="Country"
                  value={formik.values.country}
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
                  id="streetInfo"
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
                  id="addressInfo"
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
            <Spacings.Stack>
              <Spacings.Inline>
                <SecondaryButton label="Cancel" onClick={formik.handleReset} />
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
              <PrimaryButton
                label="Next"
                //onClick={onSubmit}
                onClick={() => push(`place-order`)}
                //onSubmit={onSubmit}
                isDisabled={false}
              />
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
