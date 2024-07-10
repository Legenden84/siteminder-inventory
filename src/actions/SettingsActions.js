export const ADD_SCHEME = 'ADD_SCHEME';
export const ADD_ROOM_TO_SCHEME = 'ADD_ROOM_TO_SCHEME';
export const REMOVE_ROOM_FROM_SCHEME = 'REMOVE_ROOM_FROM_SCHEME';
export const UPDATE_SCHEME_START_DATE = 'UPDATE_SCHEME_START_DATE';
export const UPDATE_SCHEME_END_DATE = 'UPDATE_SCHEME_END_DATE';

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

export const addRoomToScheme = (schemeName, roomType, roomName) => ({
    type: ADD_ROOM_TO_SCHEME,
    payload: {
        schemeName,
        roomType,
        roomName,
    },
});

export const removeRoomFromScheme = (schemeName, roomType, roomName) => ({
    type: REMOVE_ROOM_FROM_SCHEME,
    payload: {
        schemeName,
        roomType,
        roomName,
    },
});

export const updateSchemeStartDate = (schemeName, startDate) => ({
    type: UPDATE_SCHEME_START_DATE,
    payload: {
        schemeName,
        startDate,
    },
});

export const updateSchemeEndDate = (schemeName, endDate) => ({
    type: UPDATE_SCHEME_END_DATE,
    payload: {
        schemeName,
        endDate,
    },
});