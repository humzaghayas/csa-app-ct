// export function getChatRows(customObjects) {
//   //
//   //   console.log('Chat List', customObjects);
// //   customObjects.count
//   if (
//     customObjects === null || customObjects === void 0
//       ? void 0
//       : customObjects.results
//   ) {
//     return customObjects === null || customObjects === void 0
//       ? void 0
//       : customObjects?.results.map(function (co) {
//           //   console.log('Chat List', co);
//           return {
//             chatId: co?.value?.chatId,
//             time: co?.value?.time,
//             event: co?.value?.event,
//           };
//         });
//   }
//   // return {};
//   return [];
// }

export function getChatRows(customObjects) {
  //   console.log('Chat List', customObjects);
  if (customObjects?.results) {
    return {
      count: customObjects.count,
      rows: customObjects.results.map(function (co) {
        //   console.log('Chat List', co);
        return {
          chatId: co?.value?.chatId,
          time: co?.value?.time,
          event: co?.value?.event,
        };
      }),
    };
  }
  return {
    count: 0,
    rows: [],
  };
}
