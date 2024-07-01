import React from 'react';
import './WarningModal.css';

const WarningModal = ({ warning, onClose }) => {
    if (!warning) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Warning</h2>
                <p>{warning}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default WarningModal;
