import { connect } from 'react-redux';
import MainWindow from '../components/MainWindow';

const mapStateToProps = state => ({
    inventory: state.navbar.inventory,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    startDate: ownProps.startDate,
});

export default connect(mapStateToProps, null, mergeProps)(MainWindow);
