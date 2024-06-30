// src/actions/NavbarActions.js
export const TOGGLE_INVENTORY_VISIBILITY = 'TOGGLE_INVENTORY_VISIBILITY';
export const SET_OCCUPANCY_DATA = 'SET_OCCUPANCY_DATA';
export const LOAD_HTM_DATA = 'LOAD_HTM_DATA';

export const toggleInventoryVisibility = () => ({
  type: TOGGLE_INVENTORY_VISIBILITY
});

export const setOccupancyData = (data) => ({
  type: SET_OCCUPANCY_DATA,
  payload: data
});

export const loadHTMData = (data) => ({
  type: LOAD_HTM_DATA,
  payload: data
});
