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
    AsyncSelectInput,
    CheckboxInput,
    CreatableSelectField,
    PrimaryButton,
    RadioField,
    RadioInput,
    SecondaryButton,
} from '@commercetools-frontend/ui-kit';
//  import EmployeeAddressDetail from '../employee-address-details';
//  import EmployeeAddAddress from '../employee-add-address';
import { docToFormValues, docToFormValuess, formValuesToDoc, formValuesToDocc, getShippingMethods, addressInfo } from './conversions';
import { useCallback, useState } from 'react';
import CartDiscounts from '../cart-view/cart-discounts';
import { useFetchCartById, useFetchCartShippingMethods } from '../../../../hooks/use-cart-connector/use-cart-connector';
import ShippingAddress from './shipping-address';
import BillingAddress from './billing-address';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import CartShippingMethods from './cart-shipping-method';


const AddressDetailsForm = (props) => {
    const intl = useIntl();
    const { push } = useHistory();
    const match = useRouteMatch();
    const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true);


    const formik = useFormik({
        initialValues: props.initialValues,
        validate,
        enableReinitialize: true,
        onSubmit: props.onSubmit,
    });

    console.log(formik);
    console.log('Props', props);
    const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
        dataLocale: context.dataLocale ?? '',
        projectLanguages: context.project?.languages ?? [],
    }));
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



    const formElements = (
        <form onSubmit={onSubmit}>
            <Spacings.Stack scale="xl">
                <Spacings.Stack scale='l'>
                    <CartShippingMethods initialValues={props?.initialValues} />
                </Spacings.Stack>
                <Spacings.Stack scale="l">
                    <ShippingAddress initialValues={docToFormValues(cart?.shippingAddress, projectLanguages)}
                    />
                </Spacings.Stack>
                <Spacings.Stack>
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
                            console.log(isBillingSameAsShipping, event)

                        }}
                    >
                        Use this address as billing address
                    </CheckboxInput>
                </Spacings.Stack>

                <Spacings.Stack scale="l">
                    <BillingAddress isChecked={isBillingSameAsShipping} />

                </Spacings.Stack>
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
AddressDetailsForm.displayName = 'AddressDetailsForm';
AddressDetailsForm.propType = {
    initialValues: PropTypes.object.isRequired,
};

export default AddressDetailsForm;
