function getCreateFeedbackDraftForDB(feedbackInfo) {
  var _a;
  return __awaiter(this, void 0, void 0, function () {
    var rating, feedbackDes, uuid;
    return __generator(this, function (_b) {
      rating = feedbackInfo.rating;
      feedbackDes = feedbackInfo.feedbackDes;

      console.log("feedbackInfo", feedbackInfo);
      feedbackDraft = getFeedbackValue(feedbackInfo, uuid);
      return [2 /*return*/, feedbackDraft];
    });
  });
}
exports.getCreateFeedbackDraftForDB = getCreateFeedbackDraftForDB;

function getFeedbackValue(feedInfo) {
  var rating = feedInfo.rating;
  var feedbackDes = feedInfo.feedbackDes;

  var t = {
    rating: rating,
    feedbackDes: feedbackDes,
  };
  return t;
}
