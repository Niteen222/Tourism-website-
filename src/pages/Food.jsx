import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Food = () => {
    const { t } = useLanguage();
    const [filter, setFilter] = useState('All');

    const allFoods = t('food.data');
    const categories = ['All', ...new Set(allFoods.map(f => f.origin))];
    const filtered = filter === 'All' ? allFoods : allFoods.filter(f => f.origin === filter);

    return (
        <div className="animate-fade-in" style={{ padding: '60px 0', backgroundColor: 'var(--bg-color)', minHeight: '80vh' }}>
            <div className="container">
                {/* Header */}
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>{t('food.title')}</h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 32px auto' }}>
                        {t('food.subtitle')}
                    </p>

                    {/* Category Filter Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '999px',
                                    border: '2px solid',
                                    borderColor: filter === cat ? 'var(--primary)' : 'var(--border-color, #e5e7eb)',
                                    backgroundColor: filter === cat ? 'var(--primary)' : 'var(--bg-card)',
                                    color: filter === cat ? 'white' : 'var(--text-light)',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Food Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
                    {filtered.map(food => (
                        <div
                            key={food.id}
                            className="card"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseOver={e => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.4s ease'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    onError={e => {
                                        e.currentTarget.src = `https://placehold.co/800x600/1a1a2e/white?text=${encodeURIComponent(food.name)}`;
                                    }}
                                />
                                {/* Origin Tag Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    backgroundColor: 'rgba(0,0,0,0.65)',
                                    backdropFilter: 'blur(8px)',
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '999px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase'
                                }}>
                                    {food.origin}
                                </div>
                            </div>
                            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--text-dark)' }}>{food.name}</h3>
                                <p style={{ color: 'var(--text-light)', flex: 1, fontSize: '0.9rem', lineHeight: 1.6 }}>{food.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-light)' }}>
                        <p style={{ fontSize: '1.25rem' }}>No items found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
