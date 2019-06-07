import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLogs } from "./actions/logActions";

class App extends Component {
  state = {};

  componentDidMount() {
    let { getLogs, logs } = this.props;
    getLogs();
  }

  render() {
    return <h1>hi</h1>;
  }
}

const mapStateToProps = state => {
  return { logs: state.logs };
};

const mapDispatchToProps = dispatch => {
  return { getLogs: bindActionCreators(getLogs, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
