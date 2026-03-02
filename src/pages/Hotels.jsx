import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Star, MapPin, Check, Phone, Navigation, Wifi, Coffee, Car, Wind, Utensils, Waves, Snowflake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const FacilityIcon = ({ name, size = 12 }) => {
    const n = name.toLowerCase();
    if (n.includes('wifi') || n.includes('फाई')) return <Wifi size={size} />;
    if (n.includes('ac') || n.includes('conditioning') || n.includes('एसी') || n.includes('कंडीशनिंग')) return <Wind size={size} />;
    if (n.includes('parking') || n.includes('पार्किंग')) return <Car size={size} />;
    if (n.includes('room service') || n.includes('रूम सर्विस')) return <Coffee size={size} />;
    if (n.includes('restaurant') || n.includes('भोजन') || n.includes('रेस्टोरेंट') || n.includes('breakfast') || n.includes('नाश्ता')) return <Utensils size={size} />;
    if (n.includes('pool') || n.includes('पूल') || n.includes('hot tub') || n.includes('टब')) return <Waves size={size} />;
    if (n.includes('shuttle') || n.includes('शटल')) return <Car size={size} />;
    return <Check size={size} color="var(--success)" />;
};



export const Hotels = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [selectedHotelName, setSelectedHotelName] = useState(null);
    const [expandedFacilities, setExpandedFacilities] = useState({});

    const handleBooking = (hotelName) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setSelectedHotelName(hotelName);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            setSelectedHotelName(null);
        }, 5000);
    };

    const toggleFacilities = (id) => {
        setExpandedFacilities(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="animate-fade-in" style={{ padding: '60px 0', backgroundColor: 'var(--bg-color)', minHeight: '80vh', position: 'relative' }}>

            {/* Mock Notification Toast */}
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
                        <Check size={20} /> {t('hotels.bookingConfirmed')}
                    </h4>
                    <p style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
                        {t('hotels.bookingDesc')} <strong>{selectedHotelName}</strong>.
                    </p>
                    <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', color: 'var(--text-dark)' }}>
                        <p>{t('hotels.smsSent')}</p>
                        <p>{t('hotels.whatsappSent')}</p>
                        <p>{t('hotels.emailSent')}</p>
                    </div>
                </div>
            )}

            <div className="container">
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>{t('hotels.title')}</h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        {t('hotels.subtitle')}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
                    {t('hotels.data').map(hotel => (
                        <div key={hotel.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '200px', position: 'relative' }}>
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                    backdropFilter: 'blur(4px)',
                                    padding: '6px 12px',
                                    borderRadius: 'var(--radius-full)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                    color: 'white'
                                }}>
                                    <Star size={16} color="#F59E0B" fill="#F59E0B" />
                                    {hotel.rating}
                                    <span style={{ opacity: 0.7, fontWeight: 400, fontSize: '0.75rem' }}>({hotel.reviews})</span>
                                </div>
                            </div>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                    <h3 style={{ fontSize: '1.25rem' }}>{hotel.name}</h3>
                                </div>
                                <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '16px' }}>{hotel.type}</p>

                                {/* Contact & Map Info */}
                                <div style={{
                                    display: 'flex',
                                    gap: '20px',
                                    margin: '16px 0',
                                    paddingBottom: '16px',
                                    borderBottom: '1px solid var(--text-light)',
                                    opacity: 0.9
                                }}>
                                    <a href={`tel:${hotel.phone}`} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        color: 'var(--text-dark)',
                                        textDecoration: 'none',
                                        fontSize: '0.875rem'
                                    }}>
                                        <Phone size={14} color="var(--primary)" /> {hotel.phone}
                                    </a>
                                    <a href={hotel.mapLink} target="_blank" rel="noopener noreferrer" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        color: 'var(--text-dark)',
                                        textDecoration: 'none',
                                        fontSize: '0.875rem'
                                    }}>
                                        <Navigation size={14} color="var(--primary)" /> {hotel.mapLabel}
                                    </a>
                                </div>

                                {/* Facilities Section */}
                                <div style={{ marginBottom: '24px' }}>
                                    <button
                                        onClick={() => toggleFacilities(hotel.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--primary)',
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            padding: 0,
                                            cursor: 'pointer',
                                            marginBottom: '12px'
                                        }}
                                    >
                                        {expandedFacilities[hotel.id] ? '− Hide Facilities' : '+ Check Facilities'}
                                    </button>

                                    {expandedFacilities[hotel.id] && (
                                        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            {hotel.features.map((feature, idx) => (
                                                <span key={idx} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    fontSize: '0.75rem',
                                                    color: 'var(--text-dark)',
                                                    backgroundColor: 'var(--bg-color)',
                                                    padding: '6px 12px',
                                                    borderRadius: 'var(--radius-sm)',
                                                    border: '1px solid rgba(0,0,0,0.05)'
                                                }}>
                                                    <FacilityIcon name={feature} />
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{hotel.price}</span>
                                        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>per night</span>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        style={{ padding: '10px 24px', fontWeight: 600 }}
                                        onClick={() => handleBooking(hotel.name)}
                                    >
                                        {t('hotels.bookNow')}
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
