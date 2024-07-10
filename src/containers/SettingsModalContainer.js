import { connect } from 'react-redux';
import { toggleSettingsModal } from '../actions/NavbarActions';
import { addScheme } from '../actions/SettingsActions';
import SettingsModal from '../components/SettingsModal';

const mapStateToProps = (state) => ({
    showSettingsModal: state.navbar.showSettingsModal,
    schemes: state.settings.schemes,
});

const mapDispatchToProps = (dispatch) => ({
    onClose: () => dispatch(toggleSettingsModal()),
    addScheme: (scheme) => dispatch(addScheme(scheme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
