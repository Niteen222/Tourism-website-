import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { MapPin, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #E5E7EB',
      padding: '16px 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '8px',
            borderRadius: 'var(--radius-sm)'
          }}>
            <MapPin size={24} />
          </div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.25rem',
            color: 'var(--primary)'
          }}>
            Explore<span style={{ color: 'var(--text-dark)' }}>Dantewada</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="nav-links desktop-only">
          <Link to="/places" style={{ fontWeight: 500 }}>Places to Visit</Link>
          <Link to="/hotels" style={{ fontWeight: 500 }}>Hotels</Link>
          <Link to="/food" style={{ fontWeight: 500 }}>Local Food</Link>
          <Link to="/taxis" style={{ fontWeight: 500 }}>Taxis</Link>
          <Link to="/guides" style={{ fontWeight: 500 }}>Local Guides</Link>

          <div style={{ width: '1px', height: '24px', backgroundColor: '#E5E7EB' }}></div>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)' }}>
                Hi, {user.name}
              </span>
              <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '8px 16px' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/login" className="btn" style={{ fontWeight: 600 }}>Log in</Link>
              <Link to="/signup" className="btn btn-primary">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'white',
      borderTop: '1px solid #E5E7EB',
      padding: '48px 0',
      marginTop: 'auto'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
        <div style={{ maxWidth: '300px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Explore Dantewada</h3>
          <p style={{ color: 'var(--text-light)' }}>Connecting travelers with authentic local experiences in the heart of Bastar, Chhattisgarh.</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '16px' }}>Discover</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-light)' }}>
            <li><Link to="/places">Places</Link></li>
            <li><Link to="/hotels">Hotels</Link></li>
            <li><Link to="/food">Food</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '16px' }}>Services</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-light)' }}>
            <li><Link to="/taxis">Taxis</Link></li>
            <li><Link to="/guides">Local Guides</Link></li>
          </ul>
        </div>
      </div>
      <div className="container" style={{
        marginTop: '48px',
        paddingTop: '24px',
        borderTop: '1px solid #E5E7EB',
        textAlign: 'center',
        color: 'var(--text-light)'
      }}>
        <p>© 2026 Dantewada Tourism. All rights reserved.</p>
      </div>
    </footer>
  );
};

export const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
