import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLogs } from "./actions/logActions";

class App extends Component {
  state = {};

  componentDidMount() {
    const { getLogs } = this.props;
    getLogs();
  }

  render() {
    const { logs } = this.props;
    console.log(logs);
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
