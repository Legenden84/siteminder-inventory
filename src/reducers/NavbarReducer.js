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
            const [day, month, year] = date.split('-');
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
