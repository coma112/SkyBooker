import { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BookingForm from '../components/booking/BookingForm';
import BookingSummary from '../components/booking/BookingSummary';
import './BookingPage.css';
import type { BookingFormData, BookingData } from '../types/booking';
import { calculatePrice } from '../utils/priceCalculation';

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

interface BookingPageProps {
  flight: Flight;
  seatClass: 'ECONOMY' | 'BUSINESS' | 'FIRST';
  departureDate: string;
  onConfirm: (bookingData: BookingData) => void;
  onCancel: () => void;
}

const BookingPage = ({ 
  flight, 
  seatClass, 
  departureDate, 
  onConfirm,
  onCancel 
}: BookingPageProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData: BookingFormData) => {
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const basePrice = flight.prices[seatClass];
      const priceBreakdown = calculatePrice(basePrice, seatClass, departureDate);

      const bookingData: BookingData = {
        ...formData,
        flightId: flight.id,
        seatClass,
        totalPrice: priceBreakdown.total,
        bookingDate: new Date().toISOString()
      };

      onConfirm(bookingData);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Hiba történt a foglalás során. Kérjük, próbálja újra!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-page">
      <Navbar />

      <main className="booking-main">
        <div className="booking-header">
          <div className="booking-header-content">
            <button className="back-button" onClick={onCancel}>
              ← Vissza a járatokhoz
            </button>
            <h1 className="page-title">Foglalás véglegesítése</h1>
            <p className="page-subtitle">
              Adja meg az utazás adatait a foglalás befejezéséhez
            </p>
          </div>
        </div>

        <div className="booking-container">
          <div className="booking-form-section">
            <BookingForm 
              onSubmit={handleFormSubmit}
              loading={isSubmitting}
            />
          </div>

          <aside className="booking-summary-section">
            <BookingSummary 
              flight={flight}
              seatClass={seatClass}
              departureDate={departureDate}
            />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;