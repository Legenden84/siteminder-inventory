import {
    ADD_SCHEME,
    DELETE_SCHEME,
    RESET_SCHEMES,
    TOGGLE_ROOM_TO_SCHEME,
    UPDATE_SCHEME_START_DATE,
    UPDATE_SCHEME_END_DATE,
    UPDATE_SCHEME_NAME,
} from '../actions/SettingsActions';

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
        case RESET_SCHEMES:
            return initialState;
            case TOGGLE_ROOM_TO_SCHEME:
                return {
                    ...state,
                    schemes: state.schemes.map(scheme =>
                        scheme.name === action.payload.schemeName
                            ? {
                                ...scheme,
                                roomDistribution: {
                                    ...scheme.roomDistribution,
                                    [action.payload.roomCategory]: {
                                        ...scheme.roomDistribution[action.payload.roomCategory],
                                        [action.payload.roomType]: scheme.roomDistribution[action.payload.roomCategory][action.payload.roomType]?.includes(action.payload.roomName)
                                            ? scheme.roomDistribution[action.payload.roomCategory][action.payload.roomType].filter(room => room !== action.payload.roomName)
                                            : [
                                                ...(scheme.roomDistribution[action.payload.roomCategory][action.payload.roomType] || []),
                                                action.payload.roomName
                                            ]
                                    }
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
        default:
            return state;
    }
};

export default settingsReducer;
