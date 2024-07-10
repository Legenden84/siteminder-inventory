export const ADD_SCHEME = 'ADD_SCHEME';
export const ADD_ROOM_TO_SCHEME = 'ADD_ROOM_TO_SCHEME';

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