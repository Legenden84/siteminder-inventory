import React, { Component } from 'react';
import NavbarContainer from './containers/NavbarContainer';
import MainWindowContainer from './containers/MainWindowContainer';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <NavbarContainer />
                <MainWindowContainer />
            </div>
        );
    }
}

export default App;
