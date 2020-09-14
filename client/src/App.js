import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

import SideBar from './components/SideBar/SideBar'
import Folders from './components/Folders/Folders'
import Files from './components/Files/Files'
import Editor from './components/Editor/Editor'

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from './froala/lib/FroalaEditor';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/languages/de.js';

import 'froala-editor/js/third_party/image_tui.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
import 'froala-editor/js/third_party/spell_checker.min.js';

let inputValueFo;
let inputValueFi;


class App extends Component {
  constructor() {
    super();

    this.foldersClick = this.foldersClick.bind(this);
    this.filesClick = this.filesClick.bind(this);
    this.zenClick = this.zenClick.bind(this);

    this.getInputFolder = this.getInputFolder.bind(this);
    this.createOneFolder = this.createOneFolder.bind(this); 
    // this.createFile = this.createFile.bind(this);
    this.getFiles = this.getFiles.bind(this);

    this.state = {
      openFolders: true,
      openFiles: true,
      folders: [],
      files : [],
      folderName: '',
      fileName: ''
    };
  }

  componentDidMount() {
    this.getFolders();
  }

  foldersClick() {
    this.setState({
      openFolders: !(this.state.openFolders)
    });
  };

  filesClick() {
    this.setState({
      openFiles: !(this.state.openFiles)
    });
  };

  zenClick() {
    this.setState({
      openFolders: false,
      openFiles: false,
    })
  }

  getFolders() {
    axios
      .get('http://localhost:8080/folders')
      .then(response => {
        console.log(response.data)
        this.setState({ folders: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  getFiles(folder_id) {
    axios
      .get(`http://localhost:8080/folders/${folder_id}/files`)
      .then(response => {
        console.log(response.data)
        this.setState({ files: response.data });
      console.log(this.state.files)
      })
      .catch(error => {
        console.log(error)
      })
  }

  createOneFolder() {
    axios
      .post('http://localhost:8080/folders/folderId', {
        folder_name : this.state.folderName,
      })
      .then(response => {
        console.log(response);
        this.getFolders();
      })
      .catch(error => {
        console.log(error)
      })
  }

  getOneFolder() {
    axios
      .get('http://localhost:8080/folderId')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error)
      })
  }

  getOneFile() {
    axios
      .get('http://localhost:8080/folderId/fileId')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error)
      })
  }

  createOneFile() {
    axios
      .post('http://localhost:8080/folderId/fileId')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error)
      })
  }

  getInputFolder = (e) => {
    inputValueFo = e.target.value;
    this.setState({folderName: inputValueFo})
    console.log(inputValueFo)
  }

  getInputFile = (e) => {
    inputValueFi = e.target.value;
    this.setState({fileName: inputValueFi})
    console.log(inputValueFi)
  }

  render() {
    return (
      <div className="app">
        <SideBar
          openFolders={this.state.openFolders}
          openFiles={this.state.openFiles}
          foldersClick={this.foldersClick}
          filesClick={this.filesClick}
          zenClick={this.zenClick}
        />

        <Folders
          getInputFolder={this.getInputFolder}
          createOneFolder = {this.createOneFolder}
          folders = {this.state.folders}
          openFolders={this.state.openFolders}
          foldersClick={this.foldersClick}
          getFiles = {this.getFiles}
        />

        <Files 
        openFiles={this.state.openFiles} 
        filesClick={this.filesClick}
        files = {this.state.files} 
        getInputFile = {this.getInputFile}
        />

        <div className='app__right-section'>
          <Editor />
        </div>
      </div>
    );
  }
}

export default App;
