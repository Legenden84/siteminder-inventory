export const TOGGLE_INVENTORY_VISIBILITY = 'TOGGLE_INVENTORY_VISIBILITY';
export const SET_OCCUPANCY_DATA = 'SET_OCCUPANCY_DATA';
export const LOAD_HTM_DATA = 'LOAD_HTM_DATA';
export const PARSE_HTM_FILES = 'PARSE_HTM_FILES';

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

export const parseHTMFiles = (files) => {
  return (dispatch) => {
    const parseFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(event.target.result, 'text/html');
          const rows = Array.from(doc.querySelectorAll('table tr'));

          // Find the index of the header row
          const headerIndex = rows.findIndex(row => {
            const columns = row.querySelectorAll('td');
            return columns.length >= 10 && columns[0].textContent.includes('VType');
          });

          // Start parsing from the row after the header row
          const parsedData = rows.slice(headerIndex + 1).map(row => {
            const columns = row.querySelectorAll('td');
            if (columns.length >= 10) {
              return {
                VType: columns[0].textContent.trim(),
                Dato: columns[1].textContent.trim(),
                År: columns[2].textContent.trim(),
                Kapacitet: columns[3].textContent.trim(),
                Reserveret: columns[4].textContent.trim(),
                Allotment: columns[5].textContent.trim(),
                Ledige: columns[6].textContent.trim(),
                BelægnProcent: columns[7].textContent.trim(),
                LedUAl: columns[8].textContent.trim(),
                BelægnProcentUAl: columns[9].textContent.trim(),
              };
            } else {
              return null; // If row doesn't have the correct number of columns, return null
            }
          }).filter(row => row !== null); // Filter out any null rows

          resolve(parsedData);
        };
        reader.onerror = reject;
        reader.readAsText(file);
      });
    };

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
