import { connect } from 'react-redux';
import { updateKapacitet, updateSiteMinderData } from '../actions/NavbarActions';
import MainWindow from '../components/MainWindow';

const mapStateToProps = (state) => ({
    htmData: state.navbar.htmData,
    showKapacitet: state.navbar.showKapacitet,
    showOccupancy: state.navbar.showOccupancy,
    siteminderData: state.navbar.siteminderData,
});

const mapDispatchToProps = (dispatch) => ({
    updateKapacitet: (roomType, date, newValue) => dispatch(updateKapacitet(roomType, date, newValue)),
    updateSiteMinderData: (data) => dispatch(updateSiteMinderData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);
