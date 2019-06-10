import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import LogCard from "../components/LogCard";
import LogInfo from "../components/LogInfo";

class LogsContainer extends Component {
  state = { isClicked: false, log: {}, clickedLogs: [] }; // isClicked determines whether to show LogCard.js or LogInfo.js

  componentDidMount() {
    const cookies = new Cookies();

    this.setState({
      clickedLogs: cookies.get("clickedLogs")
    });
  }

  render() {
    const { logs, showModalHandler } = this.props;
    const { isClicked, log, clickedLogs } = this.state;
    return (
      <div className="logs-container popup">
        <span className="close pointer" onClick={showModalHandler}>
          x
        </span>
        {/* LogCard shows a preview, LogInfo shows details after clicking on LogCard */}
        {isClicked ? (
          <LogInfo
            key={log.id}
            log={log}
            clickHandler={this.clickHandler}
            clickedLogs={clickedLogs}
          />
        ) : (
          <div className="slide-right">
            <div className={isClicked ? "center hide" : "center"}>
              <h3>Latest changes</h3>
              <hr />
            </div>
            {logs.map(log => (
              <LogCard
                key={log.id}
                log={log}
                clickHandler={this.clickHandler}
                clickedLogs={clickedLogs}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  clickHandler = log => {
    const { isClicked, clickedLogs } = this.state;
    let clickedLogsArr = log ? [...clickedLogs, log.id] : [...clickedLogs];
    const cookies = new Cookies();

    this.setState({
      isClicked: !isClicked,
      log,
      clickedLogs: clickedLogsArr
    });

    cookies.set("clickedLogs", clickedLogsArr, { path: "/" });
  };
}

const mapStateToProps = state => {
  return { logs: state.logs };
};

export default connect(mapStateToProps)(LogsContainer);
