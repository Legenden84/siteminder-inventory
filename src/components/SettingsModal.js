import React from 'react';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="settings-modal-overlay">
            <div className="settings-modal-content">
                <div className="settings-modal-header">
                    <h2>{title}</h2>
                    <button className="button close-button" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="settings-modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
