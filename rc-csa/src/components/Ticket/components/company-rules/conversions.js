import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (Ticket, languages) => ({
  id: Ticket?.id ?? '',
 TicketName: Ticket?.TicketName ?? '',
  
});

/*export const formValuesToDoc = (formValues) => ({
  TicketName: formValues.TicketName,
  title: formValues.title,
  firstName: formValues.firstName,
  middleName: formValues.middleName,
  lastName: formValues.lastName,
  email: formValues.email,
  dateOfBirth: formValues.dateOfBirth,
  TicketNumber: formValues.TicketNumber,
  externalId: formValues.externalId,
  customerGroup:{key:formValues.customerGroup} ,
  roles: formValues.roles,
  password: formValues.password,
});*/
export const formValuesToDoc = (formValues) => ({
  TicketName: !TextInput.isEmpty(formValues.TicketName)
  ? formValues.TicketName
  : undefined,
 
  });