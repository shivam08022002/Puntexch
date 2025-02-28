import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaHome, FaDice, FaUser, FaClock } from 'react-icons/fa';
import './FooterMenu.css';

const FooterMenu = ({ openLoginModal, isLoggedIn, toggleProfileSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCasinoClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      openLoginModal();
    } else {
      navigate('/casino');
    }
  };

  const menuItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/inplay', label: 'In Play', icon: <FaClock /> },
    { 
      path: '/casino', 
      label: 'Casino', 
      icon: <FaDice />,
      onClick: handleCasinoClick 
    },
    {
      path: '#',
      label: 'Profile',
      icon: <FaUser />,
      onClick: (e) => {
        e.preventDefault();
        if (isLoggedIn) {
          toggleProfileSidebar();
        } else {
          openLoginModal();
        }
      }
    }
  ];

  return (
    <div className="footer-menu">
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li className="menu-item" key={item.label}>
            <Link
              to={item.path}
              className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={item.onClick}
            >
              <div className="icon-box">{item.icon}</div>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterMenu;
