import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>SkyBooker</h3>
                    <p>Az Ön megbízható utazási partnere</p>
                </div>

                <div className="footer-section">
                    <h4>Kapcsolat</h4>
                    <p>Telefon: +36 1 234 5678</p>
                    <p>Email: info@skybooker.hu</p>
                </div>

                <div className="footer-section">
                    <h4>Kövessen minket</h4>
                    <div className="social-icons">
                        <a href="#" className="social-icon">📘</a>
                        <a href="#" className="social-icon">📷</a>
                        <a href="#" className="social-icon">🐦</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 SkyBooker. Minden jog fenntartva.</p>
            </div>
        </footer>
    );
};

export default Footer;