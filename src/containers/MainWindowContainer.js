// MainWindowContainer.js
import { connect } from 'react-redux';
import MainWindow from '../components/MainWindow';
import { updateKapacitet } from '../actions/NavbarActions';

const mapStateToProps = state => ({
    htmData: state.navbar.htmData,
    showKapacitet: state.navbar.showKapacitet,
    showOccupancy: state.navbar.showOccupancy,
});

const mapDispatchToProps = dispatch => ({
    updateKapacitet: (roomType, date, newValue) => dispatch(updateKapacitet(roomType, date, newValue))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    startDate: ownProps.startDate,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainWindow);
