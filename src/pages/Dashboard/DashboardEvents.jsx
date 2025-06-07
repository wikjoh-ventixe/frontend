import styles from './DashboardEvents.module.css'
import EventCardGrid from "../../features/dashboard/events/EventCardGrid"
import { useEffect, useState } from 'react';
import { getAllEvents, getAllEventsWithTicketsSold } from '../../services/api';

const DashboardEvents = () => {
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
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.eventGrid}>
      {events.map(event => (
        <EventCardGrid event={event} key={event.id} />
      ))}
    </div>
  )
}
export default DashboardEvents