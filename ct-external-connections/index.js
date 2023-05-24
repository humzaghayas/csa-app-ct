const adminDBService = require("./services/adminDBService")();
const graphQLService = require("./services/graphQLService")();
const {
  adminConnection,
  clientDBConnection,
  feedbackDBConnection,
} = require("./config/database");
module.exports = {
  adminDBService,
  graphQLService,
  adminConnection,
  clientDBConnection,
  feedbackDBConnection,
};

// async function a(){
//     const adminConf = await adminDBService.adminConfiguration('csa-project-3');

//     console.log(adminConf);
// }

// a();
