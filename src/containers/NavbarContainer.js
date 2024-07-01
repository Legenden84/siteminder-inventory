import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { parseHTMFiles } from '../actions/NavbarActions';

const mapStateToProps = (state) => ({
    inventory: state.navbar.inventory,
    htmData: state.navbar.htmData
});

const mapDispatchToProps = (dispatch) => ({
    parseHTMFiles: (files) => dispatch(parseHTMFiles(files))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
