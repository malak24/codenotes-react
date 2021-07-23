import React, { Component } from "react";
import axios from "axios";
import "./App.scss";
import Topbar from "./components/Topbar/Topbar";
import Form from "./components/Form/Form";
import Notes from "./components/Notes/Notes";
import Folders from "./components/Folders/Folders";

// let url = "https://codenotes-app.herokuapp.com";
let url = "http://localhost:8080";

class App extends Component {
  constructor() {
    super();

    this.state = {
      folders: {},
      notes: [],

      folderName: "",
      noteTitle: "",
      noteContent: "",

      folderId: "",
      noteId: "",

      search: "",
      searchTxt: "",
      shownFolders: true,
      hideNote: false,
      showInstructions: true,
    };
  }

  componentDidMount() {
    this.getData();
  }

  // GET ALL DATA FROM THE DB
  getData = () => {
    axios.get(`${url}/data`).then((response) => {
      this.setState({ folders: response.data });
      console.log(response.data);
    });
  };

  //NOTES
  //CREATE A NEW NOTE
  createNote = () => {
    axios
      .post(`${url}/folders/${this.state.folderId}/noteId`, {
        note_title: this.state.noteTitle,
      })
      .then((response) => {
        this.getNotes(this.state.folderId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //GET THE NOTES OF A SPECIFIC FOLDER
  getNotes = (folder_id) => {
    this.setState({ folderId: folder_id });
    axios
      .get(`${url}/folders/${folder_id}/notes`)
      .then((response) => {
        this.setState({ notes: response.data });
        console.log(folder_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  hideNotes = () => {
    this.setState({ notes: [] });
  };

  openNote = (note_id) => {
    axios
      .get(`${url}/notes/${note_id}`)
      .then((response) => {
        this.setState({ notes: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //GET NOTE ID
  getNoteId = (note_id) => {
    this.state.noteId === note_id
      ? console.log("note has the same id")
      : this.setState({ noteId: note_id });
    console.log(note_id);
  };

  //GET THE NOTE TITLE FROM USER INPUT
  getNoteTitle = (e) => {
    console.log(e.target.value);
    this.setState({ noteTitle: e.target.value });
  };

  // SAVE THE NOTE'S TITLE
  saveTitle = (e) => {
    let newTitle = e.target.value;
    console.log(newTitle);

    axios
      .put(`${url}/folders/${this.state.folderId}/${this.state.noteId}`, {
        note_title: newTitle,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //SAVE THE NOTE'S CONTENT
  saveNote = (e) => {
    let noteContent = e;
    console.log(noteContent);

    axios
      .put(`${url}/folders/${this.state.folderId}/${this.state.noteId}/note`, {
        note_content: noteContent,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DELETE NOTE
  deleteNote = (note_id) => {
    axios
      .put(`${url}/notes/${note_id}`, {})
      .then((response) => {
        this.getNotes(this.state.folderId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //FOLDERS
  //CREATE A NEW FOLDER
  createFolder = () => {
    axios
      .post(`${url}/folders`, {
        folder_name: this.state.folderName,
      })
      .then((response) => {
        // console.log(response);
        this.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editFolderName = () => {
    axios
      .put(`${url}/folders/${this.state.folderId}/folderName`, {
        folder_name: this.state.folderName,
      })
      .then((response) => {
        this.getData();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DELETE FOLDER
  deleteFolder = (folder_id) => {
    axios
      .put(`${url}/folders/${folder_id}`, {})
      .then((response) => {
        this.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //GET THE FOLDER NAME FROM USER INPUT
  getFolderName = (e) => {
    let folderInp = e.target.value;
    this.setState({ folderName: folderInp });
    console.log(e.target.value);
  };

  //GET FOLDER ID
  getFolderId = (folder_id) => {
    console.log(folder_id);
    this.setState({ folderId: folder_id });
  };

  getSearchInp = (e) => {
    let searchInp = e.target.value;
    this.setState({ search: searchInp });
    console.log(searchInp);
  };

  // //SEARCH FOR NOTE BY NOTE CONTENT
  search = () => {
    axios
      .get(`${url}/notes`)
      .then((response) => {
        for (const i in response.data) {
          let str = response.data[i].note_content;
          let replaced = str.replace(
            `${this.state.search}`,
            `<span style = "background-color:#d12b2b96">${this.state.search}</span>`
          );

          for (const x in this.state.folders) {
            for (const y in this.state.folders[x].notes) {
              if (this.state.folders[x].notes[y].note_content == response.data[i].note_content) {

                axios
                  .post(
                    `${url}/notes/${this.state.folders[x].notes[y].note_id}`,
                    {note_content: replaced})
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }
          }
        }
        this.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  extendFolders = () => {
    this.setState({ shownFolders: !this.state.shownFolders });
  };

  toggleNote = () => {
    this.setState({ hideNote: !this.state.hideNote });
    this.showInstructions();
  };

  showInstructions = () => {
    this.setState({ showInstructions: !this.state.showInstructions });
  };

  render() {
    return (
      <div className="app">
        <Topbar />

        <div className="app__container">
          <div>
            <Form
              getFolderName={this.getFolderName}
              editFolderName={this.editFolderName}
              createFolder={this.createFolder}
              getNoteTitle={this.getNoteTitle}
              createNote={this.createNote}
              getSearchInp={this.getSearchInp}
              search={this.search}
              folderId={this.state.folderId}
            />

            <Folders
              folders={this.state.folders}
              notes={this.state.notes}
              getNotes={this.getNotes}
              getFolderName={this.getFolderName}
              editFolderName={this.editFolderName}
              createFolder={this.createFolder}
              getFolderId={this.getFolderId}
              shownFolders={this.state.shownFolders}
              extendFolders={this.extendFolders}
              showNotes={this.showNotes}
              openNotes={this.state.openNotes}
              openNote={this.openNote}
              getNoteId={this.getNoteId}
              folderId={this.state.folderId}
              hideNotes={this.hideNotes}
              deleteFolder={this.deleteFolder}
            />
          </div>

          <Notes
            folders={this.state.folders}
            notes={this.state.notes}
            autoexpand={this.autoexpand}
            getNoteId={this.getNoteId}
            getNoteTitle={this.getNoteTitle}
            saveTitle={this.saveTitle}
            saveNote={this.saveNote}
            deleteNote={this.deleteNote}
            noteId={this.state.noteId}
            hideNote={this.state.hideNote}
            toggleNote={this.toggleNote}
            showInstructions={this.state.showInstructions}
          />
        </div>
      </div>
    );
  }
}

export default App;