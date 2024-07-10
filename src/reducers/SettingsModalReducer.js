import {
    ADD_ROOM_TO_SCHEME,
    ADD_SCHEME,
    DELETE_SCHEME,
    REMOVE_ROOM_FROM_SCHEME,
    UPDATE_SCHEME_START_DATE,
    UPDATE_SCHEME_END_DATE
} from '../actions/SettingsActions';

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
        case DELETE_SCHEME:
            return {
                ...state,
                schemes: state.schemes.filter(scheme => scheme.name !== action.payload.schemeName),
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
        case UPDATE_SCHEME_START_DATE:
            return {
                ...state,
                schemes: state.schemes.map(scheme =>
                    scheme.name === action.payload.schemeName
                        ? {
                            ...scheme,
                            startDate: action.payload.startDate,
                        }
                        : scheme
                )
            };
        case UPDATE_SCHEME_END_DATE:
            return {
                ...state,
                schemes: state.schemes.map(scheme =>
                    scheme.name === action.payload.schemeName
                        ? {
                            ...scheme,
                            endDate: action.payload.endDate,
                        }
                        : scheme
                )
            };
        default:
            return state;
    }
};

export default settingsReducer;