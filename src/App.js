// src/App.js
import React, { Component } from 'react';
import NavbarContainer from './containers/NavbarContainer';
import MainwindowContainer from './containers/MainWindowContainer';

class App extends Component {
    render() {
        return (
            <div>
                <NavbarContainer />
                <MainwindowContainer />
            </div>
        );
    }
}

export default App;
