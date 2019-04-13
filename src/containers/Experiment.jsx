import React, { Component } from "react";
import styled from "styled-components";

import Model from "../components/Model";
import Uploader from "../components/Uploader";
import Controls from "../components/Controls";

const Panel = styled.div`
  position: fixed;
  top: 10vh;
  right: 5vw;
  display: flex;
  flex-direction: column;
  z-index: 99;
`;

export default class Experiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      isStarted: false,
      isPlaying: false,
      isPolychorme: false
    };
  }
  onFileName = name => {
    this.setState({ audio: name });
  };
  handleStart = b => {
    this.setState({ isStarted: b });
    this.setState({ isPlaying: b });
  };
  handlePlaying = b => {
    this.setState({ isPlaying: b });
  };
  handlePolychrome = b => {
    this.setState({ isPolychorme: b });
  };

  render() {
    return (
      <div>
        <Model
          name={this.state.audio}
          start={this.state.isStarted}
          play={this.state.isPlaying}
          polychrome={this.state.isPolychorme}
        />
        <Panel>
          <Controls
            onStart={this.handleStart}
            onPlaying={this.handlePlaying}
            onPolychrome={this.handlePolychrome}
          />
          <Uploader onFileName={this.onFileName} />
        </Panel>
      </div>
    );
  }
}
