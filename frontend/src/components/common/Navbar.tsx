import './Navbar.css';
import { useTheme } from '../../context/ThemeContext';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    const navigate = (page: string) => {
        const nav = (window as unknown as Record<string, unknown>).__navigateTo;

        if (typeof nav === 'function') {
            (nav as (p: string) => void)(page);
        } else {
            window.location.reload();
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>
                    <span className="logo-text">SkyBooker</span>
                </div>
                <ul className="navbar-links">
                    <li><a onClick={() => navigate('home')} className="nav-link active" style={{ cursor: 'pointer' }}>Járatok keresése</a></li>
                    <li><a onClick={() => navigate('my-bookings')} className="nav-link active" style={{ cursor: 'pointer' }}>Foglalásaim</a></li>
                    <li><a onClick={() => navigate('contact')} className="nav-link active" style={{ cursor: 'pointer' }}>Kapcsolat</a></li>
                    <li>
                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            title={theme === 'light' ? 'Sötét mód' : 'Világos mód'}
                            aria-label={theme === 'light' ? 'Sötét mód bekapcsolása' : 'Világos mód bekapcsolása'}
                        >
                            <span className="theme-toggle-track">
                                <span className="theme-toggle-thumb">
                                    {theme === 'light'
                                        ? <MdLightMode className="theme-icon" />
                                        : <MdDarkMode className="theme-icon" />
                                    }
                                </span>
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;