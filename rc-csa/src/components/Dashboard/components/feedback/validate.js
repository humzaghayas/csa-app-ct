import TextInput from '@commercetools-uikit/text-input';
import omitEmpty from 'omit-empty-es';

const validate = (formikValues) => {
  const errors = {
    rating: {},
    // assignedTo:{}
  };

  // const EMAIL_REGEX = /^[\wäöüÄÖÜß._%+-]+@[\wäöüÄÖÜß.-]+\.[A-Z]{2,}$/i;

  if (TextInput.isEmpty(formikValues.rating)) errors.subject.rating = true;

  return omitEmpty(errors);
};

export default validate;
