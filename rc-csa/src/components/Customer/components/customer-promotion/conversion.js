const CART_DISCOUNT  = "cart-discount";
export const objectToOptions = (promotions,rows) =>(
    promotions?.map(promotion=>{
        return {
            value:promotion?.id,
            label:promotion?.name,
            isDisabled:rows?.filter(e=>e.id==promotion.id)[0]?.id ? true : false
        }
    })
)

export const promotionUpdateActions = (promotions,rows)=>{
    const updatedListOfPromoltions = promotions?.map(promotion=>{
        return {
            typeId:CART_DISCOUNT,
            id:promotion?.value
        }
    });
    rows?.forEach(element => {
        updatedListOfPromoltions.push({
            typeId:CART_DISCOUNT,
            id:element?.id
        })
    });

    return updatedListOfPromoltions;
}