import React, { Component } from 'react';
import { parseAllHTMFiles } from '../utils/parseHTM';
import './Navbar.css';

export class Navbar extends Component {
  handleInventoryClick = () => {
    this.props.toggleInventoryVisibility();
  };

  handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    parseAllHTMFiles(files).then(data => {
      this.props.loadHTMData(data);
    });
  };

  render() {
    const { inventoryVisible, inventory, htmData } = this.props;

    return (
      <div className="navbar">
        <div className="navbar-section left">
          <h1>Ascot SiteMinder Inventory Manager</h1>
        </div>
        <div className="navbar-section middle">
          <div className="dropzone">
            <input type="file" multiple onChange={this.handleFileUpload} />
          </div>
        </div>
        <div className="navbar-section right">
          <button onClick={this.handleInventoryClick}>Inventory</button>
          {inventoryVisible && (
            <div className="dropdown">
              {Object.entries(inventory).map(([roomType, quantity]) => (
                <div key={roomType}>
                  {roomType}: {quantity}
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
