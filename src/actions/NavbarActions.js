import { parseFile } from "../utils/parseHTM";

export const PARSE_HTM_FILES = 'PARSE_HTM_FILES';

export const parseHTMFiles = (files) => {
    return (dispatch) => {
        Promise.all(files.map(parseFile))
            .then((results) => {
                const combinedData = results.flat();
                dispatch({
                    type: PARSE_HTM_FILES,
                    payload: combinedData,
                });
            })
            .catch((error) => {
                console.error('Error parsing HTM files:', error);
            });
    };
};
