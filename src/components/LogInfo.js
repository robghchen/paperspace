import React, { Component } from "react";

class LogInfo extends Component {
  render() {
    const { clickHandler, log } = this.props;
    return (
      <div className="log-info">
        <img
          src="goback.png"
          alt="go back"
          className="point"
          onClick={() => clickHandler({})}
        />
        <span className="title">
          <strong>{log.title}</strong>
        </span>
        <p className="type">{log.type}</p>
        <p className="description">{log.description}</p>
        <img src={log.image_url} alt={log.title} className="image" />
        <p>
          <strong>Read the whole post</strong>
        </p>
      </div>
    );
  }
}

export default LogInfo;
