import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Star, MapPin, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HOTELS_DATA = [
    {
        id: 1,
        name: "Bastar Jungle Resort",
        type: "Premium Resort",
        price: "₹3,500/night",
        rating: 4.8,
        image: "https://placehold.co/800x600/10B981/white?text=Resort",
        features: ["AC Rooms", "Local Food Hub", "Jungle Safari Access"]
    },
    {
        id: 2,
        name: "Dantewada Heritage Homestay",
        type: "Authentic Homestay",
        price: "₹1,200/night",
        rating: 4.9,
        image: "https://placehold.co/800x600/F59E0B/white?text=Homestay",
        features: ["Home Cooked Meals", "Cultural Experience", "Trekking Guide"]
    },
    {
        id: 3,
        name: "City Center Lodge",
        type: "Budget Hotel",
        price: "₹800/night",
        rating: 4.2,
        image: "https://placehold.co/800x600/2563EB/white?text=Lodge",
        features: ["Near Bus Stand", "Free WiFi", "Clean Rooms"]
    }
];

export const Hotels = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);

    const handleBooking = (hotel) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setSelectedHotel(hotel);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            setSelectedHotel(null);
        }, 5000);
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
                        <Check size={20} /> Booking Confirmed!
                    </h4>
                    <p style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
                        You have successfully booked <strong>{selectedHotel?.name}</strong>.
                    </p>
                    <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', color: 'var(--text-dark)' }}>
                        <p>📱 SMS sent to Host & You</p>
                        <p>💬 WhatsApp message delivered</p>
                        <p>📧 Email confirmation sent</p>
                    </div>
                </div>
            )}

            <div className="container">
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Places to Stay</h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        From authentic Bastar homestays to comfortable city hotels, find your perfect resting place.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
                    {HOTELS_DATA.map(hotel => (
                        <div key={hotel.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '200px', position: 'relative' }}>
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'white', padding: '4px 8px', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', fontWeight: 600 }}>
                                    <Star size={14} color="#F59E0B" fill="#F59E0B" /> {hotel.rating}
                                </div>
                            </div>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                    <h3 style={{ fontSize: '1.25rem' }}>{hotel.name}</h3>
                                </div>
                                <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '16px' }}>{hotel.type}</p>

                                <ul style={{ listStyle: 'none', marginBottom: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {hotel.features.map((feature, idx) => (
                                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-dark)' }}>
                                            <Check size={16} color="var(--success)" /> {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>{hotel.price}</span>
                                    <button
                                        className="btn btn-primary"
                                        style={{ padding: '8px 16px' }}
                                        onClick={() => handleBooking(hotel)}
                                    >
                                        Book Now
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
