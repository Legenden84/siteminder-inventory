import React, { Component } from 'react';
import WarningModal from '../utils/WarningModal';
import './Navbar.css';

class Navbar extends Component {
    state = {
        showDropdown: false,
    };

    fileInputRef = React.createRef();
    dropdownButtonRef = React.createRef(); // Reference to the dropdown button

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick);
    }

    handleClick = () => {
        this.fileInputRef.current.click();
    };

    handleCloseModal = () => {
        this.props.clearWarning();
    };

    handleDragOver = (event) => {
        event.preventDefault();
    };

    handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        this.props.parseHTMFiles(files);
    };

    handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        this.props.parseHTMFiles(files);
    };

    handleOutsideClick = (event) => {
        if (this.state.showDropdown && this.dropdownButtonRef.current && !this.dropdownButtonRef.current.contains(event.target)) {
            this.setState({ showDropdown: false });
        }
    };

    handleToggleDropdown = () => {
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
                        <button
                            className="button"
                            onClick={this.handleToggleDropdown}
                            ref={this.dropdownButtonRef}
                        >
                            Uploaded Files {uploadedFiles.length > 0 && `(${uploadedFiles.length})`}
                        </button>
                        {showDropdown && (
                            <ul className="uploaded-files-dropdown">
                                {uploadedFiles.map(file => (
                                    <li key={file.name}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                        <button className="button" onClick={this.handleReset}>
                            Reset
                        </button>
                    </div>
                </div>
                <div className="navbar-section right">
                    <div className="mode-div">
                        <button
                            className={`button ${showKapacitet ? 'active' : ''}`}
                            onClick={toggleShowKapacitet}
                        >
                            Inventory
                        </button>
                        <button
                            className={`button ${showOccupancy ? 'active' : ''}`}
                            onClick={toggleShowOccupancy}
                        >
                            Occupancy
                        </button>
                        <button className='button'>
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
