import React, { Component } from 'react';
import './SettingsModal.css';

class SettingsModal extends Component {
    render() {
        const { showSettingsModal, onClose } = this.props;
        if (!showSettingsModal) return null;

        return (
            <div className="settings-modal-overlay" onClick={onClose}>
                <div className="settings-modal-content" onClick={e => e.stopPropagation()}>
                    <div className="settings-modal-header">
                        <h2>Settings</h2>
                        <button className="button" onClick={onClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className="settings-modal-body">
                        <div className="settings-navbar">
                            <ul>
                                <li>Option 1</li>
                                <li>Option 2</li>
                                <li>Option 3</li>
                            </ul>
                        </div>
                        <div className="settings-main-content">
                            <h2>Main Content</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingsModal;
