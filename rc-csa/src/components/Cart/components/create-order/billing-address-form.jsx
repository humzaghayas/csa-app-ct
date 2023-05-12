import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import {
    Link as RouterLink,
    Switch,
    useHistory,
    useRouteMatch,
} from 'react-router-dom';


import Spacings from '@commercetools-uikit/spacings';
import { CheckActiveIcon, CheckInactiveIcon, CloseIcon, MinimizeIcon } from '@commercetools-uikit/icons';
import { CollapsiblePanel, Constraints, CreatableSelectField, DataTable, FlatButton, IconButton, PlusBoldIcon, PlusThinIcon, PrimaryButton, SearchSelectField, SearchSelectInput, SecondaryButton, SecondaryIconButton, SelectField, TextField, ToggleInput } from '@commercetools-frontend/ui-kit';
import { useFormik } from 'formik';
import { useFetchCartDiscountCodes } from '../../../../hooks/use-cart-connector/use-cart-connector';
import { cartDiscountCodeOptions, docToFormValuess, formValuesToDocc, updateBilling } from './conversions';
import validate from './validate';

const columns = [
    { key: 'name', label: 'Discount Name' },
    { key: 'value', label: 'Amount' },
    { key: 'code', label: 'Discount Codes' },

]

const rows = [

]
const getStatesAvailable = [
    { label: "All", value: "" },
    { label: "California", value: "California" },
    { label: "Texas", value: "Texas" },
    { label: "Florida", value: "Florida" },
]
const BillingAddressForm = (props) => {
    const intl = useIntl();
    const match = useRouteMatch();
    const { push } = useHistory();
    const isMulti = true;

    const formik = useFormik({
        initialValues: props.initialValues,
        onSubmit: props.onSubmit,
        validate,
        enableReinitialize: true,
    });
    const onSubmit = (e) => {

        const updateDataa = updateBilling(formik?.values);
        console.log("Update data", updateDataa);
        props.onSubmit(updateDataa);

    };
    const formElements = (
        <form onSubmit={onSubmit}>
            <Spacings.Stack scale='xl'>

                <CollapsiblePanel
                    data-testid="quote-summary-panel"
                    header={
                        <CollapsiblePanel.Header>
                            {/* {formatMessage(messages.panelTitle)} */}
                            {'Customer Billing Address '}
                        </CollapsiblePanel.Header>
                    }
                    scale="l"
                >


                    <Constraints.Horizontal min={13}>
                        <Spacings.Inline>
                            <TextField
                                // id="bstreetNumber"
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
                                // id="bstreetName"
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
                                // id="bapartment"
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
                                // id="bbuilding"
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
                                // id="bpOBox"
                                name="pObox"
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
                                // id="bcity"
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
                                // id="bpostalCode"
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
                                //  id="region"
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
                                value={formik?.values?.state}
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
                                // id="country"
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
                                // id="additionalStreetInfo"
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
                                // id="additionalAddressInfo"
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
                            <SecondaryButton label="Cancel"
                            //onClick={props?.onClose} 
                            />
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
BillingAddressForm.displayName = 'BillingAddressForm';
BillingAddressForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
        id: PropTypes.string,
    }),
    isReadOnly: PropTypes.bool.isRequired,
    dataLocale: PropTypes.string.isRequired,
};
export default BillingAddressForm;