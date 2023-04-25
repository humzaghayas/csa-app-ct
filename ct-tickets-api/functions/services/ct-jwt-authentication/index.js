const {
    createSessionAuthVerifier,
    CLOUD_IDENTIFIERS,
  } = require('@commercetools-backend/express');
  
  const sessionAuthVerifier = createSessionAuthVerifier({
    audience: 'https://mc.us-central1.gcp.commercetools.com',
    issuer: CLOUD_IDENTIFIERS.GCP_EU,
  });
  

  module.exports = ()=>{

    const jwtAuthenticationService = {};

    jwtAuthenticationService.authenticate = async(request, response)=>{
        try {
            await sessionAuthVerifier(request, response);
          } catch (error) {
            return {error:true, message: 'Unauthorized' };
            
          }
          return {error:false,message:"Success!"};
    }

    return jwtAuthenticationService;
  }