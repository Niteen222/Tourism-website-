import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin } from 'lucide-react';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        login({ name: 'User', email, role: 'tourist' });
        navigate('/');
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
            <div className="card animate-fade-in" style={{
                maxWidth: '480px',
                width: '100%',
                padding: '40px',
                backgroundColor: 'var(--bg-card)'
            }}>
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
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', padding: '16px' }}>
                        Log In
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--text-light)' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};
