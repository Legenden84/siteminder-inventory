const initialState = {
    Inventory: {
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
    }
}

const roomMappingReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default roomMappingReducer;