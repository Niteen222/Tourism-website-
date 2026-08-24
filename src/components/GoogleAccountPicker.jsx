import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * GoogleAccountPicker — a realistic Google-style account picker modal.
 * Used as fallback when no Google Client ID is configured, OR when the
 * user is on a demo environment. Collects the user's name & email so
 * the avatar can be generated from their actual name.
 */
export const GoogleAccountPicker = ({ onSelect, onClose, role = 'tourist' }) => {
    const [step, setStep] = useState('pick'); // 'pick' | 'custom'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    // Demo accounts to show in the picker
    const DEMO_ACCOUNTS = [
        {
            name: 'Niteen Kumar',
            email: 'niteen@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=Niteen+Kumar&background=4285F4&color=fff&size=96&bold=true',
        },
        {
            name: 'Add another account',
            email: null,
            avatar: null,
        },
    ];

    const handleSelect = (account) => {
        if (!account.email) {
            setStep('custom');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            onSelect({
                name: account.name,
                email: account.email,
                avatar: account.avatar,
                role,
                provider: 'google',
            });
        }, 900);
    };

    const handleCustomSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) return;
        setLoading(true);
        const initials = name.trim().split(' ').map(w => w[0]).join('+');
        setTimeout(() => {
            onSelect({
                name: name.trim(),
                email: email.trim(),
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=4285F4&color=fff&size=96&bold=true`,
                role,
                provider: 'google',
            });
        }, 900);
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: '#fff',
                borderRadius: '28px',
                width: '100%',
                maxWidth: '400px',
                boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
                overflow: 'hidden',
                animation: 'slideUp 0.25s ease',
                color: '#202124',
            }} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div style={{ padding: '28px 28px 20px', textAlign: 'center', borderBottom: '1px solid #e8eaed' }}>
                    {/* Google Logo */}
                    <svg width="75" height="24" viewBox="0 0 272 92" style={{ marginBottom: '16px' }}>
                        <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                        <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                        <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.67-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.26zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                        <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
                        <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                        <path fill="#4285F4" d="M35.29 41.41V32h31.6c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 35.22.36 16.55 16.32 1.09 35.29 1.09c10.49 0 17.96 4.1 23.58 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.94-6.72-13.86 0-24.7 11.17-24.7 24.7s10.84 24.7 24.7 24.7c8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.48 5.1-11.7H35.29z"/>
                    </svg>
                    <h2 style={{ fontSize: '1.375rem', fontWeight: 400, margin: 0, color: '#202124' }}>
                        {step === 'pick' ? 'Choose an account' : 'Sign in with Google'}
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#5f6368', marginTop: '4px' }}>to continue to Explore Dantewada</p>
                </div>

                {/* Close Button */}
                <button onClick={onClose} style={{
                    position: 'absolute', top: '16px', right: '16px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#5f6368', borderRadius: '50%', padding: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <X size={20} />
                </button>

                {/* Content */}
                {loading ? (
                    <div style={{ padding: '48px', textAlign: 'center' }}>
                        <div style={{
                            width: '40px', height: '40px', margin: '0 auto 16px',
                            border: '3px solid #e8eaed', borderTopColor: '#4285F4',
                            borderRadius: '50%', animation: 'spin 0.8s linear infinite'
                        }} />
                        <p style={{ color: '#5f6368', fontSize: '0.9rem' }}>Signing in…</p>
                    </div>
                ) : step === 'pick' ? (
                    <div style={{ padding: '8px 0' }}>
                        {DEMO_ACCOUNTS.map((acc, i) => (
                            <button key={i} onClick={() => handleSelect(acc)} style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: '16px',
                                padding: '12px 24px', background: 'none', border: 'none',
                                cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s',
                                color: '#202124'
                            }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                {acc.avatar ? (
                                    <img src={acc.avatar} alt={acc.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                ) : (
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        backgroundColor: '#e8eaed', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', fontSize: '1.25rem'
                                    }}>+</div>
                                )}
                                <div>
                                    <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{acc.name}</div>
                                    {acc.email && <div style={{ color: '#5f6368', fontSize: '0.8rem' }}>{acc.email}</div>}
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <form onSubmit={handleCustomSubmit} style={{ padding: '20px 28px 28px' }}>
                        <p style={{ color: '#5f6368', fontSize: '0.875rem', marginBottom: '20px' }}>
                            Enter your Google account details to continue.
                        </p>
                        <div style={{ marginBottom: '16px' }}>
                            <input
                                type="text"
                                placeholder="Your full name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                autoFocus
                                style={{
                                    width: '100%', padding: '12px 16px', borderRadius: '4px',
                                    border: '1px solid #dadce0', fontSize: '1rem',
                                    outline: 'none', boxSizing: 'border-box', color: '#202124',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={e => e.target.style.borderColor = '#4285F4'}
                                onBlur={e => e.target.style.borderColor = '#dadce0'}
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%', padding: '12px 16px', borderRadius: '4px',
                                    border: '1px solid #dadce0', fontSize: '1rem',
                                    outline: 'none', boxSizing: 'border-box', color: '#202124',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={e => e.target.style.borderColor = '#4285F4'}
                                onBlur={e => e.target.style.borderColor = '#dadce0'}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button type="button" onClick={() => setStep('pick')} style={{
                                background: 'none', border: 'none', color: '#4285F4',
                                fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem'
                            }}>← Back</button>
                            <button type="submit" style={{
                                backgroundColor: '#4285F4', color: '#fff',
                                border: 'none', borderRadius: '4px',
                                padding: '10px 24px', fontSize: '0.9rem',
                                fontWeight: 500, cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = '#3367d6'}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = '#4285F4'}
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                )}

                {/* Footer */}
                {!loading && (
                    <div style={{
                        borderTop: '1px solid #e8eaed', padding: '12px 28px',
                        display: 'flex', justifyContent: 'space-between',
                        fontSize: '0.75rem', color: '#5f6368'
                    }}>
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={{ color: '#5f6368', textDecoration: 'none' }}>Privacy Policy</a>
                        <span>•</span>
                        <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" style={{ color: '#5f6368', textDecoration: 'none' }}>Terms of Service</a>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
                @keyframes spin { to { transform: rotate(360deg) } }
            `}</style>
        </div>
    );
};
