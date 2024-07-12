import { connect } from 'react-redux';
import { addRoomToScheme, addScheme, deleteScheme, removeRoomFromScheme, updateSchemeStartDate, updateSchemeEndDate, updateSchemeName, resetSchemes } from '../actions/SettingsActions';
import { toggleSettingsModal } from '../actions/NavbarActions';
import SettingsModal from '../components/SettingsModal';

const mapStateToProps = (state) => ({
    showSettingsModal: state.navbar.showSettingsModal,
    schemes: state.settings.schemes,
});

const mapDispatchToProps = (dispatch) => ({
    onClose: () => dispatch(toggleSettingsModal()),
    addScheme: (scheme) => dispatch(addScheme(scheme)),
    addRoomToScheme: (schemeName, roomCategory, roomType, roomName) => dispatch(addRoomToScheme(schemeName, roomCategory, roomType, roomName)),
    deleteScheme: (schemeName) => dispatch(deleteScheme(schemeName)),
    removeRoomFromScheme: (schemeName, roomCategory, roomType, roomName) => dispatch(removeRoomFromScheme(schemeName, roomCategory, roomType, roomName)),
    updateSchemeStartDate: (schemeName, startDate) => dispatch(updateSchemeStartDate(schemeName, startDate)),
    updateSchemeEndDate: (schemeName, endDate) => dispatch(updateSchemeEndDate(schemeName, endDate)),
    updateSchemeName: (index, name) => dispatch(updateSchemeName(index, name)),
    resetSchemes: () => dispatch(resetSchemes())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
