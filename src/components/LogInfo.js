import React, { Component } from "react";

class LogInfo extends Component {
  render() {
    const { clickHandler, log } = this.props;
    return (
      <div className="log-info">
        <div className="header">
          <img
            src="go-back.png"
            alt="go back"
            className="go-back pointer"
            onClick={() => clickHandler({})}
          />
          <span className="title">
            <h3>{log.title}</h3>
          </span>
        </div>

        <hr />

        <p className={log.type === "Improvement" ? "type green" : "type blue"}>
          {log.type}
        </p>
        <p className="description">{log.description}</p>
        <img src={log.image_url} alt={log.title} className="image" />
        <p className="link">
          <strong>Read the whole post</strong>
        </p>
      </div>
    );
  }
}

export default LogInfo;
