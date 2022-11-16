import TextInput from '@commercetools-uikit/text-input';
import omitEmpty from 'omit-empty-es';

const validate = (formikValues) => {
  const errors = {
    category: {},
    contactType: {},
    priority: {},
    message: {},
    subject: {},
  };

  const EMAIL_REGEX = /^[\wäöüÄÖÜß._%+-]+@[\wäöüÄÖÜß.-]+\.[A-Z]{2,}$/i;

  if (TextInput.isEmpty(formikValues.category)) errors.category.missing = true;
  if (TextInput.isEmpty(formikValues.contactType)) errors.contactType.missing = true;
  if (TextInput.isEmpty(formikValues.priority)) errors.priority.missing = true;
  if (TextInput.isEmpty(formikValues.message)) errors.message.missing = true;
  if (TextInput.isEmpty(formikValues.subject)) errors.subject.missing = true;

  return omitEmpty(errors);
};

export default validate;
