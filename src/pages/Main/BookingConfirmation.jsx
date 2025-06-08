import { useEffect, useState } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import styles from './BookingConfirmation.module.css';
import { CheckCircle, Calendar, MapPin, User, Package, Hash } from 'lucide-react';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Get booking details from navigation state
    if (location.state?.bookingDetails) {
      setBookingDetails(location.state.bookingDetails);
    } else {
      // If no booking details, redirect to home
      navigate('/home');
    }
  }, [location.state, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const datePart = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const timePart = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    return `${datePart} at ${timePart}`;
  };

  if (!bookingDetails) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.confirmationCard}>
        <div className={styles.header}>
          <CheckCircle className={styles.successIcon} size={64} />
          <h1 className={styles.title}>Booking Confirmed!</h1>
          <p className={styles.subtitle}>Your tickets have been successfully booked</p>
        </div>

        <div className={styles.bookingDetails}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Event Details</h2>
            <div className={styles.detailItem}>
              <Calendar size={18} />
              <div>
                <strong>{bookingDetails.event.title}</strong>
                <p>{formatDate(bookingDetails.event.eventDate)}</p>
              </div>
            </div>
            <div className={styles.detailItem}>
              <MapPin size={18} />
              <span>{bookingDetails.event.location}</span>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Package Information</h2>
            <div className={styles.detailItem}>
              <Package size={18} />
              <div>
                <strong>{bookingDetails.package.title}</strong>
                <p>Seating: {bookingDetails.package.seatingArrangement}</p>
                <p>Placement: {bookingDetails.package.placement}</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Booking Summary</h2>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <Hash size={16} />
                <span>Tickets: {bookingDetails.ticketQuantity}</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Price per ticket: {bookingDetails.package.currency}{bookingDetails.package.price}</span>
              </div>
              <div className={styles.summaryItem}>
                <strong>Total: {bookingDetails.package.currency}{bookingDetails.package.price * bookingDetails.ticketQuantity}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <NavLink to="/home" className={styles.primaryButton}>
            Browse More Events
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation; 