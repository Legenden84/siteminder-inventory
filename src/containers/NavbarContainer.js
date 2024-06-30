import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { parseHTMFiles } from '../actions/NavbarActions';

const mapStateToProps = (state) => ({
  inventory: state.navbar.inventory,
  htmData: state.navbar.htmData
});

const mapDispatchToProps = {
  parseHTMFiles
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
