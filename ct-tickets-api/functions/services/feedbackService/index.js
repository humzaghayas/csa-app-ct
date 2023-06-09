const { dataToFormValues } = require("../feedback/conversions");
const {
  adminDBService,
  feedbackDBConnection,
} = require("ct-external-connections");
const { getCreateFeedbackDraftForDB } = require("../feedback/function");
const validateFeedback = require("../feedback/validation")();

module.exports = () => {
  const feedbackService = {};

  feedbackService.getFeedbacks = async ({ projectKey, variables }) => {
    let resultingValues = {};
    try {
      const adminConf = await adminDBService.adminConfiguration(projectKey);

      if (adminConf.error) {
        console.log("error", adminConf);
        return adminConf;
      }

      if (adminConf[projectKey].isDatabase) {
        let filter = {};

        if (variables?.filter) {
          for (let key of Object.keys(variables?.filter)) {
            filter[key] = new RegExp(variables?.filter[key], "i");
          }
        }
        console.log(projectKey);
        const uri = adminConf[projectKey].connectionUri
          .replace("{{USERNAME}}", adminConf[projectKey].username)
          .replace("{{PASSWORD}}", adminConf[projectKey].password);

        const Feedback = await feedbackDBConnection(uri);
        console.log("feedback", Feedback);
        const offset = variables.offset;
        let r = await Feedback.find(filter).limit(variables.limit).skip(offset);
        //   .sort(variables.sort);
        resultingValues.results = r.map((t) => {
          return { id: t.toObject()._id, value: t.toObject() };
        });

        resultingValues.total = await Feedback.count(filter);
        resultingValues.limit = variables.limit;
        resultingValues.offset = offset;
        resultingValues.count = r.length;
      } else {
      }
    } catch (e) {
      console.error(e);
    }

    return resultingValues;
  };

  feedbackService.createFeedback = async (projectKey, feedback) => {
    try {
      const adminConf = await adminDBService.adminConfiguration(projectKey);

      if (adminConf.error) {
        console.log("error", adminConf);
        return adminConf;
      }
      const conf = adminConf[projectKey];

      if (conf.isDatabase) {
        return await feedbackService.createFeedbackMongo(conf, feedback);
      }
      // else {return await feedbackService.createTicketCO(ticket);}
    } catch (err) {
      console.log("error", err);
    }
  };

  feedbackService.createFeedbackMongo = async (conf, feedback) => {
    const data = await dataToFormValues(feedback, false);

    console.log("data kasnkasdkasd", data);
    // const isValid = await validateFeedback.validate(data);

    // if (isValid.isError) {
    //   return { error: true, errors: isValid.errors };
    // }

    const feedbackDraft = await getCreateFeedbackDraftForDB(data);

    // await createTicketHistoryForDB(data, ticketDraft);

    console.log("feedbackDraft", feedbackDraft);

    const uri = conf.connectionUri
      .replace("{{USERNAME}}", conf.username)
      .replace("{{PASSWORD}}", conf.password);

    const Feedback = await feedbackDBConnection(uri);

    if (feedbackDraft._id) {
      let doc1 = new Feedback(feedbackDraft);
      return await Feedback.findOneAndUpdate(
        { _id: feedbackDraft._id },
        feedbackDraft,
        {
          new: true,
        }
      );
    } else {
      let doc1 = new Feedback(feedbackDraft);
      return await doc1.save();
    }

    return doc;
  };

  return feedbackService;
};
