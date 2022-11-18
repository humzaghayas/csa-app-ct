import { TextInput } from '@commercetools-frontend/ui-kit';
import {escapeQuotes} from 'ct-tickets-helper-api'
export const docToFormValues = (ticket, languages) => ({
  id: ticket?.id ?? '',
  key: ticket?.key ?? '',
  email : ticket?.email ?? '',
  customerId : ticket?.customerId ?? '',
  container: ticket?.container ?? '',
  version: ticket?.version ?? '',
  category: ticket?.category ?? '',
  contactType: ticket?.contactType ?? '',
  priority: ticket?.priority ?? '',
  message: ticket?.message ?? '',
  subject: ticket?.subject ?? '',
  firstName : ticket?.firstName ?? '',
  lastName : ticket?.lastName ?? ''
});

export const formValuesToDoc = (formValues) => ({
  id:formValues?.id ?? undefined,
  key:formValues?.key ?? undefined,
  customerId:formValues?.customerId ?? undefined,
  email: !TextInput.isEmpty(formValues.email)
  ? formValues.email
  : undefined,
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
  ? escapeQuotes(formValues.message)
  : undefined,
  subject: !TextInput.isEmpty(formValues.subject)
  ? escapeQuotes(formValues.subject)
  : undefined
  });

  export const formValuesToDocRequest = (formValues) => ({
    id:formValues?.id ?? undefined,
    key:formValues?.key ?? undefined,
    customerId:formValues?.customerId ?? undefined,
    email: !TextInput.isEmpty(formValues.email)
    ? formValues.email
    : undefined,
    category: !TextInput.isEmpty(formValues.category)
    ? formValues.category
    : undefined,
    contactType: !TextInput.isEmpty(formValues.contactType)
    ? formValues.contactType
    : undefined,
    priority: !TextInput.isEmpty(formValues.priority)
    ? formValues.priority
    : undefined,
    firstName: !TextInput.isEmpty(formValues.firstName)
    ? escapeQuotes(formValues.firstName)
    : undefined,
    lastName: !TextInput.isEmpty(formValues.lastName)
    ? escapeQuotes(formValues.lastName)
    : undefined,
    subject: !TextInput.isEmpty(formValues.subject)
    ? formValues.subject
    : undefined
    });