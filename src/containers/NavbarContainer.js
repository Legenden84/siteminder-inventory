import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { clearWarning, parseHTMFiles, toggleShowOccupancy, toggleShowKapacitet } from '../actions/NavbarActions';

const mapStateToProps = (state) => ({
    inventory: state.navbar.inventory,
    warning: state.navbar.warning,
    showKapacitet: state.navbar.showKapacitet,
    showOccupancy: state.navbar.showOccupancy,
});

const mapDispatchToProps = (dispatch) => ({
    clearWarning: () => dispatch(clearWarning()),
    parseHTMFiles: (files) => dispatch(parseHTMFiles(files)),
    toggleShowOccupancy: () => dispatch(toggleShowOccupancy()),
    toggleShowKapacitet: () => dispatch(toggleShowKapacitet())
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    onDateChange: ownProps.onDateChange,
    resetDate: ownProps.resetDate,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Navbar);
