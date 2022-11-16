import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (ticket, languages) => ({
  id: ticket?.id ?? '',
  category: ticket?.category ?? '',
  contactType: ticket?.contactType ?? '',
  priority: ticket?.priority ?? '',
  message: ticket?.message ?? '',
  subject: ticket?.subject ?? ''
});

export const formValuesToDoc = (formValues) => ({
  category: !TextInput.isEmpty(formValues.category)
  ? formValues.category
  : undefined,
  contactType: !TextInput.isEmpty(formValues.contactType)
  ? formValues.contactType
  : undefined,
  priority: !TextInput.isEmpty(formValues.priority)
  ? formValues.priority
  : undefined,
  message: !TextInput.isEmpty(formValues.message)
  ? formValues.message
  : undefined,
  subject: !TextInput.isEmpty(formValues.subject)
  ? formValues.subject
  : undefined
  });