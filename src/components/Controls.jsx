import React, { Component } from "react";
import { SvgLoader } from "react-svgmt";
import { TweenMax } from "gsap/all";
import styled from "styled-components";

import play from "../assets/icons/play.svg";
import pause from "../assets/icons/pause.svg";
import stop from "../assets/icons/stop.svg";

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;
const AudioUI = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  color: white;
  font-weight: 700;
  font-size: 2.4vh;
  letter-spacing: 0.2vh;
  margin: 2vh 2vh;
  border-radius: 3vh;
  height: 6vh;
  width: ${props => props.width};
  background: none;
  border: none;
  transition: 600ms;
  opacity: 0.6;
  background-image: ${props => props.gradient};
  &:focus {
    outline: none;
  }
  &:hover {
    transition: 600ms;
    opacity: 1;
  }
  &:disabled {
    opacity: 0.2;
  }
`;
const ModelUI = styled.div`
  display: flex;
  flex-direction: column;
`;

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
      isPoly: false,
      isPlay: false
    };
  }
  handleClickStart = b => {
    this.setState({ isStart: b, isPlay: b });
    this.props.onStart(b);
    this.props.onPlaying(b);
  };

  handleClickPlay = b => {
    this.setState({ isPlay: b });
    this.props.onPlaying(b);
  };
  handleClickPoly = b => {
    this.setState({ isPoly: !b });
    this.props.onPolychrome(b);
  };
  render() {
    return (
      <Panel>
        <AudioUI>
          <Button
            width={8 + "vh"}
            hidden={true && this.state.isStart}
            disabled={this.state.isStart}
            onClick={() => this.handleClickStart(true)}
          >
            <SvgLoader path={play} />
          </Button>
          <Button
            width={8 + "vh"}
            hidden={!this.state.isStart}
            disabled={this.state.isPlay || !this.state.isStart}
            onClick={() => this.handleClickPlay(true)}
          >
            <SvgLoader path={play} />
          </Button>
          <Button
            width={8 + "vh"}
            disabled={!this.state.isPlay}
            onClick={() => this.handleClickPlay(false)}
          >
            <SvgLoader path={pause} />
          </Button>

          <Button
            width={8 + "vh"}
            disabled={!this.state.isStart}
            onClick={() => this.handleClickStart(false)}
          >
            <SvgLoader path={stop} />
          </Button>
        </AudioUI>
        <ModelUI>
          <Button
            disabled={!this.state.isStart}
            width={30 + "vh"}
            gradient={"linear-gradient(90deg, #000000, #a2a2a2 )"}
            onClick={() => this.handleClickPoly(false)}
          >
            MONOCHROME
          </Button>
          <Button
            disabled={!this.state.isStart}
            width={30 + "vh"}
            gradient={"linear-gradient(90deg, blue,  violet)"}
            onClick={() => this.handleClickPoly(true)}
          >
            POLYCHROME
          </Button>
        </ModelUI>
      </Panel>
    );
  }
}
