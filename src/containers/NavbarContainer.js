import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { parseHTMFiles, clearWarning } from '../actions/NavbarActions';

const mapStateToProps = (state) => ({
    inventory: state.navbar.inventory,
    warning: state.navbar.warning,
});

const mapDispatchToProps = {
    parseHTMFiles,
    clearWarning,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    onDateChange: ownProps.onDateChange,
    resetDate: ownProps.resetDate,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Navbar);