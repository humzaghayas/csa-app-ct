import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { useParams, useRouteMatch } from 'react-router-dom';
import {
    PageNotFound,
    FormModalPage,
} from '@commercetools-frontend/application-components';
import React, { useCallback, useReducer } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
    useShowNotification,
    useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../../../constants';
import { docToFormValues, formValuesToDoc, addressInfo } from './conversions';
import ShippingAddressForm from './shipping-address-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
//import validate from './validate';
import {
    useCartsFetcher,
    useShippingAddressCreator,
    useAddLineItem,
    useFetchCartById,
    useCartUpdateById,
    useFetchAddressByCartId,
} from '../../../../hooks/use-cart-connector/use-cart-connector';
import { useCustomerAddressesFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
import AddressDetailsForm from './address-details-form';

const AddressDetails = (props) => {
    const intl = useIntl();
    const params = useParams();
    const match = useRouteMatch();
    const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
        dataLocale: context.dataLocale ?? '',
        projectLanguages: context.project?.languages ?? [],
    }));
    const canManage = useIsAuthorized({
        demandedPermissions: [PERMISSIONS.Manage],
    });

    const isQuoteRequest = props?.isQuoteRequest;

    //const {executeFetchOrder} = useFetchOrderById(match.params.id);
    const { executeUpdateCart } = useCartUpdateById();
    const showNotification = useShowNotification();
    const showApiErrorNotification = useShowApiErrorNotification();

    // const [order,setOrder] = useState(async()=>{
    //   return await executeFetchOrder(match.params.id);
    // });

    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);


    let { cart } = useFetchCartById(match.params.id);


    const handleSubmit = useCallback(async (e) => {
        console.log('In Handle Submit');
        const actions = e.actions;
        if (actions.length != 0) {
            try {
                const draft = {
                    cartId: cart.id,
                    version: cart.version,

                    actions,
                };
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
                console.log(graphQLErrors.message);
                const transformedErrors = transformErrors(graphQLErrors);
                if (transformedErrors.unmappedErrors.length > 0) {
                    showApiErrorNotification({
                        errors: transformedErrors.unmappedErrors,
                    });
                }
            }
        }
        push(`${match.url}`);
    }, [executeUpdateCart]);
    const handleChange = useCallback(async (e) => {
    });
    //console.log("Cart in shipping address", cart)

    const { customer } = useCustomerAddressesFetcher(cart?.customerId);


    return (
        <AddressDetailsForm
            initialValues={addressInfo(cart, projectLanguages)}
            addresses={customer?.addresses}
            onSubmit={handleSubmit}
            onChange={handleChange}
            isReadOnly={!canManage}
            dataLocale={dataLocale}
            onClose={props?.onClose}
            cartId={cart?.id}
            cartVersion={cart?.version}
            isQuoteRequest={isQuoteRequest}
        >
            {(formProps) => {
                return (
                    <React.Fragment>{formProps.formElements}</React.Fragment>
                );
            }}
        </AddressDetailsForm>
    );
};
AddressDetails.displayName = 'AddressDetails';
AddressDetails.propTypes = {
    linkToWelcome: PropTypes.string.isRequired,
};
export default AddressDetails;
