export const ADD_SCHEME = 'ADD_SCHEME';

export const addScheme = (name) => ({
    type: ADD_SCHEME,
    payload: {
        name,
        startDate: '',
        endDate: '',
        ascotRooms: [],
        wideRooms: [],
        house57Rooms: [],
        hyperNymRooms: [],
    },
});