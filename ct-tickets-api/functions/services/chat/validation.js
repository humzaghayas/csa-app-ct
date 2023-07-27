module.exports = () => {
  const validateChat = {};

  validateChat.validate = async (data) => {
    let isValid = { isError: false, errors: [] };

    // if (!data.rating || data.rating == "")
    //   isValid.errors.push("Please do rate us");

    // if (!data.contactType || data.contactType == "")
    //   isValid.errors.push("ContactType Field Missing!");
    // if (!data.priority || data.priority == "")
    //   isValid.errors.push("Priority Field Missing!");

    if (isValid.errors.length > 0) {
      isValid.isError = true;
    }

    return isValid;
  };

  return validateChat;
};
