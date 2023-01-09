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

  const EMAIL_REGEX = /^[\wäöüÄÖÜß._%+-]+@[\wäöüÄÖÜß.-]+\.[A-Z]{2,}$/i;

  if (TextInput.isEmpty(formikValues.email)) errors.email.missing = true;
  if (!EMAIL_REGEX.test(formikValues.email)) errors.email.format = true;

  if (TextInput.isEmpty(formikValues.password)) errors.password.missing = true;
  if (
    !TextInput.isEmpty(formikValues.confirmedPassword) &&
    formikValues.password !== formikValues.confirmedPassword
  )
    errors.password.notMatch = true;

  if (TextInput.isEmpty(formikValues.confirmedPassword))
    errors.confirmedPassword.missing = true;
  if (
    !TextInput.isEmpty(formikValues.confirmedPassword) &&
    formikValues.confirmedPassword !== formikValues.password
  )
    errors.confirmedPassword.notMatch = true;

  if (TextInput.isEmpty(formikValues.customerGroup)) errors.customerGroup.missing = true;
  if (!formikValues.roles || formikValues.roles.length === 0)
    errors.roles.missing = true;

  // if (TextInput.isEmpty(formikValues.key)) {
  //   errors.key.missing = true;
  // }
  // if (Array.isArray(formikValues.roles) && formikValues.roles.length === 0) {
  //   errors.roles.missing = true;
  // }
  return omitEmpty(errors);
};

export default validate;
