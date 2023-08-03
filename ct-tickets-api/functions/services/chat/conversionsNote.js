// const { CONSTANTS, escapeQuotes } = require("ct-tickets-helper-api");
const dataToFormValuesNote = async (chat, isEdit) => {
  let data = dataToFormCommonValues(chat, isEdit);
  console.log("conversion print", data);

  return data;
};

const dataToFormCommonValues = (chat, isEdit) => {
  const commonValues = {
    noteId: chat?.noteId ?? "",
    define: chat?.define ?? 0,
    increment: chat?.increment ?? false,
    decrement: chat?.decrement ?? false,
    isEdit: isEdit ?? false,
  };
  if (chat?._id) {
    commonValues._id = chat._id;
  }

  return commonValues;
};

module.exports = { dataToFormValuesNote };
