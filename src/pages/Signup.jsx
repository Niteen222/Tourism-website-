import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, User, Navigation, MessageSquare, Eye, EyeOff } from 'lucide-react';
import { GoogleAccountPicker } from '../components/GoogleAccountPicker';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

export const Signup = () => {
    const [role, setRole] = useState('tourist');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showGooglePicker, setShowGooglePicker] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        setShowOtp(true);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (otp.length === 4) {
            login({ ...formData, role });
            navigate('/');
        } else {
            alert('Please enter a valid 4-digit OTP.');
        }
    };

    // Real Google OAuth success handler
    const handleRealGoogleSuccess = (googleUser) => {
        login({ ...googleUser, role });
        navigate('/');
    };

    const { signIn: realGoogleSignIn, isConfigured: isGoogleConfigured } =
        useGoogleAuth(handleRealGoogleSuccess);

    const handleGoogleSignup = () => {
        if (isGoogleConfigured) {
            realGoogleSignIn();
        } else {
            setShowGooglePicker(true);
        }
    };

    const handlePickerSelect = (googleUser) => {
        setShowGooglePicker(false);
        setIsGoogleLoading(true);
        setTimeout(() => {
            login({ ...googleUser, role });
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
                    role={role}
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
                <div className="card auth-card animate-fade-in">

                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Create an Account</h1>
                    <p style={{ color: 'var(--text-light)' }}>Join our community to explore or host in Dantewada</p>
                </div>

                {/* Role Selector */}
                {!showOtp ? (
                    <>
                        <div className="grid-responsive" style={{ marginBottom: '32px' }}>
                            <div
                                onClick={() => setRole('tourist')}
                                className={`role-card ${role === 'tourist' ? 'active-tourist' : ''}`}
                            >
                                <Navigation size={32} color={role === 'tourist' ? 'var(--primary)' : 'var(--text-light)'} style={{ margin: '0 auto 16px auto' }} />
                                <h3 style={{ fontSize: '1.25rem', color: role === 'tourist' ? 'var(--primary)' : 'var(--text-dark)' }}>I'm a Traveller</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '8px' }}>Looking to explore and rest</p>
                            </div>

                            <div
                                onClick={() => setRole('local')}
                                className={`role-card ${role === 'local' ? 'active-local' : ''}`}
                            >
                                <User size={32} color={role === 'local' ? 'var(--secondary)' : 'var(--text-light)'} style={{ margin: '0 auto 16px auto' }} />
                                <h3 style={{ fontSize: '1.25rem', color: role === 'local' ? 'var(--secondary)' : 'var(--text-dark)' }}>I'm a Local</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '8px' }}>Want to guide and host</p>
                            </div>
                        </div>

                        <form onSubmit={handleInitialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Full Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="John Doe"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    placeholder="you@example.com"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Phone Number</label>
                                <input
                                    type="tel"
                                    className="input-field"
                                    placeholder="+91 98765 43210"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="input-field"
                                        placeholder="••••••••"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                            <button
                                type="submit"
                                className="btn"
                                style={{
                                    width: '100%',
                                    marginTop: '8px',
                                    padding: '16px',
                                    backgroundColor: role === 'tourist' ? 'var(--primary)' : 'var(--secondary)',
                                    color: 'white'
                                }}
                            >
                                Continue
                            </button>
                        </form>
                    </>
                ) : (
                    <form onSubmit={handleOtpSubmit} className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--success)' }}>
                            <p style={{ color: 'var(--success)', fontWeight: 500, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <MessageSquare size={16} /> Fake SMS Sent to {formData.phone}
                            </p>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Enter 4-Digit Verification Code</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="1234"
                                maxLength="4"
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                style={{ fontSize: '1.5rem', letterSpacing: '8px', textAlign: 'center', padding: '16px' }}
                            />
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '8px', textAlign: 'center' }}>
                                For testing, enter any 4 digits (e.g., 1234).
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                            <button
                                type="button"
                                onClick={() => setShowOtp(false)}
                                className="btn btn-outline"
                                style={{ flex: 1, padding: '16px' }}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="btn"
                                style={{
                                    flex: 2,
                                    padding: '16px',
                                    backgroundColor: 'var(--primary)',
                                    color: 'white'
                                }}
                            >
                                Verify & Create Account
                            </button>
                        </div>
                    </form>
                )}

                {!showOtp && (
                    <>
                        {/* Google Sign-up Button */}
                        <button
                            onClick={handleGoogleSignup}
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
                                marginTop: '24px',
                                marginBottom: '8px'
                            }}
                            onMouseOver={e => { if (!isGoogleLoading) e.currentTarget.style.boxShadow = '0 4px 16px rgba(66,133,244,0.25)'; }}
                            onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.1)'}
                        >
                            {isGoogleLoading ? (
                                <div style={{ width: '20px', height: '20px', border: '2px solid #4285F4', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.3 1.2 8.5 3.1l6.4-6.4C34.9 2.9 29.8 1 24 1 14.8 1 6.9 6.4 3.1 14.3l7.4 5.8C12.3 13.5 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3.1-2.3 5.7-4.8 7.5l7.4 5.8c4.3-4 6.8-9.9 7.2-17.3z"/><path fill="#FBBC05" d="M10.5 28.5c-.5-1.5-.8-3.2-.8-4.5s.3-3 .8-4.5l-7.4-5.8C1.5 17.1.5 20.4.5 24s1 6.9 2.6 9.8l7.4-5.8z"/><path fill="#34A853" d="M24 46.5c5.8 0 10.7-1.9 14.3-5.2l-7.4-5.8c-2 1.3-4.5 2-6.9 2-6.3 0-11.7-4-13.5-9.5l-7.4 5.8C6.9 41.6 14.8 46.5 24 46.5z"/></svg>
                            )}
                            {isGoogleLoading ? 'Signing up with Google...' : 'Sign up with Google'}
                        </button>
                        <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--text-light)' }}>
                            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log in</Link>
                        </p>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </>
                )}
            </div>
            </div>
        </>
    );
};
