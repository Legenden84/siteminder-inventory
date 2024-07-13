import {
    ADD_SCHEME,
    CLEAR_SELECTED_ROOMS,
    DELETE_SCHEME,
    RESET_SCHEMES,
    TOGGLE_ROOM_TO_SCHEME,
    UPDATE_SCHEME_START_DATE,
    UPDATE_SCHEME_END_DATE,
    UPDATE_SCHEME_NAME,
    OPEN_ROOM_POPUP,
    CLOSE_ROOM_POPUP
} from '../actions/SettingsActions';

const initialState = {
    schemes: [],
    selectedScheme: null,
    currentRoomType: null,
    currentRoomCategory: null,
    roomTypes: [],
    isRoomPopupOpen: false
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SCHEME:
            const newScheme = {
                ...action.payload,
                roomDistribution: {
                    ascotRooms: [],
                    wideRooms: [],
                    house57Rooms: [],
                    hyperNymRooms: []
                }
            };
            return {
                ...state,
                schemes: [...state.schemes, newScheme],
                selectedScheme: newScheme
            };
        case CLEAR_SELECTED_ROOMS:
            const schemesAfterClear = state.schemes.map(scheme =>
                scheme.name === action.payload.schemeName
                    ? {
                        ...scheme,
                        roomDistribution: {
                            ...scheme.roomDistribution,
                            [action.payload.roomCategory]: {
                                ...scheme.roomDistribution[action.payload.roomCategory],
                                [action.payload.roomType]: []
                            }
                        }
                    }
                    : scheme
            );
            return {
                ...state,
                schemes: schemesAfterClear,
                selectedScheme: schemesAfterClear.find(scheme => scheme.name === state.selectedScheme?.name)
            };
        case DELETE_SCHEME:
            const updatedSchemes = state.schemes.filter(scheme => scheme.name !== action.payload.schemeName);
            return {
                ...state,
                schemes: updatedSchemes,
                selectedScheme: state.selectedScheme?.name === action.payload.schemeName ? null : state.selectedScheme
            };
        case RESET_SCHEMES:
            return initialState;
        case TOGGLE_ROOM_TO_SCHEME:
            const updatedRoomSchemes = state.schemes.map(scheme =>
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
            );
            return {
                ...state,
                schemes: updatedRoomSchemes,
                selectedScheme: updatedRoomSchemes.find(scheme => scheme.name === state.selectedScheme?.name)
            };
        case UPDATE_SCHEME_START_DATE:
            const updatedStartDateSchemes = state.schemes.map(scheme =>
                scheme.name === action.payload.schemeName
                    ? { ...scheme, startDate: action.payload.startDate }
                    : scheme
            );
            return {
                ...state,
                schemes: updatedStartDateSchemes,
                selectedScheme: updatedStartDateSchemes.find(scheme => scheme.name === state.selectedScheme?.name)
            };
        case UPDATE_SCHEME_END_DATE:
            const updatedEndDateSchemes = state.schemes.map(scheme =>
                scheme.name === action.payload.schemeName
                    ? { ...scheme, endDate: action.payload.endDate }
                    : scheme
            );
            return {
                ...state,
                schemes: updatedEndDateSchemes,
                selectedScheme: updatedEndDateSchemes.find(scheme => scheme.name === state.selectedScheme?.name)
            };
        case UPDATE_SCHEME_NAME:
            const updatedNameSchemes = state.schemes.map((scheme, index) =>
                index === action.payload.index
                    ? { ...scheme, name: action.payload.name }
                    : scheme
            );
            return {
                ...state,
                schemes: updatedNameSchemes,
                selectedScheme: updatedNameSchemes.find(scheme => scheme.name === state.selectedScheme?.name)
            };
        case OPEN_ROOM_POPUP:
            return {
                ...state,
                isRoomPopupOpen: true,
                currentRoomType: action.payload.roomType,
                currentRoomCategory: action.payload.roomCategory,
                roomTypes: action.payload.roomTypes
            };
        case CLOSE_ROOM_POPUP:
            return {
                ...state,
                isRoomPopupOpen: false,
                currentRoomType: null,
                currentRoomCategory: null,
                roomTypes: []
            };
        default:
            return state;
    }
};

export default settingsReducer;
