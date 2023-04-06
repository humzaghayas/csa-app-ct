const ticketsService = require('./services/ticketsService')();
const adminDBService = require('./services/adminDBService')();


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

        // const isAuthenticate = jwtAuthenticationService.authenticate(req,res);
    
        // if(isAuthenticate &&  isAuthenticate.error){
        //     res.status(400).json({isAuthenticate}); 
        //     return;
        // }
    
        const {projectKey} = req.body;
        const tickets = await ticketsService.getTickets(projectKey);
    
        // if(result.error){
        //     res.status(400).json({result: result.errors});    
        // }else{
            res.status(200).json({tickets});
        //}
    
    });

    app.post('/createTicketM', async(req, res) =>{

        // const isAuthenticate = jwtAuthenticationService.authenticate(req,res);
    
        // if(isAuthenticate &&  isAuthenticate.error){
        //     res.status(400).json({isAuthenticate}); 
        //     return;
        // }
    
        const {projectKey,data} = req.body;

        console.log('create ticket:'+projectKey);
                    
        const tickets = await ticketsService.createTicket(projectKey,data);
    
        // if(result.error){
        //     res.status(400).json({result: result.errors});    
        // }else{
            res.status(200).json({tickets});
        //}
    
    });
}