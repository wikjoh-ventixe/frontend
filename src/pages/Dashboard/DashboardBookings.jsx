import StatCardSmall from '../../features/dashboard/bookings/StatCardSmall'
import styles from './DashboardBookings.module.css'

const DashboardBookings = () => {
  return (
      <div className={styles.topStats}>
      <StatCardSmall icon="/icons/TicketIcon.svg" stat="Total Bookings" statValue='55,000' />
      <StatCardSmall icon="/icons/CheckmarkIcon.svg" stat="Total Tickets Sold" statValue='45,000' />
      <StatCardSmall icon="/icons/DollarIcon.svg" stat="Total Earnings" statValue='$275,450' />
    </div>
  )
}
export default DashboardBookings