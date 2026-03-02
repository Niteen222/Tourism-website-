import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Coffee, Car, Home as HomeIcon, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Reliable generic High-Quality Unsplash images for Bastar / Nature / Heritage feel

const HERO_IMAGES = [
    "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=1600&q=80", // Nature/Mountains
    "https://maadanteshwari.in/assets/img/slider/slider-0004.jpg", // Temple architecture
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ29mx_nY44tJd6ic41qVUpxGnqEXr968XZSw&s", // Waterfall
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_xZ0oUGncT3GiJCUm9LdiuXSzPJ77saayqA&s", // Resort
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFUivDwvJT7wgePWtubsS9FE6fgqS4mrq6pg&s"  // Tribal Food/Culture
];

export const Home = () => {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

    return (
        <div className="animate-fade-in">
            {/* Hero Section with Carousel */}
            <section style={{
                position: 'relative',
                padding: '120px 0 160px 0',
                color: 'white',
                overflow: 'hidden',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Carousel Backgrounds */}
                {HERO_IMAGES.map((img, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: index === currentSlide ? 1 : 0,
                            transition: 'opacity 1s ease-in-out',
                            zIndex: 1
                        }}
                    />
                ))}

                {/* Dark Overlay for text readability */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 2
                }} />

                {/* Left/Right Carousel Controls */}
                <button onClick={prevSlide} style={{
                    position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)',
                    zIndex: 20, backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)',
                    border: 'none', borderRadius: '50%', width: '48px', height: '48px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                    cursor: 'pointer', transition: 'background-color 0.2s'
                }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}>
                    <ChevronLeft size={32} />
                </button>

                <button onClick={nextSlide} style={{
                    position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)',
                    zIndex: 20, backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)',
                    border: 'none', borderRadius: '50%', width: '48px', height: '48px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                    cursor: 'pointer', transition: 'background-color 0.2s'
                }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}>
                    <ChevronRight size={32} />
                </button>

                {/* Hero Content */}
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h1 style={{
                            fontSize: '4.5rem',
                            lineHeight: 1.1,
                            marginBottom: '24px',
                            color: 'white',
                            fontFamily: 'var(--font-heading)',
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        }}>
                            {t('hero.title')} <br /> <span style={{ color: '#FFE0E0' }}>{t('navbar.dantewada')}</span>
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            marginBottom: '40px',
                            color: 'rgba(255, 255, 255, 0.95)',
                            maxWidth: '600px',
                            margin: '0 auto 40px auto',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                        }}>
                            {t('hero.subtitle')}
                        </p>

                        {/* Quick Search/Actions Glass Morphism Bar */}
                        <div className="glass" style={{
                            display: 'flex',
                            padding: '12px',
                            borderRadius: 'var(--radius-full)',
                            gap: '12px',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(12px)'
                        }}>
                            <Link to="/guides" className="btn" style={{ background: 'var(--bg-card)', color: 'var(--primary)', borderRadius: 'var(--radius-full)' }}>
                                <User size={18} /> {t('hero.findGuide')}
                            </Link>
                            <Link to="/hotels" className="btn" style={{ background: 'var(--bg-card)', color: 'var(--primary)', borderRadius: 'var(--radius-full)' }}>
                                <HomeIcon size={18} /> {t('hero.stay')}
                            </Link>
                            <Link to="/taxis" className="btn" style={{ background: 'var(--bg-card)', color: 'var(--primary)', borderRadius: 'var(--radius-full)' }}>
                                <Car size={18} /> {t('hero.cab')}
                            </Link>
                            <Link to="/food" className="btn" style={{ background: 'var(--bg-card)', color: 'var(--primary)', borderRadius: 'var(--radius-full)' }}>
                                <Coffee size={18} /> {t('hero.food')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Carousel Indicators */}
                <div style={{
                    position: 'absolute', bottom: '32px', left: 0, right: 0,
                    display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 10
                }}>
                    {HERO_IMAGES.map((_, idx) => (
                        <div key={idx} onClick={() => setCurrentSlide(idx)} style={{
                            width: idx === currentSlide ? '24px' : '8px',
                            height: '8px',
                            borderRadius: '4px',
                            backgroundColor: idx === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }} />
                    ))}
                </div>
            </section>

            {/* Scrolling Marquee Section */}
            <section style={{ padding: '60px 0', backgroundColor: 'var(--bg-color)', overflow: 'hidden' }}>
                <div className="container" style={{ marginBottom: '32px' }}>
                    <h2>{t('home.mustVisit')}</h2>
                </div>

                <div className="marquee-container">
                    <div className="marquee-content">
                        {/* Double the list for seamless infinite scroll */}
                        {[...t('places.data'), ...t('places.data')].map((place, index) => (
                            <div key={`${place.id}-${index}`} className="card" style={{
                                width: '300px',
                                height: '400px',
                                margin: '0 16px',
                                position: 'relative',
                                flexShrink: 0,
                                borderRadius: 'var(--radius-lg)'
                            }}>
                                <img
                                    src={place.image}
                                    alt={place.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '24px',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                                    color: 'white'
                                }}>
                                    <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#E5E7EB' }}>
                                        {place.type}
                                    </span>
                                    <h3 style={{ color: 'white', fontSize: '1.5rem', marginTop: '4px' }}>{place.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-card)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '48px', fontSize: '2.5rem' }}>{t('home.howItWorks')}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>

                        <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(255, 90, 95, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                                <User size={32} />
                            </div>
                            <h3 style={{ marginBottom: '16px' }}>{t('home.step1Title')}</h3>
                            <p style={{ color: 'var(--text-light)' }}>{t('home.step1Desc')}</p>
                        </div>

                        <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(0, 166, 153, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                                <Search size={32} />
                            </div>
                            <h3 style={{ marginBottom: '16px' }}>{t('home.step2Title')}</h3>
                            <p style={{ color: 'var(--text-light)' }}>{t('home.step2Desc')}</p>
                        </div>

                        <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(252, 100, 45, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                                <MapPin size={32} />
                            </div>
                            <h3 style={{ marginBottom: '16px' }}>{t('home.step3Title')}</h3>
                            <p style={{ color: 'var(--text-light)' }}>{t('home.step3Desc')}</p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};
