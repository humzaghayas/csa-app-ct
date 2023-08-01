const fetch = require("node-fetch");

function getChatNotIncrement() {
  var noteId = "rc12000";
  var define = 1;
  var _id = "64c79398cdf3f52b2c98ff48";

  var t = {
    noteId: noteId,
    define: define,
    _id: _id,
  };

  return t;
}

async function getChatUpdateIncrement() {
  const bodyIncrement = {
    projectKey: "csa-project-4",
    data: getChatNotIncrement(),
  };

  try {
    const response = await fetch(
      `https://us-central1-commerce-tools-b2b-services.cloudfunctions.net/ct_csa_api/cUpdate-noteChat-db`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
          // Add any other headers if required (e.g., authorization token)
        },
        body: JSON.stringify(bodyIncrement),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Response updated to Collections", response?.json());
        } else {
          console.log("Response not updated to Collections", response);
        }
      })
      .catch((error) => {
        console.log("Error while creating object in mongodb", error);
      });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Or you can return an error object or specific error message
  }
}

exports.getChatUpdateIncrement = getChatUpdateIncrement;

function getChatNotDecrement() {
  var noteId = "rc12653";
  var define = 0;
  var _id = "64c79398cdf3f52b2c98ff48";

  var t = {
    noteId: noteId,
    define: define,
    _id: _id,
  };

  return t;
}

async function getChatUpdateDecrement() {
  const bodyIncrement = {
    projectKey: "csa-project-4",
    data: getChatNotDecrement(),
  };

  try {
    const response = await fetch(
      `https://us-central1-commerce-tools-b2b-services.cloudfunctions.net/ct_csa_api/cUpdate-noteChat-db`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
          // Add any other headers if required (e.g., authorization token)
        },
        body: JSON.stringify(bodyIncrement),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Response updated to Collections", response?.json());
        } else {
          console.log("Response not updated to Collections", response);
        }
      })
      .catch((error) => {
        console.log("Error while creating object in mongodb", error);
      });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Or you can return an error object or specific error message
  }
}

exports.getChatUpdateDecrement = getChatUpdateDecrement;
