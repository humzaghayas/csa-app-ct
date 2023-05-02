const {getApiRoot,projectKey } = require('../../config/commercetools-client');
const {FETCH_CART_BY_CARTNUMBER,FETCH_CUSTOMERS_DETAILS} =require ('ct-tickets-helper-api');

module.exports = ()=>{

    const cartService = {};

    cartService.getCartById = async(cartId,isQuoteRequest)=>{

        try {
            const apiRoot =  getApiRoot();

            const result = await apiRoot.withProjectKey({projectKey}).graphql()
                .post({
                    body : {
                        query: FETCH_CART_BY_CARTNUMBER,
                        variables: {
                            id: cartId,
                        },
                    }
                })
                .execute();
            
            console.log('cart',result);

            if(isQuoteRequest){
                return {payment:true,data:result.body.data};
            }

            const cart = result.body?.data?.cart;

            const paymentInfo = cart?.paymentInfo;

            console.log('cart?.paymentInfo',JSON.stringify(cart));

            if(paymentInfo){
                const transactions =[];

                    const trans = paymentInfo?.payments?.map(p =>{
                        return p.transactions.map(t => {
                            if(t.state === "Success"){
                                return t.amount.centAmount;
                            }
                        })
                    })

                    if(trans && trans.length > 0){
                        const sum = trans.reduce((a, b) => a + b)[0];

                        console.log('sum : ',sum);
                        console.log('cart?.taxedPrice?.totalNet?.centAmount : ',cart?.taxedPrice?.totalNet?.centAmount);

                        if(sum === cart?.taxedPrice?.totalNet?.centAmount){
                            return {payment:true,data:result.body.data}
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


    cartService.getCustomerByCartId = async(cartId)=>{

        try {
            const apiRoot =  getApiRoot();

            const result = await apiRoot.withProjectKey({projectKey}).graphql()
                .post({
                    body : {
                        query: FETCH_CART_BY_CARTNUMBER,
                        variables: {
                            id: cartId,
                        },
                    }
                })
                .execute();
            
            console.log('cart',result);

           const cart = result.body?.data?.cart;

            if(cart?.customerId){
                const resultCust = await apiRoot.withProjectKey({projectKey}).graphql()
                    .post({
                        body : {
                            query: FETCH_CUSTOMERS_DETAILS,
                            variables: {
                                id: cart.customerId,
                            },
                        }
                    })
                    .execute();

                    return resultCust?.body?.data?.customer;
            }
            return null
        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error fetching Tickets!"}
        }
    };


    return cartService;

}