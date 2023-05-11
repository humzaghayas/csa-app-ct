import { defineMessages } from 'react-intl';

export default defineMessages({
  modalTitle: {
    id: 'EmployeeDetails.modalTitle',
    defaultMessage: 'Order Confimation',
  },
  subTitle: {
    id: 'EmployeeDetails.subTitle',
    defaultMessage: 'Click confirm to place the order. ',
  },
  modalTitleQuote: {
    id: 'EmployeeDetails.modalTitle',
    defaultMessage: 'Quote Request Confimation',
  },
  subTitleQuote: {
    id: 'EmployeeDetails.subTitle',
    defaultMessage: 'Click confirm create Quote request. ',
  },
  panelTitle: {
    id: 'EmployeeDetails.panelTitle',
    defaultMessage:
      'Custom fields allow you to extend the information provided for Address. Load your preferred custom fields by selecting an option above.',
  },
  OrderPlaced: {
    id: 'AddressAddDetails.AddressCreated',
    defaultMessage: ' Order Placed',
  },
  EmployeeDetailsErrorMessage: {
    id: 'EmployeeDetails.errorMessage',
    defaultMessage:
      'We were unable to fetch the Employee details. Please check your connection, the provided Employee ID and try again.',
  },
  PaymentLinkSent:{
    id: 'Order.PaymentLinkSent',
    defaultMessage:
      'Payment notificatoipn Sent to the user\'s registred email address',
  },
  PaymentLinkMessage:{
    id: 'Order.PaymentLinkMessage',
    defaultMessage:
      'Please use this button to Send Payment Notification to the User\'s registered email address.',
  },
});
