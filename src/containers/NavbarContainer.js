// src/containers/NavbarContainer.js
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { toggleInventoryVisibility, loadHTMData } from '../actions/NavbarActions';

const mapStateToProps = (state) => ({
  inventoryVisible: state.navbar.inventoryVisible,
  inventory: state.navbar.inventory,
  htmData: state.navbar.htmData
});

const mapDispatchToProps = {
  toggleInventoryVisibility,
  loadHTMData
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
