import React, { Component } from 'react';
import moment from 'moment';
import './MainWindow.css';

const ascotRoomTypes = ["D2", "D2D", "D2G", "D3", "D3D", "D4D", "E1", "TRP"];
const fiftySevenRoomTypes = ["F1", "F2", "F2S", "F3D", "F3DS"];
const hyperNymRoomTypes = ["HY1", "HY2", "HY3"];
const wideRoomTypes = ["W2B", "W2D", "W3B", "W4B", "WE1"];

class MainWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: {}, // { 'roomType-date': true }
            editedValues: {}, // { 'roomType-date': value }
            slideDirection: '', // 'left' or 'right'
            preloadedDates: this.generateDates(props.chosenDate),
            preloadedData: {},
            daysToShift: 1, // New state to differentiate the number of days to shift
        };
    }

    componentDidMount() {
        const { chosenDate, updateChosenDate } = this.props;
        if (!chosenDate) {
            updateChosenDate(moment().format('DD-MM-YYYY'));
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chosenDate !== this.props.chosenDate || prevProps.htmData !== this.props.htmData || prevProps.siteminderData !== this.props.siteminderData) {
            this.setState({ preloadedDates: this.generateDates(this.props.chosenDate) });
        }
    }

    generateDates = (startDate) => {
        const dates = [];
        const currentDate = moment(startDate, 'DD-MM-YYYY');

        for (let i = 0; i < 14; i++) {
            const date = currentDate.clone().add(i, 'days');
            const displayDate = date.isValid() ? date.format('DD-MM') : 'Invalid date';
            const fullDate = date.isValid() ? date.format('DD-MM-YYYY') : `Invalid-${i}`;
            dates.push({
                displayDate,
                fullDate
            });
        }

        return dates;
    };

    getDisplayValue = (roomType, fullDate, showKapacitet, showOccupancy, data) => {
        const date = moment(fullDate, 'DD-MM-YYYY');
        if (!date.isValid()) {
            // console.error('Invalid date:', fullDate);
            return '';
        }

        const day = date.format('DD');
        const month = date.format('MM');
        const year = date.format('YYYY');

        // Check if the data for the specified room type and date exists
        if (!data || !data[roomType] || !data[roomType][`${day}-${month}`]) {
            // console.error('Data is missing for:', roomType, fullDate);
            return ''; // Return empty string if data is missing
        }

        const dateEntries = data[roomType][`${day}-${month}`];
        const dateEntry = dateEntries.find(entry => entry.År === year);
        if (!dateEntry) return '';

        if (showKapacitet) {
            return dateEntry.Kapacitet;
        } else if (showOccupancy) {
            return dateEntry.BelægnProcent;
        }

        const kapacitet = parseInt(dateEntry.Kapacitet, 10);
        const reserveret = parseInt(dateEntry.Reserveret, 10);
        const available = isNaN(kapacitet - reserveret) ? '' : (kapacitet - reserveret).toString();

        return available;
    };

    handleChange = (e, roomType, date) => {
        this.setState({
            editedValues: { ...this.state.editedValues, [`${roomType}-${date}`]: e.target.value }
        });
    };

    handleDateChange = (days) => {
        const { chosenDate, updateChosenDate } = this.props;
        const direction = days > 0 ? 'left' : 'right';
        const newChosenDate = moment(chosenDate, 'DD-MM-YYYY').add(days, 'days').format('DD-MM-YYYY');
        updateChosenDate(newChosenDate);

        const preloadedDates = this.generateDates(newChosenDate);
        const preloadedData = {};
        preloadedDates.forEach(({ fullDate }) => {
            ascotRoomTypes.concat(fiftySevenRoomTypes, hyperNymRoomTypes, wideRoomTypes).forEach(roomType => {
                preloadedData[`${roomType}-${fullDate}`] = this.getDisplayValue(roomType, fullDate, this.props.showKapacitet, this.props.showOccupancy, this.props.htmData);
            });
        });

        this.setState({
            slideDirection: direction,
            preloadedDates,
            preloadedData,
            daysToShift: Math.abs(days)
        });

        setTimeout(() => {
            this.setState({
                slideDirection: ''
            });
        }, 500); // Duration should match the CSS animation duration
    };

    handleChosenDateChange = (e) => {
        const { updateChosenDate } = this.props;
        updateChosenDate(moment(e.target.value, 'YYYY-MM-DD').format('DD-MM-YYYY'));
    };

    handleDoubleClick = (roomType, date) => {
        if (this.props.showKapacitet) {
            this.setState({
                editing: { ...this.state.editing, [`${roomType}-${date}`]: true },
                editedValues: { ...this.state.editedValues, [`${roomType}-${date}`]: this.getDisplayValue(roomType, date, this.props.showKapacitet, this.props.showOccupancy, this.props.htmData) }
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

    renderTable = (roomTypes, title, showKapacitet, showOccupancy, data, displayValues = true) => {
        const dates = this.state.slideDirection ? this.state.preloadedDates : this.generateDates(this.props.chosenDate);
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
                            {dates.map(({ displayDate }, index) => (
                                <th key={index} className={slideDirection ? slideClass : ''}>
                                    {displayDate}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {roomTypes.map(room => (
                            <tr key={room}>
                                <td style={{ zIndex: 2 }}>{room}</td>
                                {dates.map(({ fullDate }, index) => (
                                    <td key={index} className={slideDirection ? slideClass : ''}
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
                                            this.getDisplayValue(room, fullDate, showKapacitet, showOccupancy, data)
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
        const today = moment().format('DD-MM-YYYY');
        this.props.updateChosenDate(today);
    };

    render() {
        return (
            <div className="main-window">
                <div className="header-titles">
                    <h2>Hotel Status</h2>
                    <div className="placeholder-buttons">
                        <button className="button" onClick={this.resetDate}>Today</button>
                        <button className="button" onClick={() => this.handleDateChange(-7)}>-7</button>
                        <button className="button" onClick={() => this.handleDateChange(-1)}>-1</button>
                        <button className="button" onClick={() => this.handleDateChange(1)}>+1</button>
                        <button className="button" onClick={() => this.handleDateChange(7)}>+7</button>
                        <input
                            type="date"
                            className="date-picker button"
                            value={moment(this.props.chosenDate, 'DD-MM-YYYY').format('YYYY-MM-DD')}
                            onChange={this.handleChosenDateChange}
                        />
                    </div>
                    <h2>SideMinder Statistics</h2>
                </div>
                <div className="tables-container">
                    <div className="table-section">
                        {this.renderTable(ascotRoomTypes, 'Ascot Rooms', this.props.showKapacitet, this.props.showOccupancy, this.props.htmData)}
                        {this.renderTable(wideRoomTypes, 'Wide Rooms', this.props.showKapacitet, this.props.showOccupancy, this.props.htmData)}
                        {this.renderTable(fiftySevenRoomTypes, 'Fifty-Seven Rooms', this.props.showKapacitet, this.props.showOccupancy, this.props.htmData)}
                        {this.renderTable(hyperNymRoomTypes, 'HyperNym Rooms', this.props.showKapacitet, this.props.showOccupancy, this.props.htmData)}
                    </div>
                    <div className="table-section">
                        {this.renderTable(ascotRoomTypes, 'Ascot Rooms', false, false, this.props.siteminderData)}
                        {this.renderTable(wideRoomTypes, 'Wide Rooms', false, false, this.props.siteminderData)}
                        {this.renderTable(fiftySevenRoomTypes, 'Fifty-Seven Rooms', false, false, this.props.siteminderData)}
                        {this.renderTable(hyperNymRoomTypes, 'HyperNym Rooms', false, false, this.props.siteminderData)}
                    </div>
                </div>
            </div>
        );
    }
}

export default MainWindow;
