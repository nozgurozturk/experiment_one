import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const Click = styled.h2`
  margin: 0 2vh;
  padding: 0;
  font-size: 6vh;
  font-weight: 900;
  letter-spacing: 0.5vh;
  transition: 600ms;
  color: white;
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

const AName = styled.h2`
  margin: 0 2vh;
  padding: 0;
  font-size: 2vh;
  font-weight: 300;
  letter-spacing: 0.2vh;
`;
const FileInput = styled.div`
  display: inline-block;
`;

const Input = styled.input`
  overflow: hidden;
  position: absolute;
  top: 40%;
  width: 60%;
  border: 1px solid black;
  opacity: 0;
  z-index: -99;
`;

export default class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: "",
      loaded: 0,
      redirect: false
    };
  }
  handleOnChange = e => {
    if (this.checkType(e)) {
      this.setState({
        file: e.target.files[0],
        fileName: e.target.files[0].name,
        loaded: 0
      });
    }
  };
  handleUpload = async e => {
    await this.handleOnChange(e);
    const data = new FormData();
    data.append("file", this.state.file);

    await axios
      .post("http://localhost:8000/upload", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        console.log(res.statusText);
        this.props.onFileName(this.state.fileName);
      });
  };

  checkType = e => {
    let file = e.target.files[0];
    let err = "";
    const type = "audio/mp3";
    if (file.type !== type) {
      alert((err = file.type + "It is not a supported format\n"));
    }
    if (err !== ``) {
      e.target.value = null;
      console.log(err);
      return false;
    }
    return true;
  };

  render() {
    if (this.state.loaded !== 0 && this.state.file) {
       return (
        <FileInput>
          <Click>{Math.floor(this.state.loaded)}</Click>
          <AName>{this.state.fileName}</AName>
        </FileInput>
      );
    }
    return (
      <div>
        <form onChange={this.handleUpload}>
          <label htmlFor="audio">
            <FileInput>
              <Click>UPLOAD</Click>
              <Input type="file" id="audio" />
            </FileInput>
          </label>
        </form>
        <AName>or just click play</AName>
      </div>
    );
  }
}
