import React, { Component } from 'react';
import './MainWindow.css';
import moment from 'moment';

class MainWindow extends Component {
    generateDates = () => {
        const dates = [];
        const currentDate = moment();

        for (let i = 0; i < 14; i++) {
            dates.push(currentDate.clone().add(i, 'days').format('DD-MM-YYYY'));
        }

        return dates;
    }

    render() {
        const { inventory = {} } = this.props;
        const dates = this.generateDates();

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
