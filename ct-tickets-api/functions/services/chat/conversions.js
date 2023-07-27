// const { CONSTANTS, escapeQuotes } = require("ct-tickets-helper-api");
const dataToFormValues = async (chat, isEdit) => {
  let data = dataToFormCommonValues(chat, isEdit);
  data.message = chat.message ?? {};
  data.visitor = chat.visitor ?? {};
  data.property = chat.property ?? {};
  console.log("conversion print", data);
  //   data.files = chat?.files ?? [];
  //   data.message = escapeQuotes(chat?.message) ?? "";
  //   data.comments = chat?.comments ?? [];
  return data;
};

const dataToFormCommonValues = (chat, isEdit) => ({
  chatId: chat?.chatId ?? "",
  time: chat?.time ?? "",
  event: chat?.event ?? "",
  // isEdit: isEdit ?? false,
});

module.exports = { dataToFormValues };
