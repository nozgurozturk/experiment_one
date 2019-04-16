import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./containers/Landing";
import Experiment from "./containers/Experiment";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/experiment" component={Experiment} />
        </div>
      </Router>
    );
  }
}
