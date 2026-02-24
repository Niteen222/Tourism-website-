import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Check, Handshake } from 'lucide-react';

const GUIDES_DATA = [
    {
        id: 1,
        name: "Mukesh Kunjam",
        specialty: "Jungle Trekking & Waterfalls",
        fee: "₹500/day",
        bio: "I know every hidden waterfall in Dantewada. I will guide you safely through the dense forests.",
        image: "https://placehold.co/400x400/FC642D/white?text=Mukesh"
    },
    {
        id: 2,
        name: "Suman Mandavi",
        specialty: "Cultural & Temple Tours",
        fee: "₹400/day",
        bio: "Passionate about local Bastar history. I can take you through ancient temples and explain the tribal heritage.",
        image: "https://placehold.co/400x400/00A699/white?text=Suman"
    }
];

export const Guides = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [selectedGuide, setSelectedGuide] = useState(null);

    const handleBooking = (guide) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setSelectedGuide(guide);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            setSelectedGuide(null);
        }, 5000);
    };

    return (
        <div className="animate-fade-in" style={{ padding: '60px 0', backgroundColor: 'var(--bg-color)', minHeight: '80vh', position: 'relative' }}>

            {showNotification && (
                <div className="glass animate-fade-in" style={{
                    position: 'fixed',
                    top: '24px',
                    right: '24px',
                    padding: '24px',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 100,
                    borderLeft: '4px solid var(--secondary)',
                    maxWidth: '400px'
                }}>
                    <h4 style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Check size={20} /> Guide Requested!
                    </h4>
                    <p style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
                        You have connected with <strong>{selectedGuide?.name}</strong>.
                    </p>
                    <div style={{ backgroundColor: 'rgba(0, 166, 153, 0.1)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', color: 'var(--text-dark)' }}>
                        <p>📱 Details exchanged via SMS</p>
                        <p>💬 WhatsApp group created with the Host</p>
                        <p>📧 Email confirmation sent</p>
                    </div>
                </div>
            )}

            <div className="container">
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Meet the Locals</h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        Connect with friendly locals who can show you the real Dantewada for a reasonable fee.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '32px' }}>
                    {GUIDES_DATA.map(guide => (
                        <div key={guide.id} className="card" style={{ display: 'flex', padding: '24px', gap: '24px' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
                                <img src={guide.image} alt={guide.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{guide.name}</h3>
                                <span style={{ fontSize: '0.875rem', color: 'var(--secondary)', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
                                    Takes pride in: {guide.specialty}
                                </span>
                                <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '16px', flex: 1 }}>
                                    "{guide.bio}"
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                                    <span style={{ fontSize: '1.125rem', fontWeight: 700 }}>{guide.fee}</span>
                                    <button
                                        className="btn btn-secondary"
                                        style={{ padding: '8px 16px' }}
                                        onClick={() => handleBooking(guide)}
                                    >
                                        <Handshake size={16} /> Hire Guide
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
