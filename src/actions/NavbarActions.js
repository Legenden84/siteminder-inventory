import { parseFile } from "../utils/parseHTM";

export const CLEAR_WARNING = 'CLEAR_WARNING';
export const FILE_UPLOAD_WARNING = 'FILE_UPLOAD_WARNING';
export const PARSE_HTM_FILES = 'PARSE_HTM_FILES';
export const RESET_STATE = 'RESET_STATE';
export const TRACK_UPLOADED_FILES = 'TRACK_UPLOADED_FILES';
export const TOGGLE_SHOW_KAPACITET = 'TOGGLE_SHOW_KAPACITET';
export const TOGGLE_SHOW_OCCUPANCY = 'TOGGLE_SHOW_OCCUPANCY';
export const UPDATE_KAPACITET = 'UPDATE_KAPACITET';

const getFileOrder = (fileName) => {
    const match = fileName.match(/Page(\d+)\.HTM$/);
    return match ? parseInt(match[1], 10) : (fileName.includes('.HTM') ? 1 : 0);
};

const sortFilesByOrder = (files) => {
    return files.sort((a, b) => {
        const orderA = getFileOrder(a.name);
        const orderB = getFileOrder(b.name);
        return orderA - orderB;
    });
};

const checkForSkippedFiles = (uploadedFiles, newFiles) => {
    const files = [...uploadedFiles, ...newFiles];
    const sortedFiles = sortFilesByOrder(files);
    let lastOrder = 0;
    const warnings = [];

    sortedFiles.forEach((file, index) => {
        const currentOrder = getFileOrder(file.name);
        if (index === 0 && currentOrder !== 1) {
            warnings.push(`The first file must be the base file without suffix.`);
        } else if (lastOrder !== 0 && currentOrder !== lastOrder + 1) {
            warnings.push(`Skipped from Page${lastOrder + 1} to Page${currentOrder}`);
        }
        lastOrder = currentOrder;
    });

    return warnings;
};

const setVTypes = (data) => {
    let currentVType = '';
    return data.map(row => {
        if (row.VType) {
            currentVType = row.VType;
        } else {
            row.VType = currentVType;
        }
        return row;
    });
};

const groupByVTypeAndDate = (data) => {
    return data.reduce((acc, row) => {
        const { VType, Dato, ...rest } = row;
        if (!acc[VType]) {
            acc[VType] = {};
        }
        if (!acc[VType][Dato]) {
            acc[VType][Dato] = [];
        }
        acc[VType][Dato].push(rest);
        return acc;
    }, {});
};

export const clearWarning = () => ({
    type: CLEAR_WARNING,
});

export const parseHTMFiles = (files) => {
    return (dispatch, getState) => {
        const state = getState();
        const uploadedFiles = state.navbar.uploadedFiles;
        const sortedFiles = sortFilesByOrder(files);
        const warnings = checkForSkippedFiles(uploadedFiles, sortedFiles);

        if (warnings.length > 0) {
            dispatch({
                type: FILE_UPLOAD_WARNING,
                payload: warnings.join(', '),
            });
            return;
        }

        Promise.all(sortedFiles.map(parseFile))
            .then((results) => {
                const combinedData = results.flat();
                const processedData = setVTypes(combinedData);
                const groupedData = groupByVTypeAndDate(processedData);
                
                // Merge new data with existing data rather than replacing it
                const currentData = state.navbar.htmData;
                const updatedData = { ...currentData };
                
                for (const [vType, dates] of Object.entries(groupedData)) {
                    if (!updatedData[vType]) {
                        updatedData[vType] = { ...dates };
                    } else {
                        for (const [date, data] of Object.entries(dates)) {
                            if (!updatedData[vType][date]) {
                                updatedData[vType][date] = [...data];
                            } else {
                                updatedData[vType][date] = [
                                    ...updatedData[vType][date],
                                    ...data
                                ];
                            }
                        }
                    }
                }

                dispatch({
                    type: PARSE_HTM_FILES,
                    payload: updatedData,
                });

                dispatch({
                    type: TRACK_UPLOADED_FILES,
                    payload: [...uploadedFiles, ...sortedFiles.map(file => ({ name: file.name, size: file.size }))],
                });
            })
            .catch((error) => {
                console.error('Error parsing HTM files:', error);
            });
    };
};

export const resetState = () => ({
    type: RESET_STATE,
});

export const toggleShowKapacitet = () => ({
    type: TOGGLE_SHOW_KAPACITET,
});

export const toggleShowOccupancy = () => ({
    type: TOGGLE_SHOW_OCCUPANCY,
});

export const updateKapacitet = (roomType, date, newValue) => ({
    type: UPDATE_KAPACITET,
    payload: { roomType, date, newValue },
});