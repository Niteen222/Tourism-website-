import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Coffee, Car, Home as HomeIcon, User } from 'lucide-react';

// Mock Data for Marquee
const FEATURED_PLACES = [
    { id: 1, name: "Dholkal Ganesha", type: "Trek & Temple", image: "https://placehold.co/800x600/FF5A5F/white?text=Dholkal+Ganesha" },
    { id: 2, name: "Danteshwari Temple", type: "Heritage", image: "https://placehold.co/800x600/00A699/white?text=Danteshwari+Temple" },
    { id: 3, name: "Phoolpad Waterfall", type: "Nature", image: "https://placehold.co/800x600/FC642D/white?text=Phoolpad+Waterfall" },
    { id: 4, name: "Barsoor", type: "Historical Site", image: "https://placehold.co/800x600/222222/white?text=Barsoor" }
];

export const Home = () => {
    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                padding: '80px 0 120px 0',
                backgroundColor: 'var(--primary)',
                backgroundImage: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                color: 'white',
                overflow: 'hidden'
            }}>
                {/* Decorative background blobs */}
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
                <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '300px', height: '300px', background: 'rgba(0,0,0,0.1)', borderRadius: '50%', filter: 'blur(30px)' }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h1 style={{
                            fontSize: '4rem',
                            lineHeight: 1.1,
                            marginBottom: '24px',
                            color: 'white',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            Discover the Heart of <br /> <span style={{ color: '#FFE0E0' }}>Bastar, Dantewada</span>
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            marginBottom: '40px',
                            color: 'rgba(255, 255, 255, 0.9)',
                            maxWidth: '600px',
                            margin: '0 auto 40px auto'
                        }}>
                            Connect with local guides, find authentic food, book cozy homestays, and explore untouched nature.
                        </p>

                        {/* Quick Search/Actions Glass Morphism Bar */}
                        <div className="glass" style={{
                            display: 'flex',
                            padding: '12px',
                            borderRadius: 'var(--radius-full)',
                            gap: '12px',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}>
                            <Link to="/guides" className="btn" style={{ background: 'white', color: 'var(--primary)', borderRadius: 'var(--radius-full)' }}>
                                <User size={18} /> Find a Guide
                            </Link>
                            <Link to="/hotels" className="btn" style={{ background: 'white', color: 'var(--primary)', borderRadius: 'var(--radius-full)' }}>
                                <HomeIcon size={18} /> Stay
                            </Link>
                            <Link to="/taxis" className="btn" style={{ background: 'white', color: 'var(--primary)', borderRadius: 'var(--radius-full)' }}>
                                <Car size={18} /> Cab
                            </Link>
                            <Link to="/food" className="btn" style={{ background: 'white', color: 'var(--primary)', borderRadius: 'var(--radius-full)' }}>
                                <Coffee size={18} /> Food
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scrolling Marquee Section */}
            <section style={{ padding: '60px 0', backgroundColor: 'var(--bg-color)', overflow: 'hidden' }}>
                <div className="container" style={{ marginBottom: '32px' }}>
                    <h2>Must Visit Places</h2>
                </div>

                <div className="marquee-container">
                    <div className="marquee-content">
                        {/* Double the list for seamless infinite scroll */}
                        {[...FEATURED_PLACES, ...FEATURED_PLACES].map((place, index) => (
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
            <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '48px', fontSize: '2.5rem' }}>How It Works</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>

                        <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(255, 90, 95, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                                <User size={32} />
                            </div>
                            <h3 style={{ marginBottom: '16px' }}>1. Sign Up</h3>
                            <p style={{ color: 'var(--text-light)' }}>Create an account as a Tourist or a Local Guide to start your journey.</p>
                        </div>

                        <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(0, 166, 153, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                                <Search size={32} />
                            </div>
                            <h3 style={{ marginBottom: '16px' }}>2. Explore & Book</h3>
                            <p style={{ color: 'var(--text-light)' }}>Find the perfect homestay, affordable taxi, or local companion for your trip.</p>
                        </div>

                        <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(252, 100, 45, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                                <MapPin size={32} />
                            </div>
                            <h3 style={{ marginBottom: '16px' }}>3. Travel Seamlessly</h3>
                            <p style={{ color: 'var(--text-light)' }}>Instant notifications sent to drivers and hosts via SMS & WhatsApp so you can travel stress-free.</p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};
