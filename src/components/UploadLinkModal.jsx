// UploadLinkModal.jsx
import React, { useState, useEffect } from 'react';

const UploadLinkModal = ({ show, onClose, onSave, initialUrl = '', initialName = '' }) => {
    const [url, setUrl] = useState(initialUrl);
    const [displayName, setDisplayName] = useState(initialName);

    useEffect(() => {
        setUrl(initialUrl);
        setDisplayName(initialName);
    }, [initialUrl, initialName]);

    const handleSave = () => {
        onSave({ url, name: displayName });
        setUrl('');
        setDisplayName('');
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
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', width: '400px', position: 'relative',height:"250px"
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '10px', right: '10px', background: 'transparent',
                    border: 'none', fontSize: '24px', cursor: 'pointer', fontWeight: 'bold', color: 'black'
                }}>×</button>
                <h2 style={{color:'black',fontFamily:"sans-serif"}}>{initialName ? 'Edit Link' : 'Upload New Link'}</h2>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="URL"
                    style={{ width: '90%', padding: '8px', marginBottom: '10px',color:'black',background:"#F8F8F8" }}
                />
                <br></br>
                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Display Name"
                    style={{ width: '90%', padding: '8px', marginBottom: '10px',color:'black',background:"#F8F8F8" }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between',padding:"10px" ,marginTop:'30px' }}>
                    <button onClick={onClose} style={{ padding: '8px 16px', background: 'grey', border: 'none', color: 'white' }}>Cancel</button>
                    <button onClick={handleSave} style={{ padding: '8px 16px', background: 'green', border: 'none', color: 'white' }}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default UploadLinkModal;
