import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Check, Handshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';



export const Guides = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
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
                        <Check size={20} /> {t('guides.guideRequested')}
                    </h4>
                    <p style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
                        {t('guides.connectedWith')} <strong>{selectedGuide?.name}</strong>.
                    </p>
                    <div style={{ backgroundColor: 'rgba(0, 166, 153, 0.1)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', color: 'var(--text-dark)' }}>
                        <p>{t('guides.smsSent')}</p>
                        <p>{t('guides.whatsappSent')}</p>
                        <p>{t('guides.emailSent')}</p>
                    </div>
                </div>
            )}

            <div className="container">
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>{t('guides.title')}</h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        {t('guides.subtitle')}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '32px' }}>
                    {t('guides.data').map(guide => (
                        <div key={guide.id} className="card" style={{ display: 'flex', padding: '24px', gap: '24px' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
                                <img src={guide.image} alt={guide.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{guide.name}</h3>
                                <span style={{ fontSize: '0.875rem', color: 'var(--secondary)', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
                                    {t('guides.prideIn')}: {guide.specialty}
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
                                        <Handshake size={16} /> {t('guides.hireGuide')}
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
