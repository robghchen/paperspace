import React from "react";

const LogCard = props => {
  const { clickHandler, log } = props;

  return (
    <div
      className="log-card pointer"
      onClick={() => clickHandler(log)}
    >
      <span className={log.type === "Improvement" ? "type green" : "type blue"}>
        {log.type}
      </span>
      <span className="title">
        <strong> {log.title}. </strong>
      </span>
      <span className="description">
        {/* 18 word limit for preview */}
        {log.description.split(" ").length <= 18
          ? log.description
          : log.description
              .split(" ")
              .slice(0, 18)
              .join(" ") + "..."}
      </span>
    </div>
  );
};

export default LogCard;
