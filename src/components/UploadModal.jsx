import React, { useState } from 'react';

const UploadModal = ({ show, onClose, onSave }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSave = () => {
        if (file) {
            onSave(file);
            setFile(null);
        }
    };

    if (!show) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white', padding: '20px', borderRadius: '4px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', width: '300px', position: 'relative',
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '10px', right: '10px', background: 'transparent',
                    border: 'none', fontSize: '24px', cursor: 'pointer', fontWeight: 'bold', color: 'black'
                }}>×</button>
                <h2 style={{ color: 'black', }}>Upload File</h2>
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'block', marginBottom: '10px' }}
                />
                <button
                    onClick={handleSave}
                    style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default UploadModal;
