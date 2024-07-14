import React, { Component } from 'react';
import RoomPopupContainer from '../containers/RoomPopupContainer';
import './SettingsModal.css';

const ascotRoomTypes = ["D2", "D2D", "D2G", "D3", "D3D", "D4D", "E1", "TRP"];
const wideRoomTypes = ["F1", "F2", "F2S", "F3D", "F3DS"];
const house57RoomTypes = ["H1", "H2", "H3"];
const hyperNymRoomTypes = ["HY1", "HY2", "HY3"];

class SettingsModal extends Component {
    state = {
        selectedSchemeName: null,
        isEditing: false,
        editedNames: {},
    };

    handleAddScheme = () => {
        const { addScheme } = this.props;
        const newScheme = addScheme();
        if (newScheme) {
            this.setState({ selectedSchemeName: newScheme.name });
        }
    };

    handleOpenRoomPopup = (roomCategory, roomType) => {
        const roomTypesMap = {
            ascotRooms: ascotRoomTypes,
            wideRooms: wideRoomTypes,
            house57Rooms: house57RoomTypes,
            hyperNymRooms: hyperNymRoomTypes
        };
        const roomTypes = roomTypesMap[roomCategory] || [];
        this.props.openRoomPopup(roomCategory, roomType, roomTypes);
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
        const confirmReset = window.confirm("Are you sure you want to reset all SiteMinder Schemes?");
        if (confirmReset) {
            const { resetSchemes } = this.props;
            resetSchemes();
            this.setState({ selectedSchemeName: null });
        }
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

    renderRoomButtons = (roomTypes, roomCategory) => {
        return roomTypes.map((roomType, index) => (
            <button
                key={index}
                className="room-button"
                onClick={() => this.handleOpenRoomPopup(roomCategory, roomType)}
            >
                {roomType}
            </button>
        ));
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
                                            <input className="text-input"
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
                            <div className="settings-navbar-button-mini-container">
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
                                    className={`button-mini ${isEditing ? 'active' : ''}`}
                                    onClick={this.handleEditToggle}
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                        </div>
                        <div className="settings-main-container">
                            {selectedScheme ? (
                                <>
                                    <div className="settings-top-container">
                                        <div className="date-inputs">
                                            <label htmlFor="start-date" className="date-label">Start Date</label>
                                            <input
                                                id="start-date"
                                                type="date"
                                                className="date-picker button"
                                                value={selectedScheme.startDate || ''}
                                                onChange={this.handleStartDateChange}
                                            />
                                            <label htmlFor="end-date" className="date-label">End Date</label>
                                            <input
                                                id="end-date"
                                                type="date"
                                                className="date-picker button"
                                                value={selectedScheme.endDate || ''}
                                                onChange={this.handleEndDateChange}
                                            />
                                            <button className="delete-button" onClick={this.handleDeleteScheme}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                        <div className="room-buttons-container">
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
                                    </div>
                                    <div className="settings-details-container">
                                        <div className="scheme-details">
                                            <h3>{selectedScheme.name}</h3>
                                            <div>Start Date: {selectedScheme.startDate}</div>
                                            <div>End Date: {selectedScheme.endDate}</div>
                                            <div>
                                                Ascot Rooms:
                                                {Object.entries(selectedScheme.roomDistribution.ascotRooms).map(([roomType, nestedRooms]) => (
                                                    <div key={roomType}>
                                                        {roomType}: {(nestedRooms || []).join(', ')}
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                Wide Rooms:
                                                {Object.entries(selectedScheme.roomDistribution.wideRooms).map(([roomType, nestedRooms]) => (
                                                    <div key={roomType}>
                                                        {roomType}: {(nestedRooms || []).join(', ')}
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                57 House Rooms:
                                                {Object.entries(selectedScheme.roomDistribution.house57Rooms).map(([roomType, nestedRooms]) => (
                                                    <div key={roomType}>
                                                        {roomType}: {(nestedRooms || []).join(', ')}
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                HyperNym Rooms:
                                                {Object.entries(selectedScheme.roomDistribution.hyperNymRooms).map(([roomType, nestedRooms]) => (
                                                    <div key={roomType}>
                                                        {roomType}: {(nestedRooms || []).join(', ')}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="no-schemes-message">

                                </div>
                            )}
                        </div>
                    </div>
                    <RoomPopupContainer />
                </div>
            </div>
        );
    }
}

export default SettingsModal;