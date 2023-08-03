function getCreateChatNoteDraftForDB(chatInfo) {
  var _a;
  return __awaiter(this, void 0, void 0, function () {
    var chatId, message, uuid;
    return __generator(this, function (_b) {
      chatId = chatInfo.chatId;
      message = chatInfo.message;

      console.log("chatInfo", chatInfo);
      chatDraft = getChatNoteValue(chatInfo, uuid);
      return [2 /*return*/, chatDraft];
    });
  });
}
exports.getCreateChatNoteDraftForDB = getCreateChatNoteDraftForDB;

function getChatNoteValue(chatNInfo) {
  var noteId = chatNInfo.noteId;
  var define = chatNInfo.define;
  var _id = chatNInfo._id ?? "";
  var increment = chatNInfo?.increment ?? false;
  var decrement = chatNInfo?.decrement ?? false;
  var isEdit = chatNInfo.isEdit;

 

  var t = {
    noteId: noteId,
    define: define,
    isEdit: isEdit,
  };

  if(increment){


    t.increment = increment;
    console.log('incr',t);
  }

  if(decrement){
    t.decrement = decrement;
    console.log('decrementsdsd',t);
  }

  console.log('decr',t);

  if (chatNInfo._id) {
    t._id = _id;
  }

  console.log('decr',t);

  return t;
}
