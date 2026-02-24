import React from 'react';

const FOOD_DATA = [
    {
        id: 1,
        name: "Chaprah (Red Ant Chutney)",
        description: "A famous and unique Bastar delicacy made from red ants and their eggs, ground with spices. Known for its medicinal properties.",
        image: "https://placehold.co/800x600/FC642D/white?text=Red+Ant+Chutney",
        origin: "Traditional Tribal Food"
    },
    {
        id: 2,
        name: "Bafauri",
        description: "A healthy, steamed alternative to pakodas made from chana dal, onions, and spices. Very popular in Chhattisgarh.",
        image: "https://placehold.co/800x600/FF5A5F/white?text=Bafauri",
        origin: "Local Snack"
    },
    {
        id: 3,
        name: "Muthia",
        description: "Steamed dumplings made from rice batter and local spices. Often served during breakfast with tangy tomato chutney.",
        image: "https://placehold.co/800x600/00A699/white?text=Muthia",
        origin: "Breakfast Item"
    }
];

export const Food = () => {
    return (
        <div className="animate-fade-in" style={{ padding: '60px 0', backgroundColor: 'var(--bg-color)', minHeight: '80vh' }}>
            <div className="container">
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Taste of Dantewada</h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        Explore the unique and traditional culinary heritage of the Bastar region.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
                    {FOOD_DATA.map(food => (
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
