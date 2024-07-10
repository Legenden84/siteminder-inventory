import { UPDATE_CHOSEN_DATE } from '../actions/MainWindowActions';

const initialState = {
    chosenDate: null,
};

const mainWindowReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CHOSEN_DATE:
            return {
                ...state,
                chosenDate: action.payload.chosenDate,
            };
        default:
            return state;
    }
};

export default mainWindowReducer;
