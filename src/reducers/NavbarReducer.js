import {
    PARSE_HTM_FILES,
    FILE_UPLOAD_WARNING,
    TRACK_UPLOADED_FILES,
    CLEAR_WARNING,
    TOGGLE_SHOW_KAPACITET,
    TOGGLE_SHOW_OCCUPANCY,
    UPDATE_KAPACITET
} from '../actions/NavbarActions';

const initialState = {
    inventory: {
        D2: 52,
        D2D: 27,
        D2G: 11,
        D3: 8,
        D3D: 7,
        D4D: 1,
        E1: 3,
        F1: 4,
        F2: 17,
        F2S: 7,
        F3D: 2,
        F3DS: 2,
        HY1: 1,
        HY2: 5,
        HY3: 3,
        TRP: 4,
        W2B: 10,
        W2D: 45,
        W3B: 2,
        W3D: 31,
        W4B: 4,
        WE1: 11
    },
    htmData: {},
    uploadedFiles: [],
    warning: null,
    showKapacitet: false,
    showOccupancy: false,
};

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case PARSE_HTM_FILES:
            return {
                ...state,
                htmData: action.payload,
                warning: null,
            };
        case FILE_UPLOAD_WARNING:
            return {
                ...state,
                warning: action.payload
            };
        case TRACK_UPLOADED_FILES:
            return {
                ...state,
                uploadedFiles: action.payload
            };
        case CLEAR_WARNING:
            return {
                ...state,
                warning: null
            };
        case TOGGLE_SHOW_KAPACITET:
            return {
                ...state,
                showKapacitet: !state.showKapacitet,
                showOccupancy: state.showKapacitet ? state.showOccupancy : false,
            };
        case TOGGLE_SHOW_OCCUPANCY:
            return {
                ...state,
                showOccupancy: !state.showOccupancy,
                showKapacitet: state.showOccupancy ? state.showKapacitet : false,
            };
        case UPDATE_KAPACITET:
            const { roomType, date, newValue } = action.payload;
            const [day, month, year] = date.split('-'); // Extract year from date
            const shortDate = `${day}-${month}`;
            const updatedData = { ...state.htmData };

            if (updatedData[roomType] && updatedData[roomType][shortDate]) {
                updatedData[roomType][shortDate] = updatedData[roomType][shortDate].map(entry =>
                    entry.År === year ? { ...entry, Kapacitet: newValue } : entry
                );
            }

            return {
                ...state,
                htmData: updatedData,
            };
        default:
            return state;
    }
};

export default navbarReducer;
