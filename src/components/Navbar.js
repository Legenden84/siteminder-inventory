import React, { Component } from 'react';
import './Navbar.css';
import WarningModal from '../utils/WarningModal';

class Navbar extends Component {
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

    render() {
        const { warning, onDateChange, resetDate, toggleShowKapacitet, showKapacitet } = this.props;

        return (
            <div className="navbar">
                <div className="navbar-section left">
                    <h1>Ascot SiteMinder Inventory Manager</h1>
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
                <div className="navbar-section right">
                    <div className="placeholder-buttons">
                        <button className="placeholder-button" onClick={resetDate}>Reset</button>
                        <button className="placeholder-button" onClick={() => onDateChange(-7)}>-7</button>
                        <button className="placeholder-button" onClick={() => onDateChange(-1)}>-1</button>
                        <button className="placeholder-button" onClick={() => onDateChange(1)}>+1</button>
                        <button className="placeholder-button" onClick={() => onDateChange(7)}>+7</button>
                    </div>
                    <button 
                        className={`inventory-button ${showKapacitet ? 'active' : ''}`} 
                        onClick={toggleShowKapacitet}
                    >
                        Inventory
                    </button>
                </div>
                <WarningModal warning={warning} onClose={this.handleCloseModal} />
            </div>
        );
    }
}

export default Navbar;
