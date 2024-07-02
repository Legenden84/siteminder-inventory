import React, { Component } from 'react';
import './MainWindow.css';

class MainWindow extends Component {
    generateDates = (startDate) => {
        const dates = [];
        const currentDate = startDate.clone();

        for (let i = 0; i < 14; i++) {
            dates.push(currentDate.clone().add(i, 'days').format('DD-MM-YYYY'));
        }

        return dates;
    }

    getDisplayValue = (roomType, date) => {
        const { htmData = {}, showKapacitet } = this.props; // Include showKapacitet prop
        const [day, month, year] = date.split('-');
        const shortDate = `${day}-${month}`;

        if (htmData[roomType] && htmData[roomType][shortDate]) {
            const dateEntry = htmData[roomType][shortDate].find(entry => entry.År === year);
            if (dateEntry) {
                if (showKapacitet) {
                    return dateEntry.Kapacitet; // Return Kapacitet if showKapacitet is true
                }
                const kapasitet = parseInt(dateEntry.Kapacitet, 10);
                const reserveret = parseInt(dateEntry.Reserveret, 10);
                return kapasitet - reserveret;
            }
        }
        return '';
    }

    render() {
        const { inventory = {}, startDate } = this.props;
        const dates = this.generateDates(startDate);

        return (
            <div className="main-window">
                <table>
                    <thead>
                        <tr>
                            <th>Room</th>
                            {dates.map(date => (
                                <th key={date}>{date}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(inventory).map(([room]) => (
                            <tr key={room}>
                                <td>{room}</td>
                                {dates.map(date => (
                                    <td key={date}>
                                        {this.getDisplayValue(room, date)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MainWindow;
