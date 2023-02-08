
export function getSearchItemsRows(hit){
    //console.log(orderPaginationResult.results);
    if(hit){
        // return hit.map(item =>{
            return {
                title: hit.title,
                // shortDescription:hit.shortDescription
            }
        // });
    }
}

