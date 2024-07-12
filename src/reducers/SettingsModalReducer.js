import {
    ADD_ROOM_TO_SCHEME,
    ADD_SCHEME,
    DELETE_SCHEME,
    REMOVE_ROOM_FROM_SCHEME,
    RESET_SCHEMES,
    UPDATE_SCHEME_START_DATE,
    UPDATE_SCHEME_END_DATE,
    UPDATE_SCHEME_NAME,
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
                            roomDistribution: {
                                ...scheme.roomDistribution,
                                [action.payload.roomType]: [
                                    ...scheme.roomDistribution[action.payload.roomType],
                                    action.payload.roomName
                                ]
                            }
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
                            ...action.payload,
                            roomDistribution: {
                                ascotRooms: [],
                                wideRooms: [],
                                house57Rooms: [],
                                hyperNymRooms: []
                            }
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
                            roomDistribution: {
                                ...scheme.roomDistribution,
                                [action.payload.roomType]: scheme.roomDistribution[action.payload.roomType].filter(room => room !== action.payload.roomName)
                            }
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
        case UPDATE_SCHEME_NAME:
            return {
                ...state,
                schemes: state.schemes.map((scheme, index) =>
                    index === action.payload.index
                        ? {
                            ...scheme,
                            name: action.payload.name,
                        }
                        : scheme
                )
            };
        case RESET_SCHEMES:
            return initialState;
        default:
            return state;
    }
};

export default settingsReducer;
