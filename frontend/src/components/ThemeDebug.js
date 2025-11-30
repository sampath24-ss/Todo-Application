import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeDebug = () => {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '20px',
            background: isDark ? '#1f2937' : '#ffffff',
            color: isDark ? '#ffffff' : '#1f2937',
            border: '2px solid',
            borderColor: isDark ? '#6366f1' : '#4f46e5',
            borderRadius: '10px',
            zIndex: 9999,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🔍 Theme Debug</h3>
            <p><strong>Current Theme:</strong> {theme}</p>
            <p><strong>Is Dark:</strong> {isDark ? 'Yes' : 'No'}</p>
            <p><strong>HTML Attribute:</strong> {document.documentElement.getAttribute('data-theme') || 'none'}</p>
            <button
                onClick={toggleTheme}
                style={{
                    padding: '10px 20px',
                    marginTop: '10px',
                    cursor: 'pointer',
                    background: isDark ? '#6366f1' : '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px'
                }}
            >
                Toggle Theme
            </button>
        </div>
    );
};

export default ThemeDebug;