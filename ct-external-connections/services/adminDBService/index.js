
const {adminConnection} = require("../../config/database");
var crypto = require('crypto');

const SECRET_KEY = "csa-royalcyber12";
const iv = "csa-royalcyber12";

let adminConnections={};
  module.exports = ()=>{

    const adminDBService = {};

 // adminDBService.adminConnections = {};

  adminDBService.resetConfiguration=async () => {
    adminConnections={};
  }

  adminDBService.setApiRoot=async (projectKey,apiRoot) => {

    if(adminConnections[projectKey]){

      adminConnections[projectKey].apiRoot = apiRoot;
    }
  }

  adminDBService.adminConfiguration=async (projectKey) => {

    try {

      console.log('adminDBService.adminConf1 ');
      if(!adminConnections[projectKey]){
        const Client = await adminConnection();
        const c= await Client.findOne({projectKey});

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

  adminDBService.encryptValue=async(text)=>{
    // const iv = crypto.randomBytes(16);
    var cipher = crypto.createCipheriv('aes-128-cbc', SECRET_KEY,iv)
    var encryptVal = cipher.update(text,'utf8','hex')
    encryptVal += cipher.final('hex');

    return encryptVal;

  }
  return adminDBService;
}