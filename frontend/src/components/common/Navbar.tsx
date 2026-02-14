import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <span className="logo-icon">💼</span>
                    <span className="logo-text">SkyBooker</span>
                </div>
                <ul className="navbar-links">
                    <li><a href="/" className="nav-link active">Járatok keresése</a></li>
                    <li><a href="/bookings" className="nav-link">Foglalásaim</a></li>
                    <li><a href="/contact" className="nav-link">Kapcsolat</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;