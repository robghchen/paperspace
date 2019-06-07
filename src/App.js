import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLogs } from "./actions/logActions";

import LogsContainer from "./containers/LogsContainer";

class App extends Component {
  state = { isClicked: false };

  componentDidMount() {
    const { getLogs } = this.props;

    getLogs();
  }

  render() {
    const { alerts } = this.props;

    return (
      <div className="app">
        <img
          src="profile-pic.jpeg"
          alt="profile pic"
          className="profile-pic pointer"
          onClick={this.clickHandler}
        />
        <span className={alerts > 0 ? "alerts" : "hide"}>
          <strong>{alerts}</strong>
        </span>

        <LogsContainer alertsHandler={this.alertsHandler} />
      </div>
    );
  }

  clickHandler = () => {
    const { isClicked } = this.state;

    this.setState({ isClicked: !isClicked });
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
