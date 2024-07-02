import { connect } from 'react-redux';
import MainWindow from '../components/MainWindow';

const mapStateToProps = state => ({
    htmData: state.navbar.htmData,
    showKapacitet: state.navbar.showKapacitet, 
    showOccupancy: state.navbar.showOccupancy,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    startDate: ownProps.startDate,
});

export default connect(mapStateToProps, null, mergeProps)(MainWindow);
