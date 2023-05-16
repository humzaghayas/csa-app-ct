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
import { CollapsiblePanel, Constraints, CreatableSelectField, DataTable, FlatButton, IconButton, PlusBoldIcon, PlusThinIcon, PrimaryButton, SearchSelectField, SearchSelectInput, SecondaryButton, SecondaryIconButton, TextField, ToggleInput } from '@commercetools-frontend/ui-kit';
import { useFormik } from 'formik';
import { useFetchCartDiscountCodes } from '../../../../hooks/use-cart-connector/use-cart-connector';
import { cartDiscountCodeOptions } from './conversions';

const columns = [
    { key: 'name', label: 'Discount Name' },
    { key: 'value', label: 'Amount' },
    { key: 'code', label: 'Discount Codes' },

]

const rows = [

]
const CartDiscounts = (props) => {
    const intl = useIntl();
    const match = useRouteMatch();
    const { push } = useHistory();
    const isMulti = true;
    const { discountCodes, error, loading } = useFetchCartDiscountCodes();
    const options = cartDiscountCodeOptions(discountCodes, props?.discountCodes);

    console.log("Cart Discount Codes", discountCodes);
    console.log("Props ", props);

    const formik = useFormik({
        initialValues: { discount: isMulti ? [] : undefined },
        onSubmit: (value, formik) => {
            console.log("On Submit", value);

            if (value?.discount?.label) {
                const e = {
                    actions: {
                        addDiscountCode: {
                            code: value?.discount?.label

                        }

                    }
                };
                props.onSubmit(e);
                formik.resetForm();
            }
        }
    });

    return (
        <Spacings.Stack scale='xl'>

            <CollapsiblePanel
                data-testid="quote-summary-panel"
                header={
                    <CollapsiblePanel.Header>
                        {/* {formatMessage(messages.panelTitle)} */}
                        {'Applied Cart discounts'}
                    </CollapsiblePanel.Header>
                }
                scale="l"
            >
                {props?.discountCodes?.length > 0 ?
                    <Constraints.Horizontal >
                        <Spacings.Stack scale="m">
                            <Spacings.Stack scale="s">
                                <DataTable
                                    rows={props?.discountCodes}
                                    columns={columns}
                                />
                            </Spacings.Stack>
                        </Spacings.Stack>
                    </Constraints.Horizontal>
                    : null}
                <div>
                    <hr
                    />
                </div>
                <Constraints.Horizontal >
                    <Spacings.Stack scale="xl">
                        <Spacings.Stack scale='l'>
                            <Spacings.Inline>
                                <CreatableSelectField
                                    horizontalConstraint={13}
                                    errors={formik.errors.discount}
                                    isRequired={true}
                                    touched={formik.touched.discount}
                                    name="discount"
                                    value={formik.values.discount}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isDisabled={formik.isSubmitting}
                                    isMulti={false}
                                    hasWarning={false}
                                    options={options}
                                    title="Add discount code"
                                    //description="Add discount to carts"
                                    isClearable={true}
                                />


                                {/* <SecondaryButton
                                    //onClick={formik.handleSubmit}
                                    //isDisabled={formik.isSubmitting || !formik.dirty}
                                    label="Apply"
                                    icon={<PlusBoldIcon />}
                                    size='medium'
                                /> */}
                            </Spacings.Inline>

                            <Spacings.Inline>
                                <SecondaryButton
                                    onClick={formik.handleReset}
                                    isDisabled={formik.isSubmitting}
                                    label="Reset"
                                />
                                <PrimaryButton
                                    onClick={formik.handleSubmit}
                                    isDisabled={formik.isSubmitting || !formik.dirty}
                                    iconLeft={<PlusBoldIcon />}
                                    label="Apply"
                                    size="big"
                                />
                            </Spacings.Inline>
                        </Spacings.Stack>
                    </Spacings.Stack>


                </Constraints.Horizontal>
            </CollapsiblePanel>


        </Spacings.Stack>
    );
};
CartDiscounts.displayName = 'CartDiscounts';
CartDiscounts.propTypes = {
    linkToWelcome: PropTypes.string.isRequired,
};
export default CartDiscounts;