const adminDBService = require("./services/adminDBService")();
const graphQLService = require("./services/graphQLService")();
const {
  adminConnection,
  clientDBConnection,
  feedbackDBConnection,
  chatDBConnection,
  chatNoteDBConnection,
  closeConnection
} = require("./config/database");
module.exports = {
  adminDBService,
  graphQLService,
  adminConnection,
  clientDBConnection,
  feedbackDBConnection,
  chatDBConnection,
  chatNoteDBConnection,
  closeConnection
};

// async function a(){
//     const adminConf = await adminDBService.adminConfiguration('csa-project-3');

//     console.log(adminConf);
// }

// a();
