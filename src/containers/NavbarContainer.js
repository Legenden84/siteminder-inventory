import { connect } from 'react-redux';
import {
    clearWarning,
    parseHTMFiles,
    resetState,
    toggleSettingsModal,
    toggleShowOccupancy,
    toggleShowKapacitet,
    updateSiteMinderData
} from '../actions/NavbarActions';
import Navbar from '../components/Navbar';

const mapStateToProps = (state) => ({
    showSettingsModal: state.navbar.showSettingsModal,
    showKapacitet: state.navbar.showKapacitet,
    showOccupancy: state.navbar.showOccupancy,
    siteminderData: state.navbar.siteminderData,
    uploadedFiles: state.navbar.uploadedFiles,
    warning: state.navbar.warning
});

const mapDispatchToProps = (dispatch) => ({
    clearWarning: () => dispatch(clearWarning()),
    parseHTMFiles: (files) => dispatch(parseHTMFiles(files)),
    resetState: () => dispatch(resetState()),
    toggleSettingsModal: () => dispatch(toggleSettingsModal()),
    toggleShowOccupancy: () => dispatch(toggleShowOccupancy()),
    toggleShowKapacitet: () => dispatch(toggleShowKapacitet()),
    updateSiteMinderData: (data) => dispatch(updateSiteMinderData(data))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    onDateChange: ownProps.onDateChange,
    resetDate: ownProps.resetDate,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Navbar);
