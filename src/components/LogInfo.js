import React, { Component } from "react";
import Cookies from "universal-cookie";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { patchAlerts } from "../actions/logActions";

class LogInfo extends Component {
  componentDidMount() {
    const { alerts, patchAlerts, log, clickedLogs } = this.props;
    const cookies = new Cookies();

    // only deduct from alerts once per notification that has been clicked
    if (clickedLogs.filter(logId => logId === log.id).length === 1) {
      let numAlerts = cookies.get("alerts");
      numAlerts -= 1;
      cookies.set("alerts", numAlerts, { path: "/" });

      patchAlerts(alerts);
    }
  }

  render() {
    const { clickHandler, log } = this.props;
    return (
      <div className="log-info">
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
