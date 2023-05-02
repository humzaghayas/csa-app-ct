
const {adminConnection} = require("../../config/database");
const SECRET_KEY = "csa-royalcyber12";
const iv = "csa-royalcyber12";
var crypto = require('crypto');

let adminConnections={};
  module.exports = ()=>{

    const adminDBService = {};

 // adminDBService.adminConnections = {};

  adminDBService.setApiRoot=async (projectKey,apiRoot) => {

    if(adminConnections[projectKey]){

      adminConnections[projectKey].apiRoot = apiRoot;
    }
  }

  adminDBService.adminConfiguration=async (projectKey) => {

    try {

      console.log('adminDBService.adminConf1 ');
      if(!adminConnections[projectKey]){
        console.log('adminDBService.adminConf1 34');
        const Client = adminConnection();

        console.log('adminDBService.adminConf1 ',Client);
        const c= await Client.findOne({projectKey});

        console.log('adminDBService.adminConf1 '+projectKey,c);
        if(!c){
          return {error:true,message:"Project Key not configured!"}
        }
        const conn = c.toObject();
        console.log('conn');

        if(conn.isDatabase){
          let temp = await adminDBService.decryptValue(conn.username);
          conn.username = temp;
          temp = await adminDBService.decryptValue(conn.password);
          conn.password = temp;
        }

        let temp = await adminDBService.decryptValue(conn.CTP_CLIENT_ID);
        conn.CTP_CLIENT_ID = temp;
        temp = await adminDBService.decryptValue(conn.CTP_CLIENT_SECRET);
        conn.CTP_CLIENT_SECRET=temp;

        adminConnections = {
          ...adminConnections,
          [projectKey]:conn
        }
        console.log('adminDBService.adminConf 2' );
      }

      
    }catch(e){
      console.error(e);
    } finally {
      //await client.close();
    }

    return adminConnections;
  }

  adminDBService.decryptValue=async(text)=>{
    // const iv = crypto.randomBytes(16);
    var decipher = crypto.createDecipheriv('aes-128-cbc',SECRET_KEY,iv)
    var decryptedVal = decipher.update(text,'hex','utf8')
    decryptedVal += decipher.final('utf8');

    return decryptedVal;

   }

  return adminDBService;
}