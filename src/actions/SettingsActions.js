export const ADD_SCHEME = 'ADD_SCHEME';
export const ADD_ROOM_TO_SCHEME = 'ADD_ROOM_TO_SCHEME';
export const DELETE_SCHEME = 'DELETE_SCHEME';
export const REMOVE_ROOM_FROM_SCHEME = 'REMOVE_ROOM_FROM_SCHEME';
export const RESET_SCHEMES = 'RESET_SCHEMES';
export const UPDATE_SCHEME_START_DATE = 'UPDATE_SCHEME_START_DATE';
export const UPDATE_SCHEME_END_DATE = 'UPDATE_SCHEME_END_DATE';
export const UPDATE_SCHEME_NAME = 'UPDATE_SCHEME_NAME';

const getNextSchemeName = (schemes) => {
    const schemeNumbers = schemes
        .map(scheme => parseInt(scheme.name.split(' ')[1], 10))
        .filter(number => !isNaN(number));
    const nextNumber = schemeNumbers.length > 0 ? Math.max(...schemeNumbers) + 1 : 1;
    return `Scheme ${nextNumber}`;
};

export const addScheme = () => (dispatch, getState) => {
    const { schemes } = getState().settings;
    const newSchemeName = getNextSchemeName(schemes);
    dispatch({
        type: ADD_SCHEME,
        payload: {
            name: newSchemeName,
            startDate: '',
            endDate: '',
            roomDistribution: {
                ascotRooms: [],
                wideRooms: [],
                house57Rooms: [],
                hyperNymRooms: []
            }
        },
    });
};


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

export const resetSchemes = () => ({
    type: RESET_SCHEMES,
});

export const deleteScheme = (schemeName) => ({
    type: DELETE_SCHEME,
    payload: {
        schemeName,
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

export const updateSchemeName = (index, name) => ({
    type: UPDATE_SCHEME_NAME,
    payload: {
        index,
        name,
    },
});