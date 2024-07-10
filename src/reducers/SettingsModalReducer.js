import { ADD_SCHEME } from '../actions/SettingsActions';

const initialState = {
    schemes: [],
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SCHEME:
            return {
                ...state,
                schemes: [
                    ...state.schemes,
                    {
                        name: action.payload,
                        startDate: '',
                        endDate: '',
                        ascotRooms: [],
                        wideRooms: [],
                        house57Rooms: [],
                        hyperNymRooms: []
                    }
                ],
            };
        default:
            return state;
    }
};

export default settingsReducer;