

export function getLineItemsRows(LineItemsResult,searchValue){
    console.log(LineItemsResult);
    if(LineItemsResult){
        return LineItemsResult.filter(lineItem => lineItem.id.includes(searchValue)).map(lineItem=>{
            return {
                id:lineItem?.id, 
                itemName:lineItem?.itemName,
                unitPrice:lineItem?.unitPrice
            }
        });
    }
}

