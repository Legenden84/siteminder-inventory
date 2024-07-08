import React, { Component } from 'react';
import './Navbar.css';
import WarningModal from '../utils/WarningModal';

class Navbar extends Component {
    state = {
        showDropdown: false,
    };

    fileInputRef = React.createRef();

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

    handleClick = () => {
        this.fileInputRef.current.click();
    };

    handleCloseModal = () => {
        this.props.clearWarning();
    };

    toggleDropdown = () => {
        this.setState(prevState => ({
            showDropdown: !prevState.showDropdown
        }));
    };

    handleReset = () => {
        this.props.resetState();
        localStorage.removeItem('state');
    };

    render() {
        const { warning, toggleShowKapacitet, toggleShowOccupancy, showKapacitet, showOccupancy, uploadedFiles } = this.props;
        const { showDropdown } = this.state;

        return (
            <div className="navbar">
                <div className="navbar-section left">
                    <h1>SiteMinder</h1>
                    <h1>Inventory Manager</h1>
                </div>
                <div className="navbar-section middle">
                    <div 
                        className="dropzone" 
                        onDrop={this.handleDrop} 
                        onDragOver={this.handleDragOver}
                        onClick={this.handleClick}
                    >
                        Tryk eller træk og slip Belægningsstatistik filer (.HTM)
                        <input
                            ref={this.fileInputRef}
                            type="file"
                            multiple
                            onChange={this.handleFileUpload}
                            style={{ display: 'none' }}
                        />
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
                        <button className="reset-button" onClick={this.handleReset}>
                            Reset
                        </button>
                    </div>
                </div>
                <div className="navbar-section right">
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
