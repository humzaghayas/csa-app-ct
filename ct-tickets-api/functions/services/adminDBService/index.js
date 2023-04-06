
const {adminConnection} = require("../../config/database");
const {MONGO_ADMIN_COLLECTION} = process.env;

  module.exports = ()=>{

    const adminDBService = {};

  adminDBService.adminConf = null;
  adminDBService.fetchAdminConf=async () => {

    try {

      console.log('adminDBService.adminConf1 ',adminDBService.adminConf );
      if(adminDBService.adminConf === null){
        const Client = await adminConnection();
        adminDBService.adminConf = await Client.find({});
        console.log('adminDBService.adminConf 2',adminDBService.adminConf );
      }

      console.log('adminDBService.adminConf3 ',adminDBService.adminConf );

      return adminDBService.adminConf;
    }catch(e){
      console.error(e);
    } finally {
      //await client.close();
    }

    return null;
  }
  return adminDBService;
}