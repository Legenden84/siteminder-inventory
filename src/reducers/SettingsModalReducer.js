import { ADD_ROOM_TO_SCHEME, ADD_SCHEME, REMOVE_ROOM_FROM_SCHEME   } from '../actions/SettingsActions';

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
        case REMOVE_ROOM_FROM_SCHEME:
            return {
                ...state,
                schemes: state.schemes.map(scheme =>
                    scheme.name === action.payload.schemeName
                        ? {
                            ...scheme,
                            [action.payload.roomType]: scheme[action.payload.roomType].filter(room => room !== action.payload.roomName)
                        }
                        : scheme
                )
            };
        default:
            return state;
    }
};

export default settingsReducer;