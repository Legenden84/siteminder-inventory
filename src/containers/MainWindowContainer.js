import { connect } from 'react-redux';
import MainWindow from '../components/MainWindow';

const mapStateToProps = state => ({
    inventory: state.navbar.inventory,
});

export default connect(mapStateToProps)(MainWindow);
