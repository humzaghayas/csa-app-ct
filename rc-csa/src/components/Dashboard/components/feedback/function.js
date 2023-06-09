export function getFeedbackRows(customObjects) {
  //
  // console.log('Feedback List', customObjects);
  if (
    customObjects === null || customObjects === void 0
      ? void 0
      : customObjects.results
  ) {
    return customObjects === null || customObjects === void 0
      ? void 0
      : customObjects.results.map(function (co) {
          return {
            id: co?.id,
            rating: co?.value?.rating,
            feedbackDes: co?.value?.feedbackDes,
          };
        });
  }
  // return {};
  return [];
}
