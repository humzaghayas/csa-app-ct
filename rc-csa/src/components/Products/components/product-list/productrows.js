

export function getProductItemsRows(state,{productProjectionSearch,dataLocale,currencyCode}){
    console.log('productProjectionSearch',productProjectionSearch);
    if(productProjectionSearch?.results){
        let returnValue =  productProjectionSearch?.results.map(item=>{

            let price = item?.masterVariant?.price?.value?.centAmount;
            if(price == null){
                price = 0;
            }
            price = new Intl.NumberFormat(dataLocale, { style: 'currency', currency: currencyCode }).format(
                (price / 100).toFixed(item?.masterVariant?.price?.value?.fractionDigits)
            );
            return {
                id:item?.id, 
                itemName:item?.name,
                unitPrice: price,
                productType : item?.productType?.name,
                status: 'published',
                created: item?.createdAt,
                modified : item?.lastModifiedAt
            }
        });

        returnValue.total = productProjectionSearch.total;

        return returnValue;
    }
}

export function getFacetsResults(state,{facetsFromSearch}){
    if(facetsFromSearch){

        let facetsArray = [];
        for (const f of facetsFromSearch){
            let facetValue={};
            switch (f.facet) {
                case 'variants.attributes.color.key':
                    facetValue.label = "Color"
                    break;
            
                default:
                    break;
            }

            facetValue.terms = f.terms;

            facetsArray.push(facetValue);
        }

        return facetsArray;
    }
}

