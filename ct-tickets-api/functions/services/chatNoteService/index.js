const {
  adminDBService,
  chatNoteDBConnection,
  closeConnection
} = require("ct-external-connections");
const { getCreateChatNoteDraftForDB } = require("../chat/functionNote");
const { dataToFormValuesNote } = require("../chat/conversionsNote");
const validateChat = require("../chat/validation")();

module.exports = () => {
  const chatNoteService = {};

  chatNoteService.getChatsNote = async ({ projectKey, variables }) => {
    let resultingValues = {};
    try {
      const adminConf = await adminDBService.adminConfiguration(projectKey);

      if (adminConf.error) {
        console.log("error", adminConf);
        return adminConf;
      }

      if (adminConf[projectKey].isDatabase) {
        let filter = {};

        if (variables?.filter) {
          for (let key of Object.keys(variables?.filter)) {
            filter[key] = new RegExp(variables?.filter[key], "i");
          }
        }
        console.log(projectKey);
        const uri = adminConf[projectKey].connectionUri
          .replace("{{USERNAME}}", adminConf[projectKey].username)
          .replace("{{PASSWORD}}", adminConf[projectKey].password);

        const chatConn = adminDBService[projectKey + "chat"];

        let Chat = {};

        if (!chatConn || chatConn.connection?.readyState != 1) {
          Chat = await chatNoteDBConnection(uri);
          adminDBService[projectKey + "chat"] = Chat;
        }
        console.log("chat", Chat);
        const offset = variables.offset;
        let r = await Chat.find(filter).limit(variables.limit).skip(offset);
        //   .sort(variables.sort);
        resultingValues.results = r.map((t) => {
          return { id: t.toObject()._id, value: t.toObject() };
        });

        resultingValues.total = await Chat.count(filter);
        resultingValues.limit = variables.limit;
        resultingValues.offset = offset;
        resultingValues.count = r.length;
      } else {
      }
    } catch (e) {
      console.error(e);
    }finally{
      closeConnection();
    }

    return resultingValues;
  };

  chatNoteService.createChatNote = async (projectKey, chat) => {
    try {
      const adminConf = await adminDBService.adminConfiguration(projectKey);

      if (adminConf.error) {
        console.log("error", adminConf);
        return adminConf;
      }
      const conf = adminConf[projectKey];

      if (conf.isDatabase) {
        return await chatNoteService.createChatNoteMongo(conf, chat);
      }
      // else {return await chatNoteService.createTicketCO(ticket);}
    } catch (err) {
      console.log("error", err);
    }
  };

  chatNoteService.createChatNoteMongo = async (conf, chat) => {
    try{
        const data = await dataToFormValuesNote(chat, false);

        console.log("data chat incr", data);
        // const isValid = await validatechat.validate(data);

        // if (isValid.isError) {
        //   return { error: true, errors: isValid.errors };
        // }

        const chatDraft = await getCreateChatNoteDraftForDB(data);

        // await createTicketHistoryForDB(data, ticketDraft);

        console.log("chatDraft", chatDraft);

        const uri = conf.connectionUri
          .replace("{{USERNAME}}", conf.username)
          .replace("{{PASSWORD}}", conf.password);

        const Chat = await chatNoteDBConnection(uri);
        const c =await Chat.findById( chatDraft._id);

        let varC = {};

        varC.noteId= chatDraft.noteId;
        varC.define= chatDraft.define;
        varC.isEdit= chatDraft.isEdit;
        varC._id = chatDraft._id;

        console.log('c 565556',c);
        
        if (chatDraft._id) {
          if (chatDraft.increment) {
            varC.define = c.define + 1;
          } else if (chatDraft.decrement) {
            varC.define = c.define - 1;
          }
         
          console.log('varC',varC);

          return await Chat.findOneAndUpdate({ _id: chatDraft._id }, varC, {
            new: true,
          });
        } else {
          let doc1 = new Chat(chatDraft);
          return await doc1.save({ _id: false });
        }
    } catch(e){
        console.error('chat error',e)
    }finally{
      closeConnection();
    }

  };

  return chatNoteService;
};
