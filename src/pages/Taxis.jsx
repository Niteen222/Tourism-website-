import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Car, Check, Phone } from 'lucide-react';

const TAXIS_DATA = [
    {
        id: 1,
        driver: "Ramesh Singh",
        car: "Swift Dzire (AC)",
        rate: "₹10/km or ₹1200/day",
        experience: "8 years",
        languages: "Hindi, Chhattisgarhi, Halbi",
        image: "https://placehold.co/400x400/222222/white?text=Driver+1"
    },
    {
        id: 2,
        driver: "Tribhuvan",
        car: "Mahindra Bolero (Non-AC)",
        rate: "₹8/km or ₹1000/day",
        experience: "12 years (Best for jungles)",
        languages: "Hindi, Gondi",
        image: "https://placehold.co/400x400/FF5A5F/white?text=Driver+2"
    },
    {
        id: 3,
        driver: "Suresh Kumar",
        car: "Toyota Innova (AC)",
        rate: "₹14/km or ₹1800/day",
        experience: "5 years",
        languages: "Hindi, English, Chhattisgarhi",
        image: "https://placehold.co/400x400/00A699/white?text=Driver+3"
    }
];

export const Taxis = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [selectedTaxi, setSelectedTaxi] = useState(null);

    const handleBooking = (taxi) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setSelectedTaxi(taxi);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            setSelectedTaxi(null);
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
                    borderLeft: '4px solid var(--success)',
                    maxWidth: '400px'
                }}>
                    <h4 style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Check size={20} /> Cab Requested!
                    </h4>
                    <p style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
                        Your request has been sent to <strong>{selectedTaxi?.driver}</strong>.
                    </p>
                    <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', color: 'var(--text-dark)' }}>
                        <p>📱 SMS sent to Driver</p>
                        <p>💬 WhatsApp shared with Driver & You</p>
                        <p>📞 Driver will call you shortly</p>
                    </div>
                </div>
            )}

            <div className="container">
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Local Transport</h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        Affordable and reliable local drivers who know the routes of Bastar perfectly.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
                    {TAXIS_DATA.map(taxi => (
                        <div key={taxi.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden' }}>
                                    <img src={taxi.image} alt={taxi.driver} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem' }}>{taxi.driver}</h3>
                                    <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Car size={14} /> {taxi.car}
                                    </p>
                                </div>
                            </div>

                            <div style={{ backgroundColor: '#F3F4F6', padding: '16px', borderRadius: 'var(--radius-sm)', marginBottom: '24px', flex: 1 }}>
                                <div style={{ marginBottom: '8px' }}>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Specialty:</span>
                                    <p style={{ fontWeight: 500 }}>{taxi.experience} Experience</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Languages:</span>
                                    <p style={{ fontWeight: 500 }}>{taxi.languages}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E5E7EB', paddingTop: '16px' }}>
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Estimated Rate</span>
                                    <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)' }}>{taxi.rate}</span>
                                </div>
                                <button
                                    className="btn btn-outline"
                                    style={{ padding: '8px 16px' }}
                                    onClick={() => handleBooking(taxi)}
                                >
                                    <Phone size={16} /> Contact
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
