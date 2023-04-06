
const {adminConnection} = require("../../config/database");
var crypto = require('crypto');
const {MONGO_ADMIN_COLLECTION} = process.env;

const SECRET_KEY = "csa-royalcyber12";
const iv = "csa-royalcyber12";
  module.exports = ()=>{

    const adminDBService = {};

  adminDBService.adminConnections = {};
  adminDBService.fetchAdminConf=async (projectKey) => {

    try {

      console.log('adminDBService.adminConf1 ',adminDBService.adminConf );
      if(!adminDBService[projectKey]){
        const Client = await adminConnection();
        const c= await Client.findOne({projectKey});

        const conn = c.toObject();
        console.log('conn',conn);
        console.log('conn',Object.keys(conn));

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

        adminDBService.adminConnections = {
          ...adminDBService.adminConnections,
          [projectKey]:conn
        }
        console.log('adminDBService.adminConf 2',adminDBService.adminConnections );
      }

      
    }catch(e){
      console.error(e);
    } finally {
      //await client.close();
    }

    return adminDBService.adminConnections;
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