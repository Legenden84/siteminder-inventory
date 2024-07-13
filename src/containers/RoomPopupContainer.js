import { connect } from 'react-redux';
import { toggleRoomToScheme, openRoomPopup, closeRoomPopup, clearSelectedRooms } from '../actions/SettingsActions';
import RoomPopup from '../components/RoomPopup';

const mapStateToProps = (state) => ({
    selectedScheme: state.settings.selectedScheme,
    currentRoomType: state.settings.currentRoomType,
    currentRoomCategory: state.settings.currentRoomCategory,
    roomTypes: state.settings.roomTypes,
    isRoomPopupOpen: state.settings.isRoomPopupOpen
});

const mapDispatchToProps = (dispatch) => ({
    toggleRoomToScheme: (schemeName, roomCategory, roomType, roomName) => dispatch(toggleRoomToScheme(schemeName, roomCategory, roomType, roomName)),
    openRoomPopup: (roomCategory, roomType) => dispatch(openRoomPopup(roomCategory, roomType)),
    closeRoomPopup: () => dispatch(closeRoomPopup()),
    clearSelectedRooms: (schemeName, roomCategory, roomType) => dispatch(clearSelectedRooms(schemeName, roomCategory, roomType))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomPopup);
