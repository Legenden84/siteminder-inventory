import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { setOccupancyData, toggleInventoryVisibility } from '../actions/NavbarActions';

const mapStateToProps = (state) => ({
  inventoryVisible: state.navbar.inventoryVisible,
  inventory: state.navbar.inventory
});

const mapDispatchToProps = {
  toggleInventoryVisibility,
  setOccupancyData
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
