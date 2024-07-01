import React, { Component } from 'react';
import './Navbar.css';
import WarningModal from '../utils/WarningModal';

class Navbar extends Component {
    state = {
        inventoryVisible: false,
    };

    handleInventoryClick = () => {
        this.setState((prevState) => ({
            inventoryVisible: !prevState.inventoryVisible,
        }));
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

    render() {
        const { inventoryVisible } = this.state;
        const { inventory, warning } = this.props;

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
                    <button className="inventory-button" onClick={this.handleInventoryClick}>
                        Inventory
                    </button>
                    {inventoryVisible && (
                        <div className="dropdown">
                            {Object.entries(inventory).map(([key, value]) => (
                                <div key={key} className="dropdown-item">
                                    {key}: {value}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <WarningModal warning={warning} onClose={this.handleCloseModal} />
            </div>
        );
    }
}

export default Navbar;
