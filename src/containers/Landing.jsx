import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  margin: 5vw;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:2vh;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Number = styled.div`
  position: fixed;
  top: 0vh;
  right: 5vw;
  font-weight: 900;
  font-size: 20vw;
  color: #2a2a2a;
`;
const Bold = styled.h2`
  padding: 0;
  margin: 0;
  margin-bottom: 1vh;
  font-size: 12vh;
  font-weight: 700;
  color: #2a2a2a;
  text-align: left;
  letter-spacing:1vh;
`;
const RedLine = styled.div`
  position: absolute;
  margin-top: 6vh;
  margin-left: -5vw;
  width: 110vw;
  height: 2.5vh;
  background: #ff0000;
`;
const Bordered = styled(Bold)`
  color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: ${props => props.border};
`;
const Button = styled.button`
  border: none;
  margin-left:4vh;
  font-size: 4vh;
  font-weight: 900;
  letter-spacing:0.5vh;
  transition: 600ms;
  color: white;
  background-color: none;
  border-radius: ${props => props.radius};
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ff0000;
  &:hover {
    transition: 600ms;
    color: #ff0000;
  }
  &:focus {
    outline: none;
    transition: 600ms;
    font-weight: 900;
    -webkit-text-stroke-color: #2a2a2a;
    color: #2a2a2a;
  }
`;
export default class Landing extends Component {
  render() {
    return (
      <div>
      <Wrapper>
          <Column>
            <Bold>WELCOME TO</Bold>
            <Bordered border={"#2a2a2a"}>EXPERIMENT</Bordered>
            <div>
              <RedLine />
              <Bordered border={"#2a2a2a"}>ONE</Bordered>
            </div>
            <Bold>STRANGER</Bold>
            <Row>
            <Bordered border={"#ff0000"}>
                SELECT
              </Bordered>
              <Column>
                
                <Link to="/experiment">
                  <Button>SAMPLE</Button>
                </Link>
                <Link to="/experiment">
                  <Button>UPLOAD</Button>
                </Link>
              </Column>
            </Row>
          </Column>
      </Wrapper>
        <Number>1</Number>
        </div>
    );
  }
}
