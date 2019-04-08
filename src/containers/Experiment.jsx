import React, { Component } from "react";
import Model from "../components/Model";
import FileUploader from "../components/FileUploader";

export default class Experiment extends Component {
  constructor(props){
    super(props);
    this.state={
      audio:''
    }
  }
  onFileName =(name)=>{
    this.setState({audio: name})
  }
  render() {
    console.log(this.state.audio)
    return (
      <div>
        <FileUploader onFileName={this.onFileName}/>
        <Model auidoName={this.state.audio}/>
      </div>
    );
  }
}
