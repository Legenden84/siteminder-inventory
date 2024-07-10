import { connect } from 'react-redux';
import { toggleSettingsModal } from '../actions/NavbarActions';
import { addScheme, addRoomToScheme, removeRoomFromScheme } from '../actions/SettingsActions';
import SettingsModal from '../components/SettingsModal';

const mapStateToProps = (state) => ({
    showSettingsModal: state.navbar.showSettingsModal,
    schemes: state.settings.schemes,
});

const mapDispatchToProps = (dispatch) => ({
    onClose: () => dispatch(toggleSettingsModal()),
    addScheme: (scheme) => dispatch(addScheme(scheme)),
    addRoomToScheme: (schemeName, roomType, roomName) => dispatch(addRoomToScheme(schemeName, roomType, roomName)),
    removeRoomFromScheme: (schemeName, roomType, roomName) => dispatch(removeRoomFromScheme(schemeName, roomType, roomName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
