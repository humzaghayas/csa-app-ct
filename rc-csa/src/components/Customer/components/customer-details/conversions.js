import { TextInput } from '@commercetools-frontend/ui-kit';

export const docToFormValues = (Ticket, languages) => ({
  id: Ticket?.id ?? '',
  TicketName: Ticket?.TicketName ?? '',
  logo: Ticket?.logo ?? '',
  // channels: Ticket?.channels ?? '',
  addresses: Ticket?.addresses ?? '',
  // budget: Ticket?.budget ?? '',
  // rules: Ticket?.rules ?? '',
});

export const formValuesToDoc = (formValues) => ({
  TicketName: !TextInput.isEmpty(formValues.TicketName)
  ? formValues.TicketName
  : undefined,
  // name: !TextInput.isEmpty(formValues.name)
  // ? formValues.name
  // : undefined,
  logo: !TextInput.isEmpty(formValues.logo)
  ? formValues.logo
  : undefined,
  // channels: !TextInput.isEmpty(formValues.channels)
  // ? formValues.channels
  // : undefined,
  addresses: !TextInput.isEmpty(formValues.addresses)
  ? formValues.addresses
  : undefined,
  // budget: !TextInput.isEmpty(formValues.budget)
  // ? formValues.budget
  // : undefined,
  // rules: !TextInput.isEmpty(formValues.rules)
  // ? formValues.rules
  // : undefined,
  });