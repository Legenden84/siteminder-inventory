import React, { Component } from 'react';
import NavbarContainer from './containers/NavbarContainer';
import MainWindowContainer from './containers/MainWindowContainer';
import './App.css';
import moment from 'moment';

class App extends Component {
    initialStartDate = moment();

    state = {
        startDate: this.initialStartDate,
    };

    handleDateChange = (days) => {
        this.setState((prevState) => ({
            startDate: prevState.startDate.clone().add(days, 'days'),
        }));
    };

    resetDate = () => {
        this.setState({ startDate: this.initialStartDate });
    };

    render() {
        return (
            <div>
                <NavbarContainer onDateChange={this.handleDateChange} resetDate={this.resetDate} />
                <MainWindowContainer startDate={this.state.startDate} />
            </div>
        );
    }
}

export default App;
