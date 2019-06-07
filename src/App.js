import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLogs } from "./actions/logActions";

import LogsContainer from "./containers/LogsContainer";

class App extends Component {
  state = { showModal: false }; // determines whether modal will show or hide

  componentDidMount() {
    const { getLogs } = this.props;

    getLogs();
  }

  render() {
    const { alerts } = this.props;
    const { showModal } = this.state;

    return (
      <div className="app">
        <img
          src="profile-pic.jpeg"
          alt="profile pic"
          className="profile-pic pointer"
          onClick={this.showModalHandler}
        />
        <span className={alerts > 0 ? "alerts" : "hide"}>
          <strong>{alerts}</strong>
        </span>

        {showModal ? (
          <LogsContainer
            showModalHandler={this.showModalHandler}
            alertsHandler={this.alertsHandler}
          />
        ) : null}
      </div>
    );
  }

  showModalHandler = () => {
    const { showModal } = this.state;

    this.setState({ showModal: !showModal });
  };
}

const mapStateToProps = state => {
  return { logs: state.logs, alerts: state.alerts };
};

const mapDispatchToProps = dispatch => {
  return { getLogs: bindActionCreators(getLogs, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
