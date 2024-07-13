import { connect } from 'react-redux';
import { toggleRoomToScheme, openRoomPopup, closeRoomPopup } from '../actions/SettingsActions';
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
    closeRoomPopup: () => dispatch(closeRoomPopup())
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomPopup);
