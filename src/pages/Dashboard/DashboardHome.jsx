import styles from './DashboardHome.module.css'
import StatCardSmall from "../../features/dashboard/home/StatCardSmall"

const DashboardHome = () => {
  return (
    <div className={styles.topStats}>
      <StatCardSmall icon="/icons/CalendarIcon.svg" stat="Upcoming Events" statValue='345' />
      <StatCardSmall icon="/icons/CheckmarkIcon.svg" stat="Total bookings" statValue='1798' />
      <StatCardSmall icon="/icons/TicketIcon.svg" stat="Tickets sold" statValue='1250' />
    </div>
  )
}
export default DashboardHome