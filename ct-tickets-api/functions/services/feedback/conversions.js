// const { CONSTANTS, escapeQuotes } = require("ct-tickets-helper-api");
const dataToFormValues = async (feedback, isEdit) => {
  let data = dataToFormCommonValues(feedback, isEdit);
  console.log("conversion print", data);
  //   data.files = feedback?.files ?? [];
  //   data.message = escapeQuotes(feedback?.message) ?? "";
  //   data.comments = feedback?.comments ?? [];
  return data;
};

const dataToFormCommonValues = (feedback, isEdit) => ({
  id: feedback?.id ?? "",
  rating: feedback?.rating ?? "",
  feedbackDes: feedback?.feedbackDes ?? "",
  isEdit: isEdit ?? false,
});

module.exports = { dataToFormValues };
