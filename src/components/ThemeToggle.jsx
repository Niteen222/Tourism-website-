import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                color: 'var(--text-dark)',
                transition: 'var(--transition)',
                cursor: 'pointer'
            }}
        >
            {theme === 'light' ? (
                <Moon size={20} className="moon-icon" />
            ) : (
                <Sun size={20} className="sun-icon" />
            )}
        </button>
    );
};
