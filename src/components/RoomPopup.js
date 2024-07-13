import React, { Component } from 'react';
import './RoomPopup.css';

class RoomPopup extends Component {
    handleToggleRoomToScheme = (newRoomName) => {
        const { selectedScheme, currentRoomCategory, currentRoomType } = this.props;
        if (!selectedScheme) {
            console.error("No scheme selected");
            return;
        }
        this.props.toggleRoomToScheme(selectedScheme.name, currentRoomCategory, currentRoomType, newRoomName);
    };

    handleRemoveRoomFromScheme = (roomName) => {
        const { selectedScheme, currentRoomCategory, currentRoomType } = this.props;
        if (!selectedScheme) {
            console.error("No scheme selected");
            return;
        }
        this.props.toggleRoomToScheme(selectedScheme.name, currentRoomCategory, currentRoomType, roomName);
    };

    renderRoomButtons = (roomTypes) => {
        if (!Array.isArray(roomTypes)) return null;
        return roomTypes.map(roomName => (
            <button
                key={roomName}
                className="room-button"
                onClick={() => this.handleToggleRoomToScheme(roomName)}
            >
                {roomName}
            </button>
        ));
    };

    render() {
        const { isRoomPopupOpen, currentRoomType, currentRoomCategory, selectedScheme, closeRoomPopup } = this.props;

        if (!isRoomPopupOpen || !currentRoomType || !currentRoomCategory || !selectedScheme) return null;

        const roomTypesMap = {
            ascotRooms: ["D2", "D2D", "D2G", "D3", "D3D", "D4D", "E1", "TRP"],
            wideRooms: ["F1", "F2", "F2S", "F3D", "F3DS"],
            house57Rooms: ["H1", "H2", "H3"],
            hyperNymRooms: ["HY1", "HY2", "HY3"]
        };

        const roomTypes = roomTypesMap[currentRoomCategory] || [];
        const addedRooms = selectedScheme?.roomDistribution[currentRoomCategory]?.[currentRoomType] || [];

        return (
            <div className="room-popup-overlay">
                <div className="room-popup-content">
                    <div className="room-popup-header">
                        <h2>Add Room to {currentRoomType}</h2>
                    </div>
                    <div className="button-container">
                        {this.renderRoomButtons(roomTypes)}
                    </div>
                    <div className="room-priority">
                        <div className="priority-list">
                            <div className="priority-list-header">
                                <h3>Room Priority</h3>
                            </div>
                            <div className="priority-list-content">
                                {addedRooms.map((room, index) => (
                                    <button
                                        key={index}
                                        className="priority-item"
                                        onClick={() => this.handleRemoveRoomFromScheme(room)}
                                    >
                                        {index + 1}. {room}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="close-button" onClick={closeRoomPopup}>Close</button>
                </div>
            </div>
        );
    }
}

export default RoomPopup;
