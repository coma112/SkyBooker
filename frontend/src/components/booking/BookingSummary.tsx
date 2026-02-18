import './BookingSummary.css';
import { MdFlightTakeoff, MdFlightLand, MdEventSeat } from 'react-icons/md';
import { FaPlane, FaCalendar } from 'react-icons/fa';
import { calculatePrice, formatPrice } from '../../utils/priceCalculation';
import { formatTime, formatDate } from '../../utils/dateUtils';
import { getClassLabel } from '../../utils/flightUtils';

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
  airline: string;
}

interface BookingSummaryProps {
  flight: Flight;
  seatClass: 'ECONOMY' | 'BUSINESS' | 'FIRST';
  departureDate: string;
}

const BookingSummary = ({ flight, seatClass, departureDate }: BookingSummaryProps) => {
  const basePrice = flight.prices[seatClass];
  const priceBreakdown = calculatePrice(basePrice, seatClass, departureDate);

  return (
    <div className="booking-summary">
      <div className="summary-header">
        <h3>Foglalás összesítő</h3>
      </div>

      <div className="summary-content">
        <div className="summary-section flight-info">
          <div className="flight-header">
            <FaPlane className="section-icon" />
            <span className="flight-number">{flight.flightNumber}</span>
          </div>
          <div className="airline-name">{flight.airline}</div>

          <div className="route-info">
            <div className="route-point">
              <MdFlightTakeoff className="route-icon" />
              <div className="route-details">
                <div className="airport-code">{flight.departureAirport.code}</div>
                <div className="airport-city">{flight.departureAirport.city}</div>
                <div className="flight-time">{formatTime(flight.departureTime)}</div>
              </div>
            </div>

            <div className="route-arrow">→</div>

            <div className="route-point">
              <MdFlightLand className="route-icon" />
              <div className="route-details">
                <div className="airport-code">{flight.arrivalAirport.code}</div>
                <div className="airport-city">{flight.arrivalAirport.city}</div>
                <div className="flight-time">{formatTime(flight.arrivalTime)}</div>
              </div>
            </div>
          </div>

          <div className="departure-date">
            <FaCalendar className="date-icon" />
            <span>{formatDate(departureDate)}</span>
          </div>
        </div>

        <div className="summary-section class-section">
          <MdEventSeat className="section-icon" />
          <span className="class-label">{getClassLabel(seatClass)}</span>
        </div>

        <div className="summary-section price-section">
          <h4>Ár részletezés</h4>

          <div className="price-breakdown">
            <div className="price-item">
              <span className="price-label">Alap ár ({seatClass}):</span>
              <span className="price-value">{formatPrice(priceBreakdown.basePrice)}</span>
            </div>

            {priceBreakdown.earlyBirdDiscount > 0 && (
              <div className="price-item discount">
                <span className="price-label">
                  Early bird kedvezmény:
                  <span className="price-info">-15%</span>
                </span>
                <span className="price-value discount-value">
                  -{formatPrice(priceBreakdown.earlyBirdDiscount)}
                </span>
              </div>
            )}

            {priceBreakdown.lastMinuteFee > 0 && (
              <div className="price-item fee">
                <span className="price-label">
                  Last minute felár:
                  <span className="price-info">+25%</span>
                </span>
                <span className="price-value fee-value">
                  +{formatPrice(priceBreakdown.lastMinuteFee)}
                </span>
              </div>
            )}

            {priceBreakdown.seasonalFee > 0 && (
              <div className="price-item fee">
                <span className="price-label">
                  Szezonális felár:
                  <span className="price-info">+20%</span>
                </span>
                <span className="price-value fee-value">
                  +{formatPrice(priceBreakdown.seasonalFee)}
                </span>
              </div>
            )}

            <div className="price-divider"></div>

            <div className="price-total">
              <span className="total-label">Végösszeg:</span>
              <span className="total-value">{formatPrice(priceBreakdown.total)}</span>
            </div>
          </div>
        </div>

        <div className="summary-notice">
          <p>A végleges ár az utas adatainak megadása után kerül kiszámításra.</p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;