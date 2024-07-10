import React, { Component } from 'react';
import './SettingsModal.css';

class SettingsModal extends Component {
    handleAddScheme = () => {
        const { addScheme, schemes } = this.props;
        const newSchemeName = `Scheme ${schemes.length + 1}`;
        addScheme(newSchemeName);
    };

    render() {
        const { showSettingsModal, onClose, schemes } = this.props;
        if (!showSettingsModal) return null;

        return (
            <div className="settings-modal-overlay" onClick={onClose}>
                <div className="settings-modal-content" onClick={e => e.stopPropagation()}>
                    <div className="settings-modal-header">
                        <h2>Settings</h2>
                        <button className="button" onClick={onClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className="settings-modal-body">
                        <div className="settings-navbar">
                            <ul>
                                {schemes.map((scheme, index) => (
                                    <li key={index}>{scheme.name}</li>
                                ))}
                                <button className="button" onClick={this.handleAddScheme}>Add Scheme</button>
                            </ul>
                        </div>
                        <div className="settings-main-content">
                            <h2>Main Content</h2>
                            {schemes.map((scheme, index) => (
                                <div key={index} className="scheme-details">
                                    <h3>{scheme.name}</h3>
                                    <div>Start Date: {scheme.startDate}</div>
                                    <div>End Date: {scheme.endDate}</div>
                                    <div>Ascot Rooms: {scheme.ascotRooms.join(', ')}</div>
                                    <div>Wide Rooms: {scheme.wideRooms.join(', ')}</div>
                                    <div>57 House Rooms: {scheme.house57Rooms.join(', ')}</div>
                                    <div>HyperNym Rooms: {scheme.hyperNymRooms.join(', ')}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingsModal;
