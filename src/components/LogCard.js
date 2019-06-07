import React from "react";

const LogCard = props => {
  const { log } = props;

  return (
    <React.Fragment>
      <span className="type">{log.type} </span>
      <span className="title">
        <strong>{log.title}. </strong>
      </span>
      <span className="description">{log.description}</span>
    </React.Fragment>
  );
};

export default LogCard;
