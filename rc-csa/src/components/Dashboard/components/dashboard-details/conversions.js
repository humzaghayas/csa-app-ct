import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';
import { CART_STATE } from './constants';

export const docToFormValues = (employee, languages) => ({
  id: employee?.id ?? '',
  salutation: employee?.salutation ?? '',
  optionSelect: employee?.optionSelect ?? '',
  title: employee?.title ?? '',
  firstName: employee?.firstName ?? '',
  middleName: employee?.middleName ?? '',
  lastName: employee?.lastName ?? '',
  email: employee?.email ?? '',
  dateOfBirth: employee?.dateOfBirth ?? '',
  employeeNumber: employee?.employeeNumber ?? '',
  externalId: employee?.externalId ?? '',
  customerGroup: employee?.customerGroup ?? '',
  roles: employee?.roles ?? '',
  password: employee?.password ?? '',
  confirmedPassword: employee?.confirmedPassword ?? '',
});

export function getOrderData(orderPaginationResult) {
  console.log(orderPaginationResult.results);
  if (orderPaginationResult?.results) {
    return orderPaginationResult?.results.map((order) => {
      return {
        id: order?.id,
        orderNumber: order?.orderNumber,
        customer: fullName(
          order?.customer?.firstName,
          order?.customer?.lastName
        ),
        createdAt: order?.createdAt,
        lastModifiedAt: order?.lastModifiedAt,
        orderState: order?.orderState,
        shipmentStatus: order?.shipmentState,
        paymentStatus: order?.paymentState,
        shippingMethodName: order?.shippingInfo?.shippingMethodName,
        totalPrice: amountCalculator(
          order?.totalPrice?.centAmount,
          order?.totalPrice?.fractionDigits
        ),
        noOforderItems: order?.lineItems?.length,
        totalItems: order?.lineItems
          .map((item) => item.quantity)
          .reduce((a, b) => a + b, 0),
      };
    });
  }
}

export const formValuesToDoc = (formValues) => ({
  rating: !TextInput.isEmpty(formValues.rating) ? formValues.rating : '--',
  feedbackDes: !TextInput.isEmpty(formValues.feedbackDes)
    ? formValues.feedbackDes
    : '--',
  // firstName: !TextInput.isEmpty(formValues.firstName)
  //   ? formValues.firstName
  //   : '--',
  // cartState: !TextInput.isEmpty(formValues.country) ? formValues.country : '--',
});
