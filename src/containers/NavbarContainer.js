// src/containers/NavbarContainer.js
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

const mapStateToProps = state => ({
    // Add any required state mappings here
});

const mapDispatchToProps = {
    // Add any required dispatch mappings here
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
