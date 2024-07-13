import React from 'react';
import './RoomPopup.css';

const RoomPopup = ({ isRoomPopupOpen, currentRoomType, currentRoomCategory, roomTypes = [], handleToggleRoomToScheme, handleCloseRoomPopup, selectedScheme }) => {
    if (!isRoomPopupOpen || !currentRoomType || !currentRoomCategory) return null;

    const addedRooms = selectedScheme?.roomDistribution[currentRoomCategory]?.[currentRoomType] || [];

    return (
        <div className="room-popup-overlay">
            <div className="room-popup-content">
                <div className="room-priority-header">
                    <h2>Add Room to {currentRoomType}</h2>
                </div>
                <div className="button-container">
                    {roomTypes.map(roomName => (
                        <button
                            key={roomName}
                            className="room-button"
                            onClick={() => handleToggleRoomToScheme(roomName)}
                        >
                            {roomName}
                        </button>
                    ))}
                </div>
                <div className="room-priority">
                    <h3>Room Priority</h3>
                    <div className="priority-list">
                        {addedRooms.map((room, index) => (
                            <div key={index} className="priority-item">
                                {index + 1}. {room}
                            </div>
                        ))}
                    </div>
                </div>
                <button className="close-button" onClick={handleCloseRoomPopup}>Close</button>
            </div>
        </div>
    );
};

export default RoomPopup;
