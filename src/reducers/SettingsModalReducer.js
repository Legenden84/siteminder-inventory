import { ADD_ROOM_TO_SCHEME, ADD_SCHEME  } from '../actions/SettingsActions';

const initialState = {
    schemes: [],
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ROOM_TO_SCHEME:
            return {
                ...state,
                schemes: state.schemes.map(scheme =>
                    scheme.name === action.payload.schemeName
                        ? {
                            ...scheme,
                            [action.payload.roomType]: [
                                ...scheme[action.payload.roomType],
                                action.payload.roomName
                            ]
                        }
                        : scheme
                )
            };
        case ADD_SCHEME:
            return {
                ...state,
                schemes: [
                    ...state.schemes,
                    {
                        ...action.payload
                    }
                ],
            };
        default:
            return state;
    }
};

export default settingsReducer;