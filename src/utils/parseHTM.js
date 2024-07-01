export const parseFile = (file) => {
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
