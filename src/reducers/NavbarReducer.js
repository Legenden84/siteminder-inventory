import {
    SET_OCCUPANCY_DATA,
    LOAD_HTM_DATA
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
    htmData: []
};

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OCCUPANCY_DATA:
            return {
                ...state,
                inventory: action.payload
            };
        case LOAD_HTM_DATA:
            return {
                ...state,
                htmData: action.payload
            };
        default:
            return state;
    }
};

export default navbarReducer;
