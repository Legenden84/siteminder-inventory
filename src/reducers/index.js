import { combineReducers } from 'redux';
import mainWindowReducer from './MainWindowReducer';
import NavbarReducer from './NavbarReducer';
import settingsReducer from './SettingsModalReducer';

const rootReducer = combineReducers({
    mainWindow: mainWindowReducer,
    navbar: NavbarReducer,
    settings: settingsReducer
});

export default rootReducer;
