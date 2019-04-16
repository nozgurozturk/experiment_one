import React from "react";
import axios from "axios";
import styled from "styled-components";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";

import { handleName } from "../actions";

const Click = styled.h2`
  margin: 0 4.2vh 0 0;
  padding: 0;
  font-size: 4vh;
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

class Uploader extends React.Component {
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
        this.props.handleName(this.state.fileName);
        setTimeout(() => {
          this.setState({ redirect: true });
        }, 1200);
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
    if (this.state.redirect) {
      return <Redirect to="/experiment" />;
    }
    if (this.state.loaded !== 0 && this.state.file) {
      return (
        <FileInput>
          <Click>{Math.floor(this.state.loaded)}</Click>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.name
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleName: handleName
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader);
