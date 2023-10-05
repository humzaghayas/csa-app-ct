const {getApiRoot, projectKey } = require('../../config/commercetools-client');
const {FETCH_CART_BY_CARTNUMBER,FETCH_CUSTOMERS_DETAILS, REPLICATE_ORDER, UPDATE_CART_BY_ID} =require ('ct-tickets-helper-api');
const {graphQLService} =require('ct-external-connections');

module.exports = ()=>{

    const cartService = {};

    cartService.getCartById = async(cartId,isQuoteRequest,projectKey)=>{

        try {
            // const apiRoot =  getApiRoot();

            // const result = await apiRoot.withProjectKey({projectKey}).graphql()
            //     .post({
            //         body : {
            //             query: FETCH_CART_BY_CARTNUMBER,
            //             variables: {
            //                 id: cartId,
            //             },
            //         }
            //     })
            //     .execute();

            const result = await graphQLService.execute(FETCH_CART_BY_CARTNUMBER, {id: cartId},projectKey);
            
            console.log('cart',result);

            if(isQuoteRequest){
                return {payment:true,data:result};
            }

            const cart = result?.cart;

            const paymentInfo = cart?.paymentInfo;

            console.log('cart?.paymentInfo',JSON.stringify(cart));

            if(paymentInfo){
                const transactions =[];

                    const trans = paymentInfo?.payments?.map(p =>{
                        return p.transactions.map(t => {
                            if(t.state === "Success"){
                                return t.amount.centAmount;
                            }
                        })[0];
                    })

                    if(trans && trans.length > 0){

                        console.log('trans',trans);
                        const sum = trans.reduce((a, b) => a + b,0);

                        console.log('sum : ',sum);
                        console.log('cart?.taxedPrice?.totalGross?.centAmount : ',cart?.taxedPrice?.totalGross?.centAmount);

                        if(sum >= cart?.taxedPrice?.totalGross?.centAmount){
                            return {payment:true,data:result}
                        }else{
                            return {payment:false,message_code:"PAYMENT_INCOMPLETE"}
                        }
                    }
            }
            
            return {payment:false,message_code:"ERROR"}
        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error fetching Tickets!"}
        }
    };


    cartService.getCustomerByCartId = async(cartId,projectKey)=>{

        try {
            const apiRoot =  getApiRoot();

            // const result = await apiRoot.withProjectKey({projectKey}).graphql()
            //     .post({
            //         body : {
            //             query: FETCH_CART_BY_CARTNUMBER,
            //             variables: {
            //                 id: cartId,
            //             },
            //         }
            //     })
            //     .execute();
            const result = await graphQLService.execute(FETCH_CART_BY_CARTNUMBER, {id: cartId},projectKey);
            
            console.log('cart',result);

           const cart = result?.cart;

            if(cart?.customerId){
                // const resultCust = await apiRoot.withProjectKey({projectKey}).graphql()
                //     .post({
                //         body : {
                //             query: FETCH_CUSTOMERS_DETAILS,
                //             variables: {
                //                 id: cart.customerId,
                //             },
                //         }
                //     })
                //     .execute();
                const resultCust = await graphQLService.execute(FETCH_CUSTOMERS_DETAILS, {id: cart.customerId},projectKey);

                return resultCust?.customer;
            }
            return null
        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error fetching Tickets!"}
        }
    };

    cartService.replicateCart = async (cartId,projectKey) =>{
        try {

            const variables  = {
                referenceInput: {
                    typeId: "cart", "id": cartId
                }
            }

            const result = await graphQLService.execute(REPLICATE_ORDER, variables,projectKey);
            
            console.log('cart',result);

            return result;

        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:`Error while creatiing duplicate order for cart: ${cartId}`}
        }
    }

    // cartService.updateCart = async (cartId,updateActions,projectKey) =>{
    //     try {
    //         const cart = cartService.getCartById(cartId,false,projectKey)
    //         const result = await graphQLService.execute(UPDATE_CART_BY_ID, {version:cart?.version,id:cartId},projectKey);
            
    //         console.log('cart',result);

    //         return result;

    //     }catch(error){
    //         console.log(`Error: ${error}`);
    //         return {error:true,message:`Error while creatiing duplicate order for cart: ${cartId}`}
    //     }
    // }


    return cartService;

}