import React from "react";
import MDReactComponent from "markdown-react-js";

const LogCard = props => {
  const { clickHandler, log } = props;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const logYear = parseInt(log.date.split("/")[2]);
  const logMonth = parseInt(log.date.split("/")[0]);
  const logDay = parseInt(log.date.split("/")[1]);
  let timeAgo = 0;

  if (year > logYear) {
    timeAgo = (year - logYear).toString();
    timeAgo = timeAgo > 1 ? timeAgo + " years ago" : timeAgo + " year ago";
  } else if (month > logMonth) {
    timeAgo = (month - logMonth).toString();
    timeAgo = timeAgo > 1 ? timeAgo + " months ago" : timeAgo + " month ago";
  } else if (day > logDay) {
    timeAgo = (day - logDay).toString();
    timeAgo = timeAgo > 1 ? timeAgo + " days ago" : timeAgo + " day ago";
  } else {
    timeAgo = "today";
  }

  return (
    <div className="log-card-container">
      <div className="time-ago">{timeAgo}</div>
      <div className="log-card pointer" onClick={() => clickHandler(log)}>
        <span
          className={log.type === "Improvement" ? "type green" : "type blue"}
        >
          {log.type}
        </span>
        <span className="title">
          <strong> {log.title}. </strong>
        </span>
        <span className="description">
          {/* 20 word limit for preview */}
          <MDReactComponent
            className="description"
            text={
              log.description.split(" ").length <= 20
                ? log.description
                : log.description
                    .split(" ")
                    .slice(0, 20)
                    .join(" ") + "..."
            }
          />
        </span>
      </div>
    </div>
  );
};

export default LogCard;
