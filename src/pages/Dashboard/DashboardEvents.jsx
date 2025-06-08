import styles from './DashboardEvents.module.css'
import EventCardGrid from "../../features/dashboard/events/EventCardGrid"
import Button from "../../components/button/Button"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllEvents, getAllEventsWithTicketsSold } from '../../services/api'

const DashboardEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchEvents = async () => {
    try {
      const res = await getAllEventsWithTicketsSold()
      setEvents(res.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleCreateEvent = () => {
    navigate('/dashboard/events/create')
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.eventsContainer}>
      <div className={styles.eventsHeader}>
        <h2>Events</h2>
        <div onClick={handleCreateEvent}>
          <Button 
            label="Add Event" 
            variant="primary" 
            size="medium" 
            withIcon={true}
          />
        </div>
      </div>
      
      <div className={styles.eventGrid}>
        {events.map(event => (
          <EventCardGrid event={event} key={event.id} />
        ))}
      </div>
    </div>
  )
}
export default DashboardEvents