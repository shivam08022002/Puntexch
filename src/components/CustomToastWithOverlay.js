import { Toaster, toast } from 'react-hot-toast';

// Helper to detect if the user is on a mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Custom toast component with OK button and embedded overlay
export default function CustomToastWithOverlay({ message, onClose, success }) {
    return (
        <div style={{ position: 'relative', zIndex: 1000 }}>
            {/* Full-page overlay as part of the toast */}
            <div
                style={{
                    position: 'fixed',
                    top: -16,
                    left: -16,
                    width: '100%',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
                    zIndex: -1, // Behind the toast content but within the same component
                }}
            />
            {/* Toast content */}
            <div
                style={{
                    marginTop: '50%',
                    marginLeft: '-10%',
                    backgroundColor: '#3a61a2',
                    borderRadius: '32px',
                    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.1)',
                    zIndex: 9999,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '6%',
                    paddingTop: '10%',
                    paddingBottom: '10%',
                    color: 'white',
                    fontSize: '1em',
                }}
            >
                <span style={{ width: "240px", textAlign: "center" }}>{message}</span>
                <button
                    onClick={onClose}
                    style={{
                        backgroundColor: success ? '#4caf50' : '#E52B50',
                        color: 'white',
                        fontWeight: '500',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        marginTop: '20px',
                        cursor: 'pointer',
                        width: '30%',
                    }}
                >
                    OK
                </button>
            </div>
        </div>
    );
};