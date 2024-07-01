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
        this.props.parseHTMFiles(files);
    };

    render() {
        const { inventoryVisible } = this.state;
        const { htmData } = this.props;

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
                    {htmData.map((data, index) => (
                        <div key={index} className="dropdown-item">
                            {data.VType}: {data.Dato} {data.År} - Kapacitet: {data.Kapacitet}, Reserveret: {data.Reserveret}, Allotment: {data.Allotment}, Ledige: {data.Ledige}, Belægn.%: {data.BelægnProcent}, Led. u. Al.: {data.LedUAl}, Belægn. % u. Allot.: {data.BelægnProcentUAl}
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
