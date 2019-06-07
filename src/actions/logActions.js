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

const convertStringToArrayOfObjects = data => {
  const logStr = data.files["releaseNotes.md"].content;

  let arr = logStr.split("### ");
  let log = {};
  let logs = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      log.id = i + 1;
      log.type = arr[i].split("## ")[1].split(" - ")[0];
      log.title = arr[i].split("## ")[1].split(" - ")[1];
    } else if (i % 2 === 0) {
      log.id = (i + 2) / 2;
      log.type = arr[i].split(" - ")[0];
      log.title = arr[i].split(" - ")[1];
    } else {
      log.date = arr[i].split(" ")[0];
      log.description = arr[i]
        .split(" ")
        .slice(1, arr[i].length)
        .join(" ");
      log.image = log.title
        .toLowerCase()
        .split(" ")
        .join("")
        .slice(0, -2);
      logs.push(log);
      log = {};
    }
  }

  return logs;
};
