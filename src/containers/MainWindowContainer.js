import { connect } from 'react-redux';
import { updateChosenDate } from '../actions/MainWindowActions';
import { updateKapacitet, updateSiteMinderData } from '../actions/NavbarActions';
import MainWindow from '../components/MainWindow';

const mapStateToProps = (state) => ({
    chosenDate: state.mainWindow.chosenDate,
    htmData: state.navbar.htmData,
    showKapacitet: state.navbar.showKapacitet,
    showOccupancy: state.navbar.showOccupancy,
    siteminderData: state.navbar.siteminderData,
});

const mapDispatchToProps = (dispatch) => ({
    updateChosenDate: (chosenDate) => dispatch(updateChosenDate(chosenDate)),
    updateKapacitet: (roomType, date, newValue) => dispatch(updateKapacitet(roomType, date, newValue)),
    updateSiteMinderData: (data) => dispatch(updateSiteMinderData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);