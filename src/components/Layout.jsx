import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
          <div style={{ gap: '24px', alignItems: 'center' }} className="desktop-links">
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

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} style={{
        position: 'fixed',
        top: '73px',
        left: 0,
        right: 0,
        zIndex: 49,
      }}>
        <Link to="/places">Places to Visit</Link>
        <Link to="/hotels">Hotels</Link>
        <Link to="/food">Local Food</Link>
        <Link to="/taxis">Taxis</Link>
        <Link to="/guides">Local Guides</Link>

        <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '8px 0' }}></div>

        {user ? (
          <>
            <span style={{ padding: '12px 0', fontWeight: 600, color: 'var(--primary)' }}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={{ color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            <Link to="/login" className="btn btn-outline" style={{ justifyContent: 'center' }}>Log in</Link>
            <Link to="/signup" className="btn btn-primary" style={{ justifyContent: 'center' }}>Sign up</Link>
          </div>
        )}
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'white',
      borderTop: '1px solid #E5E7EB',
      padding: '64px 0 24px 0',
      marginTop: 'auto'
    }}>
      <div className="container footer-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'revert', /* Overridden by media query */
        gap: '40px',
        justifyContent: 'space-between',
        ...(window.innerWidth > 768 ? { gridTemplateColumns: '2fr 1fr 1fr' } : {}) // Inline fallback, actual handled by CSS if we added grid there
      }}>
        {/* Quick inline hack for non-css grid override since we used flex earlier, updating to grid */}
      </div>
      {/* Better to just re-write the footer content with grid applied in CSS as footer-grid */}
      <div className="container footer-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        borderBottom: '1px solid #E5E7EB',
        paddingBottom: '40px'
      }}>
        <div style={{ maxWidth: '300px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--primary)', fontSize: '1.5rem' }}>Explore Dantewada</h3>
          <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>Connecting travelers with authentic local experiences in the heart of Bastar, Chhattisgarh. Your trusted guide to the unknown.</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '20px', fontSize: '1.125rem' }}>Discover</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-light)' }}>
            <li><Link to="/places" style={{ cursor: 'pointer' }}>Places to Visit</Link></li>
            <li><Link to="/hotels" style={{ cursor: 'pointer' }}>Hotels & Stays</Link></li>
            <li><Link to="/food" style={{ cursor: 'pointer' }}>Local Food</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '20px', fontSize: '1.125rem' }}>Services</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-light)' }}>
            <li><Link to="/taxis" style={{ cursor: 'pointer' }}>Local Taxis</Link></li>
            <li><Link to="/guides" style={{ cursor: 'pointer' }}>Local Guides</Link></li>
          </ul>
        </div>
      </div>
      <div className="container" style={{
        paddingTop: '24px',
        textAlign: 'center',
        color: 'var(--text-light)',
        fontSize: '0.875rem'
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
