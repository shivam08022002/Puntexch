import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaHome, FaUser, FaSignOutAlt, FaWallet } from 'react-icons/fa';
// import Navigation from './Navigation';
// import Footer from './Footer';
import './Header.css';
import LoginPage from '../pages/LoginPage';
import { httpHelpers } from '../services/httpHelpers';
import TokenService from '../services/token-service';
// import ProfileSidebar from './ProfileSideBar';

const Header = ({ 
  isLoginOpen, 
  openLoginModal, 
  closeLoginModal, 
  isSidebarOpen, 
  setIsSidebarOpen,
  isLoggedIn,
  onLogout,
  onLoginSuccess,
  user
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const api = httpHelpers();
  const [balance, setBalance] = useState(0);
  const [balanceError, setBalanceError] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle('dark-theme', !isDarkMode);
  };

  useEffect(() => {
    let intervalId;
    
    const fetchBalance = () => {
      api.get('gamma/getBalance')
        .then(res => {
          setBalance(res.data);
          setBalanceError(null);
        })
        .catch(err => {
          console.error('Balance fetch error:', err);
          if (err?.response?.status === 401) {
            onLogout();
          } else {
            setBalanceError('Error loading balance');
          }
        });
    };

    if (isLoggedIn) {
      intervalId = setInterval(fetchBalance, 1000);
    } else {
      setBalance(0);
      setBalanceError(null);
       {
            const newUser = TokenService.getUser();
            if (newUser) {
                setBalance(newUser.balance);
            }
        }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLoggedIn, api, onLogout]);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <button 
            className="menu-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <a href="/" className="logo">
            <div className="logo-text">
              <span className="logo-part">PUNT</span>
              <span className="logo-part">EXCH</span>
            </div>
          </a>
        </div>
        <div className="auth-buttons">
          {isLoggedIn && user && (
            <div className="user-section">
              <div className="user-info">
                <span className="user-name">{user.firstName}</span>
                <span className="user-id">ID: {user.userId}</span>
              </div>
              <div className="balance-container">
                <FaWallet className="balance-icon" />
                {balanceError ? (
                  <span className="balance-error">{balanceError}</span>
                ) : (
                  <span className="balance-amount">₹{balance.toLocaleString()}</span>
                )}
              </div>
            </div>
          )}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle className="sun" cx="12" cy="12" r="5" />
              <g className="sun-rays">
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
              <path
                className="moon"
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              />
            </svg>
          </button>
          {!isLoggedIn && (
            <button className="login-btn" onClick={openLoginModal}>
              Login
            </button>
          )}
        </div>
      </header>

      {/* Rest of the component remains unchanged */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="sidebar-logo-text">PUNT</span>
            <span className="sidebar-logo-text">EXCH</span>
          </div>
          <button 
            className="sidebar-close"
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-quick-menu">
            <a href="/" className="quick-menu-item">
              <FaHome className="quick-menu-icon" />
              <span>Home</span>
            </a>
            {isLoggedIn ? (
              <>
               
                <button 
                  className="quick-menu-item logout-btn"
                  onClick={onLogout}
                >
                  <FaSignOutAlt className="quick-menu-icon" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button 
                className="quick-menu-item"
                onClick={openLoginModal}
              >
                <FaUser className="quick-menu-icon" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* <nav className="sidebar-nav">
            <Navigation />
          </nav> */}

          {/* <div className="sidebar-footer">
            <Footer />
          </div> */}
        </div>
      </aside>

      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}

      {isLoginOpen && (
        <LoginPage 
          closeLogin={closeLoginModal} 
          onLoginSuccess={onLoginSuccess} 
        />
      )}
    </>
  );
};

export default Header;