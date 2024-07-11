import React, { Component } from 'react';
import './SettingsModal.css';

const ascotRoomTypes = ["D2", "D2D", "D2G", "D3", "D3D", "D4D", "E1", "TRP"];
const wideRoomTypes = ["F1", "F2", "F2S", "F3D", "F3DS"];
const house57RoomTypes = ["H1", "H2", "H3"];
const hyperNymRoomTypes = ["HY1", "HY2", "HY3"];

class SettingsModal extends Component {
    state = {
        selectedSchemeName: null,
        isEditing: false,
        editedNames: {}
    };

    handleAddScheme = () => {
        const { addScheme } = this.props;
        addScheme();
    };

    handleSelectScheme = (schemeName) => {
        this.setState({ selectedSchemeName: schemeName });
    };

    handleDeleteScheme = () => {
        const { deleteScheme } = this.props;
        const { selectedSchemeName } = this.state;
        if (selectedSchemeName) {
            const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedSchemeName}?`);
            if (confirmDelete) {
                deleteScheme(selectedSchemeName);
                this.setState({ selectedSchemeName: null });
            }
        }
    };

    handleToggleRoom = (roomType, roomName) => {
        const { addRoomToScheme, removeRoomFromScheme, schemes } = this.props;
        const { selectedSchemeName } = this.state;
        if (selectedSchemeName) {
            const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);
            const roomList = selectedScheme[roomType];
            if (roomList.includes(roomName)) {
                removeRoomFromScheme(selectedSchemeName, roomType, roomName);
            } else {
                addRoomToScheme(selectedSchemeName, roomType, roomName);
            }
        }
    };

    handleStartDateChange = (e) => {
        const { updateSchemeStartDate } = this.props;
        const { selectedSchemeName } = this.state;
        updateSchemeStartDate(selectedSchemeName, e.target.value);
    };

    handleEndDateChange = (e) => {
        const { updateSchemeEndDate } = this.props;
        const { selectedSchemeName } = this.state;
        updateSchemeEndDate(selectedSchemeName, e.target.value);
    };

    handleResetSchemes = () => {
        const { resetSchemes } = this.props;
        resetSchemes();
        this.setState({ selectedSchemeName: null });
    };

    handleEditToggle = () => {
        this.setState(prevState => ({ isEditing: !prevState.isEditing }));
    };

    handleNameChange = (index, e) => {
        const { value } = e.target;
        this.setState(prevState => ({
            editedNames: {
                ...prevState.editedNames,
                [index]: value
            }
        }));
    };

    handleNameBlur = (index) => {
        const { editedNames } = this.state;
        const { updateSchemeName } = this.props;
        if (editedNames[index]) {
            updateSchemeName(index, editedNames[index]);
        }
    };

    renderRoomButtons = (roomTypes, roomType) => {
        const { schemes } = this.props;
        const { selectedSchemeName } = this.state;
        const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

        return roomTypes.map((roomName, index) => {
            const isActive = selectedScheme && selectedScheme[roomType].includes(roomName);
            return (
                <button
                    key={index}
                    className={`room-button ${isActive ? 'active' : ''}`}
                    onClick={() => this.handleToggleRoom(roomType, roomName)}
                >
                    {roomName}
                </button>
            );
        });
    };

    render() {
        const { showSettingsModal, onClose, schemes } = this.props;
        const { selectedSchemeName, isEditing, editedNames } = this.state;
        const selectedScheme = schemes.find(scheme => scheme.name === selectedSchemeName);

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
                                    <li
                                        key={index}
                                        className={scheme.name === selectedSchemeName ? 'selected' : ''}
                                        onClick={() => this.handleSelectScheme(scheme.name)}
                                    >
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedNames[index] || scheme.name}
                                                onChange={(e) => this.handleNameChange(index, e)}
                                                onBlur={() => this.handleNameBlur(index)}
                                            />
                                        ) : (
                                            scheme.name
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <div className="button-container">
                                <button
                                    className="button-mini"
                                    onClick={this.handleAddScheme}
                                >
                                    <i className="fa-solid fa-square-plus"></i>
                                </button>
                                <button
                                    className="button-mini"
                                    onClick={this.handleResetSchemes}
                                >
                                    <i className="fa-solid fa-trash-arrow-up"></i>
                                </button>
                                <button
                                    className="button-mini"
                                    onClick={this.handleEditToggle}
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                        </div>
                        <div className="settings-main-content">
                            {selectedScheme ? (
                                <div className="scheme-details">
                                    <div className="settings-top-container">
                                        <div className="date-inputs">
                                            <div className="date-picker-container">
                                                <label htmlFor="start-date" className="date-label">Start Date</label>
                                                <input
                                                    id="start-date"
                                                    type="date"
                                                    className="date-picker button"
                                                    value={selectedScheme.startDate}
                                                    onChange={this.handleStartDateChange}
                                                />
                                            </div>
                                            <div className="date-picker-container">
                                                <label htmlFor="end-date" className="date-label">End Date</label>
                                                <input
                                                    id="end-date"
                                                    type="date"
                                                    className="date-picker button"
                                                    value={selectedScheme.endDate}
                                                    onChange={this.handleEndDateChange}
                                                />
                                            </div>
                                            <button className="delete-button" onClick={this.handleDeleteScheme}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                        <div className="settings-details-container">
                                            <h3>{selectedScheme.name}</h3>
                                            <div>Start Date: {selectedScheme.startDate}</div>
                                            <div>End Date: {selectedScheme.endDate}</div>
                                            <div>Ascot Rooms: {selectedScheme.ascotRooms.join(', ')}</div>
                                            <div>Wide Rooms: {selectedScheme.wideRooms.join(', ')}</div>
                                            <div>57 House Rooms: {selectedScheme.house57Rooms.join(', ')}</div>
                                            <div>HyperNym Rooms: {selectedScheme.hyperNymRooms.join(', ')}</div>
                                        </div>
                                    </div>
                                    <div className="settings-middle-container">
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
                                    </div>
                                    <div className="settings-bottom-container">
                                        <h2>Settings Bottom Container</h2>
                                    </div>
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
