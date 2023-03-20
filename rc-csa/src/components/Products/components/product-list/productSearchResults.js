export let FACETS_KEY_VALUE_MAP = [
    {key:"variants.attributes.color.key",label:"Colors" },
    {key:"categories.id",label:"Categories" ,values:[]}
]

export function getProductItemsRows(state,{productProjectionSearch,dataLocale,currencyCode}){
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

export async function getFacetsResults(facetsResults,facetsCheckboxes){
    if(facetsResults){
        let cBoxes = facetsCheckboxes;

        console.log('facetsResults',facetsResults);

        for (const f of facetsResults){
            const facetValue = f.facet;
            const terms = f.value.terms; 
            let cb;

            const fac = FACETS_KEY_VALUE_MAP.find(f => f.key == facetValue);
            if( !facetsCheckboxes[fac.label] ){

                if(fac.values){
                    
                    cb =terms.map(t =>  {
                        const val = fac.values.find(f => f.id === t.term);
                        return {label:val.name,value:t.term,checked:false}
                    });
                }else{
                    cb = terms.map(t => {return {label:t.term,value:t.term,checked:false};});
                }
            }else{
              cb = facetsCheckboxes[fac.label].terms;
              cb = terms.map(t => {
                        const cbFindChecked = cb.filter(c => c.checked);
                        if(cbFindChecked.some(c => t.term === c.value)){
                            if(fac.values){
                                const val = fac.values.find(f => f.id === t.term);
                                return {label:val.name,value:t.term,checked:true};
                            }
                            return {label:t.term,value:t.term,checked:true};
                        }

                        if(fac.values){
                            const val = fac.values.find(f => f.id === t.term);
                            return {label:val.name,value:t.term,checked:false};
                        }
                        return {label:t.term,value:t.term,checked:false};
                
                });
              }
              cBoxes[fac.label] ={key:facetValue,terms:cb};
        }
        return cBoxes;
    }
}


export const applyFacetFilter = (facetsCheckboxes,facetTerm) => {
    // let c = facetsCheckboxes[k].terms.find(f => f.value === t.value);

    // c.checked = !c.checked;
    // setFacetsCheckboxes(
    //     {
    //     ...facetsCheckboxes,
    //     }
    // );
    
    let queryFilters = [];
    for(const chkBoxKey of Object.keys(facetsCheckboxes)){

        const chkBox = facetsCheckboxes[chkBoxKey];
        let c = chkBox.terms.find(f => f.value === facetTerm.value);

        if(c){
            c.checked = !c.checked;
        }
        var queryFilter={};
        queryFilter.values=chkBox.terms.filter(t => t.checked)
        .map(t1 =>`\"${t1.value}\"`).join(",");
        queryFilter.key = chkBox.key;

        if(queryFilter.values.length > 0){
            queryFilters.push(queryFilter);
        }
    
    }
    
    
    console.log('queryFilter',queryFilters);
                                            // search(searchInputValue,queryFilter);

    return {fCheckboxes :facetsCheckboxes,queryFilters};
}