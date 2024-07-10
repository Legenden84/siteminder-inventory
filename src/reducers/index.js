import { combineReducers } from 'redux';
import NavbarReducer from './NavbarReducer';
import settingsReducer from './SettingsModalReducer';

const rootReducer = combineReducers({
    navbar: NavbarReducer,
    settings: settingsReducer
});

export default rootReducer;
