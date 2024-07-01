import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { parseHTMFiles, clearWarning } from '../actions/NavbarActions';

const mapStateToProps = (state) => ({
    inventory: state.navbar.inventory,
    htmData: state.navbar.htmData,
    warning: state.navbar.warning,
});

const mapDispatchToProps = (dispatch) => ({
    parseHTMFiles: (files) => dispatch(parseHTMFiles(files)),
    clearWarning: () => dispatch(clearWarning()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
