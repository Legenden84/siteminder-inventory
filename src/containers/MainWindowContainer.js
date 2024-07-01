import { connect } from 'react-redux';
import MainWindow from '../components/MainWindow';

const mapStateToProps = state => ({
    // Add any required state mappings here
});

const mapDispatchToProps = {
    // Add any required dispatch mappings here
};

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);
