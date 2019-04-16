import React, { Component } from "react";
import { SvgLoader } from "react-svgmt";
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
      isPlay: false,
    };
  }
  handleClickStart = (e, b) => {
    e.preventDefault();
    this.setState({ isStart: b, isPlay: b });
    this.props.onStart(b);
    this.props.onPlay(b);
  };

  handleClickPlay = (e, b) => {
    e.preventDefault();
    this.setState({ isPlay: b });
    this.props.onPlay(b);
  };
  handleClickPoly = (e, b) => {
    e.preventDefault();
    this.props.onPoly(b);
  };
  render() {
    return (
      <Panel>
        <AudioUI>
          <Button
            width={8 + "vh"}
            hidden={true && this.state.isStart}
            disabled={this.state.isStart}
            onClick={(e) => this.handleClickStart(e,true)}
          >
            <SvgLoader path={play} />
          </Button>
          <Button
            width={8 + "vh"}
            hidden={!this.state.isStart}
            disabled={this.state.isPlay || !this.state.isStart}
            onClick={(e) => this.handleClickPlay(e,true)}
          >
            <SvgLoader path={play} />
          </Button>
          <Button
            width={8 + "vh"}
            disabled={!this.state.isPlay}
            onClick={(e) => this.handleClickPlay(e,false)}
          >
            <SvgLoader path={pause} />
          </Button>

          <Button
            width={8 + "vh"}
            disabled={!this.state.isStart}
            onClick={(e) => this.handleClickStart(e,false)}
          >
            <SvgLoader path={stop} />
          </Button>
        </AudioUI>
        <ModelUI>
          <Button
            disabled={!this.state.isStart}
            width={30 + "vh"}
            gradient={"linear-gradient(90deg, #000000, #a2a2a2 )"}
            onClick={(e) => this.handleClickPoly(e,false)}
          >
            MONOCHROME
          </Button>
          <Button
            disabled={!this.state.isStart}
            width={30 + "vh"}
            gradient={"linear-gradient(90deg, blue,  violet)"}
            onClick={(e) => this.handleClickPoly(e,true)}
          >
            POLYCHROME
          </Button>
        </ModelUI>
      </Panel>
    );
  }
}
