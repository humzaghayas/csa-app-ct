const { getApiRoot } = require("../../config/commercetools-client");

const adminDBService = require("../adminDBService")();

module.exports = ()=>{

    const graphQLService = {};

    graphQLService.execute = async(graphQuery,variables,projectKey)=>{

        try{

            const adminConf = await adminDBService.adminConfiguration(projectKey);

            if(adminConf.error){
              console.log('error',adminConf);
              return adminConf;
            }

            let apiRoot =adminConf[projectKey].apiRoot;
            if(!apiRoot){
                apiRoot =  getApiRoot(adminConf[projectKey]);
                await adminDBService.setApiRoot(projectKey,apiRoot)
            }

            const result = await apiRoot.withProjectKey({projectKey}).graphql()
            .post({
                body : {
                    query: graphQuery,
                    variables,
                }
            })
            .execute();

            console.log('result',result?.body?.data)

            return result?.body?.data;

        }catch(error){
            console.log(`Error: ${error}`);
            return {error:true,message:"Error !"}
        }
    };
    
    return graphQLService;

}