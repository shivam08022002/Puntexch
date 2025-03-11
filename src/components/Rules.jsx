import './Rules.css';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import CustomToggleButton from './CustomToggleButton';
import RulesPage from './RulesPage';
export default function Rules({ role, logout, supportedSports, isSmallScreen, userId }) {

    const { state } = useLocation();
    let navigate = useNavigate();
    const { notificationMessage } = state ? state : "";
    useEffect(() => {
        window.scrollTo(0, 0);
        console.log("rules", "useEffect", notificationMessage);
    },);

    const [language, setLanguage] = useState('en');
    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const goToHomePage = () => {
        navigate("/home");
    };

    return (
        <div className="rules-root">
            <div className="rules-toggle-button-container">
                <CustomToggleButton onLanguageChange={handleLanguageChange} />
            </div>
            <div className="rules-page-container">
                <RulesPage lang={language} onMainMenuClick={goToHomePage} />
            </div>
        </div>
          
        );
   
};