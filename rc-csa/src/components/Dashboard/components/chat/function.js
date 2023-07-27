export function getChatRows(customObjects) {
    //
    // console.log('Feedback List', customObjects);
    if (
      customObjects === null || customObjects === void 0
        ? void 0
        : customObjects.results
    ) {
      return customObjects === null || customObjects === void 0
        ? void 0
        : customObjects?.results.map(function (co) {
            return {
                chatId: co?.chatId,
                time: co?.value?.time,
                event: co?.value?.event,
            };
          });
    }
    // return {};
    return [];
  }