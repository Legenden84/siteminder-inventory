import React, { Component } from 'react';
import './Navbar.css';

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
        this.props.parseAllHTMFiles(files);
    };

    render() {
        const { inventoryVisible } = this.state;
        const { inventory } = this.props;

        return (
            <div className="navbar">
                <div className="navbar-section left">
                    <h1>Ascot SiteMinder Inventory Manager</h1>
                </div>
                <div className="navbar-section middle">
                    <input type="file" multiple onChange={this.handleFileUpload} />
                </div>
                <div className="navbar-section right">
                    <button className="inventory-button" onClick={this.handleInventoryClick}>
                        Inventory
                    </button>
                    {inventoryVisible && (
                        <div className="dropdown">
                            {Object.keys(inventory).map((key) => (
                                <div key={key} className="dropdown-item">
                                    {key}: {inventory[key]}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Navbar;
