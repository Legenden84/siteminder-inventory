// MainWindow.js
import React, { Component } from 'react';
import './MainWindow.css';

const roomTypes = ["D2", "D2D", "D2G", "D3", "D3D", "D4D", "E1", "F1", "F2", "F2S", "F3D", "F3DS", "HY1", "HY2", "HY3", "TRP", "W2B", "W2D", "W3B", "W4B", "WE1"];

class MainWindow extends Component {
    state = {
        editing: {}, // { 'roomType-date': true }
        editedValues: {}, // { 'roomType-date': value }
    };

    generateDates = (startDate) => {
        const dates = [];
        const currentDate = startDate.clone();

        for (let i = 0; i < 14; i++) {
            dates.push(currentDate.clone().add(i, 'days').format('DD-MM-YYYY'));
        }

        return dates;
    }

    getDisplayValue = (roomType, date) => {
        const { htmData = {}, showKapacitet, showOccupancy } = this.props;
        const [day, month, year] = date.split('-');
        const shortDate = `${day}-${month}`;

        if (htmData[roomType] && htmData[roomType][shortDate]) {
            const dateEntry = htmData[roomType][shortDate].find(entry => entry.År === year);
            if (dateEntry) {
                if (showKapacitet) {
                    return dateEntry.Kapacitet;
                }
                if (showOccupancy) {
                    return dateEntry.BelægnProcent;
                }
                const kapasitet = parseInt(dateEntry.Kapacitet, 10);
                const reserveret = parseInt(dateEntry.Reserveret, 10);
                return kapasitet - reserveret;
            }
        }
        return '';
    }

    handleDoubleClick = (roomType, date) => {
        if (this.props.showKapacitet) { // Check if the Inventory button is toggled on
            this.setState({
                editing: { ...this.state.editing, [`${roomType}-${date}`]: true },
                editedValues: { ...this.state.editedValues, [`${roomType}-${date}`]: this.getDisplayValue(roomType, date) }
            });
        }
    }

    handleChange = (e, roomType, date) => {
        this.setState({
            editedValues: { ...this.state.editedValues, [`${roomType}-${date}`]: e.target.value }
        });
    }

    handleBlur = (roomType, date) => {
        const newValue = this.state.editedValues[`${roomType}-${date}`];
        this.props.updateKapacitet(roomType, date, newValue);
        this.setState({
            editing: { ...this.state.editing, [`${roomType}-${date}`]: false }
        });
    }

    render() {
        const { startDate } = this.props;
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
                        {roomTypes.map(room => (
                            <tr key={room}>
                                <td>{room}</td>
                                {dates.map(date => (
                                    <td key={date} onDoubleClick={() => this.handleDoubleClick(room, date)}>
                                        {this.state.editing[`${room}-${date}`] ? (
                                            <input
                                                className="edit-input"
                                                type="text"
                                                value={this.state.editedValues[`${room}-${date}`]}
                                                onChange={(e) => this.handleChange(e, room, date)}
                                                onBlur={() => this.handleBlur(room, date)}
                                            />
                                        ) : (
                                            this.getDisplayValue(room, date)
                                        )}
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
