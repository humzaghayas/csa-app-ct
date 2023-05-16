import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useReducer, useState } from 'react';

import {
    Link as RouterLink,
    Switch,
    useHistory,
    useRouteMatch,
} from 'react-router-dom';

import validate from './validate';
import Spacings from '@commercetools-uikit/spacings';
import { CheckActiveIcon, CheckInactiveIcon, CloseIcon, MinimizeIcon } from '@commercetools-uikit/icons';
import { CheckboxInput, CollapsiblePanel, Constraints, CreatableSelectField, DataTable, FlatButton, IconButton, PlusBoldIcon, PlusThinIcon, PrimaryButton, RadioField, RadioInput, SearchSelectField, SearchSelectInput, SecondaryButton, SecondaryIconButton, TextField, ToggleInput } from '@commercetools-frontend/ui-kit';
import { useFormik } from 'formik';
import { useCartUpdateById, useFetchCartById, useFetchCartDiscountCodes } from '../../../../hooks/use-cart-connector/use-cart-connector';
import { cartDiscountCodeOptions, docToFormValuess } from './conversions';
import { useShowApiErrorNotification, useShowNotification } from '@commercetools-frontend/actions-global';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { transformErrors } from './transform-errors';
import { PERMISSIONS } from '../../../../constants';
import { useCustomerAddressesFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
import ShippingAddress from './shipping-address';
import BillingAddress from './billing-address';
import { docToFormValues, formValuesToDoc } from './conversions';

const columns = [
    { key: 'name', label: 'Discount Name' },
    { key: 'value', label: 'Amount' },
    { key: 'code', label: 'Discount Codes' },

]

const rows = [

]
const AddressDetails = (props) => {
    const intl = useIntl();
    const params = useParams();
    const match = useRouteMatch();
    const { push } = useHistory();
    const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
        dataLocale: context.dataLocale ?? '',
        projectLanguages: context.project?.languages ?? [],
    }));
    const canManage = useIsAuthorized({
        demandedPermissions: [PERMISSIONS.Manage],
    });

    const formik = useFormik({
        initialValues: props.initialValues,
        validate,
        enableReinitialize: true,
    });
    const [addressId, setAddressId] = useState("cartAddress");
    const isQuoteRequest = props?.isQuoteRequest;

    //const {executeFetchOrder} = useFetchOrderById(match.params.id);
    const { executeUpdateCart } = useCartUpdateById();
    const showNotification = useShowNotification();
    const showApiErrorNotification = useShowApiErrorNotification();

    // const [order,setOrder] = useState(async()=>{
    //   return await executeFetchOrder(match.params.id);
    // });

    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true);
    let { cart } = useFetchCartById(match.params.id);


    return (
        //  <form onSubmit={handleSubmit}>

        <Spacings.Stack scale="xl">

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

        //    </form>

    );
    // return props.children({
    //     formElements,
    //     values: formik.values,
    //     isDirty: formik.dirty,
    //     isSubmitting: formik.isSubmitting,
    //     //submitForm: onSubmit,
    //     //handleReset: formik.handleReset,
    // });
};
AddressDetails.displayName = 'AddressDetails';
AddressDetails.propTypes = {
    linkToWelcome: PropTypes.string.isRequired,
};
export default AddressDetails;