import React, { Component } from 'react';
import './MainWindow.css';

class MainWindow extends Component {
    render() {
        return (
            <div className="main-window">
                <h2>Main Window</h2>
                {this.props.children}
            </div>
        );
    }
}

export default MainWindow;