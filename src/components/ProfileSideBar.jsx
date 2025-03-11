import React, { useEffect, useState } from 'react';
import { X, User, Heart, FileText, Layout, Lock, Globe, Bell, ScrollText, Settings } from 'lucide-react';
import './ProfileSidebar.css';
import TokenService from '../services/token-service';
import { useNavigate } from 'react-router-dom';

const ProfileSidebar = ({ isOpen, onClose, isLoggedIn, onLogout }) => {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = TokenService.getUser();
        if (user && user.userId) {
            setUserId(user.userId);
        }
    }, []);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleLogout = () => {
        TokenService.removeUser(); // ✅ FIXED: Use removeUser() instead of clearToken()
        if (onLogout) onLogout(); // ✅ Prevent "not a function" error
        navigate('/'); 
    };

    const menuItems = [
        { icon: <Layout className="menu-icon2" />, route: "/market", label: "My Market", colorClass: "blue2" },
        { icon: <Heart className="menu-icon2" />, route: "/favorites", label: "Favorites", colorClass: "pink2" },
        { icon: <FileText className="menu-icon2" />, route: "/statement", label: "Statement", colorClass: "yellow2" },
        { icon: <Lock className="menu-icon2" />, route: "/change-password", label: "Change Password", colorClass: "red2" },
        { icon: <Globe className="menu-icon2" />, route: "/language", label: "Language", colorClass: "teal2" },
        { icon: <Bell className="menu-icon2" />, route: "/notifications", label: "Notification", colorClass: "cyan2" },
        { icon: <ScrollText className="menu-icon2" />, route: "/rules", label: "Rules", colorClass: "gray2" },
    ];

    return (
        <div className={`sidebar-overlay2 ${isOpen ? 'visible2' : ''}`} onClick={handleOverlayClick}>
            <div className={`profile-sidebar2 ${isOpen ? 'open2' : ''}`}>
                <div className="sidebar-container2">
                    <div className="sidebar-header2">
                        <div className="user-info2">
                            <User className="menu-icon2" />
                            <span className="username2">{userId || 'Guest'}</span>
                        </div>
                        <button className="close-button2" onClick={onClose}>
                            <X className="menu-icon2" />
                        </button>
                    </div>

                    <div className="menu-container2">
                        <div className="menu-grid2">
                            {menuItems.map((item, index) => (
                                <button key={index} className={`menu-item2 ${item.colorClass}`} onClick={() => { navigate(item.route); onClose(); }}>
                                    {item.icon}
                                    <span className="menu-label2">{item.label}</span>
                                </button>
                            ))}

                            {/* ✅ New Settings Button */}
                            <button className="menu-item2 settings2" onClick={() => { navigate("/settings"); onClose(); }}>
                                <Settings className="menu-icon2" />
                                <span className="menu-label2">Settings</span>
                            </button>
                        </div>
                    </div>

                    {/* ✅ Fixed Logout Button */}
                    <div className="logout-container2">
                        <button className="logout-btn2" onClick={handleLogout}>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
