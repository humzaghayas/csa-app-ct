import TextInput from '@commercetools-uikit/text-input';
import omitEmpty from 'omit-empty-es';

const validate = (formikValues) => {
  const errors = {
    email: {},
    password: {},
    confirmedPassword: {},
    customerGroup: {},
    roles: {},
  };
   return omitEmpty(errors);
};

export default validate;
