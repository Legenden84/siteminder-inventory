import React from 'react';
import './RoomPopup.css';

const RoomPopup = ({ isRoomPopupOpen, currentRoomType, currentRoomCategory, roomTypes = [], handleToggleRoomToScheme, handleCloseRoomPopup }) => {
    if (!isRoomPopupOpen || !currentRoomType || !currentRoomCategory) return null;

    return (
        <div className="room-popup-overlay">
            <div className="room-popup-content">
                <h2>Add Room to {currentRoomType}</h2>
                {roomTypes.map(roomName => (
                    <button
                        key={roomName}
                        className="room-button"
                        onClick={() => handleToggleRoomToScheme(roomName)}
                    >
                        {roomName}
                    </button>
                ))}
                <button className="close-button" onClick={handleCloseRoomPopup}>Close</button>
            </div>
        </div>
    );
};

export default RoomPopup;
