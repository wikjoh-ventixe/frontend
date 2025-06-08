import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, createBooking } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import styles from './EventDetails.module.css';
import { Calendar, MapPin } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchEvent = async () => {
    try {
      const res = await getEvent(id);
      setEvent(res.data);
      if (res.data.packages && res.data.packages.length > 0) {
        setSelectedPackage(res.data.packages[0]);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handlePackageSelection = (packageItem) => {
    setSelectedPackage(packageItem);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setTicketQuantity(value);
  };

  const handleBookEvent = () => {
    if (!isLoggedIn) {
      navigate(`/auth/login?returnTo=/event/${id}`);
      return;
    }
    setShowConfirmation(true);
  };

  const confirmBooking = async () => {
    try {
      const bookingData = {
        eventId: id,
        packageId: selectedPackage.id,
        quantity: ticketQuantity,
        totalAmount: selectedPackage.price * ticketQuantity
      };
      
      await createBooking(bookingData);
      setShowConfirmation(false);
      alert('Booking confirmed successfully!');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  const cancelBooking = () => {
    setShowConfirmation(false);
  };

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

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Event not found</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.eventHeader}>
        <div className={styles.eventImage}>
          <img src={event.image} alt={event.title} />
          <div className={styles.category}>{event.category}</div>
        </div>
        <div className={styles.eventInfo}>
          <h1 className={styles.title}>{event.title}</h1>
          <div className={styles.eventMeta}>
            <div className={styles.metaItem}>
              <Calendar size={16}/>
              <span>{formatDate(event.eventDate)}</span>
            </div>
            <div className={styles.metaItem}>
              <MapPin size={16}/>
              <span>{event.location}</span>
            </div>
          </div>
          <p className={styles.description}>{event.description}</p>
        </div>
      </div>

      <div className={styles.bookingSection}>
        <h2>Select Your Package</h2>
        
        {event.packages && event.packages.length > 0 ? (
          <div className={styles.packages}>
            {event.packages.map((packageItem) => (
              <div
                key={packageItem.id}
                className={`${styles.package} ${
                  selectedPackage?.id === packageItem.id ? styles.selected : ''
                }`}
                onClick={() => handlePackageSelection(packageItem)}
              >
                <div className={styles.packageHeader}>
                  <h3>{packageItem.title}</h3>
                  <span className={styles.price}>
                    {packageItem.currency}{packageItem.price}
                  </span>
                </div>
                <div className={styles.packageDetails}>
                  <p><strong>Seating:</strong> {packageItem.seatingArrangement}</p>
                  <p><strong>Placement:</strong> {packageItem.placement}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noPackages}>No packages available</div>
        )}

        {selectedPackage && (
          <div className={styles.quantitySection}>
            <label htmlFor="quantity">Number of Tickets:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              max="10"
              value={ticketQuantity}
              onChange={handleQuantityChange}
              className={styles.quantityInput}
            />
          </div>
        )}

        {selectedPackage && (
          <div className={styles.totalSection}>
            <div className={styles.total}>
              Total: {selectedPackage.currency}{selectedPackage.price * ticketQuantity}
            </div>
            <button
              onClick={handleBookEvent}
              className={styles.bookButton}
              disabled={!selectedPackage}
            >
              {isLoggedIn ? 'Book Event' : 'Login to Book'}
            </button>
          </div>
        )}
      </div>

      {showConfirmation && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Confirm Booking</h3>
            <div className={styles.confirmationDetails}>
              <p><strong>Event:</strong> {event.title}</p>
              <p><strong>Package:</strong> {selectedPackage.title}</p>
              <p><strong>Quantity:</strong> {ticketQuantity} ticket(s)</p>
              <p><strong>Total:</strong> {selectedPackage.currency}{selectedPackage.price * ticketQuantity}</p>
            </div>
            <div className={styles.modalActions}>
              <button onClick={confirmBooking} className={styles.confirmButton}>
                Confirm Booking
              </button>
              <button onClick={cancelBooking} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails; 