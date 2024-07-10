import React, { Component } from 'react';
import moment from 'moment';
import './MainWindow.css';

const ascotRoomTypes = ["D2", "D2D", "D2G", "D3", "D3D", "D4D", "E1", "TRP"];
const fiftySevenRoomTypes = ["F1", "F2", "F2S", "F3D", "F3DS"];
const hyperNymRoomTypes = ["HY1", "HY2", "HY3"];
const wideRoomTypes = ["W2B", "W2D", "W3B", "W4B", "WE1"];

class MainWindow extends Component {
    initialStartDate = moment();

    constructor(props) {
        super(props);
        this.state = {
            editing: {}, // { 'roomType-date': true }
            editedValues: {}, // { 'roomType-date': value }
            slideDirection: '', // 'left' or 'right'
            startDate: this.initialStartDate,
            preloadedDates: this.generateDates(this.initialStartDate),
            preloadedData: {},
            daysToShift: 1, // New state to differentiate the number of days to shift
        };
    }

    generateDates = (startDate) => {
        const dates = [];
        const currentDate = startDate.clone();

        for (let i = 0; i < 14; i++) {
            dates.push({
                displayDate: currentDate.clone().add(i, 'days').format('DD-MM'),
                fullDate: currentDate.clone().add(i, 'days').format('DD-MM-YYYY')
            });
        }

        return dates;
    };

    getDisplayValue = (roomType, fullDate) => {
        const key = `${roomType}-${fullDate}`;
        const { preloadedData, slideDirection } = this.state;
        if (slideDirection) {
            return preloadedData[key] !== undefined ? preloadedData[key] : '';
        }

        const { htmData = {}, showKapacitet, showOccupancy } = this.props;
        const [day, month] = fullDate.split('-');
        const year = new Date().getFullYear().toString();

        if (htmData[roomType] && htmData[roomType][`${day}-${month}`]) {
            const dateEntries = htmData[roomType][`${day}-${month}`];
            const dateEntry = dateEntries.find(entry => entry.År === year);
            if (dateEntry) {
                if (showKapacitet) {
                    return dateEntry.Kapacitet;
                }
                if (showOccupancy) {
                    return dateEntry.BelægnProcent;
                }
                // Default case to show available capacity minus reserved
                const kapasitet = parseInt(dateEntry.Kapacitet, 10);
                const reserveret = parseInt(dateEntry.Reserveret, 10);
                return kapasitet - reserveret;
            }
        }
        return '';
    };

    handleChange = (e, roomType, date) => {
        this.setState({
            editedValues: { ...this.state.editedValues, [`${roomType}-${date}`]: e.target.value }
        });
    };

    handleDateChange = (days) => {
        const direction = days > 0 ? 'left' : 'right';
        const newStartDate = this.state.startDate.clone().add(days, 'days');
        const preloadedDates = this.generateDates(newStartDate);

        // Preload new data
        const preloadedData = {};
        preloadedDates.forEach(({ fullDate }) => {
            ascotRoomTypes.concat(fiftySevenRoomTypes, hyperNymRoomTypes, wideRoomTypes).forEach(roomType => {
                preloadedData[`${roomType}-${fullDate}`] = this.getDisplayValue(roomType, fullDate);
            });
        });

        this.setState({
            slideDirection: direction,
            preloadedDates,
            preloadedData,
            daysToShift: Math.abs(days)
        });
        setTimeout(() => {
            this.setState((prevState) => ({
                startDate: newStartDate,
                slideDirection: ''
            }));
        }, 500); // Duration should match the CSS animation duration
    };

    handleDoubleClick = (roomType, date) => {
        console.log("this.props.showKapacitet", this.props.showKapacitet);
        if (this.props.showKapacitet) {  // Only allow editing if showKapacitet is true
            this.setState({
                editing: { ...this.state.editing, [`${roomType}-${date}`]: true },
                editedValues: { ...this.state.editedValues, [`${roomType}-${date}`]: this.getDisplayValue(roomType, date) }
            });
        }
    };

    handleBlur = (roomType, date) => {
        const newValue = this.state.editedValues[`${roomType}-${date}`];
        this.props.updateKapacitet(roomType, date, newValue);
        this.setState({
            editing: { ...this.state.editing, [`${roomType}-${date}`]: false }
        });
    };

    renderTable = (roomTypes, title, displayValues = true) => {
        const dates = this.state.slideDirection ? this.state.preloadedDates : this.generateDates(this.state.startDate);
        const { slideDirection, daysToShift } = this.state;
        const slideClass = daysToShift === 7
            ? (slideDirection === 'left' ? 'slide-left-7' : 'slide-right-7')
            : (slideDirection === 'left' ? 'slide-left' : 'slide-right');

        return (
            <div className="table-container">
                <h3>{title}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Room</th>
                            {dates.map(({ displayDate }) => (
                                <th key={displayDate} className={slideDirection ? slideClass : ''}>
                                    {displayDate}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {roomTypes.map(room => (
                            <tr key={room}>
                                <td style={{ zIndex: 2 }}>{room}</td>
                                {dates.map(({ fullDate }) => (
                                    <td key={fullDate} className={slideDirection ? slideClass : ''}
                                        onDoubleClick={() => this.handleDoubleClick(room, fullDate)}>
                                        {displayValues && this.state.editing[`${room}-${fullDate}`] ? (
                                            <input
                                                className="edit-input"
                                                type="text"
                                                value={this.state.editedValues[`${room}-${fullDate}`]}
                                                onChange={(e) => this.handleChange(e, room, fullDate)}
                                                onBlur={() => this.handleBlur(room, fullDate)}
                                            />
                                        ) : (
                                            displayValues ? this.getDisplayValue(room, fullDate) : ''
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    resetDate = () => {
        this.setState({ startDate: this.initialStartDate });
    };

    render() {
        return (
            <div className="main-window">
                <div className="header-titles">
                    <h2>Hotel Status</h2>
                    <div className="placeholder-buttons">
                        <button className="placeholder-button" onClick={this.resetDate}>Today</button>
                        <button className="placeholder-button" onClick={() => this.handleDateChange(-7)}>-7</button>
                        <button className="placeholder-button" onClick={() => this.handleDateChange(-1)}>-1</button>
                        <button className="placeholder-button" onClick={() => this.handleDateChange(1)}>+1</button>
                        <button className="placeholder-button" onClick={() => this.handleDateChange(7)}>+7</button>
                    </div>
                    <h2>SideMinder Statistics</h2>
                </div>
                <div className="tables-container">
                    <div className="table-section">
                        {this.renderTable(ascotRoomTypes, 'Ascot Rooms')}
                        {this.renderTable(wideRoomTypes, 'Wide Rooms')}
                        {this.renderTable(fiftySevenRoomTypes, 'Fifty-Seven Rooms')}
                        {this.renderTable(hyperNymRoomTypes, 'HyperNym Rooms')}
                    </div>
                    <div className="table-section">
                        {this.renderTable(ascotRoomTypes, 'Ascot Rooms', false)}
                        {this.renderTable(wideRoomTypes, 'Wide Rooms', false)}
                        {this.renderTable(fiftySevenRoomTypes, 'Fifty-Seven Rooms', false)}
                        {this.renderTable(hyperNymRoomTypes, 'HyperNym Rooms', false)}
                    </div>
                </div>
            </div>
        );
    }
}

export default MainWindow;
