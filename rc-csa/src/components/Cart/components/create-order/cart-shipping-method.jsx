import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import { EMPLOYEE_ROLES, CUSTOMER_GROUPS, TICKET_PRIORITY } from './constants';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import { formValuesToDoc, getShippingMethods } from './conversions';
import { useShowApiErrorNotification, useShowNotification } from '@commercetools-frontend/actions-global';
import { useCartUpdateById, useFetchCartById, useFetchCartShippingMethods } from '../../../../hooks/use-cart-connector/use-cart-connector';
import { transformErrors } from './transform-errors';
import { AsyncSelectField } from '@commercetools-frontend/ui-kit';
import { useParams, useRouteMatch } from 'react-router-dom';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';

const CartShippingMethods = (props) => {
    const intl = useIntl();
    const params = useParams();
    const match = useRouteMatch();
    const { shippingMethods, error, loading } = useFetchCartShippingMethods();
    const options = getShippingMethods(shippingMethods, props?.shippingMethods);
    const { executeUpdateCart } = useCartUpdateById();

    const showNotification = useShowNotification();
    const showApiErrorNotification = useShowApiErrorNotification();
    let { cart } = useFetchCartById(match.params.id);
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    const formik = useFormik({
        initialValues: { shippingMethod: props.initialValues?.shippingMethod },
        enableReinitialize: true,
        onSubmit: async (value, formik) => {
            console.log("On Submit", value);
            console.log(value?.shippingMethod?.label && props?.initialValues?.id);
            if (value?.shippingMethod?.label && props?.initialValues?.id) {
                const actions = {
                    setShippingMethod: {
                        shippingMethod: {
                            id: value?.shippingMethod?.value
                        }
                    }
                }
                try {
                    const draft = {
                        resource: {
                            id: props?.initialValues?.id,
                            typeId: "cart",

                        },
                        cartId: cart.id,
                        version: cart.version,
                        actions,
                        comment: "No Comment"
                    }
                    console.log(draft);
                    const result = await executeUpdateCart(draft);

                    console.log(result);

                    forceUpdate();
                    showNotification({
                        kind: 'success',
                        domain: DOMAINS.SIDE,
                        text: intl.formatMessage(messages.CartUpdated),
                    });
                    window.location.reload(true)

                } catch (graphQLErrors) {
                    const transformedErrors = transformErrors(graphQLErrors);
                    if (transformedErrors.unmappedErrors.length > 0) {
                        showApiErrorNotification({
                            errors: transformedErrors.unmappedErrors,
                        });
                    }
                }
            }
        }
    });

    return (
        <Spacings.Stack scale='xl'>
            <CollapsiblePanel
                data-testid="address-summary-panel"
                header={
                    <CollapsiblePanel.Header>
                        {'Shipping Method'}
                    </CollapsiblePanel.Header>
                }
                scale="l"
            >
                <Constraints.Horizontal min={13}>
                    <Spacings.Stack scale='l'>
                        <AsyncSelectField
                            name="shippingMethod"
                            title="Shipping method"
                            value={formik.values.shippingMethod}
                            errors={formik.errors.shippingMethod}
                            touched={formik.touched.shippingMethod}
                            onChange={formik.handleChange}
                            isRequired={true}
                            isDisabled={formik.isSubmitting}
                            defaultOptions={options}
                            onBlur={formik.handleBlur}
                            horizontalConstraint={13}
                            isClearable={true}
                            isMulti={false}
                            hasWarning={false}
                        />
                        <Spacings.Inline>
                            <SecondaryButton
                                onClick={formik.handleReset}
                                isDisabled={formik.isSubmitting}
                                label="Reset"
                            />
                            <PrimaryButton
                                onClick={formik.handleSubmit}
                                isDisabled={formik.isSubmitting || !formik.dirty}
                                label="Submit"
                            />
                        </Spacings.Inline>
                    </Spacings.Stack>
                </Constraints.Horizontal>
            </CollapsiblePanel>
        </Spacings.Stack>
    );



}
CartShippingMethods.displayName = 'CartShippingMethods';
CartShippingMethods.prototype = {
    initialValues: PropTypes.object.isRequired
}

export default CartShippingMethods;