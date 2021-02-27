import React, { Component } from 'react';
import './SideBar.scss';
import Folders from './Folders/Folders';
import logo from '../../assets/logo.png';

class SideBar extends Component {

  render() {
    return (
      <div className='sidebar'>
        <img className='sidebar__logo' src={logo} alt='logo' />

        <div className='sidebar__wrapper'>
          <Folders
            folders={this.props.folders}
            notes={this.props.notes}
            getNotes={this.props.getNotes}
            getFolderName={this.props.getFolderName}
            createFolder={this.props.createFolder}
            getFolderId={this.props.getFolderId}
            openFolders={this.props.openFolders}
            showFolders={this.props.showFolders}
            showNotes={this.props.showNotes}
            openNotes={this.props.openNotes}
            openNote={this.props.openNote}
            getNoteId={this.props.getNoteId}
            folderId = {this.props.folderId}
          />
        </div>
      </div>
    )
  }
}



export default SideBar;