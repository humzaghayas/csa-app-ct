import TextInput from '@commercetools-uikit/text-input';
import omitEmpty from 'omit-empty-es';

const validate = (formikValues) => {
  const errors = {
    email: {},
    customerGroup: {},
    roles: {},
  };

  const EMAIL_REGEX = /^[\wäöüÄÖÜß._%+-]+@[\wäöüÄÖÜß.-]+\.[A-Z]{2,}$/i;

  if (TextInput.isEmpty(formikValues.email)) errors.email.missing = true;
  if (!EMAIL_REGEX.test(formikValues.email)) errors.email.format = true;

  if (TextInput.isEmpty(formikValues.customerGroup)) errors.customerGroup.missing = true;
  if (!formikValues.roles || formikValues.roles.length === 0)
    errors.roles.missing = true;

  return omitEmpty(errors);
};

export default validate;
