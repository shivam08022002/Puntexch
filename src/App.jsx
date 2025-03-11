import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import FooterMenu from './components/FooterMenu';
import Header from './components/Header';
import SportPage from './pages/SportPage';
import InplayPage from './pages/InplayPage';
import CasinoPage from './pages/CasinoPage';
import HomePage from './pages/HomePage';
import LotteryPage from './pages/LotteryPage';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import MatchDetailsPage from './pages/MatchDetailsPage';
import ProfileSidebar from './components/ProfileSideBar';
import TokenService from './services/token-service';
import ChangePassword from './components/ChangePassword';
import PushpaRani from './components/pushpa-rani/PusphpaRani';
import Aviator from './components/Aviator/Aviator';
import './App.css';
import MarqueeText from './components/MarqueeText';
import Navigation from './components/Navigation';
import Settings from './components/Settings';
import Rules from './components/Rules';

const AppContent = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Main Sidebar
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false); // Profile Sidebar
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Check for user authentication on mount
  useEffect(() => {
    const savedUser = TokenService.getUser();
    if (savedUser) {
      setIsLoggedIn(true);
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    TokenService.removeUser();
    setIsLoggedIn(false);
    setUser(null);
    setIsProfileSidebarOpen(false);
    setIsSidebarOpen(false);
    setIsLoginOpen(false);
    navigate('/');
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsLoginOpen(false);
    setIsProfileSidebarOpen(false);
    navigate('/lottery'); // Navigate to lottery page after login
  };

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsProfileSidebarOpen(false); // Close profile sidebar when opening login
  };

  const closeLoginModal = () => setIsLoginOpen(false);

  const toggleMainSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsProfileSidebarOpen(false); // Ensure profile sidebar is closed
  };
  
  const toggleProfileSidebar = () => {
    if (isLoggedIn) {
      setIsProfileSidebarOpen(!isProfileSidebarOpen);
      setIsSidebarOpen(false); // Ensure main sidebar is closed
    } else {
      openLoginModal(); // Redirect to login if not logged in
    }
  };

  useEffect(() => {
    document.title = 'Puntexch247 | Live Sports Betting';
  }, []);

  return (
    <div className="app">
      <Header
        isLoginOpen={isLoginOpen}
        openLoginModal={openLoginModal}
        closeLoginModal={closeLoginModal}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={toggleMainSidebar}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginSuccess={handleLoginSuccess}
        user={user}
      />
      <MarqueeText />
      {isHomePage && <Navigation isLoggedIn={isLoggedIn} logOut={handleLogout} />}
      
      {isLoggedIn && (
        <ProfileSidebar
          isOpen={isProfileSidebarOpen}
          onClose={() => setIsProfileSidebarOpen(false)}
        />
      )}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage openLoginModal={openLoginModal} isLoggedIn={isLoggedIn} />} />
          <Route path="/lottery" element={<LotteryPage isLoggedIn={isLoggedIn} />} />
          <Route 
            path="/sports/:sportName" 
            element={<SportPage isLoggedIn={isLoggedIn} logOut={handleLogout} />} 
          />
          <Route path="/" element={<InplayPage isLoggedIn={isLoggedIn} logOut={handleLogout} />} />
          <Route path="/casino" element={<CasinoPage isLoggedIn={isLoggedIn} logOut={handleLogout} />} />
          <Route path="/match/:id" element={<MatchDetailsPage isLoggedIn={isLoggedIn} logOut={handleLogout} />} />
          <Route path="/change-password" element={<ChangePassword isLoggedIn={isLoggedIn} logOut={handleLogout} />} />
          <Route path="/aviatorgame" element={<Aviator isLoggedIn={isLoggedIn} logOut={handleLogout} />} />
          <Route path="/pushparani" element={<PushpaRani isLoggedIn={isLoggedIn} logOut={handleLogout} />} />
          <Route path="/login" element={<LoginPage closeLogin={closeLoginModal} onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/settings" element={<Settings isLoggedIn={isLoggedIn} logout={handleLogout} />} />
          <Route path="/Rules" element={<Rules isLoggedIn={isLoggedIn} logout={handleLogout} />} />
        </Routes>
      </div>

      <Footer />

      <FooterMenu
        openLoginModal={openLoginModal}
        isLoggedIn={isLoggedIn}
        toggleProfileSidebar={toggleProfileSidebar}
      />
    </div>
  );
};

// Main App component
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
