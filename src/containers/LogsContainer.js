import React, { Component } from "react";
import { connect } from "react-redux";

import LogCard from "../components/LogCard";
import LogInfo from "../components/LogInfo";

class LogsContainer extends Component {
  state = { isClicked: false, log: {}, clickedLogs: [] };

  render() {
    const { logs } = this.props;
    const { isClicked, log, clickedLogs } = this.state;

    return (
      <div className="logs-container">
        <div className={isClicked ? "center hide" : "center"}>
          <h3>Latest changes</h3>
          <hr />
        </div>
        {/* LogCard shows a preview, LogInfo shows details after clicking on LogCard */}
        {isClicked ? (
          <LogInfo
            key={log.id}
            log={log}
            clickHandler={this.clickHandler}
            clickedLogs={clickedLogs}
          />
        ) : (
          logs.map(log => (
            <LogCard key={log.id} log={log} clickHandler={this.clickHandler} />
          ))
        )}
      </div>
    );
  }

  clickHandler = log => {
    const { isClicked, clickedLogs } = this.state;

    this.setState({
      isClicked: !isClicked,
      log,
      clickedLogs: log ? [...clickedLogs, log.id] : [...clickedLogs]
    });
  };
}

const mapStateToProps = state => {
  return { logs: state.logs };
};

export default connect(mapStateToProps)(LogsContainer);
