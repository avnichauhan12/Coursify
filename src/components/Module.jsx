// ModuleModal.js
import React, { useState, useEffect } from 'react';

const Module = ({ show, onClose, onSave, initialName }) => {
    const [moduleName, setModuleName] = useState(initialName || '');

    useEffect(() => {
        setModuleName(initialName || '');
    }, [initialName]);

    const handleSave = () => {
        onSave(moduleName);
        setModuleName('');
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
                <h2 style={{color:'black',fontFamily:"sans-serif"}}>{initialName ? 'Edit Module' : 'Create New Module'}</h2>
                <input
                    type="text"
                    value={moduleName}
                    onChange={(e) => setModuleName(e.target.value)}
                    placeholder="Module Name"
                    style={{ width: '90%', padding: '8px', marginBottom: '10px',color:'Black',background:"#F8F8F8",height:'15%',border:'2px solid black',borderRadius:'5px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between',padding:"10px" ,marginTop:'40px'}}>
                    <button onClick={onClose} style={{ padding: '8px 16px', background: 'grey', border: '1px solid white', color: 'white' }}>Cancel</button>
                    <button onClick={handleSave} style={{ padding: '8px 16px', background: 'green', border: '1px solid white', color: 'white' }}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default Module;
