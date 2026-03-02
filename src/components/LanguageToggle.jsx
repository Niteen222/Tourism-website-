import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="language-toggle"
            title={language === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में बदलें'}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid var(--text-light)',
                borderOpacity: 0.2,
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-dark)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
                transition: 'var(--transition)',
                backdropFilter: 'blur(4px)'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'var(--text-light)';
                e.currentTarget.style.borderOpacity = 0.2;
            }}
        >
            <Languages size={18} color="var(--primary)" />
            <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
        </button>
    );
};
