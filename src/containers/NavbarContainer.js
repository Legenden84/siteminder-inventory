import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { parseHTMFiles, clearWarning, toggleShowKapacitet } from '../actions/NavbarActions';

const mapStateToProps = (state) => ({
    inventory: state.navbar.inventory,
    warning: state.navbar.warning,
    showKapacitet: state.navbar.showKapacitet, // Add showKapacitet state
});

const mapDispatchToProps = {
    parseHTMFiles,
    clearWarning,
    toggleShowKapacitet, // Add the action creator to dispatch props
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    onDateChange: ownProps.onDateChange,
    resetDate: ownProps.resetDate,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Navbar);
