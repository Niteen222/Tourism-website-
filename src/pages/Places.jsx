import React from 'react';
import { MapPin } from 'lucide-react';

const PLACES_DATA = [
    {
        id: 1,
        name: "Dholkal Ganesha",
        description: "An ancient Ganesha idol situated at a height of 3000 feet amidst lush green forests. It requires a 3km trek through dense jungle.",
        image: "https://placehold.co/800x600/FF5A5F/white?text=Dholkal+Ganesha",
        distance: "18 km from Dantewada city",
        duration: "4-5 hours (including trek)"
    },
    {
        id: 2,
        name: "Danteshwari Temple",
        description: "Built in the 14th century, this temple is dedicated to Goddess Danteshwari, the presiding deity of Bastar. It is one of the 52 Shakti Peethas.",
        image: "https://placehold.co/800x600/00A699/white?text=Danteshwari+Temple",
        distance: "In Dantewada city",
        duration: "1-2 hours"
    },
    {
        id: 3,
        name: "Phoolpad Waterfall",
        description: "A breathtaking waterfall hidden deep inside the jungle, perfect for nature lovers and adventurers seeking untouched beauty.",
        image: "https://placehold.co/800x600/FC642D/white?text=Phoolpad+Waterfall",
        distance: "35 km from Dantewada",
        duration: "Half day trip"
    },
    {
        id: 4,
        name: "Barsoor",
        description: "An ancient city known as the city of temples and lakes, famous for the Mama-Bhanja temple, Chandraditya temple, and twin Ganesha idols.",
        image: "https://placehold.co/800x600/222222/white?text=Barsoor",
        distance: "30 km from Dantewada",
        duration: "Half day trip"
    }
];

export const Places = () => {
    return (
        <div className="animate-fade-in" style={{ padding: '60px 0', backgroundColor: 'var(--bg-color)', minHeight: '80vh' }}>
            <div className="container">
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Explore Dantewada</h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        Discover ancient temples, breathtaking waterfalls, and hidden gems in the heart of Bastar.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
                    {PLACES_DATA.map(place => (
                        <div key={place.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '240px', overflow: 'hidden' }}>
                                <img
                                    src={place.image}
                                    alt={place.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{place.name}</h3>
                                <p style={{ color: 'var(--text-light)', marginBottom: '24px', flex: 1 }}>{place.description}</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: 'var(--text-dark)', fontWeight: 500 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <MapPin size={16} color="var(--primary)" /> {place.distance}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
