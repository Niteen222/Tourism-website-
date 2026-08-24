import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, Eye, EyeOff } from 'lucide-react';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { GoogleAccountPicker } from '../components/GoogleAccountPicker';

// Google Logo SVG Component
const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.3 1.2 8.5 3.1l6.4-6.4C34.9 2.9 29.8 1 24 1 14.8 1 6.9 6.4 3.1 14.3l7.4 5.8C12.3 13.5 17.7 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3.1-2.3 5.7-4.8 7.5l7.4 5.8c4.3-4 6.8-9.9 7.2-17.3z"/>
        <path fill="#FBBC05" d="M10.5 28.5c-.5-1.5-.8-3.2-.8-4.5s.3-3 .8-4.5l-7.4-5.8C1.5 17.1.5 20.4.5 24s1 6.9 2.6 9.8l7.4-5.8z"/>
        <path fill="#34A853" d="M24 46.5c5.8 0 10.7-1.9 14.3-5.2l-7.4-5.8c-2 1.3-4.5 2-6.9 2-6.3 0-11.7-4-13.5-9.5l-7.4 5.8C6.9 41.6 14.8 46.5 24 46.5z"/>
        <path fill="none" d="M0 0h48v48H0z"/>
    </svg>
);

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showGooglePicker, setShowGooglePicker] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    // Handle real Google OAuth response (when Client ID is configured)
    const handleRealGoogleSuccess = (googleUser) => {
        login(googleUser);
        navigate('/');
    };

    const { signIn: realGoogleSignIn, isConfigured: isGoogleConfigured } =
        useGoogleAuth(handleRealGoogleSuccess);

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ name: email.split('@')[0], email, role: 'tourist', avatar: null });
        navigate('/');
    };

    const handleGoogleLogin = () => {
        // Try real Google OAuth first
        if (isGoogleConfigured) {
            realGoogleSignIn();
        } else {
            // Fallback: show our Google-style picker modal
            setShowGooglePicker(true);
        }
    };

    const handlePickerSelect = (googleUser) => {
        setShowGooglePicker(false);
        setIsGoogleLoading(true);
        setTimeout(() => {
            login(googleUser);
            setIsGoogleLoading(false);
            navigate('/');
        }, 600);
    };

    return (
        <>
            {showGooglePicker && (
                <GoogleAccountPicker
                    onSelect={handlePickerSelect}
                    onClose={() => setShowGooglePicker(false)}
                    role="tourist"
                />
            )}

            <div style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-color)',
                padding: '40px 24px'
            }}>
                <div className="card auth-card animate-fade-in" style={{ maxWidth: '480px', width: '100%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <div style={{
                            display: 'inline-flex',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            padding: '12px',
                            borderRadius: '50%',
                            marginBottom: '16px'
                        }}>
                            <MapPin size={32} />
                        </div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--text-light)' }}>Log in to continue your Dantewada journey</p>
                    </div>

                    {/* Google Sign-In Button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isGoogleLoading}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            padding: '14px 20px',
                            border: '2px solid var(--border-color, #e5e7eb)',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--bg-card)',
                            color: 'var(--text-dark)',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: isGoogleLoading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                            opacity: isGoogleLoading ? 0.8 : 1,
                            boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                            marginBottom: '24px'
                        }}
                        onMouseOver={e => { if (!isGoogleLoading) e.currentTarget.style.boxShadow = '0 4px 16px rgba(66,133,244,0.25)'; }}
                        onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.1)'}
                    >
                        {isGoogleLoading ? (
                            <div style={{ width: '20px', height: '20px', border: '2px solid #4285F4', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                        ) : <GoogleIcon />}
                        {isGoogleLoading ? 'Signing in with Google...' : 'Continue with Google'}
                    </button>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color, #e5e7eb)' }} />
                        <span style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 500 }}>or sign in with email</span>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color, #e5e7eb)' }} />
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="input-field"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{ paddingRight: '48px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', display: 'flex'
                                    }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', padding: '16px' }}>
                            Log In
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--text-light)' }}>
                        Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign up</Link>
                    </p>
                </div>

                <style>{`
                    @keyframes spin { to { transform: rotate(360deg); } }
                `}</style>
            </div>
        </>
    );
};
