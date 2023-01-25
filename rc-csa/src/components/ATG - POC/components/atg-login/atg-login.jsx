import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PERMISSIONS } from '../../../../constants';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { docToFormValues } from './conversions';
import AtgLoginForm from './atg-login.form';

const AtgLogin = (props) => {
  console.log('propsCUst', JSON.stringify(props));
  // const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
  //   dataLocale: context.dataLocale ?? '',
  //   projectLanguages: context.project?.languages ?? [],
  // }));
  // const canManage = useIsAuthorized({
  //   demandedPermissions: [PERMISSIONS.Manage],
  // });
  const handleSubmit = useCallback();

  const intl = useIntl();
  const params = useParams();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();

  return (
    <AtgLoginForm
      // initialValues={docToFormValues(
      //   customer,
      //   customeCustomerFields,
      //   projectLanguages
      // )}
      onSubmit={handleSubmit}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
    >
      {(formProps) => {
        return <React.Fragment>{formProps.formElements}</React.Fragment>;
      }}
    </AtgLoginForm>
  );
};
AtgLogin.displayName = 'AtgLogin';
AtgLogin.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default AtgLogin;
