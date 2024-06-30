// src/utils/parseHTM.js
export const parseHTMFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const rows = Array.from(doc.querySelectorAll('tr'));
  
        const data = rows.slice(1).map(row => {  // Skip the header row
          const cells = row.querySelectorAll('td');
          return {
            VType: cells[0]?.textContent.trim(),
            Dato: cells[1]?.textContent.trim(),
            År: cells[2]?.textContent.trim(),
            Kapacitet: cells[3]?.textContent.trim(),
            Reserveret: cells[4]?.textContent.trim(),
            Allotment: cells[5]?.textContent.trim(),
            Ledige: cells[6]?.textContent.trim(),
            Belægn: cells[7]?.textContent.trim(),
            LedUAl: cells[8]?.textContent.trim(),
            BelægnUAllot: cells[9]?.textContent.trim(),
          };
        });
  
        resolve(data);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };
  
  export const parseAllHTMFiles = (files) => {
    return Promise.all(files.map(file => parseHTMFile(file))).then(results => {
      return results.flat();
    });
  };
  