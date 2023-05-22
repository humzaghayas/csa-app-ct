// const { CONSTANTS, escapeQuotes } = require("ct-tickets-helper-api");
const dataToFormValues = async (feedback, isEdit) => {
  let data = dataToFormCommonValues(feedback, isEdit);
  //   data.files = feedback?.files ?? [];
  //   data.message = escapeQuotes(feedback?.message) ?? "";
  //   data.comments = feedback?.comments ?? [];
  //   data.history = feedback?.history ?? [];

  //   if (
  //     data.category &&
  //     (data.category == CONSTANTS.TICKET_TYPE_ORDER_INQUIRY ||
  //       data.category == CONSTANTS.TICKET_TYPE_PAYMENT_METHODS ||
  //       data.category == CONSTANTS.TICKET_TYPE_RETURNS)
  //   ) {
  //     data.orderNumber = feedback?.orderNumber ?? "";
  //   }

  //   if (!feedback?._id) {
  //     data.status = CONSTANTS.TICKET_INITIAL_STATUS;
  //   } else {
  //     data.status = feedback.status;
  //   }

  //   if (feedback?._id) {
  //     data._id = feedback._id;
  //   }
  return data;
};

const dataToFormCommonValues = (feedback, isEdit) => ({
  id: feedback?.id ?? "",
  rating: feedback?.rating ?? "",
  feedbackDes: feedback?.feedbackDes ?? "",
  isEdit: isEdit ?? false,
});

module.exports = { dataToFormValues };
