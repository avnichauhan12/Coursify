import React, { useState, useEffect } from 'react';

const RenameFileModal = ({ show, onClose, onSave, initialName }) => {
    const [newName, setNewName] = useState('');

    useEffect(() => {
        setNewName(initialName);
    }, [initialName]);

    const handleSave = () => {
        onSave(newName);
        setNewName('');
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
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', width: '300px', position: 'relative'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '10px', right: '10px', background: 'transparent',
                    border: 'none', fontSize: '24px', cursor: 'pointer', fontWeight: 'bold', color: 'black'
                }}>×</button>
                <h2 style={{ color: 'black' ,fontFamily:"sans-serif"}}>Rename File</h2>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="New File Name"
                    style={{ width: '90%', padding: '8px', marginBottom: '10px',color:'Black',background:"#F8F8F8",height:'15%',border:'2px solid black',borderRadius:'5px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between',marginTop:'30px' }}>
                    <button onClick={onClose} style={{ padding: '8px 16px', background: 'grey', border: 'none', color: 'white' }}>Cancel</button>
                    <button onClick={handleSave} style={{ padding: '8px 16px', background: 'green', border: 'none', color: 'white' }}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default RenameFileModal;
