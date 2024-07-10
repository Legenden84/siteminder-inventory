import { ADD_SCHEME } from '../actions/SettingsActions';

const initialState = {
    schemes: [],
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SCHEME:
            return {
                ...state,
                schemes: [...state.schemes, action.payload],
            };
        default:
            return state;
    }
};

export default settingsReducer;
