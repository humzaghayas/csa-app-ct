import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { TextInput } from '@commercetools-frontend/ui-kit';
// import { CART_STATE } from './constants';

export const docToFormValues = (employee, languages) => ({
  id: employee?.id ?? '',
  rating: employee?.rating ?? '',
  feedbackDes: employee?.feedbackDes ?? '',
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
  rating: formValues.rating ? formValues.rating : '--',
  feedbackDes: formValues.feedbackDes ? formValues.feedbackDes : '--',
  // firstName: !TextInput.isEmpty(formValues.firstName)
  //   ? formValues.firstName
  //   : '--',
  // cartState: !TextInput.isEmpty(formValues.country) ? formValues.country : '--',
});
