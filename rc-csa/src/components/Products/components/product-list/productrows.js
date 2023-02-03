

export function getProductItemsRows(ProductItemsResult,searchValue){
    console.log(ProductItemsResult);
    if(ProductItemsResult){
        return ProductItemsResult.filter(item => item.id.toLowerCase().includes(searchValue) ||
                                         item.productType.toLowerCase().includes(searchValue) || 
                                         item.itemName.toLowerCase().includes(searchValue)).map(item=>{
            return {
                id:item?.id, 
                itemName:item?.itemName,
                unitPrice:item?.unitPrice,
                productType : item?.productType,
                status: item?.status,
         created: item?.created,
         modified : item?.modified
            }
        });
    }
}

