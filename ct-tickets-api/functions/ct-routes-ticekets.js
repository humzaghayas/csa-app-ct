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
    
        const {projectKey,variables} = req.body;
        const results = await ticketsService.getTickets({projectKey,variables});
    
        if(results.error){
            res.status(400).json( results);    
        }else{
            res.status(200).json(results);
        }
    
    });

    app.post('/create-ticket-db', async(req, res) =>{

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

    app.get('/ticket-db/:id', async(req, res) =>{

        // const isAuthenticate = jwtAuthenticationService.authenticate(req,res);
    
        // if(isAuthenticate &&  isAuthenticate.error){
        //     res.status(400).json({isAuthenticate}); 
        //     return;
        // }
    
        const {id} = req.params;
        const {projectKey} = req.params;
        const results = await ticketsService.getTicketById(projectKey,id);
    
        if(results.error){
            res.status(400).json( results);    
        }else{
            res.status(200).json(results);
        }
    
    });
}