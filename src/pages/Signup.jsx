import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, User, Navigation, MessageSquare } from 'lucide-react';

export const Signup = () => {
    const [role, setRole] = useState('tourist');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        // Here we simulate an API call sending the 4 digit OTP to formData.phone
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

    return (
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
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="••••••••"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
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
                    <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--text-light)' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log in</Link>
                    </p>
                )}
            </div>
        </div>
    );
};
