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

const AddressDetailsForm = (props) => {
    const intl = useIntl();
    const { push } = useHistory();
    const match = useRouteMatch();
    const [addressId, setAddressId] = useState("cartAddress");
    const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(false);
    //const [isBillingSameAsShipping]
    const formik = useFormik({
        initialValues: props.initialValues,
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

    // const hadnleSubmit = (event) =>{
    //     if(isBillingSameAsShipping){
    //       props.onSubmitShipping(formik?.values)
    //       props.onSubmitBilling( value)
    //     }else{
    //       props.onSubmitShipping( value)
    //     }
    // }


    // const onSubmitt = (e) => {
    //   const updateDataa = formValuesToDocc(formik?.values);
    //   console.log("Update data", updateDataa);
    //   props.onSubmitt(updateDataa);
    // };
    const [address, setAddress] = useState(formik?.values);


    // console.log("Customer Addresses",props?.addresses);
    // console.log("Address Id",addressId);
    // console.log("Selected Address",address);
    // console.log("formik values",formik.values);

    return (
        <form onSubmit={onSubmit}>
            <Spacings.Stack scale="xl">

            </Spacings.Stack>

        </form>
    );
};
AddressDetailsForm.displayName = 'AddressDetailsForm';
AddressDetailsForm.propType = {
    initialValues: PropTypes.object.isRequired,
};

export default AddressDetailsForm;
