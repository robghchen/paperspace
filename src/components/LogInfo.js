import React, { Component } from "react";
import Cookies from "universal-cookie";
import MDReactComponent from "markdown-react-js";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { patchAlerts } from "../actions";

class LogInfo extends Component {
  componentDidMount() {
    const { alerts, patchAlerts, log, clickedLogs } = this.props;
    const cookies = new Cookies();

    // only deduct from alerts the first time each log is clicked
    if (clickedLogs.filter(logId => logId === log.id).length === 1) {
      let numAlerts = cookies.get("alerts");
      numAlerts -= 1;
      cookies.set("alerts", numAlerts, { path: "/" });

      patchAlerts(alerts);
    }
  }

  render() {
    const { clickHandler, log } = this.props;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const logYear = parseInt(log.date.split("/")[2]);
    const logMonth = parseInt(log.date.split("/")[0]);
    const logDay = parseInt(log.date.split("/")[1]);
    let timeAgo = 0;

    // determine how long ago the changelog happened
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
      <div className="slide-left">
        <div className="header">
          <img
            src="go-back.png"
            alt="go back"
            className="go-back pointer"
            onClick={() => clickHandler(null)}
          />
          <span className="title">
            <h3>{log.title}</h3>
          </span>
        </div>

        <hr />
        <div className="log-info-container">
          <div className="time-ago">{timeAgo}</div>
          <div className="log-info">
            <p
              className={
                log.type === "Improvement" ? "type green" : "type blue"
              }
            >
              {log.type}
            </p>
            <MDReactComponent className="description" text={log.description} />
            <img src={log.image_url} alt={log.title} className="image" />
            <p className="link">
              <strong>Read the whole post</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { alerts: state.alerts };
};

const mapDispatchToProps = dispatch => {
  return { patchAlerts: bindActionCreators(patchAlerts, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInfo);
