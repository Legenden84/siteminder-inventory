import { SET_OCCUPANCY_DATA } from '../actions/OccupancyActions';

const initialState = {};

const OccupancyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OCCUPANCY_DATA:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default OccupancyReducer;
