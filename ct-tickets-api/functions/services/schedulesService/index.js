
const { dataToFormValues } = require('../schedulesService/conversion');
const {getApiRoot } = require('../../config/commercetools-client');  
const scheduleValidate = require('../schedulesService/validation')();
const {adminDBService,orderScheduleDBConnection} =require('ct-external-connections');
  
module.exports = ()=>{
  
      const scheduleService = {};
  
    scheduleService.getSchedules=async ({projectKey,variables}) => {
  
      let resultingValues = {};
      try{
        const adminConf = await adminDBService.adminConfiguration(projectKey);
        
        if(adminConf.error){
          console.log('error',adminConf);
          return adminConf;
        }
  
        
        if(adminConf[projectKey].isDatabase){
          let filter = variables?.filter ?? {};
          
          const uri = adminConf[projectKey].connectionUri.replace("{{USERNAME}}",adminConf[projectKey].username)
                  .replace("{{PASSWORD}}",adminConf[projectKey].password);
  
          console.log("In Schedules");
          const Schedules =await orderScheduleDBConnection(uri);
  
          const offset = variables.offset;
          console.log("Variables")
          let r=await Schedules.find(filter).limit(variables.limit).skip(offset).sort(variables.sort);
          resultingValues.results = r.map(t => {return {id:t.toObject()._id,value:t.toObject()}});
  
          resultingValues.total = await Schedules.count(filter);
          resultingValues.limit = variables.limit;
          resultingValues.offset = offset;
          resultingValues.count = r.length;
  
        }else{
            return {error:"Data base error",message:"Data base not found"}
        }
  
      }catch(e){
        console.error(e);
      } 
  
      return resultingValues;
    }
  
    scheduleService.createSchedule=async (projectKey,schedule) => {
  
      try{
          const adminConf = await adminDBService.adminConfiguration(projectKey);
  
          if(adminConf.error){
            console.log('error',adminConf);
            return adminConf;
          }
  
          const conf = adminConf[projectKey];
  
          if(conf.isDatabase){
            console.log('Create schedule in database',schedule);
            return await scheduleService.createSchedulesMongo(conf,schedule);
          
          }else{
  
          }
  
        }catch(err){
          console.log('error',err);
        } 
  
    }
  
    scheduleService.createSchedulesMongo=async (conf,schedule) => {
      const data = await dataToFormValues(schedule,false);
  
      console.log('data kasnkasdkasd',data);
      const isValid = await scheduleValidate.validate(data);
  
  
      if(isValid.isError){
          return {error:true,errors:isValid.errors};
      }
  
  
      const uri = conf.connectionUri.replace("{{USERNAME}}",conf.username)
                .replace("{{PASSWORD}}",conf.password);
  
      const Schedule =await orderScheduleDBConnection( uri);
  
      if(data?.id){
          data.lastModifiedAt = Date.now();
        return await Schedule.findOneAndUpdate({_id:data.id}, data, {
            new: true,
          });
      }else{
        let doc1 = new Schedule(data);    
        return await doc1.save();
      }  
    }
    
    scheduleService.getScheduleById=async (projectKey,id) => {
  
      let result = {};
      try{
        const adminConf = await adminDBService.adminConfiguration(projectKey);
        
        if(adminConf.error){
          console.log('error',adminConf);
          return adminConf;
        }
  
        
        if(adminConf[projectKey].isDatabase){
  
          const uri = adminConf[projectKey].connectionUri.replace("{{USERNAME}}",adminConf[projectKey].username)
                  .replace("{{PASSWORD}}",adminConf[projectKey].password);
  
          const Schedules =await orderScheduleDBConnection( uri);
          result=await Schedules.findById( id);
  
          console.log('find by id',result);
        }else{
  
        }
  
      }catch(e){
        console.error(e);
      } 
  
      return result;
    }

    return scheduleService;
}