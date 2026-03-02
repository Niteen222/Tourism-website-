import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Navigation, X, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';



export const Places = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
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
                <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{t('places.title')}</h1>
                <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
                    {t('places.subtitle')}
                </p>
            </div>

            {/* Places Grid */}
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '32px'
            }}>
                {t('places.data').map(place => (
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
                                    <ImageIcon size={18} /> {t('places.moreAbout')}
                                </button>
                                <button
                                    onClick={() => handleNavigateWithAuth('/taxis')}
                                    className="btn btn-primary"
                                    style={{ flex: 1, padding: '12px' }}
                                >
                                    <Navigation size={18} /> {t('places.bookCab')}
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
