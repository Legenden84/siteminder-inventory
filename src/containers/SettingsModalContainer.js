// SettingsModalContainer.js
import { connect } from 'react-redux';
import { toggleSettingsModal } from '../actions/NavbarActions';
import SettingsModal from '../components/SettingsModal';

const mapStateToProps = (state) => ({
    showSettingsModal: state.navbar.showSettingsModal
});

const mapDispatchToProps = (dispatch) => ({
    onClose: () => dispatch(toggleSettingsModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
