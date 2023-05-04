const adminDBService = require("./services/adminDBService")();
const graphQLService = require("./services/graphQLService")();
const {adminConnection, clientDBConnection} = require('./config/database')
module.exports = {adminDBService,graphQLService,adminConnection, clientDBConnection};

// async function a(){
//     const adminConf = await adminDBService.adminConfiguration('csa-project-3');

//     console.log(adminConf);
// }


// a();