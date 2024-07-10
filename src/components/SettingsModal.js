import React, { Component } from 'react';
import './SettingsModal.css';

class SettingsModal extends Component {
    state = {
        selectedScheme: null,
    };

    handleAddScheme = () => {
        const { addScheme, schemes } = this.props;
        const newSchemeName = `Scheme ${schemes.length + 1}`;
        addScheme(newSchemeName);
    };

    handleSelectScheme = (scheme) => {
        this.setState({ selectedScheme: scheme });
    };

    render() {
        const { showSettingsModal, onClose, schemes } = this.props;
        const { selectedScheme } = this.state;

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
                                    <li key={index} onClick={() => this.handleSelectScheme(scheme)}>
                                        {scheme.name}
                                    </li>
                                ))}
                                <button className="button" onClick={this.handleAddScheme}>Add Scheme</button>
                            </ul>
                        </div>
                        <div className="settings-main-content">
                            {selectedScheme ? (
                                <div className="scheme-details">
                                    <h3>{selectedScheme.name}</h3>
                                    <div>Start Date: {selectedScheme.startDate}</div>
                                    <div>End Date: {selectedScheme.endDate}</div>
                                    <div>Ascot Rooms: {selectedScheme.ascotRooms.join(', ')}</div>
                                    <div>Wide Rooms: {selectedScheme.wideRooms.join(', ')}</div>
                                    <div>57 House Rooms: {selectedScheme.house57Rooms.join(', ')}</div>
                                    <div>HyperNym Rooms: {selectedScheme.hyperNymRooms.join(', ')}</div>
                                </div>
                            ) : (
                                <h2>Select a Scheme to view details</h2>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingsModal;
