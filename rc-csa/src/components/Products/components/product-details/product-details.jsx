import { useIntl } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useReducer, useState } from 'react';
import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../../../constants';
import {
  useFetchProductById,
} from '../../../../hooks/use-product-search-connector/use-product-search-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import ProductDetailsForm from './product-details-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { useRouteMatch } from 'react-router-dom';
import {
  
} from '../../../../hooks/use-cart-connector/use-cart-connector';
import Spacings from '@commercetools-uikit/spacings';
import { PlusBoldIcon, SecondaryButton } from '@commercetools-frontend/ui-kit';



const ProductDetails = (props) => {
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
  //const{id, setId} = useState(null);
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();

  const handleSubmit = useCallback(
    // async (formikValues, formikHelpers) => {
    //   const data = formValuesToDoc(formikValues);
    // setId(product)
    // }
  );

  const handleChange = useCallback(async (e) => {
   
  });

  
  const { product, error, loading } = useFetchProductById(match.params.id);
  console.log(product);

  return (
    <ProductDetailsForm
      initialValues={docToFormValues(product,
        projectLanguages )}
      onSubmit={handleSubmit}
      onChange={handleChange}
      //id={id}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
    >
      {(formProps) => {
        return <React.Fragment>{formProps.formElements}</React.Fragment>;
      }}
    </ProductDetailsForm>
  );
};
ProductDetails.displayName = 'ProductDetails';
ProductDetails.propTypes = {};
export default ProductDetails;
