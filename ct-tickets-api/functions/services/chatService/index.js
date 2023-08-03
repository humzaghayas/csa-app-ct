const { dataToFormValues } = require("../chat/conversions");
const {
  adminDBService,
  chatDBConnection,
  closeConnection,
} = require("ct-external-connections");
const { getStartChatDraftForDB } = require("../chat/function");
const validateChat = require("../chat/validation")();

module.exports = () => {
  const chatService = {};

  chatService.getChats = async ({ projectKey, variables }) => {
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
          Chat = await chatDBConnection(uri);
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
    } finally {
      closeConnection();
    }

    return resultingValues;
  };

  chatService.createStartChat = async (projectKey, chat) => {
    try {
      const adminConf = await adminDBService.adminConfiguration(projectKey);

      if (adminConf.error) {
        console.log("error", adminConf);
        return adminConf;
      }
      const conf = adminConf[projectKey];

      if (conf.isDatabase) {
        return await chatService.createStartChatMongo(conf, chat);
      }
      // else {return await chatService.createTicketCO(ticket);}
    } catch (err) {
      console.log("error", err);
    } finally {
      closeConnection();
    }
  };

  chatService.createStartChatMongo = async (conf, chat) => {
    try {
      const data = await dataToFormValues(chat, false);

      console.log("data kasnkasdkasd", data);
      // const isValid = await validatechat.validate(data);

      // if (isValid.isError) {
      //   return { error: true, errors: isValid.errors };
      // }

      const chatDraft = await getStartChatDraftForDB(data);

      // await createTicketHistoryForDB(data, ticketDraft);

      console.log("chatDraft", chatDraft);

      const uri = conf.connectionUri
        .replace("{{USERNAME}}", conf.username)
        .replace("{{PASSWORD}}", conf.password);

      const Chat = await chatDBConnection(uri);

      if (chatDraft._id) {
        let doc1 = new Chat(chatDraft);
        return await Chat.findOneAndUpdate({ _id: chatDraft._id }, chatDraft, {
          new: true,
        });
      } else {
        let doc1 = new Chat(chatDraft);
        return await doc1.save({ _id: false });
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeConnection();
    }
    // return doc;
  };

  return chatService;
};
