require('dotenv').config();
const { FETCH_CART_BY_ID } = require('../../GraphQL');
const {graphQLService} =require('ct-external-connections');

module.exports = ()=>{

    const cartService = {};

    cartService.getCartById = async(cartId,projectKey)=>{

        try {

            const result = await graphQLService.execute(FETCH_CART_BY_ID,{id:cartId},projectKey);

            console.log(result);

            return result;

        }catch(error){
            console.log(`Error: ${error}`);
            return {code:"error",message:"Error Sending Email!"}
        }
    };

    return cartService;

}