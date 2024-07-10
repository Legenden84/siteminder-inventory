import { connect } from 'react-redux';
import { toggleSettingsModal } from '../actions/NavbarActions';
import { addScheme, addRoomToScheme, deleteScheme, removeRoomFromScheme, updateSchemeStartDate, updateSchemeEndDate } from '../actions/SettingsActions';
import SettingsModal from '../components/SettingsModal';

const mapStateToProps = (state) => ({
    showSettingsModal: state.navbar.showSettingsModal,
    schemes: state.settings.schemes,
});

const mapDispatchToProps = (dispatch) => ({
    onClose: () => dispatch(toggleSettingsModal()),
    addScheme: (scheme) => dispatch(addScheme(scheme)),
    addRoomToScheme: (schemeName, roomType, roomName) => dispatch(addRoomToScheme(schemeName, roomType, roomName)),
    deleteScheme: (schemeName) => dispatch(deleteScheme(schemeName)),
    removeRoomFromScheme: (schemeName, roomType, roomName) => dispatch(removeRoomFromScheme(schemeName, roomType, roomName)),
    updateSchemeStartDate: (schemeName, startDate) => dispatch(updateSchemeStartDate(schemeName, startDate)),
    updateSchemeEndDate: (schemeName, endDate) => dispatch(updateSchemeEndDate(schemeName, endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
