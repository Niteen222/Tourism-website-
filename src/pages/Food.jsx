import React from 'react';
import { useLanguage } from '../context/LanguageContext';



export const Food = () => {
    const { t } = useLanguage();
    return (
        <div className="animate-fade-in" style={{ padding: '60px 0', backgroundColor: 'var(--bg-color)', minHeight: '80vh' }}>
            <div className="container">
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>{t('food.title')}</h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        {t('food.subtitle')}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
                    {t('food.data').map(food => (
                        <div key={food.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '240px' }}>
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
                                    {food.origin}
                                </span>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{food.name}</h3>
                                <p style={{ color: 'var(--text-light)', flex: 1 }}>{food.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
