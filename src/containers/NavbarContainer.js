import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { loadHTMData } from '../actions/NavbarActions';

const mapStateToProps = (state) => ({
  inventory: state.navbar.inventory,
  htmData: state.navbar.htmData
});

const mapDispatchToProps = {
  loadHTMData
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
