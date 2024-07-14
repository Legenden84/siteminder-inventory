export const UPDATE_CHOSEN_DATE = 'UPDATE_CHOSEN_DATE';

export const updateChosenDate = (chosenDate) => ({
    type: UPDATE_CHOSEN_DATE,
    payload: {
        chosenDate,
    },
});