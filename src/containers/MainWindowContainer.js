import { connect } from 'react-redux';
import { updateKapacitet } from '../actions/NavbarActions';
import MainWindow from '../components/MainWindow';

const mapStateToProps = (state) => ({
    htmData: state.navbar.htmData,
    showKapacitet: state.navbar.showKapacitet,
    showOccupancy: state.navbar.showOccupancy,
});

const mapDispatchToProps = (dispatch) => ({
    updateKapacitet: (roomType, date, newValue) => dispatch(updateKapacitet(roomType, date, newValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);
