import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { Chatbot } from './Chatbot';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
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
        backgroundColor: 'var(--bg-card)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--text-light)',
        opacity: 0.95,
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
            <span className="logo-text logo-full">
              {t('navbar.explore')}<span className="logo-accent">{t('navbar.dantewada')}</span>
            </span>
            <span className="logo-text logo-short">
              ED
            </span>
          </Link>

          {/* Desktop Links */}
          <div style={{ gap: '20px', alignItems: 'center' }} className="desktop-links">
            <Link to="/places" style={{ fontWeight: 500 }}>{t('navbar.places')}</Link>
            <Link to="/hotels" style={{ fontWeight: 500 }}>{t('navbar.hotels')}</Link>
            <Link to="/food" style={{ fontWeight: 500 }}>{t('navbar.food')}</Link>
            <Link to="/taxis" style={{ fontWeight: 500 }}>{t('navbar.taxis')}</Link>
            <Link to="/guides" style={{ fontWeight: 500 }}>{t('navbar.guides')}</Link>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <LanguageToggle />
              <ThemeToggle />
            </div>

            <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--text-light)', opacity: 0.2 }}></div>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)' }}>
                  {t('navbar.hi')}, {user.name}
                </span>
                <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '8px 16px' }}>
                  <LogOut size={16} /> {t('navbar.logout')}
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link to="/login" className="btn" style={{ fontWeight: 600 }}>{t('navbar.login')}</Link>
                <Link to="/signup" className="btn btn-primary">{t('navbar.signup')}</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div style={{ display: 'none', gap: '8px', alignItems: 'center' }} className="mobile-actions">
            <LanguageToggle />
            <ThemeToggle />
            <button className="mobile-menu-btn" onClick={toggleMobileMenu} style={{ display: 'block' }}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
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
        <Link to="/places">{t('navbar.places')}</Link>
        <Link to="/hotels">{t('navbar.hotels')}</Link>
        <Link to="/food">{t('navbar.food')}</Link>
        <Link to="/taxis">{t('navbar.taxis')}</Link>
        <Link to="/guides">{t('navbar.guides')}</Link>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
          <span style={{ fontWeight: 500 }}>{t('navbar.switchTheme')}</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--text-light)', opacity: 0.2, margin: '8px 0' }}></div>

        {user ? (
          <>
            <span style={{ padding: '12px 0', fontWeight: 600, color: 'var(--primary)' }}>{t('navbar.hi')}, {user.name}</span>
            <button onClick={handleLogout} style={{ color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LogOut size={16} /> {t('navbar.logout')}
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            <Link to="/login" className="btn btn-outline" style={{ justifyContent: 'center' }}>{t('navbar.login')}</Link>
            <Link to="/signup" className="btn btn-primary" style={{ justifyContent: 'center' }}>{t('navbar.signup')}</Link>
          </div>
        )}
      </div>
    </>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer style={{
      backgroundColor: 'var(--bg-card)',
      borderTop: '1px solid var(--text-light)',
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
        borderBottom: '1px solid var(--text-light)',
        paddingBottom: '40px'
      }}>
        <div style={{ maxWidth: '300px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--primary)', fontSize: '1.5rem' }}>{t('navbar.explore')} {t('navbar.dantewada')}</h3>
          <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>{t('footer.desc')}</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '20px', fontSize: '1.125rem' }}>{t('footer.discover')}</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-light)' }}>
            <li><Link to="/places" style={{ cursor: 'pointer' }}>{t('navbar.places')}</Link></li>
            <li><Link to="/hotels" style={{ cursor: 'pointer' }}>{t('navbar.hotels')}</Link></li>
            <li><Link to="/food" style={{ cursor: 'pointer' }}>{t('navbar.food')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '20px', fontSize: '1.125rem' }}>{t('footer.services')}</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-light)' }}>
            <li><Link to="/taxis" style={{ cursor: 'pointer' }}>{t('navbar.taxis')}</Link></li>
            <li><Link to="/guides" style={{ cursor: 'pointer' }}>{t('navbar.guides')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container" style={{
        paddingTop: '24px',
        textAlign: 'center',
        color: 'var(--text-light)',
        fontSize: '0.875rem'
      }}>
        <p>© 2026 {t('navbar.dantewada')} Tourism Platform. {t('footer.rights')}</p>
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
      <Chatbot />
    </div>
  );
};
