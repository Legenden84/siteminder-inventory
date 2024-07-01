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
                        {Object.entries(inventory).map(([room, value]) => (
                            <tr key={room}>
                                <td>{room}</td>
                                {dates.map(date => (
                                    <td key={date}></td>
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
