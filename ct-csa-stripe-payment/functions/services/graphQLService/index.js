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

    graphQLService.readEmail =async ()=>{
        const imap = new Imap(imapConfig);
        imap.once('ready', () => {
                imap.openBox('INBOX', false, () => {
                    imap.search(['ALL'], (err, results) => {
                        const f = imap.fetch(results, {bodies: ''});
                        f.on('message', msg => {
                            msg.on('body', stream => {
                            simpleParser(stream, async (err, parsed) => {
                                    console.log(parsed);
                                    });
                                });
                            msg.once('attributes', attrs => {
                                const {uid} = attrs;
                                imap.addFlags(uid, ['\\Seen'], () => {
                                    console.log('Marked as read!');
                                });
                            });
                        });
                        f.once('error', ex => {
                            return Promise.reject(ex);
                        });
                        f.once('end', () => {
                            console.log('Done fetching all messages!');
                            imap.end();
                        });
                    });
                });
        });
    }

    return graphQLService;

}