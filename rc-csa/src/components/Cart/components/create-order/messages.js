import { defineMessages } from 'react-intl';

export default defineMessages({
  modalTitle: {
    id: 'EmployeeDetails.modalTitle',
    defaultMessage: 'Shipping and Billing address',
  },
  subTitle: {
    id: 'EmployeeDetails.subTitle',
    defaultMessage:
      'Add shipping address details. Mandatory fields are marked with an asterisk (*).',
  },
  panelTitle: {
    id: 'EmployeeDetails.panelTitle',
    defaultMessage:
      'Custom fields allow you to extend the information provided for Address. Load your preferred custom fields by selecting an option above.',
  },
  CartUpdated: {
    id: 'AddressAddDetails.AddressCreated',
    defaultMessage: ' Cart Updated ',
  },
  EmployeeDetailsErrorMessage: {
    id: 'EmployeeDetails.errorMessage',
    defaultMessage:
      'We were unable to fetch the Employee details. Please check your connection, the provided Employee ID and try again.',
  },
});
