export const LOAD_LOGS = "LOAD_LOGS";

export const getLogs = () => {
  return dispatch => {
    return fetch(
      "https://api.github.com/gists/677ec84199dcb906b8b180bef523fa70"
    )
      .then(res => res.json())
      .then(data => {
        const logs = convertStringToArrayOfObjects(data);

        dispatch({
          type: LOAD_LOGS,
          payload: logs
        });
      })
      .catch(console.error);
  };
};

// assuming that our gist file always follows the format of
  // # Release Notes
  // ## title
  // ### date description
  // ### title
  // ### date description
// it's possible to parse through the gist api and manipulate the string that is received into something useful

const convertStringToArrayOfObjects = data => {
  const logStr = data.files["releaseNotes.md"].content; // "# Release Notes ## New Thing 2 ### 7/16/2018 About this ### New Thing 2 ### 7/14/2018 About this"

  // split on ### because every other index marks the beginning of a new log
  let arr = logStr.split("### "); 
  let logs = [];
  let log = {};

  // iterate through arr to create log objects
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) { // account for special exception where the most recent log's title is 2 hashtags and not 3 hashtags
      log.id = i + 1;
      log.type = arr[i].split("## ")[1].split(" - ")[0];
      log.title = arr[i]
        .split("## ")[1]
        .split(" - ")[1]
        .slice(0, -1);
    } else if (i % 2 === 0) { // beginning of new log object
      log.id = (i + 2) / 2;
      log.type = arr[i].split(" - ")[0];
      log.title = arr[i].split(" - ")[1].slice(0, -1);
    } else { // finish up creating this log object
      log.date = arr[i].split(" ")[0];
      log.description = arr[i]
        .split(" ")
        .slice(1, arr[i].length)
        .join(" ")
        .slice(0, -1);
      log.image = log.title
        .toLowerCase()
        .split(" ")
        .join("");
      logs.push(log); // add to our arr of log objects
      log = {};
    }
  }

  return logs;
};
