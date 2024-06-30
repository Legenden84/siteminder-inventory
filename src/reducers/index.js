import { combineReducers } from 'redux';
import NavbarReducer from './NavbarReducer';
import OccupancyReducer from './OccupancyReducer';

const rootReducer = combineReducers({
    navbar: NavbarReducer,
    occupancy: OccupancyReducer,
});

export default rootReducer;
