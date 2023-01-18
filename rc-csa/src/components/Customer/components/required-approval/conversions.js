import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (Ticket, languages) => ({
  roles: Ticket?.roles ?? '',
  amount:Ticket?.amount ?? '',
  
});


export const formValuesToDoc = (formValues) => ({
  roles: formValues.roles,
  amount: !TextInput.isEmpty(formValues.amount)
  ? formValues.amount
  : undefined,
  
  });