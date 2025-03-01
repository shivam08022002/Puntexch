import './LoginPage.css';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../actions/auth";
import TokenService from "../services/token-service";
import { httpHelpers } from "../services/httpHelpers";

const LoginPage = ({ closeLogin, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isValidCaptcha, setIsValidCaptcha] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const canvasRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const api = httpHelpers();

    const generateCaptchaText = () => {
        const chars = '0123456789';
        let captcha = '';
        for (let i = 0; i < 4; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    };

    const drawCaptcha = () => {
        const captcha = generateCaptchaText();
        setCaptchaText(captcha);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f3f3f3';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '600 18px Arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#416b42';
        ctx.fillText(captcha, canvas.width / 2, canvas.height / 2);
    };

    useEffect(() => {
        drawCaptcha();
        
        // Cleanup function to handle component unmounting
        return () => {
            setIsLoading(false);
            setError(null);
        };
    }, []);

    const handleNavigateAndClose = (path, state = {}) => {
        closeLogin(); // Close the login modal first
        setTimeout(() => {
            navigate(path, { state }); // Navigate after modal is closed
        }, 300); // Add a small delay to ensure smooth transition
    };

    const fetchNotificationMessage = async () => {
        try {
            const res = await api.get("gamma/getGlobalProperty/userNotificationMessage");
            if (res?.data) {
                handleNavigateAndClose("/", { notificationMessage: res.data });
            } else {
                handleNavigateAndClose("/");
            }
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch(logout());
                setError("Session expired. Please login again.");
            }
            console.error("Error fetching notification:", err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Validate captcha
            if (userInput !== captchaText) {
                setIsValidCaptcha(false);
                drawCaptcha();
                setIsLoading(false);
                return;
            }
            setIsValidCaptcha(true);

            // Attempt login
            const data = await dispatch(login(username, password));

            switch (data.status) {
                case 200:
                    if (!data.data.accessToken && data.data.accountStatus.includes("NEW")) {
                        handleNavigateAndClose("/changepassword");
                    } else if (data.data.accountStatus.includes("ACTIVE")) {
                        TokenService.setUser(data.data);
                        await fetchNotificationMessage();
                        onLoginSuccess();
                        window.location.reload(); // Call this after successful login
                    }
                    break;
                    
                case 401:
                    setError("Username or password not found");
                    drawCaptcha();
                    break;

                default:
                    setError(data.data || "An error occurred during login");
                    drawCaptcha();
            }
        } catch (err) {
            setError("Connection timeout. Please try again.");
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="login-modal">
                <button 
                    className="close-btn" 
                    onClick={closeLogin}
                    disabled={isLoading}
                >
                    &times;
                </button>
                <div className="login-banner">
                    <img 
                        src={process.env.PUBLIC_URL + '/logo.png'} 
                        alt="Skyexch Logo" 
                        className="login-logo" 
                    />
                </div>
                <form className="login-form" onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="login-input" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        disabled={isLoading}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="login-input" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        disabled={isLoading}
                        required 
                    />
                    <div className="login-page-captcha-container">
                        <canvas 
                            ref={canvasRef} 
                            width={120} 
                            height={44} 
                            style={{ border: '0.5px solid black' }} 
                        />
                    </div>
                    {isValidCaptcha === false && (
                        <p style={{ color: 'red' }}>Enter Correct Number!</p>
                    )}
                    <input 
                        type="text" 
                        className="login-input-code" 
                        placeholder="Enter CAPTCHA" 
                        value={userInput} 
                        onChange={(e) => setUserInput(e.target.value)} 
                        disabled={isLoading}
                        required 
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;