export function getProductItemsRows(ProductListItems, searchValue) {
  console.log(ProductListItems);
  if (ProductListItems) {
    return ProductListItems.filter(
      (item) =>
        item?.key.toLowerCase().includes(searchValue) ||
        item?.masterData?.current?.masterVariant?.sku.toLowerCase().includes(searchValue) ||
        item?.productType?.name.toLowerCase().includes(searchValue) ||
        item?.masterData?.current?.name.toLowerCase().includes(searchValue)
    ).map((item) => {
      return {
        id: item?.id,
        key: item?.key,
        //key: item?.masterData?.current?.masterVariant?.key,
        itemName: item?.masterData?.current?.name,
        sku:item?.masterData?.current?.masterVariant?.sku,
        //masterData:getData(item?.masterData),
        //unitPrice: getPrices(item?.masterData?.current?.masterVariant?.prices),
        unitPrice: amountCalculator(
          item?.masterData?.current?.masterVariant?.prices[0]?.value?.centAmount,
          item?.masterData?.current?.masterVariant?.prices[0]?.value?.fractionDigits
        ),
        productType: item?.productType?.name,
        //status:"Published",
        status: item?.masterData?.published??'--',
        created: item?.createdAt,
        modified: item?.lastModifiedAt,
      };
    });
  }
}

// export function getData(masterData){
//   if(masterData) {
//     return masterData.map((dataa) => {
//       return{
//         prices: getPrices(dataa?.current?.masterVariant?.prices)
//       }
//     })
//   }
// }

export function getPrices(prices) {
  if (prices) {
    return prices.map((price) => {
      return {
        id: price?.id,
        currencyCode: price?.value?.currencyCode,
        unitPrice: amountCalculator(
          price?.value?.centAmount,
          price?.value?.fractionDigits
        ),
      };
    });
  }
}

function amountCalculator(centAmount, fractionDigits) {
  centAmount = centAmount / 100;
  centAmount = '$' + centAmount + '.00';
  return centAmount;
}
