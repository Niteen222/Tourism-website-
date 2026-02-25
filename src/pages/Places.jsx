import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Navigation, X, Image as ImageIcon } from 'lucide-react';

const PLACES_DATA = [
    {
        id: 1,
        name: "Dholkal Ganesha",
        description: "An ancient Ganesha idol situated at a height of 3000 feet amidst lush green forests. It requires a 3km trek through dense jungle.",
        image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=800&q=80",
        distance: "18 km from Dantewada city",
        duration: "4-5 hours (including trek)",
        gallery: [
            "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1518182170546-076616fd427d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 2,
        name: "Danteshwari Temple",
        description: "Built in the 14th century, this temple is dedicated to Goddess Danteshwari, the presiding deity of Bastar. It is one of the 52 Shakti Peethas.",
        image: "https://images.unsplash.com/photo-1600021381393-272eabd32ee0?auto=format&fit=crop&w=800&q=80",
        distance: "In Dantewada city",
        duration: "1-2 hours",
        gallery: [
            "https://images.unsplash.com/photo-1600021381393-272eabd32ee0?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1627884814981-2292023cb20c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583339598273-0de2c1b9bfca?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 3,
        name: "Phoolpad Waterfall",
        description: "A breathtaking waterfall hidden deep inside the jungle, perfect for nature lovers and adventurers seeking untouched beauty.",
        image: "https://images.unsplash.com/photo-1432405972618-c600f44bc912?auto=format&fit=crop&w=800&q=80",
        distance: "35 km from Dantewada",
        duration: "Half day trip",
        gallery: [
            "https://images.unsplash.com/photo-1432405972618-c600f44bc912?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1476611317561-60117649dd94?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515444744559-7be63e160a22?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1465228517242-d61cc7a4a45a?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 4,
        name: "Barsoor",
        description: "An ancient city known as the city of temples and lakes, famous for the Mama-Bhanja temple, Chandraditya temple, and twin Ganesha idols.",
        image: "https://images.unsplash.com/photo-1549605659-dc6198f6d333?auto=format&fit=crop&w=800&q=80",
        distance: "30 km from Dantewada",
        duration: "Half day trip",
        gallery: [
            "https://images.unsplash.com/photo-1549605659-dc6198f6d333?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1572074360670-65ee3bc3d67f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1585671175647-75fd54c330df?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583802996963-c7e1e6267fce?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591870196238-d7b88ec7b084?auto=format&fit=crop&w=800&q=80"
        ]
    }
];

export const Places = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedPlace, setSelectedPlace] = useState(null);

    const handleNavigateWithAuth = (path) => {
        if (!user) {
            navigate('/login');
        } else {
            navigate(path);
        }
    };

    return (
        <div style={{ padding: '40px 0', minHeight: '80vh' }}>
            {/* Header Content */}
            <div className="container" style={{ marginBottom: '48px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Must Visit Places</h1>
                <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
                    Discover the raw beauty, ancient temples, and hidden waterfalls of Dantewada.
                </p>
            </div>

            {/* Places Grid */}
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '32px'
            }}>
                {PLACES_DATA.map(place => (
                    <div key={place.id} className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* Image */}
                        <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={place.image}
                                alt={place.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.5s ease',
                                }}
                                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        </div>

                        {/* Content */}
                        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{place.name}</h3>
                            <p style={{ color: 'var(--text-light)', marginBottom: '24px', flex: 1 }}>
                                {place.description}
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)', fontWeight: 500 }}>
                                    <MapPin size={18} color="var(--primary)" />
                                    <span>{place.distance}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)', fontWeight: 500 }}>
                                    <Clock size={18} color="var(--primary)" />
                                    <span>{place.duration}</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    onClick={() => setSelectedPlace(place)}
                                    className="btn btn-outline"
                                    style={{ flex: 1, padding: '12px' }}
                                >
                                    <ImageIcon size={18} /> More About
                                </button>
                                <button
                                    onClick={() => handleNavigateWithAuth('/taxis')}
                                    className="btn btn-primary"
                                    style={{ flex: 1, padding: '12px' }}
                                >
                                    <Navigation size={18} /> Book Cab
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Image Gallery Modal */}
            {selectedPlace && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    backdropFilter: 'blur(5px)'
                }}>
                    <div className="card animate-fade-in" style={{
                        maxWidth: '900px',
                        width: '100%',
                        maxHeight: '90vh',
                        backgroundColor: 'var(--bg-color)',
                        overflowY: 'auto',
                        position: 'relative',
                        padding: '32px'
                    }}>
                        <button
                            onClick={() => setSelectedPlace(null)}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: 'var(--shadow-sm)',
                                zIndex: 10,
                                border: 'none'
                            }}
                        >
                            <X size={24} color="var(--text-dark)" />
                        </button>

                        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{selectedPlace.name}</h2>
                        <p style={{ color: 'var(--text-light)', marginBottom: '24px', fontSize: '1.1rem' }}>{selectedPlace.description}</p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '16px'
                        }}>
                            {selectedPlace.gallery.map((imgUrl, index) => (
                                <img
                                    key={index}
                                    src={imgUrl}
                                    alt={`${selectedPlace.name} view ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '250px',
                                        objectFit: 'cover',
                                        borderRadius: 'var(--radius-sm)',
                                        boxShadow: 'var(--shadow-sm)'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
