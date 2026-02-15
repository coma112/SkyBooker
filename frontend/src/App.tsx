import { useState } from 'react';
import HomePage from './pages/HomePage';
import FlightListPage from './pages/FlightListPage';
import BookingPage from './pages/BookingPage';
import './App.css';
import { BookingData } from './types/booking';

type Page = 'home' | 'flights' | 'booking' | 'confirmation';

interface Flight {
  id: string;
  flightNumber: string;
  departureAirport: { name: string; code: string; city: string };
  arrivalAirport: { name: string; code: string; city: string };
  departureTime: string;
  arrivalTime: string;
  aircraftType: string;
  prices: {
    ECONOMY: number;
    BUSINESS: number;
    FIRST: number;
  };
  availableSeats: {
    ECONOMY: number;
    BUSINESS: number;
    FIRST: number;
  };
  airline: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedClass, setSelectedClass] = useState<'ECONOMY' | 'BUSINESS' | 'FIRST'>('ECONOMY');
  const [departureDate] = useState<string>('2026-03-15'); // This would come from search form
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleBookingClick = (flight: Flight, seatClass: 'ECONOMY' | 'BUSINESS' | 'FIRST') => {
    setSelectedFlight(flight);
    setSelectedClass(seatClass);
    navigateTo('booking');
  };

  const handleBookingConfirm = (data: BookingData) => {
    setBookingData(data);
    navigateTo('confirmation');
  };

  const handleBookingCancel = () => {
    navigateTo('flights');
  };

  if (currentPage === 'booking' && selectedFlight) {
    return (
      <BookingPage
        flight={selectedFlight}
        seatClass={selectedClass}
        departureDate={departureDate}
        onConfirm={handleBookingConfirm}
        onCancel={handleBookingCancel}
      />
    );
  }

  if (currentPage === 'confirmation' && bookingData) {
    // Placeholder for confirmation page
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '2rem',
        padding: '2rem'
      }}>
        <h1 style={{ color: '#059669', fontSize: '3rem' }}>✓ Foglalás sikeres!</h1>
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '12px',
          maxWidth: '600px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2>Foglalási adatok</h2>
          <p><strong>Járat:</strong> {selectedFlight?.flightNumber}</p>
          <p><strong>Név:</strong> {bookingData.lastName} {bookingData.firstName}</p>
          <p><strong>Email:</strong> {bookingData.email}</p>
          <p><strong>Osztály:</strong> {bookingData.seatClass}</p>
          <p><strong>Végösszeg:</strong> {bookingData.totalPrice.toLocaleString('hu-HU')} Ft</p>
        </div>
        <button 
          onClick={() => navigateTo('home')}
          style={{
            padding: '1rem 2rem',
            background: '#0078D4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Vissza a főoldalra
        </button>
      </div>
    );
  }

  if (currentPage === 'flights') {
    return <FlightListPage onBookingClick={handleBookingClick} />;
  }

  return <HomePage onSearch={() => navigateTo('flights')} />;
}

export default App;