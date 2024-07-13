import { connect } from 'react-redux';
import {
    addScheme,
    deleteScheme,
    resetSchemes,
    toggleRoomToScheme,
    updateSchemeStartDate,
    updateSchemeEndDate,
    updateSchemeName,
    openRoomPopup,
    closeRoomPopup
} from '../actions/SettingsActions';
import { toggleSettingsModal } from '../actions/NavbarActions';
import SettingsModal from '../components/SettingsModal';

const mapStateToProps = (state) => ({
    schemes: state.settings.schemes,
    showSettingsModal: state.navbar.showSettingsModal,
});

const mapDispatchToProps = (dispatch) => ({
    onClose: () => dispatch(toggleSettingsModal()),
    addScheme: () => dispatch(addScheme()),
    deleteScheme: (schemeName) => dispatch(deleteScheme(schemeName)),
    resetSchemes: () => dispatch(resetSchemes()),
    toggleRoomToScheme: (schemeName, roomCategory, roomType, roomName) => dispatch(toggleRoomToScheme(schemeName, roomCategory, roomType, roomName)),
    updateSchemeStartDate: (schemeName, startDate) => dispatch(updateSchemeStartDate(schemeName, startDate)),
    updateSchemeEndDate: (schemeName, endDate) => dispatch(updateSchemeEndDate(schemeName, endDate)),
    updateSchemeName: (index, name) => dispatch(updateSchemeName(index, name)),
    openRoomPopup: (roomCategory, roomType) => dispatch(openRoomPopup(roomCategory, roomType)),
    closeRoomPopup: () => dispatch(closeRoomPopup())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
