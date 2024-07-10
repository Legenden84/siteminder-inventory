import React, { Component } from 'react';
import './SettingsModal.css';

class SettingsModal extends Component {
    handleAddScheme = () => {
        const { addScheme } = this.props;
        addScheme(`inventoryScheme${this.props.schemes.length + 1}`);
    };

    render() {
        const { showSettingsModal, onClose, schemes } = this.props;
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
                                {schemes.map((scheme, index) => (
                                    <li key={index}>{scheme}</li>
                                ))}
                                <button className="button" onClick={this.handleAddScheme}>Add Scheme</button>
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
