import MoneyField from '@commercetools-uikit/money-field';

export function getCartRows(cartPaginationResult) {
  console.log(cartPaginationResult.results);
  if (cartPaginationResult?.results) {
    return cartPaginationResult?.results.map((carts) => {
      return {
        id: carts?.id ?? '',
        key: carts?.key ?? '--',
        orderNumber: carts?.custom?.type?.id ?? '--',
        customer: fullName(
          carts?.customer?.firstName ?? '--',
          carts?.customer?.lastName
        ),
        // customer: carts?.customer?.firstName ?? '--',
        //+''+carts?.customer?.lastName?? '',
        createdAt: carts.createdAt,
        lastModifiedAt: carts.lastModifiedAt,
        cartState: carts.cartState,
        totalPrice: amountCalculator(
          carts.totalPrice?.centAmount,
          carts.totalPrice?.fractionDigits
        ),
        noOforderItems: carts.lineItems?.length,
        totalItems: carts.lineItems
          .map((item) => item.quantity)
          .reduce((a, b) => a + b, 0),
      };
    });
  }
}

function amountCalculator(centAmount, fractionDigits) {
  centAmount = centAmount / 100;
  centAmount = '$' + centAmount + '.00';
  return centAmount;
}

function fullName(firstName, lastName) {
  const f1 = firstName ? firstName : '';
  const f2 = lastName ? lastName : '';
  return f1 + ' ' + f2;
}
