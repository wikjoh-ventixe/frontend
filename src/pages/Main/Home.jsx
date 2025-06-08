import { useEffect, useState } from 'react';
import { getAllEventsWithTicketsSold } from '../../services/api';
import styles from './Home.module.css';
import EventCard from '../../features/mainpage/components/event/EventCard';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await getAllEventsWithTicketsSold();
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.loading}>Loading events...</div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.eventGrid}>
          {events.length > 0 ? (
            events.map(event => (
              <EventCard event={event} key={event.id} />
            ))
          ) : (
            <div className={styles.noEvents}>
              <p>No events available at the moment.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;