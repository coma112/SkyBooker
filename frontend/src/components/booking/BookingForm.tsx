import { useState, FormEvent, ChangeEvent, FocusEvent } from 'react';
import './BookingForm.css';
import { BookingFormData } from '../../types/booking';
import {
  validateEmail,
  validatePhone,
  validatePassport,
  validateBirthDate,
  validateName
} from '../../utils/validation';
import { FaUser, FaEnvelope, FaPhone, FaPassport, FaCalendar, FaSpinner } from 'react-icons/fa';

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  loading: boolean;
}

const BookingForm = ({ onSubmit, loading }: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    passportNumber: '',
    birthDate: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof BookingFormData, boolean>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof BookingFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur
    validateField(name as keyof BookingFormData);
  };

  const validateField = (fieldName: keyof BookingFormData): boolean => {
    let error: string | null = null;

    switch (fieldName) {
      case 'lastName':
        error = validateName(formData.lastName, 'Vezetéknév');
        break;
      case 'firstName':
        error = validateName(formData.firstName, 'Keresztnév');
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'phone':
        error = validatePhone(formData.phone);
        break;
      case 'passportNumber':
        error = validatePassport(formData.passportNumber);
        break;
      case 'birthDate':
        error = validateBirthDate(formData.birthDate);
        break;
    }

    if (error) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
      return false;
    }

    return true;
  };

  const validateAllFields = (): boolean => {
    const fields: (keyof BookingFormData)[] = [
      'lastName',
      'firstName',
      'email',
      'phone',
      'passportNumber',
      'birthDate'
    ];

    let isValid = true;
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    // Mark all as touched
    const allTouched: Partial<Record<keyof BookingFormData, boolean>> = {};
    fields.forEach(field => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateAllFields()) {
      onSubmit(formData);
    }
  };

  const getMaxBirthDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      {/* Personal Information */}
      <div className="form-section">
        <h3 className="section-title">Személyi adatok</h3>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              <FaUser className="label-icon" />
              Vezetéknév <span className="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${touched.lastName && errors.lastName ? 'error' : ''}`}
              placeholder="Kovács"
              disabled={loading}
            />
            {touched.lastName && errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              <FaUser className="label-icon" />
              Keresztnév <span className="required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${touched.firstName && errors.firstName ? 'error' : ''}`}
              placeholder="Anna"
              disabled={loading}
            />
            {touched.firstName && errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="form-section">
        <h3 className="section-title">Elérhetőség</h3>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            <FaEnvelope className="label-icon" />
            Email cím <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${touched.email && errors.email ? 'error' : ''}`}
            placeholder="anna.kovacs@example.com"
            disabled={loading}
          />
          {touched.email && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            <FaPhone className="label-icon" />
            Telefonszám <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${touched.phone && errors.phone ? 'error' : ''}`}
            placeholder="+36 30 123 4567"
            disabled={loading}
          />
          {touched.phone && errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>
      </div>

      {/* Travel Document */}
      <div className="form-section">
        <h3 className="section-title">Utazási dokumentum</h3>

        <div className="form-group">
          <label htmlFor="passportNumber" className="form-label">
            <FaPassport className="label-icon" />
            Útlevélszám <span className="required">*</span>
          </label>
          <input
            type="text"
            id="passportNumber"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${touched.passportNumber && errors.passportNumber ? 'error' : ''}`}
            placeholder="AB1234567"
            disabled={loading}
          />
          {touched.passportNumber && errors.passportNumber && (
            <span className="error-message">{errors.passportNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="birthDate" className="form-label">
            <FaCalendar className="label-icon" />
            Születési dátum <span className="required">*</span>
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            onBlur={handleBlur}
            max={getMaxBirthDate()}
            className={`form-input ${touched.birthDate && errors.birthDate ? 'error' : ''}`}
            disabled={loading}
          />
          {touched.birthDate && errors.birthDate && (
            <span className="error-message">{errors.birthDate}</span>
          )}
          <span className="field-hint">Az utasnak legalább 18 évesnek kell lennie</span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="form-actions">
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="spinner" />
              Foglalás folyamatban...
            </>
          ) : (
            'Foglalás leadása'
          )}
        </button>
      </div>

      <div className="form-notice">
        <p>
          <strong>Fontos:</strong> Kérjük, az adatokat pontosan, az útlevélben szereplő módon adja meg. 
          A hibás adatok a repülőtéren problémákat okozhatnak.
        </p>
      </div>
    </form>
  );
};

export default BookingForm;