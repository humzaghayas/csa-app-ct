import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (Ticket, languages) => ({
  name: Ticket?.name ?? '',
  predicate:Ticket?.predicate ?? '',
  
});


export const formValuesToDoc = (formValues) => ({
  name: !TextInput.isEmpty(formValues.name)
  ? formValues.name
  : undefined,
  predicate: !TextInput.isEmpty(formValues.predicate)
  ? formValues.predicate
  : undefined,
  
  });