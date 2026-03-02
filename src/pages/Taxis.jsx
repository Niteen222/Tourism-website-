import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Car, Check, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';



export const Taxis = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
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
                        <Check size={20} /> {t('taxis.cabRequested')}
                    </h4>
                    <p style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
                        {t('taxis.requestSent')} <strong>{selectedTaxi?.driver}</strong>.
                    </p>
                    <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', color: 'var(--text-dark)' }}>
                        <p>{t('taxis.smsSent')}</p>
                        <p>{t('taxis.whatsappSent')}</p>
                        <p>{t('taxis.driverCall')}</p>
                    </div>
                </div>
            )}

            <div className="container">
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>{t('taxis.title')}</h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        {t('taxis.subtitle')}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
                    {t('taxis.data').map(taxi => (
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

                            <div style={{ backgroundColor: 'var(--bg-color)', padding: '16px', borderRadius: 'var(--radius-sm)', marginBottom: '24px', flex: 1, border: '1px solid var(--text-light)', borderOpacity: 0.1 }}>
                                <div style={{ marginBottom: '8px' }}>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>{t('taxis.specialty')}:</span>
                                    <p style={{ fontWeight: 500 }}>{taxi.experience} {t('taxis.experience')}</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>{t('taxis.languages')}:</span>
                                    <p style={{ fontWeight: 500 }}>{taxi.languages}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E5E7EB', paddingTop: '16px' }}>
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>{t('taxis.estimatedRate')}</span>
                                    <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)' }}>{taxi.rate}</span>
                                </div>
                                <button
                                    className="btn btn-outline"
                                    style={{ padding: '8px 16px' }}
                                    onClick={() => handleBooking(taxi)}
                                >
                                    <Phone size={16} /> {t('taxis.contact')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
