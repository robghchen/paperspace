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
    const { isClicked } = this.state;

    return (
      <div>
        <img
          src="profile.jpg"
          alt="profile pic"
          className="pointer"
          onClick={this.clickHandler}
        />

        {isClicked ? <LogsContainer /> : null}
      </div>
    );
  }

  clickHandler = () => {
    const { isClicked } = this.state;

    this.setState({ isClicked: !isClicked });
  };
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
