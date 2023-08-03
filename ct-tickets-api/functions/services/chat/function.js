function getStartChatDraftForDB(chatInfo) {
  var _a;
  return __awaiter(this, void 0, void 0, function () {
    var chatId, time, event;
    return __generator(this, function (_b) {
      chatId = chatInfo?.chatId;
      time = chatInfo?.time;
      event = chatInfo?.event;

      console.log("chatInfo ", chatInfo);
      const chatDetails = getchatInfo(chatInfo) ?? "";

      // return {chatMessage, chatVisitor, chatProperty};
      return [2 /*return*/, chatDetails];
    });
  });
}
exports.getStartChatDraftForDB = getStartChatDraftForDB;

function getchatInfo(chatInfo) {
  var chatId = chatInfo?.chatId ?? "";
  var time = chatInfo?.time ?? "";
  var event = chatInfo?.event ?? "";
  var message = getChatMessage(chatInfo?.message) ?? "";
  var visitor = getChatVisitor(chatInfo?.visitor) ?? "";
  var property = getChatProperty(chatInfo?.property) ?? "";

  var data = {
    chatId: chatId,
    time: time,
    event: event,
    message: message,
    visitor: visitor,
    property: property,
  };
  console.log("Data: ", data);
  return data;
}

function getChatMessage(c) {
  var text = c?.text;
  var type = c?.type;
  var sender = getSenderType(c?.sender);

  var t = {
    text: text,
    type: type,
    sender: sender,
  };
  return t;
}

function getSenderType(cInfo) {
  var type = cInfo.type;

  var t = {
    type: type,
  };
  return t;
}

function getChatVisitor(cInfo) {
  var name = cInfo.name;
  var email = cInfo.email;
  var city = cInfo.city;
  var country = cInfo.country;

  var t = {
    name: name,
    email: email,
    city: city,
    country: country,
  };
  return t;
}

function getChatProperty(cInfo) {
  var id = cInfo.id;
  var name = cInfo.name;

  var t = {
    id: id,
    name: name,
  };
  return t;
}
