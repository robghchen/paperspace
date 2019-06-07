import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLogs } from "./actions/logActions";

import LogsContainer from "./containers/LogsContainer";

class App extends Component {
  state = { isClicked: false }; // determines whether modal will show or hide

  componentDidMount() {
    const { getLogs } = this.props;

    getLogs();
  }

  render() {
    const { alerts } = this.props;
    const { isClicked } = this.state

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

        {isClicked ? <LogsContainer clickHandler={this.clickHandler} alertsHandler={this.alertsHandler} /> : null } 
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
