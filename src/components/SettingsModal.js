import React, { Component } from 'react';
import './SettingsModal.css';

const ascotRoomTypes = ["D2", "D2D", "D2G", "D3", "D3D", "D4D", "E1", "TRP"];
const wideRoomTypes = ["F1", "F2", "F2S", "F3D", "F3DS"];
const house57RoomTypes = ["H1", "H2", "H3"];
const hyperNymRoomTypes = ["HY1", "HY2", "HY3"];

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

    handleAddRoom = (roomType, roomName) => {
        const { addRoomToScheme } = this.props;
        const { selectedScheme } = this.state;
        if (selectedScheme) {
            addRoomToScheme(selectedScheme.name, roomType, roomName);
        }
    };

    renderRoomButtons = (roomTypes, roomType) => {
        return roomTypes.map((roomName, index) => (
            <button
                key={index}
                className="room-button"
                onClick={() => this.handleAddRoom(roomType, roomName)}
            >
                {roomName}
            </button>
        ));
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
                                    <div className="room-type">
                                        <div>Ascot</div>
                                        {this.renderRoomButtons(ascotRoomTypes, 'ascotRooms')}
                                    </div>
                                    <div className="room-type">
                                        <div>Wide</div>
                                        {this.renderRoomButtons(wideRoomTypes, 'wideRooms')}
                                    </div>
                                    <div className="room-type">
                                        <div>57 House</div>
                                        {this.renderRoomButtons(house57RoomTypes, 'house57Rooms')}
                                    </div>
                                    <div className="room-type">
                                        <div>HyperNym</div>
                                        {this.renderRoomButtons(hyperNymRoomTypes, 'hyperNymRooms')}
                                    </div>
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
