import React from 'react';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="settings-modal-overlay">
            <div className="settings-modal-content">
                <button className="close-button" onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};

export default SettingsModal;
