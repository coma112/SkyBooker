import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import HomePage from './pages/HomePage';
import FlightListPage from './pages/FlightListPage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';
import NotFoundPage from './pages/NotFoundPage';
import ConfirmationPage from './pages/ConfirmationPage';

import './App.css';

import type { BookingData } from './types/booking';
import type { SearchParams } from './components/flight/FlightSearchForm';

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

function AppContent() {
  const navigate = useNavigate();

  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedClass, setSelectedClass] = useState<'ECONOMY' | 'BUSINESS' | 'FIRST'>('ECONOMY');
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  (window as unknown as Record<string, unknown>).__navigateTo = (page: string) => {
    const pageToPath: Record<string, string> = {
      home: '/',
      flights: '/flights',
      booking: '/booking',
      confirmation: '/confirmation',
      'my-bookings': '/my-bookings',
      contact: '/contact',
    };

    const path = pageToPath[page] ?? '/404';
    navigate(path);
  };

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    navigate('/flights');
  };

  const handleBookingClick = (flight: Flight, seatClass: 'ECONOMY' | 'BUSINESS' | 'FIRST') => {
    setSelectedFlight(flight);
    setSelectedClass(seatClass);
    navigate('/booking');
  };

  const handleBookingConfirm = (data: BookingData) => {
    setBookingData(data);
    navigate('/confirmation');
  };

  const handleBookingCancel = () => {
    navigate('/flights');
  };

  const handleBackToHome = () => {
    setSelectedFlight(null);
    setSelectedClass('ECONOMY');
    setBookingData(null);
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage onSearch={handleSearch} />} />

      <Route
        path="/flights"
        element={
          <FlightListPage
            onBookingClick={handleBookingClick}
            initialSearch={searchParams ?? undefined}
          />
        }
      />

      <Route
        path="/booking"
        element={
          selectedFlight ? (
            <BookingPage
              flight={selectedFlight}
              seatClass={selectedClass}
              departureDate={
                searchParams?.departureDate ?? selectedFlight.departureTime.split('T')[0]
              }
              onConfirm={handleBookingConfirm}
              onCancel={handleBookingCancel}
            />
          ) : (
            <HomePage onSearch={handleSearch} />
          )
        }
      />

      <Route
        path="/confirmation"
        element={
          bookingData && selectedFlight ? (
            <ConfirmationPage
              bookingData={bookingData}
              flight={selectedFlight}
              onBackToHome={handleBackToHome}
            />
          ) : (
            <HomePage onSearch={handleSearch} />
          )
        }
      />

      <Route path="/my-bookings" element={<MyBookingsPage />} />

      {/* <Route path="/contact" element={<ContactPage />} /> */}

      <Route path="*" element={<NotFoundPage onBackToHome={handleBackToHome} />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;