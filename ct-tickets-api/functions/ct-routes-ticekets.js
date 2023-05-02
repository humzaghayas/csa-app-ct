const ticketsService = require('./services/ticketsService')();
const adminDBService = require('./services/adminDBService')();
const cartService = require('./services/cartService')();

module.exports = function(app){

    app.post('/encrypt', async(req, res) =>{
        const {value} = req.body;

        const encryptVal = await adminDBService.encryptValue(value);
        res.status(200).json({[value]:encryptVal});
    });

    // app.post('/decrypt', async(req, res) =>{
    //     const {value} = req.body;

    //     const decryptVal = await adminDBService.decryptValue(value);
    //     res.status(200).json({[value]:decryptVal});
    // });


    app.post('/tickets-list', async(req, res) =>{

        const {variables} = req.body;
        const{ projectKey} = req.session;
        const results = await ticketsService.getTickets({projectKey,variables});
    
        if(results.error){
            res.status(400).json( results);    
        }else{
            res.status(200).json(results);
        }
    
    });

    app.post('/create-ticket-db', async(req, res) =>{

        const {data} = req.body;
        const{ projectKey} = req.session;
        console.log('create ticket:'+projectKey);
                    
        const tickets = await ticketsService.createTicket(projectKey,data);
    
        // if(result.error){
        //     res.status(400).json({result: result.errors});    
        // }else{
            res.status(200).json({tickets});
        //}
    
    });

    app.get('/ticket-db/:id', async(req, res) =>{

        // const isAuthenticate = jwtAuthenticationService.authenticate(req,res);
    
        // if(isAuthenticate &&  isAuthenticate.error){
        //     res.status(400).json({isAuthenticate}); 
        //     return;
        // }
    
        const {id} = req.params;
        //const projectKey = req.query.projectKey;
        const{ projectKey} = req.session;

        console.log('p',projectKey);
        const results = await ticketsService.getTicketById(projectKey,id);
    
        if(results.error){
            res.status(400).json( results);    
        }else{
            res.status(200).json(results);
        }
    
    });

    app.post('/cart-by-id', async(req, res) =>{

        const {cartId,isQuoteRequest} = req.body;
        const{ projectKey} = req.session;

        console.log('p',projectKey);
        const results = await cartService.getCartById(cartId,isQuoteRequest)
    

        if(results.error){
            res.status(400).json( results);    
        }else{
            res.status(200).json(results);
        }
    
    });
    
    app.post('/customer-by-cartid', async(req, res) =>{

        const {cartId} = req.body;
        const{ projectKey} = req.session;

        console.log('p',projectKey);
        const results = await cartService.getCustomerByCartId(cartId);
    
        if(results.error){
            res.status(400).json( results);    
        }else{
            res.status(200).json(results);
        }
    
    });

    app.get('/payment-link', async(req, res) =>{
        const{ projectKey} = req.session;

        const adminConf = await adminDBService.adminConfiguration(projectKey);
      
        if(adminConf.error){
            res.status(400).json( {error:true,message:"Configuration not found!"});
          return ;
        }

        res.status(200).json({paymentLink:adminConf.PAYMENT_LINK});
    });
}