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
  var isEdit = chatNInfo.isEdit;

  var t = {
    noteId: noteId,
    define: define,
    isEdit: isEdit,
  };

  if (chatNInfo._id) {
    t._id = _id;
  }

  return t;
}
