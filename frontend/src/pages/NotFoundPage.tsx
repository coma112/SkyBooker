// ez az oldal fog megjelenni ha a felhasználó olyan útvonalra navigál,
// ami nem létezik.

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import './NotFoundPage.css';
import { FaHome, FaSearch, FaTicketAlt } from 'react-icons/fa';
import { MdFlight } from "react-icons/md";

interface NotFoundPageProps {
    onBackToHome: () => void;
}

const NotFoundPage = ({ onBackToHome }: NotFoundPageProps) => {
    // a navigaciohoz a window_navigateto fuggvenyt fogjuk hasznalni. ez mar regisztralva van az App.tsx-ben

    const navigate = (page: string) => {
        const nav = (window as unknown as Record<string, unknown>).__navigateTo;

        if (typeof nav === 'function') {
            (nav as (p: string) => void)(page);
        }
    };

    return (
        <div className="not-found-page">
            <Navbar />

            <main className="not-found-main">
                <div className="not-found-container">
                    <div className="not-found-code">404</div>

                    <span className="not-found-icon">✈️</span>

                    <h1 className="not-found-title">Jó helyen jársz?</h1>

                    <p className="not-found-subtitle">
                        Úgy tűnik, ez a járat törölve lett, vagy sosem indult el.

                        <br />
                        Az oldal, amit keres, nem létezik, vagy áthelyezésre került!
                    </p>

                    <div className="not-found-actions">
                        <button className="not-found-btn-primary" onClick={onBackToHome}>
                            <FaHome />
                            Főoldal
                        </button>
                        <button className="not-found-btn-secondary" onClick={() => navigate('flights')}>
                            <FaSearch />
                            Járatkeresés
                        </button>
                    </div>

                    <div className="not-found-links">
                        <h3>Ezeket keresi?</h3>
                        <div className="quick-links">

                            <button className="quick-link-btn" onClick={onBackToHome}>
                                <MdFlight className="quick-link-icon" />
                                <span className="quick-link-label">Főoldal</span>
                            </button>

                            <button className="quick-link-btn" onClick={() => navigate('my-bookings')}>
                                <FaTicketAlt className="quick-link-icon" />
                                <span className="quick-link-label">Foglalásaim</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFoundPage;