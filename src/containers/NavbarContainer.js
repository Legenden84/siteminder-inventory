import { connect } from 'react-redux';
import { clearWarning, parseHTMFiles, resetState, toggleShowOccupancy, toggleShowKapacitet } from '../actions/NavbarActions';
import Navbar from '../components/Navbar';

const mapStateToProps = (state) => ({
    warning: state.navbar.warning,
    showKapacitet: state.navbar.showKapacitet,
    showOccupancy: state.navbar.showOccupancy,
    uploadedFiles: state.navbar.uploadedFiles
});

const mapDispatchToProps = (dispatch) => ({
    clearWarning: () => dispatch(clearWarning()),
    parseHTMFiles: (files) => dispatch(parseHTMFiles(files)),
    resetState: () => dispatch(resetState()),
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
