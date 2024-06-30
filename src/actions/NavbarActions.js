export const TOGGLE_INVENTORY_VISIBILITY = 'TOGGLE_INVENTORY_VISIBILITY';
export const SET_OCCUPANCY_DATA = 'SET_OCCUPANCY_DATA';

export const toggleInventoryVisibility = () => ({
  type: TOGGLE_INVENTORY_VISIBILITY
});

export const setOccupancyData = (data) => ({
  type: SET_OCCUPANCY_DATA,
  payload: data
});
