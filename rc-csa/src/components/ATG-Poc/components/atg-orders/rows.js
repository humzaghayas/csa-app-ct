import MoneyField from '@commercetools-uikit/money-field';

export function getCategoriesRows(data) {
  console.log(data);
  if (data) {
    return data?.rootCategories.map((order) => {
      return {
        id: order?.id,
        displayName: order?.displayName,
        totalItems: order?.lineItems
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
