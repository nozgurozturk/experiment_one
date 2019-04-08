import React, { Component } from "react";
import axios from "axios";

export default class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: "",
      loaded: 0
    };
  }
  handleOnChange = e => {
    if (this.checkType(e)) {
      this.setState({
        file: e.target.files[0],
        loaded: 0,
        fileName: e.target.files[0].name
      });
    }
  };
  handleOnClick = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file);

    axios
      .post("http://localhost:8000/upload", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        console.log(res.statusText);
      });
    this.props.onFileName(this.state.fileName);
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
    console.log(this.state.fileName);
    return (
      <div>
        <h1>File Upload</h1>
        <p>{this.state.loaded}</p>
        <form onChange={this.handleOnChange}>
          <input type="file" name="audio" />
          <button onClick={this.handleOnClick}>SUBMIT</button>
        </form>

      
      </div>
    );
  }
}
