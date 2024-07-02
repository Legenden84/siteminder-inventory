// Navbar.js
import React, { Component } from 'react';
import './Navbar.css';
import WarningModal from '../utils/WarningModal';

class Navbar extends Component {
    state = {
        showDropdown: false,
    };

    handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        this.props.parseHTMFiles(files);
    };

    handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        this.props.parseHTMFiles(files);
    };

    handleDragOver = (event) => {
        event.preventDefault();
    };

    handleCloseModal = () => {
        this.props.clearWarning();
    };

    toggleDropdown = () => {
        this.setState(prevState => ({
            showDropdown: !prevState.showDropdown
        }));
    };

    render() {
        const { warning, onDateChange, resetDate, toggleShowKapacitet, toggleShowOccupancy, showKapacitet, showOccupancy, uploadedFiles } = this.props;
        const { showDropdown } = this.state;

        return (
            <div className="navbar">
                <div className="navbar-section left">
                    <h1>Ascot SiteMinder</h1>
                    <h1>Inventory Manager</h1>
                </div>
                <div className="navbar-section middle">
                    <div 
                        className="dropzone" 
                        onDrop={this.handleDrop} 
                        onDragOver={this.handleDragOver}
                    >
                        Drag and drop files here or click to upload
                        <input
                            type="file"
                            multiple
                            onChange={this.handleFileUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                <div className="uploaded-files-container">
                        <button className="uploaded-files-button" onClick={this.toggleDropdown}>
                            Uploaded Files {uploadedFiles.length > 0 && `(${uploadedFiles.length})`}
                        </button>
                        {showDropdown && (
                            <ul className="uploaded-files-dropdown">
                                {uploadedFiles.map(file => (
                                    <li key={file.name}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                <div className="navbar-section right">
                    <div className="placeholder-buttons">
                        <button className="placeholder-button" onClick={resetDate}>Reset</button>
                        <button className="placeholder-button" onClick={() => onDateChange(-7)}>-7</button>
                        <button className="placeholder-button" onClick={() => onDateChange(-1)}>-1</button>
                        <button className="placeholder-button" onClick={() => onDateChange(1)}>+1</button>
                        <button className="placeholder-button" onClick={() => onDateChange(7)}>+7</button>
                    </div>
                    <div className="mode-div">
                        <button 
                            className={`mode-button ${showKapacitet ? 'active' : ''}`} 
                            onClick={toggleShowKapacitet}
                        >
                            Inventory
                        </button>
                        <button 
                            className={`mode-button ${showOccupancy ? 'active' : ''}`} 
                            onClick={toggleShowOccupancy}
                        >
                            Belægning
                        </button>
                        <button className='mode-button'>
                            Settings
                        </button>
                    </div>
                </div>
                <WarningModal warning={warning} onClose={this.handleCloseModal} />
            </div>
        );
    }
}

export default Navbar;
