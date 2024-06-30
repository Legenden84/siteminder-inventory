import { combineReducers } from "redux";
import roomMappingReducer from "./roomMappingReducer";

const rootReducer = combineReducers({
    roomMappingReducer: roomMappingReducer
});

export default rootReducer;