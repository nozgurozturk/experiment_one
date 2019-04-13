import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Uploader from "../components/Uploader";

const Wrapper = styled.div`
  margin: 5vw;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2vh;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Number = styled.div`
  position: fixed;
  top: 0vh;
  right: 5vw;
  font-weight: 700;
  font-size: 20vw;
  color: #2a2a2a;
`;
const Bold = styled.h2`
  padding: 0;
  margin: 0;
  margin-bottom: 1vh;
  font-size: 12vh;
  font-weight: 700;
  color: ${props => props.color};
  text-align: left;
  letter-spacing: 1vh;
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
const Click = styled(Link)`
  text-decoration: none;
`;
const Button = styled.button`
  border: none;
  margin: 0 4vh 0 0;
  font-size: 12vh;
  font-weight: 700;
  letter-spacing: 0.5vh;
  transition: 600ms;
  color: white;
  background-color: none;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ff0000;
  &:hover {
    transition: 600ms;
    color: #ff0000;
  }
  &:focus {
    outline: none;
    transition: 600ms;
    -webkit-text-stroke-color: #2a2a2a;
    color: #2a2a2a;
  }
`;
export default function Landing (){
    return (
      <div>
        <Wrapper>
          <Column>
            <Bold color={"#2a2a2a"}>WELCOME TO</Bold>
            <Bordered border={"#2a2a2a"}>EXPERIMENT</Bordered>
            <div>
              <RedLine />
              <Bordered border={"#2a2a2a"}>ONE</Bordered>
            </div>
            <Row>
              <Click to="/experiment">
                <Button border={"#ff0000"}>CLICK</Button>
              </Click>
              <Bold color={"#2a2a2a"}>TO ENTER</Bold>
            </Row>
          </Column>
        </Wrapper>
        <Number>1</Number>
      </div>
    );
  }

