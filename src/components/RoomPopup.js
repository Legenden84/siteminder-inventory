import React, { Component } from 'react';
import './RoomPopup.css';

class RoomPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: props.currentRoomCategory || 'ascotRooms', // Initialize based on the prop
        };
    }

    componentDidUpdate(prevProps) {
        // Update selectedCategory when the currentRoomCategory prop changes
        if (prevProps.currentRoomCategory !== this.props.currentRoomCategory) {
            this.setState({ selectedCategory: this.props.currentRoomCategory });
        }
    }

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

    handleClearRooms = () => {
        const { selectedScheme, currentRoomCategory, currentRoomType } = this.props;
        if (!selectedScheme) {
            console.error("No scheme selected");
            return;
        }
        this.props.clearSelectedRooms(selectedScheme.name, currentRoomCategory, currentRoomType);
    };

    handleCategoryChange = (e) => {
        this.setState({ selectedCategory: e.target.value });
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
        const { selectedCategory } = this.state;

        if (!isRoomPopupOpen || !currentRoomType || !currentRoomCategory || !selectedScheme) return null;

        const roomTypesMap = {
            ascotRooms: ["D2", "D2D", "D2G", "D3", "D3D", "D4D", "E1", "TRP"],
            wideRooms: ["F1", "F2", "F2S", "F3D", "F3DS"],
            house57Rooms: ["H1", "H2", "H3"],
            hyperNymRooms: ["HY1", "HY2", "HY3"]
        };

        const roomTypes = roomTypesMap[selectedCategory] || [];
        const addedRooms = selectedScheme?.roomDistribution[currentRoomCategory]?.[currentRoomType] || [];

        return (
            <div className="room-popup-overlay">
                <div className="room-popup-content">
                    <div className="room-popup-header">
                        <div className="room-popup-header-name">
                            <h2 className="no-wrap">Add Room to {currentRoomType} Priority List</h2>
                            <div className="room-popup-header-selector">
                                <select value={selectedCategory} onChange={this.handleCategoryChange}>
                                    <option value="ascotRooms">Ascot Rooms</option>
                                    <option value="wideRooms">Wide Rooms</option>
                                    <option value="house57Rooms">House 57 Rooms</option>
                                    <option value="hyperNymRooms">HyperNym Rooms</option>
                                </select>
                            </div>
                        </div>
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
                    <div className="clear-button-container">
                        <button className="close-button" onClick={closeRoomPopup}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </button>
                        <button className="clear-button" onClick={this.handleClearRooms}>
                            <i className="fas fa-sync-alt"></i>
                        </button>
                    </div >
                </div>
            </div>
        );
    }
}

export default RoomPopup;
